# Emeralds DT

# Jewellery bussnines


My Awesome Node.js App
This application is a simple yet powerful task management API built with Node.js and Express.js, using MongoDB as its database. It allows users to register, log in, and manage their personal to-do lists through a RESTful API.

Table of Contents
Features
Technologies Used
Getting Started
Prerequisites
Installation
Environment Variables
Running the Application
API Endpoints
Folder Structure
Contributing
License
Contact
Features
User Authentication: Secure registration and login using JWT (JSON Web Tokens).
Task Management: Create, read, update, and delete (CRUD) tasks.
Private Tasks: Each user's tasks are private and accessible only to them.
RESTful API: Clean and intuitive API design for easy integration.
Technologies Used
Backend:
Node.js: JavaScript runtime.
Express.js: Web framework for building the API.
Mongoose: ODM (Object Data Modeling) for MongoDB.
jsonwebtoken: For generating and verifying JWTs.
bcryptjs: For securely hashing passwords.
dotenv: To load environment variables from a .env file.
Database:
MongoDB: A NoSQL database.
Development Tools:
Nodemon: Automatically restarts the server during development.
Getting Started
Follow these steps to get a copy of this project running on your local machine.

Prerequisites
Make sure you have the following installed:

Node.js: It's best to use the latest LTS version, which you can download from nodejs.org.
npm (Node Package Manager): Comes bundled with Node.js.
MongoDB: Install MongoDB Community Server from mongodb.com/try/download/community or use a cloud service like MongoDB Atlas.
Installation
Clone the repository:

Bash

git clone https://github.com/your-username/my-awesome-nodejs-app.git
cd my-awesome-nodejs-app
Install dependencies:

Bash

npm install
Environment Variables
Create a file named .env in the root directory of your project and add the following variables:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/mytaskapp
JWT_SECRET=supersecretjwtkey_replace_this_in_production!
PORT: The port number the server will listen on.
MONGODB_URI: Your MongoDB connection string. If you're using a local MongoDB instance, the example above should work. For MongoDB Atlas, use your provided connection string.
JWT_SECRET: A strong, random string used to sign and verify JSON Web Tokens. Change this to a unique, complex string for production!
Running the Application
Development Mode (with hot-reloading):

Bash

npm run dev
The server will start on http://localhost:5000 (or your specified PORT).

Production Mode:

Bash

npm start
API Endpoints
This section outlines the main API endpoints for the task management application. All authenticated endpoints require a Bearer token in the Authorization header.

Authentication
POST /api/auth/register

Description: Registers a new user.
Request Body:
JSON

{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "strongpassword123"
}
Response:
JSON

{
  "token": "eyJhbGciOiJIUzI1Ni...",
  "userId": "60c72b2f9b1d8c001c8e1a7b"
}
POST /api/auth/login

Description: Logs in an existing user and returns a JWT.
Request Body:
JSON

{
  "email": "john.doe@example.com",
  "password": "strongpassword123"
}
Response:
JSON

{
  "token": "eyJhbGciOiJIUzI1Ni...",
  "userId": "60c72b2f9b1d8c001c8e1a7b"
}
Tasks
GET /api/tasks

Description: Retrieves all tasks for the authenticated user.
Headers: Authorization: Bearer <your_jwt_token>
Response:
JSON

[
  {
    "_id": "60c72b2f9b1d8c001c8e1a7c",
    "title": "Buy groceries",
    "completed": false,
    "user": "60c72b2f9b1d8c001c8e1a7b",
    "createdAt": "2023-10-26T10:00:00.000Z"
  }
]
POST /api/tasks

Description: Creates a new task for the authenticated user.
Headers: Authorization: Bearer <your_jwt_token>
Request Body:
JSON

{
  "title": "Finish README file"
}
Response:
JSON

{
  "_id": "60c72b2f9b1d8c001c8e1a7d",
  "title": "Finish README file",
  "completed": false,
  "user": "60c72b2f9b1d8c001c8e1a7b",
  "createdAt": "2025-10-26T11:00:00.000Z"
}
PUT /api/tasks/:id

Description: Updates a specific task by its ID for the authenticated user.
Headers: Authorization: Bearer <your_jwt_token>
Request Params: id (the task's ID)
Request Body:
JSON

{
  "title": "Finish README file (completed)",
  "completed": true
}
Response:
JSON

{
  "_id": "60c72b2f9b1d8c001c8e1a7d",
  "title": "Finish README file (completed)",
  "completed": true,
  "user": "60c72b2f9b1d8c001c8e1a7b",
  "createdAt": "2023-10-26T11:00:00.000Z"
}
DELETE /api/tasks/:id

Description: Deletes a specific task by its ID for the authenticated user.
Headers: Authorization: Bearer <your_jwt_token>
Request Params: id (the task's ID)
Response:
JSON

{
  "message": "Task removed"
}
Folder Structure
.
├── config/              # Database connection and other configurations
├── controllers/         # Handles request logic and interacts with models
├── middleware/          # Custom Express middleware (e.g., authentication)
├── models/              # Mongoose schemas for MongoDB collections
├── routes/              # Defines API endpoints and links to controllers
├── .env                 # Environment variables for local development
├── .gitignore           # Specifies intentionally untracked files to ignore
├── app.js               # Main application entry point
├── package.json         # Project metadata and dependencies
├── README.md            # You are reading it!
Contributing
Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. Don't forget to give the project a star!

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature) 3. Commit your Changes (git commit -m 'feat: Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
Distributed under the MIT License. See LICENSE for more information.

Project Link: https://github.com/NietoDeveloper/EmeraldsDT


# Manuel Nieto

### Nieto Software Developer    2025