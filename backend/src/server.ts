import express, { Request, Response } from 'express';
import cors from 'cors';
import db from './db';
import { addCompetition, addSave, addSaveTrophyRelation, addTeam, addTrophy, addUser, getCountries, getCompetitions, getGroupedCompetitions } from './endpointFunctions';
import { loginEmail, registerEmail } from './auth';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Define routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Endpoint to get all countries
app.get('/api/countries', getCountries);
app.get('/api/competitions', getCompetitions);
app.get('/api/competitions/group', getGroupedCompetitions);

app.post('/api/competitions', addCompetition);
app.post('/api/saves', addSave);
app.post('/api/trophies', addTrophy);
app.post('/api/saves-trophies', addSaveTrophyRelation);
app.post('/api/teams', addTeam);
app.post('/firebase/register/email', registerEmail);
app.post('/firebase/login/email', loginEmail);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
