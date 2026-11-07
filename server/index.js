require('dotenv').config();
const express = require('express'), cookieParser = require('cookie-parser'), cors = require('cors');
const connectDB = require('./Confiq/Db');
const app = express();

app.set('trust proxy', 1); // Back4app is behind a proxy (needed for secure cookies)

app.use(cors({
  origin: ['https://language-web-umar-bhatti.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
// NOTE: app.options('*') removed. It crashes Express 5, and cors() already handles preflight.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', require('./Router/User.router'));
app.use('/api/course', require('./Router/Course.router'));
app.use('/api/lesson', require('./Router/Lesson.router'));
app.use('/api/vocabulary', require('./Router/Vocabulary.router'));
app.use('/api/progress', require('./Router/Progress.router'));
app.get('/api/health', (_, res) => res.json({ status: 'ok', name: 'LingoPath API' }));
app.get('/', (_, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 5000;
connectDB().then(() => app.listen(port, '0.0.0.0', () => console.log(`LingoPath API running on ${port}`)));
