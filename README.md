# Portfolio & Blog API

A RESTful API for a personal portfolio website with blog functionality.

## Live API URL

[Your deployed API URL here]

## Features

- User authentication (register, login) with JWT
- Project management (CRUD)
- Blog posts with comments
- Contact form submissions
- Secure password hashing with bcrypt
- Protected routes with authorization

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- bcryptjs for password hashing
- Helmet for security headers

## API Endpoints

### Users
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users/register` | Register a new user | Public |
| POST | `/api/users/login` | Login user | Public |
| GET | `/api/users/profile` | Get user profile | Private |

### Projects
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get single project | Public |
| POST | `/api/projects` | Create project | Private |
| PUT | `/api/projects/:id` | Update project | Private |
| DELETE | `/api/projects/:id` | Delete project | Private |

### Blog Posts
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog` | Get all blog posts | Public |
| GET | `/api/blog/:id` | Get single post with comments | Public |
| POST | `/api/blog` | Create blog post | Private |
| PUT | `/api/blog/:id` | Update blog post | Private (Author only) |
| DELETE | `/api/blog/:id` | Delete blog post | Private (Author only) |

### Comments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog/:postId/comments` | Get comments for a post | Public |
| POST | `/api/blog/:postId/comments` | Create comment | Private |

### Contact
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Submit contact message | Public |
| GET | `/api/contact` | Get all messages | Private |

## Request/Response Examples

### Register User
```json
POST /api/users/register
Body: {
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}

Response: {
  "_id": "...",
  "username": "testuser",
  "email": "test@example.com",
  "token": "jwt_token_here"
}
```

### Login User
```json
POST /api/users/login
Body: {
  "email": "test@example.com",
  "password": "password123"
}

Response: {
  "_id": "...",
  "username": "testuser",
  "email": "test@example.com",
  "token": "jwt_token_here"
}
```

### Create Project (Protected)
```json
POST /api/projects
Headers: {
  "Authorization": "Bearer <token>"
}
Body: {
  "title": "My Project",
  "description": "Project description",
  "imageUrl": "https://...",
  "repoUrl": "https://github.com/...",
  "liveUrl": "https://..."
}
```

### Create Blog Post (Protected)
```json
POST /api/blog
Headers: {
  "Authorization": "Bearer <token>"
}
Body: {
  "title": "My Blog Post",
  "content": "Blog post content..."
}
```

### Create Comment (Protected)
```json
POST /api/blog/:postId/comments
Headers: {
  "Authorization": "Bearer <token>"
}
Body: {
  "body": "This is a comment"
}
```

### Submit Contact Message
```json
POST /api/contact
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I would like to get in touch!"
}
```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file with required variables

3. Start the server:
   ```bash
   npm run dev   # Development
   npm start     # Production
   ```

## Deployment

This API is designed to be deployed on platforms like Render, Heroku, or Railway.

Make sure to set the environment variables in your deployment platform.
