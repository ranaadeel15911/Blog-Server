import express from 'express';
import connectToDb from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/blog.js';
import path from 'path';
const app = express();
const PORT = 'https://blog-server-eosin.vercel.app';

connectToDb();

// Use CORS middleware with proper configuration
app.use(cors({
    origin: ["https://blog-frontend-psi-six.vercel.app", "http://localhost:3000"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
}));

app.use(express.json());

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get("/", (req, resp) => {
    resp.send("API is running ...");
});

app.use('/api/v1', authRoutes);

app.listen(PORT, () => {
    console.log(`API is running on port ${PORT}`);
});
