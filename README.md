# CentrixSupport - Mental Health Support Chatbot

CentrixSupport is an AI-powered chatbot designed to provide mental health support and resources to individuals experiencing stress or anxiety. The chatbot offers empathetic responses, coping mechanisms, and links to professional help, assisting users who may need further guidance.

## Problem Statement

The chatbot is built to fulfill the following objectives:
- **Provide empathetic responses** to help users feel understood and supported.
- **Guide users with coping mechanisms** to manage stress and anxiety.
- **Link users to professional help** for additional assistance, ensuring timely and accurate support.

## Project Overview

- **Frontend**: Developed in React to provide a responsive and interactive interface.
- **Backend**: Built with Flask to handle user requests, process inputs, and return AI-based responses.
- **Model**: Utilizes the Gqor Large Language Model (LLM) to process and generate contextually relevant answers to user queries.

## Working Flow of the Project

![Architecture](img/architecture.jpg)

## Key Features

- **Empathetic Responses**: The chatbot delivers responses that are supportive and compassionate.
- **Coping Mechanisms**: Offers specific techniques and practices to manage stress and anxiety.
- **Professional Resources**: Provides links and suggestions for professional mental health support.

## File Structure

- **src/** - Contains the React frontend files.
- **app.py** - Flask backend for managing requests between the frontend and Gqor LLM model.
- **models/** - Directory for machine learning model files.
- **static/** - Static files like CSS, JavaScript, and images.
- **templates/** - HTML templates used by Flask.

## Getting Started

### Prerequisites

- Node.js
- Python 3
- Flask and other required Python libraries (install via `requirements.txt`)
- React dependencies (install via `package.json`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AbhinavKaintura/CentrixSupport.git
   cd centrixsupport
This command installs all necessary Python packages for the backend, as listed in the requirements.txt file.
   ```
   ```bash
   cd src
   pip install -r requirements.txt

   ```
This command launches the Flask backend server. Once started, the server listens for incoming requests from the frontend and handles them by processing user inputs and generating AI-based responses. The Flask application also connects with the LLM to deliver contextually relevant answers to user queries.
   ```bash
   python flask_main.py
   ```

This command installs all necessary Node.js dependencies for the frontend, as specified in the package.json file
   ```bash
   npm install
   ```

This command starts the React development server, allowing you to run and test the chatbot interface in your browser. The frontend connects with the backend Flask server, enabling a seamless user experience as the chatbot processes and responds to user messages in real time.
   ```bash
   npm start

