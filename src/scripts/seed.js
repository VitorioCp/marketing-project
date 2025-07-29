import { openDb } from '../lib/db.js';

async function setup() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      telefone TEXT,
      email TEXT,
      etapa TEXT
    )
  `);
  console.log('Tabela criada!');
  await db.close();
}

setup();