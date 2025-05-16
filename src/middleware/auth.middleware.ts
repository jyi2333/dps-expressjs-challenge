import { Request, Response, NextFunction } from 'express';

const AUTH_TOKEN = 'Password123';

export function authenticateToken(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = req.headers['authorization'];

	if (token !== AUTH_TOKEN) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	next();
}
