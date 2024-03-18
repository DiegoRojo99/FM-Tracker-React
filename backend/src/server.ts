import express, { Request, Response } from 'express';
import cors from 'cors';
import db from './db';

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

app.post('/api/competitions', (req, res) => {
  const { competitionName, countryId, competitionType } = req.body;

  if (!competitionName || !countryId || !competitionType) {
    return res.status(400).json({ error: 'Competition name, country ID, and competition type are required' });
  }

  // Check if competition type is valid
  if (competitionType !== 'competition' && competitionType !== 'cup') {
    return res.status(400).json({ error: 'Invalid competition type' });
  }

  const sql = 'INSERT INTO competition (name, country_id, type) VALUES (?, ?, ?)';
  const values = [competitionName, countryId, competitionType];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting competition:', err);
      return res.status(500).json({ error: 'Error inserting competition' });
    }
    console.log('Competition added successfully:', result.insertId);
    res.status(201).json({ id: result.insertId });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
