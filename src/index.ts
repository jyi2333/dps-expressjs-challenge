import express, { Express } from 'express';
import dotenv from 'dotenv';
import { authenticateToken } from './middleware/auth.middleware';
import projectRoutes from './routes/projects.route';
import recordRoutes from './routes/records.route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(authenticateToken);
app.use('/projects', projectRoutes);
app.use('/records', recordRoutes);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
