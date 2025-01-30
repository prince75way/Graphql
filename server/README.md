# Learning Management System (LMS) Backend

This is the backend for a Learning Management System (LMS), where instructors can create courses, upload content, and students can enroll in courses and track their progress.

## Features

- **Course Creation**: Instructors can create and upload courses with modules, including video and text content.
- **Student Enrollment**: Students can enroll in courses and track their progress.
- **Progress Tracking**: Students can track their progress based on the modules they have watched.
- **Instructor Onboarding**: Admins can onboard instructors and manage courses.
- **API Documentation**: Full API documentation with Swagger for easy integration.
- **Admin Panel (Optional)**: Admin tools for managing users, courses, and progress.

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing course and user data.
- **Mongoose**: ODM for interacting with MongoDB.
- **Swagger**: API documentation.
- **JWT**: JSON Web Tokens for authentication.
- **Bcrypt**: Password hashing for secure login.
- **Cloudinary**: Image and video uploads for courses and modules.

## Endpoints

### Authentication

- **POST** `/api/user/signup`: Register a new user (Student/Instructor).
- **POST** `/api/user/login`: Login an existing user (Student/Instructor).
- **POST** `/api/user/refresh-token`: Refresh access tokens for a logged-in user.

### Courses

- **POST** `/api/course/create`: Create a new course (Instructor only).
- **POST** `/api/course/enroll`: Enroll a student in a course.
- **PUT** `/api/course/edit/:courseId`: Edit course details (Instructor only).
- **DELETE** `/api/course/delete/:courseId`: Delete a course (Instructor only).

### Modules

- **POST** `/api/module/create/:courseId`: Create a new module for a course (Instructor only).
- **PUT** `/api/module/edit/:moduleId`: Edit a module (Instructor only).
- **DELETE** `/api/module/delete/:moduleId`: Delete a module (Instructor only).

### Progress Tracking

- **POST** `/api/user/watchedmodule/:courseId`: Update watched module status for the user.
- **GET** `/api/user/progress`: Get progress for the enrolled courses.

### Instructor Onboarding

- **POST** `/api/instructor/onboard`: Admins onboard instructors to the LMS (Admin only).

## Setup

### Prerequisites

- Node.js v14.x or higher
- MongoDB instance (locally or cloud-based)
- Cloudinary account (for media uploads)


### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/lms-backend.git

2. Install Dependencies:
    ```bash
    cd lms-backend
    npm install
3. Set Environment Variables:
    ```bash
    MONGO_URI=your-mongo-db-uri
    JWT_SECRET=your-jwt-secret
    CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
    CLOUDINARY_API_KEY=your-cloudinary-api-key
    CLOUDINARY_API_SECRET=your-cloudinary-api-secret

4. Start Server:
    ``` bash
    npm start 


### The API documentation is available at:

http://localhost:8000/api-docs


### Testing


To test the API, you can use tools like Postman or Insomnia. Ensure that you follow the API documentation for testing the different routes.

