# ForeverDocs Setup Guide

## System Requirements

- Node.js 18.0 or higher
- npm 9.0 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)
- 4GB RAM minimum
- 1GB free disk space

## Installation Steps

### 1. Create Project Directory
```bash
mkdir foreverdocs
cd foreverdocs
```

### 2. Backend Setup
```bash
# Create backend structure
mkdir -p backend/utils

# Copy backend files (from the zip package above)
# - backend/package.json
# - backend/server.js  
# - backend/utils/crest.js

cd backend
npm install
```

### 3. Frontend Setup
```bash
# Create frontend structure
mkdir -p frontend/src/components frontend/src/pages

# Copy all frontend files (from the zip package above)

cd frontend
npm install
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
You should see: `🏛️ ForeverDocs backend running on port 3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
You should see: `Local: http://localhost:5173/`

### 5. Verify Installation

1. Open http://localhost:5173 in your browser
2. You should see the ForeverDocs homepage
3. Click "Try the Demo" to test file upload functionality
4. Upload a PDF or image file to generate a Digital Family Crest

## Troubleshooting

### Port Conflicts
If ports 3000 or 5173 are in use:

**Backend:**
```bash
PORT=3001 npm start
```

**Frontend:** Update `vite.config.ts`:
```ts
export default defineConfig({
  plugins: [react()],
  server: { port: 5174 }
})
```

### CORS Issues
Ensure backend CORS is configured for your frontend URL in `server.js`:
```js
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  // ... other options
}))
```

### File Upload Issues
- Ensure backend is running before testing uploads
- Check browser console for error messages
- Verify file types are supported (PDF, JPG, PNG, etc.)

### Build for Production

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## Development Tips

1. **Hot Reload**: Both frontend and backend support hot reloading during development
2. **API Testing**: Use http://localhost:3000/api/health to verify backend is running
3. **Browser DevTools**: Check Network tab for API requests/responses
4. **Mobile Testing**: The app is fully responsive - test on different screen sizes

## Environment Variables

Create `.env` files for custom configuration:

**Backend `.env`:**
```
PORT=3000
NODE_ENV=development
```

**Frontend `.env`:**
```
VITE_API_URL=http://localhost:3000
```

The application should now be fully functional for development and demonstration!
