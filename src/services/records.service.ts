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

export function getRecordById(id: string) {
	const result = db.query('SELECT * FROM reports WHERE id = @id', { id });
	return result[0];
}

export function getRecordsByProjectId(projectid: string) {
	return db.query('SELECT * FROM reports WHERE projectid = @projectid', {
		projectid,
	});
}

export function updateRecord(id: string, text?: string, projectid?: string) {
	return db.run(
		`UPDATE reports
     SET text = @text,
         projectid = @projectid
     WHERE id = @id`,
		{ id, text, projectid },
	).changes;
}

export function deleteRecord(id: string) {
	return db.run('DELETE FROM reports WHERE id = @id', { id }).changes;
}

export function findReportsByWordFrequency(word: string, threshold: number) {
	const reports = db.query('SELECT * FROM reports') as { text: string }[];
	const pattern = new RegExp(`\\b${escapeRegex(word)}\\b`, 'gi');

	return reports.filter((report: { text: string }) => {
		const matches = report.text.match(pattern);
		return matches && matches.length >= threshold;
	});
}

function escapeRegex(str: string) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
