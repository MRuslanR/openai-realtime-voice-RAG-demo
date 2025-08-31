# AI.Voice: Real-time Voice Agent with a Personal Knowledge Base

AI.Voice is a full-stack web application that provides a real-time, conversational voice agent powered by the OpenAI API. The agent is enhanced with a Retrieval-Augmented Generation (RAG) system, allowing it to answer questions based on a personal knowledge base created by uploading documents. The entire application is containerized with Docker for easy setup and deployment.

## Key Features

*   **Real-time Voice Interaction**: Engage in natural, low-latency voice conversations with an AI assistant using WebRTC and the OpenAI Realtime API.
*   **Retrieval-Augmented Generation (RAG)**: The agent can access and cite information from documents you provide, ensuring answers are grounded in your specific data.
*   **Personal Knowledge Base**: Each user has their own isolated knowledge base. Upload documents and the system will automatically process, index, and make them searchable.
*   **Multi-Format Document Support**: Supports a wide range of document types, including `.pdf`, `.docx`, `.pptx`, `.txt`, `.md`, `.csv`, `.json`, and `.rtf`.
*   **Vector Search**: Utilizes ChromaDB as a persistent vector store and OpenAI's `text-embedding-3-small` model for efficient and accurate similarity searches.
*   **User Authentication**: A simple and secure session-based authentication system to manage user access.
*   **Dockerized for Easy Deployment**: Comes with `Dockerfile` and `docker-compose.yaml` for a one-command setup, making it ready for production environments.

## Technology Stack

**Backend:**
*   **Framework**: Flask
*   **WSGI Server**: Gunicorn
*   **AI**: OpenAI API (Realtime Voice, Embeddings)
*   **Vector Database**: ChromaDB (Persistent)
*   **Programming Language**: Python 3.11
*   **Core Libraries**: `pypdf`, `python-docx`, `python-pptx` for document parsing.

**Frontend:**
*   **Structure**: HTML5, CSS3, JavaScript (ES6+)
*   **APIs**: WebRTC, Fetch API for communication with the backend and OpenAI.
*   **Styling**: Clean, modern UI with no external frameworks.

**Deployment:**
*   **Containerization**: Docker, Docker Compose

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

*   Docker and Docker Compose must be installed.
*   Git for cloning the repository.
*   An OpenAI API key with access to GPT models and embeddings.

### Installation and Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/MRuslanR/openai-realtime-voice-RAG-demo.git
    cd openai-realtime-voice-RAG-demo
    ```

2.  **Configure Environment Variables**
    Create a `.env` file in the root of the project by copying the example:
    ```bash
    cp .env.example .env
    ```
    Now, open the `.env` file and add your credentials:
    ```ini
    # Your secret key for Flask sessions. Generate a secure random key.
    # You can generate one with: python -c 'import secrets; print(secrets.token_hex(24))'
    SECRET_KEY=your_super_secret_and_random_key

    # Your OpenAI API key
    OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    # Set to 'production' for deployment, or 'development' for debugging
    FLASK_ENV=production
    ```

3.  **Review User Accounts**
    The default user accounts are defined in `users.json`. For a production environment, it is highly recommended to replace the plain-text passwords with secure hashes.

4.  **Build and Run with Docker Compose**
    From the root directory of the project, run the following command:
    ```bash
    docker-compose up --build
    ```
    This command will build the Docker image and start the application container. The `-d` flag can be added to run it in detached mode.

5.  **Access the Application**
    Once the container is running, open your web browser and navigate to:
    `http://localhost:3000`

    You can log in using one of the accounts from `users.json` (e.g., login: `user1`, password: `password1`).

## How It Works

The application's RAG workflow is as follows:

1.  **Knowledge Ingestion**: A user logs in and uploads documents through the "Knowledge Base" page.
2.  **Text Extraction & Chunking**: The Flask backend detects the file type, extracts its text content, and splits the text into smaller, overlapping chunks.
3.  **Embedding & Indexing**: Each text chunk is sent to the OpenAI Embeddings API to create a vector representation. These vectors, along with their source metadata (e.g., filename), are stored in the user's dedicated collection in ChromaDB.
4.  **Real-time Conversation**: The user navigates to the "Agent" page and starts a voice session.
5.  **Function Calling for RAG**: When the user asks a question that requires information from the documents, the AI model uses its "function calling" capability to trigger the `kb_search` function defined in the application.
6.  **Vector Search**: The backend receives the query from the function call, embeds it, and performs a similarity search against the user's ChromaDB collection to find the most relevant text chunks.
7.  **Context-Aware Response**: The retrieved chunks are sent back to the AI model as context. The model then synthesizes this information to generate an accurate, context-aware spoken response, often citing the source document.

