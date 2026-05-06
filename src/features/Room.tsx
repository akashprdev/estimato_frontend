import { useEffect, useState, useCallback } from 'react';
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

export interface RoomType {
  id: string;
  players: Participant[];
  revealed: boolean;
  finalStory: string | null;
  votes: Record<string, number> | null;
}

export default function Room() {
  const params = useParams({ from: '/_protected/$id' });
  const id = params?.id as string | undefined;

  const [room, setRoom] = useState<RoomType | null>(null);
  const [screen, setScreen] = useState<'vote' | 'reveal'>('vote');
  const [name, setName] = useState<string | null>(getPlayerName());
  const [loading, setLoading] = useState(true);

  // 🔹 Join room function
  const joinRoom = useCallback(() => {
    if (!id || !name) {
      console.warn('Missing id or name, cannot join');
      return;
    }

    const payload = {
      roomId: id,
      playerId: getPlayerId(),
      name,
    };

    socket.emit('join_room', payload);
  }, [id, name]);

  // 🔹 Socket lifecycle
  useEffect(() => {
    if (!id || !name) return;

    const handleConnect = () => {
      joinRoom();
    };

    const handleRoomUpdate = (updatedRoom: RoomType) => {
      setRoom(updatedRoom);
      setLoading(false);
    };

    const handleError = (err: unknown) => {
      console.error('❌ Socket error:', err);
    };

    if (!socket.connected) {
      socket.connect();
    } else {
      joinRoom();
    }

    socket.on('connect', handleConnect);
    socket.on('room_update', handleRoomUpdate);
    socket.on('connect_error', handleError);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('room_update', handleRoomUpdate);
      socket.off('connect_error', handleError);
    };
  }, [id, name, joinRoom]);

  // 🔹 Screen sync
  useEffect(() => {
    if (!room) return;
    setScreen(room.revealed ? 'reveal' : 'vote');
  }, [room]);

  const handleReVote = () => {
    if (!room) return;

    socket.emit('reset', { roomId: room.id });
    setScreen('vote');
  };

  if (!name) {
    return (
      <NameModal
        open
        onSubmit={(value) => {
          setName(value);
          setPlayerName(value);
        }}
      />
    );
  }

  if (!id) {
    return <p> Invalid room ID</p>;
  }

  if (loading) {
    return (
      <div style={{ padding: 20 }}>
        <p>⏳ Loading room...</p>
      </div>
    );
  }

  if (!room) {
    return <p>⚠️ Failed to load room (no data received)</p>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <PokerSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header showInviteButton />

        <AnimatePresence mode="wait">
          {screen === 'vote' ? (
            <VotingScreen
              key="vote"
              room={room}
              onReveal={() => setScreen('reveal')}
            />
          ) : (
            <RevealScreen key="reveal" room={room} onReVote={handleReVote} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
