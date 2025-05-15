import { Router } from 'express';
import * as RecordService from '../services/records.service';
import * as ProjectService from '../services/projects.service';

const router = Router();
//create a record only if the project with certain id exists
router.post('/', (req, res) => {
	const { text, projectid } = req.body;

	if (!text || !projectid) {
		return res
			.status(400)
			.json({ error: 'text and projectid are required' });
	}

	//check if there exists a corresponding project
	const project = ProjectService.getProjectById(projectid);
	if (!project) {
		return res
			.status(400)
			.json({ error: 'Invalid projectid: project not found' });
	}

	const id = RecordService.createRecord(text, projectid);
	res.status(201).json({ id });
});

export default router;
