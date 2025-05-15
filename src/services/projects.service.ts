import db from './db.service';
import { v4 as uuidv4 } from 'uuid';

export function createProject(name: string, description?: string) {
	const id = uuidv4();
	db.run(
		'INSERT INTO projects (id, name, description) VALUES (@id, @name, @description)',
		{ id, name, description },
	);
	return id;
}

export function getAllProjects() {
	return db.query('SELECT * FROM projects');
}

export function getProjectById(id: string) {
	const result = db.query('SELECT * FROM projects WHERE id = @id', { id });
	return result[0];
}
