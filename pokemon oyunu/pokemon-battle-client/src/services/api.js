const API_BASE = 'http://localhost:3000/api';

export async function getAllPokemons() {
  const res = await fetch(`${API_BASE}/pokemons`);
  return await res.json();
}

export async function getPokemonById(id) {
  const res = await fetch(`${API_BASE}/pokemons/${id}`);
  return await res.json();
}

export async function getBattleHistory() {
  const res = await fetch(`${API_BASE}/battle-history`);
  return await res.json();
}

export async function postBattleLog(log) {
  const res = await fetch(`${API_BASE}/battle-log`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(log),
  });
  return await res.json();
}
