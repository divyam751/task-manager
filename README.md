# Task Manager App

📋 Welcome to the Task Manager App! This application helps you manage your tasks efficiently, allowing you to create, edit, and delete tasks as needed.

## Frontend

### Features

🚀 **User Authentication**: Users can sign up or log in to access their task lists.

✅ **Task Management**: Create, view, edit, and delete tasks.

📱 **Responsive Design**: The app is designed to work seamlessly across various devices, including desktops, tablets, and mobile phones.

🎨 **User-friendly Interface**: Intuitive and easy-to-use interface for a smooth user experience.

### Technologies Used

🌐 **React.js**: A JavaScript library for building user interfaces.

🎨 **Styling**: CSS for styling the frontend components.

🔄 **State Management**: Redux for managing application state.

🔀 **Routing**: React Router for handling navigation within the app.

### Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-manager-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-manager-app
   ```

3. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

4. Start the frontend development server:

   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to view the app.

### Deployment

The Task Manager App frontend is deployed on Vercel.

- **Frontend Deployment**: [Task Manager Frontend](https://task-manager-frontend-flame.vercel.app/)

### Screenshots
![1](https://github.com/divyam751/task-manager/assets/125983433/0355b37c-35c8-45af-9e5d-7ab20a6e5b48)
![2](https://github.com/divyam751/task-manager/assets/125983433/2afa3048-9957-4314-b467-6f412a21913e)
![3](https://github.com/divyam751/task-manager/assets/125983433/3c11c710-250e-4061-b6f5-645ba542f1b1)
![4](https://github.com/divyam751/task-manager/assets/125983433/f378eb12-2574-44d1-a729-65ac734ac077)
![5](https://github.com/divyam751/task-manager/assets/125983433/b867dd82-6542-4eb7-83c5-d6f6eef7b3da)


## Backend

### Features

🔐 **User Authentication**: JWT (JSON Web Tokens) for user authentication.

📦 **RESTful API**: Provides endpoints for task management operations.

🛠️ **Express.js**: A web application framework for Node.js.

💾 **Database**: MongoDB for storing task data.

### API Routes

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.
- **GET /api/tasks**: Get all tasks for the authenticated user.
- **POST /api/tasks**: Create a new task.
- **GET /api/tasks/:id**: Get a specific task by ID.
- **PUT /api/tasks/:id**: Update a specific task by ID.
- **DELETE /api/tasks/:id**: Delete a specific task by ID.

### Getting Started

To run the backend server locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-manager-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-manager-app
   ```

3. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Set up your MongoDB database and configure the connection in `config/db.js`.

5. Start the backend server:

   ```bash
   npm start
   ```

### Deployment

The Task Manager App backend is deployed on Vercel.

- **Backend Deployment**: [Task Manager Backend](https://task-manager-pi-topaz.vercel.app/)

