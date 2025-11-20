import { useState } from 'react';
import CafeInfo from '../cafe-info/CafeInfo';
import VoteOptions from '../vote-option/VoteOptions';
import VoteStats from '../vote-status/VoteStats';
import Notification from '../notification/Notification';
import type { Votes, VoteType } from '../../types/votes';

import css from './App.module.css';

export default function App() {
  const [votes, setVotes] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });

  function handleVote(type: VoteType): void {
    setVotes({
      ...votes,
      [type]: votes[type] + 1,
    });
  }

  function resetVotes(): void {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  }

  const totalVotes: number = votes.good + votes.neutral + votes.bad;
  const positiveRate: number = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes ? true : false}
      />
      {totalVotes ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
