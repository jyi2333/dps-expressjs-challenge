import { Router } from 'express';
import * as ProjectService from '../services/projects.service';

const router = Router();
router.post('/', (req, res) => {
	const { name, description } = req.body;
	if (!name) return res.status(400).json({ error: 'Name is required' });

	const id = ProjectService.createProject(name, description);
	res.status(201).json({ id });
});
export default router;
