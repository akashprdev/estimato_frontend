import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { VotingScreen } from '@/components/VotingScreen';
import { RevealScreen } from '@/components/RevealScreen';
import { PARTICIPANTS } from '@/components/data';
import { Header } from '@/components/Header';
import { PokerSidebar } from '@/components/Sidebar';

export default function Room() {
  const [screen, setScreen] = useState<'vote' | 'reveal'>('vote');

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <PokerSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header showInviteButton />
        <AnimatePresence mode="wait">
          {screen === 'vote' ? (
            <VotingScreen
              participants={PARTICIPANTS}
              key="vote"
              onReveal={() => setScreen('reveal')}
            />
          ) : (
            <RevealScreen key="reveal" onReVote={() => setScreen('vote')} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
