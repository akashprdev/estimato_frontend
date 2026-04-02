export function getPlayerId() {
  let id = localStorage.getItem('playerId');

  if (!id) {
    id = crypto.randomUUID();

    localStorage.setItem('playerId', id);
  }

  return id;
}

export const getPlayerName = () => {
  return localStorage.getItem('playerName');
};

export const setPlayerName = (name: string) => {
  localStorage.setItem('playerName', name.trim());
};
