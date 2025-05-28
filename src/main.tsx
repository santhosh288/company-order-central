
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeLocalStorage } from './utils/localStorage'

// Initialize localStorage with mock data on app startup
initializeLocalStorage();

createRoot(document.getElementById("root")!).render(<App />);
