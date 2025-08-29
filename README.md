# ForeverDocs - Protecting Black Family Legacies

ForeverDocs helps families secure critical documents—wills, deeds, insurance policies—by creating tamper-evident fingerprints and beautiful Digital Family Crests without exposing private information.

## 🌟 Key Features

- **Privacy First**: Documents never leave your device
- **Digital Family Crests**: Beautiful, unique crests proving document existence
- **Blockchain Verification**: Tamper-proof digital records
- **Community Rooted**: Built for Black families and community organizations
- **Mobile Responsive**: Works on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd foreverdocs
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
   Backend runs on http://localhost:3000

2. In a new terminal, start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on http://localhost:5173

3. Open http://localhost:5173 in your browser

## 🏗️ Tech Stack

### Backend
- Node.js with Express
- CORS for cross-origin requests
- Nanoid for unique IDs
- Custom SVG generation

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Vite for build tooling

## 📁 Project Structure

```
foreverdocs/
├── backend/           # Express.js API server
│   ├── server.js     # Main server file
│   └── utils/        # Utility functions
├── frontend/         # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/      # Page components
│   │   └── styles.css  # Global styles
│   └── public/       # Static assets
└── README.md
```

## 🔒 Privacy & Security

- **Client-side hashing**: Documents are hashed locally using SHA-256
- **Zero knowledge**: Only document fingerprints are transmitted
- **No data storage**: We don't store actual documents or PII
- **Blockchain-ready**: Prepared for real blockchain integration

## 🤝 Contributing

This is a community-focused project. We welcome contributions from:
- Developers interested in social impact
- Community organizers
- Legal professionals
- UX/UI designers

## 📞 Support

For questions or support, please contact the ForeverDocs team.

## 📄 License

This project is licensed under the MIT License.
