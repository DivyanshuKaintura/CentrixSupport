import logging
import os
import json
from datetime import datetime
import PyPDF2
from pathlib import Path
from variables import system_prompt_content, groq_api_key
from groq import Groq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain_community.chat_models import ChatOllama
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain.prompts import ChatPromptTemplate
from chromadb.config import Settings
import chromadb
import requests

# Initialize Groq API client
def groq_chat(prompt):
    """
    Generates a response from the Groq model based on the provided prompt.

    Args:
        prompt (list): A list of dictionaries, where each dictionary represents 
                       a message with its role and content.

    Returns:
        str: The response content from the Groq model. 
    """
    client = Groq(api_key=groq_api_key)
    
    chat_completion = client.chat.completions.create(
        messages=prompt,
        model="llama3-8b-8192",
    )
    
    return chat_completion.choices[0].message.content

# PDF Extraction and Processing Functions
def extract_text_from_pdf(pdf_path):
    """
    Extracts text from a PDF file.
    """
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text

def process_pdf_folder(input_folder, output_dir):
    """
    Processes all PDFs in the folder and extracts text.
    """
    combined_text = ""
    for pdf_file in Path(input_folder).glob("*.pdf"):
        logging.info(f"Processing PDF: {pdf_file.name}")
        pdf_text = extract_text_from_pdf(pdf_file)
        
        # Save extracted text to file
        with open(os.path.join(output_dir, f"{pdf_file.stem}_text.txt"), "w", encoding="utf-8") as file:
            file.write(pdf_text)
        
        combined_text += pdf_text + "\n"
    
    return combined_text

# Vector Database Creation
def create_vector_db(combined_text, embedding_file_path):
    logging.info("Splitting text into chunks")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = text_splitter.split_text(combined_text)

    logging.info("Initializing HuggingFace embeddings")
    huggin_embeddings = HuggingFaceBgeEmbeddings(
        model_name="BAAI/bge-small-en-v1.5",
        model_kwargs={'device': 'cpu'},
        encode_kwargs={'normalize_embeddings': True}
    )

    logging.info("Creating Chroma vector store")
    client = chromadb.PersistentClient(path=embedding_file_path, settings=Settings(anonymized_telemetry=False))
    vector_store = Chroma.from_texts(
        texts=chunks,
        embedding=huggin_embeddings,
        client=client,
        persist_directory=f"{embedding_file_path}/combined_db"
    )
    return vector_store

# RAG Chain Setup
def setup_rag_chain(vector_db):
    logging.info("Setting up RAG chain")
    local_model = "gemma2:2b"
    llm = ChatOllama(model=local_model, top_k=60)
    retriever = vector_db.as_retriever()

    systemprompt = (
        "You are an assistant for mental health report summarization. "
        "Use the retrieved content to answer the question clearly and briefly. "
        "If the answer isn't in the report, respond with empathy and say you don't have that information.\n\n"
        "Context: {context}\n"
    )

    prompt = ChatPromptTemplate.from_messages([ 
        ("system", systemprompt),
        ("human", "{input}")
    ])

    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    return create_retrieval_chain(retriever, question_answer_chain)

# def setup_rag_chain(vector_db):
#     """
#     Sets up the RAG chain with better error handling and fallback options.
#     """
#     logging.info("Setting up RAG chain")
    
#     try:
#         # Test Ollama connection before proceeding
#         response = requests.get("http://localhost:5000/api/tags")
#         if response.status_code != 200:
#             raise ConnectionError("Ollama service is not responding properly")
            
#         local_model = "gemma2:2b"
#         llm = ChatOllama(
#             model=local_model,
#             top_k=60,
#             temperature=0.7,
#             base_url="http://localhost:11434",
#             timeout=30  # Increase timeout
#         )
        
#     except (requests.exceptions.ConnectionError, ConnectionError) as e:
#         logging.warning(f"Could not connect to Ollama: {str(e)}. Falling back to Groq.")
#         # Fallback to Groq if Ollama is not available
#         llm = Groq(api_key=groq_api_key)

#     retriever = vector_db.as_retriever(
#         search_kwargs={"k": 3}  # Retrieve top 3 most relevant chunks
#     )

#     systemprompt = (
#         "You are an assistant for mental health report summarization. "
#         "Use the retrieved content to answer the question clearly and briefly. "
#         "If the answer isn't in the report, respond with empathy and say you don't have that information.\n\n"
#         "Context: {context}\n"
#     )

