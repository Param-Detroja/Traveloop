# ✈️ Traveloop - Elite Travel Planner

Welcome to Traveloop! This is a professional-grade travel planning application built with the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS.

## 📁 Project Structure

```text
traveloop/
├── src/                   # React Frontend (Vite)
├── server/                # Node.js + Express (Backend)
│   ├── routes/            # API endpoints
│   ├── controllers/       # Logic for endpoints
│   ├── models/            # Database schemas
│   ├── middleware/        # Security & Auth
│   ├── config/            # Connection settings
│   └── .env               # Private settings
├── public/                # Static assets
├── package.json           # Frontend dependencies
└── README.md              # Project manual
```

## 🚀 Setup Instructions

### 1. Backend Setup
Navigate to the `server` folder and install dependencies:
```bash
cd server
npm install
```
Create your `.env` file from the template:
```bash
cp .env.example .env
```
*Note: Update the `MONGODB_URI` in `.env` with your actual MongoDB connection string.*

### 2. Frontend Setup
In the main project folder, install dependencies:
```bash
npm install
```

### 3. Running the Project
You will need two terminals running:

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

## 🌟 Core Features
- **Elite Profiles**: Manage your traveler identity.
- **Trip Portfolio**: Build and organize multi-city expeditions.
- **Packing Hub**: Never forget an item with our inventory manager.
- **Memory Archive**: Archive your trip notes and journals.
- **Public Share**: Share read-only versions of your itineraries.
