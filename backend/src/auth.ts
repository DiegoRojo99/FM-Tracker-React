import { Request, Response } from 'express';
import { loginEmailFirebase, registerEmailFirebase } from './firebase';
import { addUser } from './endpointFunctions';

export async function registerEmail(req: Request, res: Response) {
  const body = req.body;
  const registerResult = await registerEmailFirebase(body.email, body.password);
  
  if (!registerResult.uid) {
    return res.status(400).json(registerResult);
  } else {
    addUser(req, res, registerResult.uid); // Pass UID obtained from Firebase to addUser
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

