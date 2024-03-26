import { Request, Response } from 'express';
import db from './db';
import { registerEmailFirebase } from './firebase';

export function registerEmail(req: Request, res: Response){
  const body = req.body;
  const registerResult = registerEmailFirebase(body.email, body.password);
  return registerResult;
};

