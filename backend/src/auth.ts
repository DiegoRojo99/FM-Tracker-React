import { Request, Response } from 'express';
import { loginEmailFirebase, registerEmailFirebase } from './firebase';

export async function registerEmail(req: Request, res: Response){
  const body = req.body;
  const registerResult = await registerEmailFirebase(body.email, body.password);
  if(!registerResult.uid){
    console.log(registerResult)
    res.status(400).send(registerResult);
  }
  else{
    res.status(201).json(registerResult);
  }
};

export async function loginEmail(req: Request, res: Response){
  const body = req.body;
  const registerResult = await loginEmailFirebase(body.email, body.password);
  if(!registerResult.uid){
    console.log(registerResult)
    res.status(400).send(registerResult);
  }
  else{
    res.status(201).json(registerResult);
  }
};

