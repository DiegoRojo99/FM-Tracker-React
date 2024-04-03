import { useState } from 'react';
import './Challenges.css';

export default function ChallengesPage(){

  const [selectedChallenge, setSelectedChallenge] = useState(false);
  const challenges = [
    {
      id: 1,
      name: 'English Conquest',
      description: 'Win all available trophies in England.',
      trophiesNeeded: [
        {
          id: 1,
          name: 'Premier League Champion',
          description: 'Win the Premier League title.',
          competition: 'Premier League',
          country: 'England'
        },
        {
          id: 2,
          name: 'FA Cup Winner',
          description: 'Win the FA Cup.',
          competition: 'FA Cup',
          country: 'England'
        },
        // Add more trophies as needed
      ]
    },
    {
      id: 2,
      name: 'Red Bull Reign',
      description: 'Win the league title with every Red Bull team.',
      trophiesNeeded: [
        {
          id: 3,
          name: 'Red Bull Salzburg Champion',
          description: 'Win the league title with Red Bull Salzburg.',
          competition: 'Austrian Bundesliga',
          country: 'Austria'
        },
        {
          id: 4,
          name: 'RB Leipzig Champion',
          description: 'Win the league title with RB Leipzig.',
          competition: 'Bundesliga',
          country: 'Germany'
        },
        // Add more trophies as needed
      ]
    },
    {
      id: 3,
      name: 'The Invincible Challenge',
      description: 'Go an entire season unbeaten.',
      trophiesNeeded: [
        {
          id: 5,
          name: 'Invincible Season',
          description: 'Finish a season without losing any matches.',
          competition: 'Any League',
          country: 'Any Country'
        }
      ]
    }
  ];

  function selectChallenge(challenge){
    setSelectedChallenge(challenge);
  }
  
  return (
    <>
    <div className='selected-challenge'>
      {selectedChallenge ?
      <div className='challenge-info'>
        <h2>{selectedChallenge.name}</h2>
      </div> 
      : <></>}
    </div>
    <div className='challenge-list'>
      {challenges.map(challenge => <ChallengeItem challenge={challenge} selectChallenge={selectChallenge} />)}
    </div>
    </>
  )
}

function ChallengeItem({challenge, selectChallenge}){
  return (
    <div className="challenge-card" onClick={() => selectChallenge(challenge)}>
      <h3>{challenge.name}</h3>
      <p>{challenge.description}</p>
      <h4>Trophies Needed:</h4>
      <ul>
        {challenge.trophiesNeeded.map(trophy => (
          <li key={trophy.id}>
            <strong>{trophy.name}</strong> - {trophy.description}
          </li>
        ))}
      </ul>
    </div>
  );
};