import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import licaoRoutes from './routes/licaoRoutes.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, '../public');

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', publicDirectory);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'AeroTalk — English for Airports' });
});

app.use(express.static(publicDirectory));

// Rotas da API
app.use('/api', licaoRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});