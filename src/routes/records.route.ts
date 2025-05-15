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

//read a record by id
router.get('/:id', (req, res) => {
	const id = req.params.id;
	const report = RecordService.getRecordById(id);

	if (!report) {
		return res.status(404).json({ error: 'Report not found' });
	}

	res.json(report);
});

//update a record by record id, when the corresponding project exists
router.put('/:id', (req, res) => {
	const id = req.params.id;
	const { text, projectid } = req.body;

	if (!text && !projectid) {
		return res.status(400).json({
			error: 'At least one field (text or projectid) is required',
		});
	}

	if (projectid) {
		const project = ProjectService.getProjectById(projectid);
		if (!project) {
			return res
				.status(400)
				.json({ error: 'Invalid projectid: project not found' });
		}
	}

	const updated = RecordService.updateRecord(id, text, projectid);

	if (updated === 0) {
		return res
			.status(404)
			.json({ error: 'Report not found or no change applied' });
	}

	res.json({ message: 'Report updated successfully' });
});

//delete a record by id
router.delete('/:id', (req, res) => {
	const id = req.params.id;
	const deleted = RecordService.deleteRecord(id);

	if (deleted === 0) {
		return res.status(404).json({ error: 'Report not found' });
	}

	res.json({ message: 'Report deleted successfully' });
});

export default router;