#     prompt = ChatPromptTemplate.from_messages([
#         ("system", systemprompt),
#         ("human", "{input}")
#     ])

#     try:
#         question_answer_chain = create_stuff_documents_chain(llm, prompt)
#         return create_retrieval_chain(retriever, question_answer_chain)
#     except Exception as e:
#         logging.error(f"Error setting up RAG chain: {str(e)}")
#         raise RuntimeError(f"Failed to setup RAG chain: {str(e)}")

def save_conversation_to_json(conversation_data, mode, filename="conversations.json"):
    """
    Saves conversation data to a JSON file.
    
    Args:
        conversation_data (dict): The conversation data to save
        mode (str): The conversation mode ('chat' or 'report')
        filename (str): The name of the JSON file to save to
    """
    try:
        if os.path.exists(filename):
            with open(filename, 'r') as file:
                existing_data = json.load(file)
        else:
            existing_data = []
        
        # Add new conversation data
        conversation_entry = {
            "timestamp": datetime.now().isoformat(),
            "mode": mode,
            "conversation": conversation_data
        }
        
        existing_data.append(conversation_entry)
        
        with open(filename, 'w') as file:
            json.dump(existing_data, file, indent=2)
            
    except Exception as e:
        logging.error(f"Error saving conversation to JSON: {str(e)}")

def format_chat_response(question, response):
    """
    Formats chat response into a structured dictionary.
    """
    return {
        "type": "chat",
        "question": question,
        "response": response,
        "timestamp": datetime.now().isoformat()
    }

def format_report_response(question, response):
    """
    Formats report response into a structured dictionary.
    """
    return {
        "type": "report",
        "question": question,
        "answer": response,
        "timestamp": datetime.now().isoformat()
    }

def print_json_response(response_data):
    """
    Prints the response data as formatted JSON.
    """
    print(json.dumps(response_data, indent=2))

def main():
    logging.basicConfig(level=logging.INFO)
    
    input_folder = "document"
    output_dir = "processed_texts"
    embedding_file_path = "vector_db"
    
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(input_folder, exist_ok=True)
    
    # Step 1: Process all PDFs in the folder and extract text
    combined_text = process_pdf_folder(input_folder, output_dir)
    
    # Step 2: Create vector database
    vector_db = create_vector_db(combined_text, embedding_file_path)
    
    # Step 3: Set up RAG chain for question answering
    rag_chain = setup_rag_chain(vector_db)
    
    print("Welcome to CentrixSupport! 🤖💬")
    print("Type 'report' to ask questions about a report, or type 'chat' for general mental health support.")
    print("Type 'exit' to end the session.")
    
    while True:
        user_choice = input("Enter 'report' or 'chat' mode: ").strip().lower()
        
        if user_choice == 'exit':
            print("Ending the session. Take care! 😊")
            break
            
        elif user_choice == 'chat':
            prompt = [{'role': 'system', 'content': system_prompt_content}]
            print("Starting chat mode. Type 'bye' to exit chat mode.")
            
            chat_conversation = []
            
            while True:
                user_prompt = input("You: ")
                if user_prompt.lower() == 'bye':
                    print("Ending chat mode. Returning to main menu.")
                    if chat_conversation:
                        save_conversation_to_json(chat_conversation, "chat")
                    break
                
                prompt.append({'role': 'user', 'content': user_prompt})
                response = groq_chat(prompt)
                
                # Format and print JSON response
                chat_response = format_chat_response(user_prompt, response.strip())
                print_json_response(chat_response)
                
                chat_conversation.append(chat_response)
                prompt.append({'role': 'assistant', 'content': response.strip()})
                
        elif user_choice == 'report':
            print("Starting report question mode. Type 'exit' to return to main menu.")
            
            report_conversation = []
            
            while True:
                user_query = input("Enter your question about the report: ")
                if user_query.lower() == 'exit':
                    print("Ending report question mode. Returning to main menu.")
                    if report_conversation:
                        save_conversation_to_json(report_conversation, "report")
                    break
                
                response = rag_chain.invoke({"input": user_query})
                answer = response['answer']
                
                # Format and print JSON response
                report_response = format_report_response(user_query, answer)
                print_json_response(report_response)
                
                report_conversation.append(report_response)

if __name__ == "__main__":
    main()