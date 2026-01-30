const Database = require('better-sqlite3');

// ⚠️ IMPORTANTE: Confira se o nome do arquivo aqui é o mesmo usado no seu app
// Se no seu app.module.ts estiver 'app.db', mude aqui para 'app.db' também.
const db = new Database('db.sqlite', { verbose: console.log });

const createTablesSql = `
  -- 1. Criar Tabela Trips
  CREATE TABLE IF NOT EXISTS trips (
    id INTEGER PRIMARY KEY, 
    name TEXT NOT NULL, 
    start_date TEXT
  );

  -- 2. Criar Tabela Users (Membros)
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY, 
    name TEXT NOT NULL,
    email TEXT
  );

  -- 3. Criar Tabela Categories
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY, 
    name TEXT NOT NULL, 
    color TEXT
  );

  -- 4. Criar Tabela Expenses
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    description TEXT,
    trip_id INTEGER,
    category_id INTEGER,
    paid_by_id INTEGER,
    FOREIGN KEY(trip_id) REFERENCES trips(id),
    FOREIGN KEY(category_id) REFERENCES categories(id),
    FOREIGN KEY(paid_by_id) REFERENCES users(id)
  );
`;

const insertDataSql = `
  -- Limpar dados antigos para não duplicar
  DELETE FROM expenses;
  DELETE FROM categories;
  DELETE FROM users;
  DELETE FROM trips;

  -- Inserir Trip
  INSERT INTO trips (id, name, start_date) VALUES (1, 'Viagem Teste', '2025-01-01');

  -- Inserir Users
  INSERT INTO users (id, name) VALUES (1, 'Você');
  INSERT INTO users (id, name) VALUES (2, 'Amigo');

  -- Inserir Categories
  INSERT INTO categories (id, name, color) VALUES (1, 'Comida', '#FF5733');
  INSERT INTO categories (id, name, color) VALUES (2, 'Transporte', '#33FF57');
  INSERT INTO categories (id, name, color) VALUES (3, 'Hospedagem', '#3357FF');

  -- Inserir Expenses
  INSERT INTO expenses (amount, date, description, trip_id, category_id, paid_by_id) 
  VALUES (120.50, '2025-01-20', 'Almoço Restaurante', 1, 1, 1);

  INSERT INTO expenses (amount, date, description, trip_id, category_id, paid_by_id) 
  VALUES (45.00, '2025-01-20', 'Uber pro Hotel', 1, 2, 2);

  INSERT INTO expenses (amount, date, description, trip_id, category_id, paid_by_id) 
  VALUES (300.00, '2025-01-21', 'Hotel Diária', 1, 3, 1);

  INSERT INTO expenses (amount, date, description, trip_id, category_id, paid_by_id) 
  VALUES (80.00, '2025-01-22', 'Mercado', 1, 1, 2);
`;

try {
    // Executa a criação das tabelas
    db.exec(createTablesSql);
    console.log('🏗️  Tabelas criadas (ou já existiam).');

    // Executa a inserção dos dados
    db.exec(insertDataSql);
    console.log('✅ Dados inseridos com sucesso!');
} catch (error) {
    console.error('❌ Erro ao rodar seed:', error.message);
}