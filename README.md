# Chat App

A real-time chat application built with Next.js for the frontend and Node.js with Express for the backend. The app supports user authentication, real-time messaging, and file uploads, utilizing MongoDB and Cloudinary for storage.

## Features
- Real-time messaging
- User authentication
- Group chatting
- Responsive UI
- Cloudinary integration for media storage
- MongoDB as the database

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 16.x)
- **MongoDB** (Local or Cloud-based e.g., MongoDB Atlas)
- **Cloudinary Account** (for image storage)

### Clone the Repository
```sh
git clone https://github.com/Pratoosh-18/Chat-App.git
cd Chat-App
```

---

## Backend Setup

### Install Dependencies
```sh
cd chat-backend
npm install
```

### Environment Variables
Create a `.env` file inside the `chat-backend` folder using `.env.sample` as a template:
```sh
cp .env.sample .env
```
Update the `.env` file with your MongoDB and Cloudinary credentials.

### Run the Backend Server
```sh
npm run dev
```
The backend will start at `http://localhost:8000`.

---

## Frontend Setup

### Install Dependencies
```sh
cd ../chat-frontend
npm install
```

### Environment Variables
Create a `.env.local` file inside the `chat-frontend` folder using `.env.sample` as a template:
```sh
cp .env.sample .env.local
```
Update the `.env.local` file with the required credentials.

### Run the Frontend Server
```sh
npm run dev
```
The frontend will start at `http://localhost:3000`.

---

## Folder Structure
```
Chat-App/
│── chat-backend/      # Node.js backend
│── chat-frontend/     # Next.js frontendfiles
│── .gitignore         # Git ignored files
│── .prettierrc        # Code formatting rules
│── .editorconfig      # Editor configurations
│── README.md          # Documentation
```

---

## API Documentation
| Endpoint              | Method | Description            |
|----------------------|--------|------------------------|
| `/api/v1/user`       | POST   | Register/Login user    |
| `/api/v1/chat`       | GET    | Fetch chat messages    |

For detailed API routes, check the `chat-backend/src/routes` folder.

---

## Deployment
### Backend
- Deploy using **Vercel, Render, or DigitalOcean**.
- Ensure the `.env` variables are correctly set in the hosting platform.

### Frontend
- Deploy the Next.js app using **Vercel or Netlify**.
- Ensure environment variables are set in the hosting settings.

---

## License
This project is licensed under the MIT License.

---

## Contributors
Feel free to open a PR or issue for improvements!

---

## Contact
For any queries, reach out to [Pratoosh](https://github.com/Pratoosh-18).