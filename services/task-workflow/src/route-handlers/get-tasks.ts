import { Request, Response } from 'express';

export const getTasks = (req: Request, res: Response) => {
    res.send('hello from tasks');
};
