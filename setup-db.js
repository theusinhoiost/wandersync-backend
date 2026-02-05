const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Nome do arquivo do banco
const dbPath = path.join(process.cwd(), 'wandersync.db');
const db = new Database(dbPath);

// Ler o arquivo SQL
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

try {
    console.log('Criando tabelas');
    db.exec(schema);
    console.log('Banco de dados criado/atualizado');
} catch (error) {
    console.error(' Erro ao criar o banco:', error);
}

db.close();