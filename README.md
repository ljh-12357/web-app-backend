# Portfolio & Blog API - Backend

A RESTful API for a personal portfolio website with blog functionality.

## Live Demo

- **Live API URL**: https://backend-liu-jiahuis-projects.vercel.app
- **Source Code**: https://github.com/ljh-12357/web-app-backend

## Features

- User authentication (register, login) with JWT
- Project management (CRUD operations)
- Blog posts with comments system
- Contact form submissions
- Secure password hashing with bcrypt
- Protected routes with authorization
- CORS enabled for cross-origin requests

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT for authentication
- bcryptjs for password hashing
- Helmet for security headers

## API Endpoints

### Base URL
```
https://backend-liu-jiahuis-projects.vercel.app/api
```

### Users

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| POST | `/api/users/register` | Register a new user | No | `{ username, email, password }` |
| POST | `/api/users/login` | Login user | No | `{ email, password }` |
| GET | `/api/users/profile` | Get user profile | Yes | - |

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "...",
  "username": "testuser",
  "email": "test@example.com",
  "token": "jwt_token_here"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "...",
  "username": "testuser",
  "email": "test@example.com",
  "token": "jwt_token_here"
}
```

---

### Projects

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| GET | `/api/projects` | Get all projects | No | - |
| GET | `/api/projects/:id` | Get single project | No | - |
| POST | `/api/projects` | Create project | Yes | `{ title, description, imageUrl?, repoUrl?, liveUrl? }` |
| PUT | `/api/projects/:id` | Update project | Yes | `{ title?, description?, imageUrl?, repoUrl?, liveUrl? }` |
| DELETE | `/api/projects/:id` | Delete project | Yes | - |

#### Create Project
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Project",
  "description": "Project description here",
  "imageUrl": "https://example.com/image.jpg",
  "repoUrl": "https://github.com/user/repo",
  "liveUrl": "https://myproject.com"
}
```

---

### Blog Posts

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| GET | `/api/blog` | Get all blog posts | No | - |
| GET | `/api/blog/:id` | Get single post with comments | No | - |
| POST | `/api/blog` | Create blog post | Yes | `{ title, content }` |
| PUT | `/api/blog/:id` | Update blog post | Yes (Author only) | `{ title?, content? }` |
| DELETE | `/api/blog/:id` | Delete blog post | Yes (Author only) | - |

#### Create Blog Post
```http
POST /api/blog
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Blog Post Title",
  "content": "This is the content of my blog post..."
}
```

---

### Comments

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| GET | `/api/blog/:postId/comments` | Get comments for a post | No | - |
| POST | `/api/blog/:postId/comments` | Create comment | Yes | `{ body }` |

#### Create Comment
```http
POST /api/blog/:postId/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "body": "This is my comment on the blog post"
}
```

---

### Contact

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| POST | `/api/contact` | Submit contact message | No | `{ name, email, message }` |
| GET | `/api/contact` | Get all messages | Yes | - |

#### Submit Contact Message
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I would like to get in touch!"
}
```

---

## Authentication

Protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

The token is obtained from the login or register response.

## Error Responses

All endpoints return errors in the following format:

```json
{
  "message": "Error description here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/ljh-12357/web-app-backend.git
   cd web-app-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with required variables (see above)

4. Start the server:
   ```bash
   npm run dev   # Development with nodemon
   npm start     # Production
   ```

5. The API will be available at `http://localhost:5001`

## Seeding Test Data

To populate the database with test data:

```bash
node seed.js
```

This creates:
- An admin user (email: admin@example.com, password: admin123456)
- 4 sample projects
- 4 sample blog posts

## Deployment

The API is deployed on Vercel. To deploy your own:

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `NODE_ENV` - Set to `production`

## Related Repository

- **Frontend**: https://github.com/ljh-12357/web-app-frontend

## License

MIT
