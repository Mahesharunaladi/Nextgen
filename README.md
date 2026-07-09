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

## Frontend

The frontend lives in the `frontend/` folder and is built with Vite + React.

### Setup

1. Install dependencies:
	```bash
	cd frontend
	npm install
	```

2. Create or update the frontend environment file:
	```bash
	cp .env.example .env
	```

3. Set the API URL in `frontend/.env`:
	```bash
	VITE_API_BASE_URL=http://localhost:5055/api
	```

### Run the frontend

- Development:
  ```bash
  npm run dev
  ```

- Production build:
  ```bash
  npm run build
  ```

## Render Deployment

For production on Render:

- **Backend service root directory:** `backend`
- **Frontend service root directory:** `frontend`
- **Backend start command:** `npm start`
- **Frontend build command:** `npm install && npm run build`
- **Frontend publish directory:** `dist`

Required environment variables:

- `MONGODB_URI_PROD` — production MongoDB Atlas connection string
- `NODE_ENV=production`
- `CORS_ORIGIN=https://your-frontend.onrender.com`
- `VITE_API_BASE_URL=https://your-backend.onrender.com/api`

If you use the included `render.yaml`, Render can read these service settings automatically.