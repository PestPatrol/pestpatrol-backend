![Banner](https://drive.google.com/uc?id=13v4gLZKivlCDC3zjHgKQizo09hUNWZfL)



# Pestpatrol Backend

**Pestpatrol** is an Android application designed for early detection of rice crop diseases using advanced machine learning models. The backend, developed using Express.js and auto-deployed to Google Cloud Run, includes 33 REST API endpoints facilitating communication between the app and cloud services.

## Table of Contents

- [Pestpatrol Backend](#pestpatrol-backend)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Key Features](#key-features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [API Documentation](#api-documentation)
  - [Project Structure](#project-structure)
  - [License](#license)

## Introduction

**PestPatrol** backend is built using the Express.js framework from Node.js. It provides RESTful APIs for user authentication, data management, and communication with the machine learning model for rice disease detection. The backend API is hosted on Google Cloud Run, leveraging Google Cloud Platform for scalable and reliable infrastructure.

## Key Features

- **User Authentication**:  Utilizes JWT (JSON Web Tokens) for token-based authentication and supports Google OAuth2.
- **Rice Leaf Disease Prediction**:  Provides API endpoints for uploading images and returns machine learning inference results using TensorFlow.js.
- **Cloud Data Management**: Utilizes robust storage solutions on Google Cloud Platform (GCP), including Firestore for structured data and Cloud Storage for object data.
- **Cloud Run**:Server is hosted on a serverless container-based infrastructure, ensuring scalability and reliability.
- **Continuous Deployment**:  Integrated with Cloud Run Continuous Deployment on the Main branch for automated deployment.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- Git
- Node.js (v20.11.1)
- NPM (Node Package Manager)

### Installation

1. Clone the Repository :
    ```bash
    git clone https://github.com/PestPatrol/pestpatrol-backend.git
    cd pestpatrol-backend
    ```
2. Environment Set Up :
    ```bash
    cp .env.example .env
    ```
3. Install Dependecies :
    ```bash
    npm install
    ```
4. Seed the firestore :
    ```bash
    gcloud ....
    ```

## Running the Application 
Run application in Development mode :
```bash
npm run start:dev
```
The application will be accessible at http://localhost:3000.

## API Documentation

## Project Structure
```bash
pestpatrol-backend
├── LICENSE
├── README.md
├── package-lock.json
├── package.json
├── .dockerignore
├── .env.example
├── .gitattributes
├── .gitignore
├── dockerfile
├── eslint.config.mjs
└── src
    ├── app
    ├── configs
    ├── controllers        
    ├── errors
    ├── middlewares        
    ├── routes
    ├── services
    │   ├── articles       
    │   ├── chatbots       
    │   ├── predictions    
    │   ├── reminders      
    │   └── users
    ├── utils
    └── validations
```
## License

This Project is licensed under the MIT License - see the [LICENSE](https://github.com/PestPatrol/pestpatrol-backend/blob/main/LICENSE) file for details.

Thank you for using FreshGrade! If you have any questions or need further assistance, please open an issue in this repository.
