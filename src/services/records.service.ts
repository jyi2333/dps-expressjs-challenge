import db from './db.service';
import { v4 as uuidv4 } from 'uuid';

export function createRecord(text: string, projectid: string) {
	const id = uuidv4();

	db.run(
		'INSERT INTO reports (id, text, projectid) VALUES (@id, @text, @projectid)',
		{ id, text, projectid },
	);

	return id;
}
