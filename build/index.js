"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { port, pgHost, pgPort, pgDb, pgUser, pgPassword } = process.env;
const app = (0, express_1.default)();
app.use((0, express_1.default)());
app.get('/', (req, res) => {
    res.json({
        message: "'Hello from Server Side Get Request'"
    });
});
app.listen(port, () => {
    console.log(`Server is working on port ${port}`);
});
const pool = new pg_1.Pool({
    user: pgUser,
    host: pgHost,
    password: pgPassword,
    database: pgDb,
    port: parseInt(pgPort, 10)
});
pool.connect().then((client) => {
    return client.query('SELECT NOW()').then((res) => {
        console.log(res.rows);
        client.release();
    });
});
exports.default = app;
