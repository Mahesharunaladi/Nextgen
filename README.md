# Nextgen

## Backend

The backend lives in the `backend/` folder and is a Node.js + Express API with MongoDB.

### Setup

1. Install dependencies:
	 ```bash
	 cd backend
	 npm install
	 ```

2. Create your local environment file:
	 ```bash
	 cp .env.example .env
	 ```

3. Update the MongoDB connection and other environment values in `backend/.env`.

### Run the backend

- Development:
	```bash
	npm run dev
	```

- Production:
	```bash
	npm start
	```

The backend exposes endpoints such as:
- `GET /api/health`
- `GET /api/courses`
- `POST /api/inquiries`

### Environment variables

- `MONGODB_URI` — development MongoDB connection string
- `MONGODB_URI_PROD` — production MongoDB connection string
- `PORT` — backend port
- `NODE_ENV` — development or production
- `CORS_ORIGIN` — allowed frontend origin

For more backend details, see [`backend/README.md`](backend/README.md).