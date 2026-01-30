import { Module, Global } from '@nestjs/common';

import Database = require('better-sqlite3');

const dbProvider = {
    provide: 'DATABASE_CONNECTION',
    useFactory: () => {
        return new Database('./db.sqlite', { verbose: console.log });
    },
};

@Global()
@Module({
    providers: [dbProvider],
    exports: [dbProvider],
})
export class DatabaseModule { }