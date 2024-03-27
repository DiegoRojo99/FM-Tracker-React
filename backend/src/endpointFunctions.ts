import { Request, Response } from 'express';
import db from './db';

export const addCompetition = (req: Request, res: Response) => {
  const { competitionName, countryId, competitionType } = req.body;

  if (!competitionName || !countryId || !competitionType) {
    return res.status(400).json({ error: 'Competition name, country ID, and competition type are required' });
  }

  // Check if competition type is valid
  if (competitionType !== 'league' && competitionType !== 'cup') {
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
};

export const addSave = (req: Request, res: Response) => {
    const { user_id, start_date, end_date, progress } = req.body;

    if (!user_id || !start_date || !end_date || progress === undefined) {
        return res.status(400).json({ error: 'User ID, start date, end date, and progress are required' });
    }

    const sql = 'INSERT INTO save (user_id, start_date, end_date, progress) VALUES (?, ?, ?, ?)';
    const values = [user_id, start_date, end_date, progress];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding save:', err);
            return res.status(500).json({ error: 'Error adding save' });
        }
        console.log('Save added successfully:', result.insertId);
        res.status(201).json({ id: result.insertId });
    });
};
export const addUser = (req: Request, res: Response,) => {
  const { username, email, uid } = req.body;

  if (!username || !email || !uid) {
    return res.status(400).json({ error: 'Username, email and UID are required' });
  } else {
    const sql = 'INSERT INTO user (username, email, firebase_uid) VALUES (?, ?, ?)';
    const values = [username, email, uid];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding user:', err);
        return res.status(500).json({ error: 'Error adding user' });
      } else {
        console.log('User added successfully:', result.insertId);
        res.status(201).json({ id: result.insertId });
      }
    });
  }
};

export const addTrophy = (req: Request, res: Response) => {
    const { trophyName, competitionId } = req.body;

    if (!trophyName || !competitionId) {
        return res.status(400).json({ error: 'Trophy name and competition ID are required' });
    }

    const sql = 'INSERT INTO trophy (name, competition_id) VALUES (?, ?)';
    const values = [trophyName, competitionId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting trophy:', err);
            return res.status(500).json({ error: 'Error inserting trophy' });
        }
        console.log('Trophy added successfully:', result.insertId);
        res.status(201).json({ id: result.insertId });
    });
};

export const addSaveTrophyRelation = (req: Request, res: Response) => {
    const { saveId, trophyId } = req.body;

    if (!saveId || !trophyId) {
        return res.status(400).json({ error: 'Save ID and trophy ID are required' });
    }

    const sql = 'INSERT INTO save_trophy_relation (save_id, trophy_id) VALUES (?, ?)';
    const values = [saveId, trophyId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting save-trophy relation:', err);
            return res.status(500).json({ error: 'Error inserting save-trophy relation' });
        }
        console.log('Save-trophy relation added successfully:', result.insertId);
        res.status(201).json({ id: result.insertId });
    });
};

export const addTeam = (req: Request, res: Response) => {
  const { teamName, countryId, image } = req.body;

  if (!teamName || !countryId) {
    return res.status(400).json({ error: 'Team name and country ID are required' });
  }

  const sql = 'INSERT INTO team (name, country_id) VALUES (?, ?)';
  const values = [teamName, countryId];

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error inserting team:', err);
          return res.status(500).json({ error: 'Error inserting team' });
      }
      console.log('Team added successfully:', result.insertId);
      res.status(201).json({ id: result.insertId });
  });
};

export function getCountries(req: Request, res: Response){
  db.query('SELECT * FROM country', (err, results) => {
    if (err) {
      console.error('Error retrieving countries:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
};

export function getCompetitions(req: Request, res: Response){
  db.query('SELECT * FROM competition', (err, results) => {
    if (err) {
      console.error('Error retrieving competitions:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
};

export function getGroupedCompetitions(req: Request, res: Response) {
  db.query(`
    SELECT 
      c.country_id, 
      c.name AS country_name,
      JSON_ARRAYAGG(JSON_OBJECT('competition_id', comp.competition_id, 'name', comp.name, 'type', comp.type)) AS competitions
    FROM 
      country c
    LEFT JOIN 
      competition comp ON c.country_id = comp.country_id
    GROUP BY 
      c.country_id, c.name
  `, (err, results) => {
    if (err) {
      console.error('Error retrieving grouped competitions:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Parse competitions column to convert the JSON string to an array of objects
    const groupedCompetitions = results.map((country: any) => {
      return {
        country_id: country.country_id,
        country_name: country.country_name,
        competitions: JSON.parse(country.competitions)
      };
    });

    res.json(groupedCompetitions);
  });
};


