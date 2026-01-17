# Assignment 7 - Node.js REST API with Sequelize

A RESTful API built with Express.js and Sequelize ORM for managing users, posts, and comments.

## Features

- User management (CRUD operations)
- Post management with user associations
- Comment system with user and post relationships
- Advanced queries with Sequelize (aggregations, filters, includes)
- PostgreSQL database integration

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for PostgreSQL
- **PostgreSQL** - Database

## Installation

1. Clone the repository:
```bash
git clone https://github.com/B0RH0M/Route-Nodejs-Assignment-7.git
cd Assignment-7
```

2. Install dependencies:
```bash
npm install
```

3. Configure your database connection in `src/db/database.js`

4. Run the application:
```bash
npm run dev
```

## API Documentation

### Postman Collection

You can test the API using the Postman collection:
- **Online Collection**: [View on Postman](https://www.postman.com/orbital-module-explorer-52043309/workspace/borhom-public-apis/collection/39393132-e5d3ea49-978b-4e1a-85e3-929c56753ed9?action=share&source=copy-link&creator=39393132)
- **Local Collection**: [Assignment 7.postman_collection.json](docs/postman/Assignment%207.postman_collection.json)
- **Test Results**: [Assignment 7.postman_test_run.json](docs/postman/Assignment%207.postman_test_run.json)
  
  
### API Endpoints

#### Users
- `GET /users` - Get all users
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

#### Posts
- `GET /posts` - Get all posts with user details
- `GET /posts/details` - Get all posts with user and comments
- `GET /posts/comments-count` - Get posts with comments count
- `POST /posts` - Create a new post
- `DELETE /posts/:id` - Delete a post (requires userId query param)

#### Comments
- `GET /comments` - Get all comments
- `GET /comments/search?search=keyword` - Search comments by content
- `POST /comments/bulk` - Add multiple comments
- `PUT /comments/:id` - Update a comment (requires userId query param)
- `POST /comments/find-or-create` - Find or create a comment

## Project Structure

```
Assignment 7/
├── docs/
│   └── postman/           # Postman collection and test results
├── src/
│   ├── app.controller.js  # Main route definitions
│   ├── db/
│   │   ├── database.js    # Database configuration
│   │   ├── associations.js # Model relationships
│   │   └── models/        # Sequelize models
│   └── modules/
│       ├── users/         # User service and controller
│       ├── posts/         # Post service and controller
│       └── comments/      # Comment service and controller
├── main.js                # Entry point
└── package.json
```

## Database Models

### User
- id (Primary Key)
- name
- email (Unique)
- password
- role (admin/user)

### Post
- id (Primary Key)
- title
- content
- userId (Foreign Key)

### Comment
- id (Primary Key)
- content
- userId (Foreign Key)
- postId (Foreign Key)

## Bonus

LeetCode Problem Solution: [Remove Element](https://leetcode.com/problems/remove-element/submissions/1887680669/)

Implementation: [bonus.js](bonus.js)