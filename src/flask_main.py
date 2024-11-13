from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import logging
from datetime import datetime
import json
from variables import system_prompt_content

# Import your existing functions
from main import (
    groq_chat, 
    process_pdf_folder,
    create_vector_db,
    setup_rag_chain,
    system_prompt_content
)

app = Flask(__name__)
# Configure CORS to allow requests from your React frontend
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000"],  # React's default port
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Configure logging with more detail
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Configure upload settings
UPLOAD_FOLDER = 'document'
ALLOWED_EXTENSIONS = {'pdf'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max-limit

app.config.update(
    UPLOAD_FOLDER=UPLOAD_FOLDER,
    MAX_CONTENT_LENGTH=MAX_CONTENT_LENGTH
)

# Ensure required directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs('processed_texts', exist_ok=True)
os.makedirs('vector_db', exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Global variable to store the RAG chain
rag_chain = None

@app.before_request
def before_request():
    """Ensure proper content type for POST requests"""
    if request.method == "POST" and not request.is_json and "multipart/form-data" not in request.content_type:
        return jsonify({"error": "Content-Type must be application/json"}), 400

@app.errorhandler(413)
def request_entity_too_large(error):
    """Handle file size exceeding limit"""
    return jsonify({"error": "File size exceeds the 16MB limit"}), 413

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400

        data = request.json
        user_message = data.get('message')
        
        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        logger.info(f"Processing chat message: {user_message[:50]}...")

        # Prepare the chat prompt
        prompt = [
            {'role': 'system', 'content': system_prompt_content},
            {'role': 'user', 'content': user_message}
        ]

        # Get response from Groq
        response = groq_chat(prompt)

        # Format the response
        chat_response = {
            "type": "chat",
            "question": user_message,
            "response": response.strip(),
            "timestamp": datetime.now().isoformat()
        }

        # Save conversation to JSON
        save_conversation_to_json([chat_response], "chat")

        return jsonify(chat_response)

    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}", exc_info=True)
        return jsonify({'error': "An internal error occurred processing your request"}), 500

@app.route('/api/upload', methods=['POST'])
def upload_file():
    global rag_chain
    
    try:
        # Check if a file was uploaded
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
            
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
            
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only PDF files are allowed'}), 400

        try:
            # Clear the upload folder before saving new file
            for existing_file in os.listdir(app.config['UPLOAD_FOLDER']):
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], existing_file)
                if os.path.isfile(file_path):
                    os.remove(file_path)
            
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            logger.info(f"Processing uploaded file: {filename}")
            
            # Process the uploaded PDF
            combined_text = process_pdf_folder(app.config['UPLOAD_FOLDER'], 'processed_texts')
            
            # Create vector database
            vector_db = create_vector_db(combined_text, 'vector_db')
            
            # Setup RAG chain
            rag_chain = setup_rag_chain(vector_db)
            
            return jsonify({
                'message': 'File uploaded and processed successfully',
                'filename': filename
            })
            
        except Exception as e:
            logger.error(f"Error processing file: {str(e)}", exc_info=True)
            return jsonify({'error': 'Error processing the uploaded file'}), 500
            
    except Exception as e:
        logger.error(f"Error in upload endpoint: {str(e)}", exc_info=True)
        return jsonify({'error': 'An error occurred during file upload'}), 500

@app.route('/api/query', methods=['POST'])
def query_document():
    global rag_chain
    
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400

        if not rag_chain:
            return jsonify({
                'error': 'No document has been processed yet. Please upload a document first.'
            }), 400

        data = request.json
        user_query = data.get('query')
        
        if not user_query:
            return jsonify({'error': 'No query provided'}), 400

        logger.info(f"Processing document query: {user_query[:50]}...")

        # Get response from RAG chain
        response = rag_chain.invoke({"input": user_query})
        
        # Format the response
        query_response = {
            "type": "report",
            "question": user_query,
            "answer": response['answer'],
            "timestamp": datetime.now().isoformat()
        }

        # Save conversation to JSON
        save_conversation_to_json([query_response], "report")

        return jsonify(query_response)

    except Exception as e:
        logger.error(f"Error in query endpoint: {str(e)}", exc_info=True)
        return jsonify({'error': 'An error occurred processing your query'}), 500

def save_conversation_to_json(conversation_data, mode, filename="conversations.json"):
    """Enhanced conversation saving with better error handling"""
    try:
        filepath = os.path.join("conversations", filename)
        os.makedirs("conversations", exist_ok=True)
        
        existing_data = []
        if os.path.exists(filepath):
            try:
                with open(filepath, 'r', encoding='utf-8') as file:
                    existing_data = json.load(file)
            except json.JSONDecodeError:
                logger.warning(f"Could not decode existing conversation file: {filepath}")
        
        conversation_entry = {
            "timestamp": datetime.now().isoformat(),
            "mode": mode,
            "conversation": conversation_data
        }
        
        existing_data.append(conversation_entry)
        
        with open(filepath, 'w', encoding='utf-8') as file:
            json.dump(existing_data, file, indent=2, ensure_ascii=False)
            
    except Exception as e:
        logger.error(f"Error saving conversation to JSON: {str(e)}", exc_info=True)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Enhanced health check endpoint"""
    try:
        # Check if required directories exist
        directories_status = {
            "upload_folder": os.path.exists(UPLOAD_FOLDER),
            "processed_texts": os.path.exists("processed_texts"),
            "vector_db": os.path.exists("vector_db")
        }
        
        return jsonify({
            'status': 'healthy',
            'timestamp': datetime.now().isoformat(),
            'directories': directories_status,
            'rag_chain_loaded': rag_chain is not None
        })
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'unhealthy',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    # Create required directories
    os.makedirs("conversations", exist_ok=True)
    
    # Start the Flask application
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)