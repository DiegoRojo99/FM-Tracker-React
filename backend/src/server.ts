import express, { Request, Response } from 'express';
import cors from 'cors';
import db from './db';
import { addCompetition, addSave, addSaveTrophyRelation, addTeam, addTrophy, addUser } from './endpointFunctions';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Define routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Endpoint to get all countries
app.get('/api/countries', (req, res) => {
  db.query('SELECT * FROM country', (err, results) => {
    if (err) {
      console.error('Error retrieving countries:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/competitions', addCompetition);
app.post('/api/saves', addSave);
app.post('/api/users', addUser);
app.post('/api/trophies', addTrophy);
app.post('/api/saves-trophies', addSaveTrophyRelation);
app.post('/api/teams', addTeam);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
