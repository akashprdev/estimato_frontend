import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { VotingScreen } from '@/components/VotingScreen';
import { RevealScreen } from '@/components/RevealScreen';
import { Header } from '@/components/Header';
import { PokerSidebar } from '@/components/Sidebar';
import { useParams } from '@tanstack/react-router';
import { socket } from '@/utilities/socket';
import { getPlayerId, getPlayerName, setPlayerName } from '@/utilities/helper';
import { NameModal } from '@/components/NameModal';
import type { Participant } from '@/components/ParticipantCard';

interface Room {
  id: string;
  players: Participant[];
}

export default function Room() {
  const { roomId } = useParams({ from: '/room/$roomId' });
  const [room, setRoom] = useState<Room | null>(null);
  const [screen, setScreen] = useState<'vote' | 'reveal'>('vote');
  const [name, setName] = useState(getPlayerName());

  useEffect(() => {
    if (!name) {
      return;
    }

    const joinRoom = () => {
      socket.emit('join_room', {
        roomId,
        playerId: getPlayerId(),
        name: getPlayerName() ?? 'Anonymous',
      });
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.connect();

      socket.once('connect', joinRoom);
    }

    socket.on('room_update', (updatedRoom) => {
      console.log('room update', updatedRoom);

      setRoom(updatedRoom);
    });

    return () => {
      socket.off('room_update');
      socket.off('connect', joinRoom);
    };
  }, [roomId, name]);

  if (!name) {
    return (
      <NameModal
        open={!name}
        onSubmit={(value) => {
          setName(value);

          setPlayerName(value);
        }}
      />
    );
  }

  if (!room) return null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <PokerSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header showInviteButton />
        <AnimatePresence mode="wait">
          {screen === 'vote' ? (
            <VotingScreen
              participants={room.players}
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
