# Nextgen Backend

Node.js backend server with Express and MongoDB.

## Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string and configuration.

### Running the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## Project Structure

```
backend/
├── src/
│   ├── index.js           # Main server file
│   ├── models/            # MongoDB schemas
│   │   └── Example.js
│   └── routes/            # API routes
│       └── exampleRoutes.js
├── package.json
├── .env.example
└── README.md
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Example CRUD Routes
- `GET /api/examples` - Get all examples
- `GET /api/examples/:id` - Get example by ID
- `POST /api/examples` - Create new example
- `PUT /api/examples/:id` - Update example
- `DELETE /api/examples/:id` - Delete example

## Environment Variables

- `MONGODB_URI` - MongoDB connection string (development)
- `MONGODB_URI_PROD` - MongoDB connection string (production)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)
- `CORS_ORIGIN` - CORS allowed origin

## Render deployment

For Render, configure the backend service with:

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
	- `NODE_ENV=production`
	- `MONGODB_URI_PROD=<your MongoDB Atlas connection string>`
	- `CORS_ORIGIN=<your deployed frontend URL>`

## Technologies

- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **dotenv** - Environment variables
- **cors** - CORS middleware
- **body-parser** - Request body parsing
- **nodemon** - Development auto-reload (dev only)

## Next Steps

1. Connect your MongoDB instance
2. Import example routes in `src/index.js`
3. Implement your business logic and models
4. Add authentication if needed
5. Add validation and error handling