import { Router } from 'express';
import * as ProjectService from '../services/projects.service';

const router = Router();
//create a project
router.post('/', (req, res) => {
	const { name, description } = req.body;
	if (!name) return res.status(400).json({ error: 'Name is required' });

	const id = ProjectService.createProject(name, description);
	res.status(201).json({ id });
});

//read all projects
router.get('/', (req, res) => {
	const projects = ProjectService.getAllProjects();
	res.json(projects);
});

//read a certain project by id (primary key)
router.get('/:id', (req, res) => {
	const id = req.params.id;
	const project = ProjectService.getProjectById(id);

	if (!project) {
		return res.status(404).json({ error: 'Project not found' });
	}

	res.json(project);
});

//update a certain project by id
router.put('/:id', (req, res) => {
	const id = req.params.id;
	const { name, description } = req.body;

	const updated = ProjectService.updateProject(id, name, description);

	if (updated === 0) {
		return res
			.status(404)
			.json({ error: 'Project not found or no changes applied' });
	}

	res.json({ message: 'Project updated successfully' });
});

export default router;
