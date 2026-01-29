import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import { connectDB } from './configs/db';    
import session from 'express-session';
import MongoStore from 'connect-mongo';
import AuthRouter from './routes/AuthRoutes';
import ThumbnailRouter from './routes/ThumbnailRoutes';
import UserRouter from './routes/UserRoutes';

declare module 'express-session' {
  interface SessionData {
    isLoggedIn: boolean; // You can replace 'any' with your user type
    userId: string;
  }
}

// Connect to Database
connectDB();

const app = express();

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 100 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/'
   }, // cookie will expire in 7 days // Set to true if using HTTPS
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI as string,
    collectionName: 'sessions'
   })
}));


app.use(express.json()); // Middleware to parse JSON bodies for all requests

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', "https://autothumb-ai-platform.vercel.app", "https://autothumb-server.vercel.app"],
    credentials: true,
})); // Enable CORS for all routes

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the AI Thumbnail API' });
});

app.use('/api/auth', AuthRouter);

app.use('/api/thumbnails', ThumbnailRouter);

app.use('/api/user', UserRouter);

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});
 