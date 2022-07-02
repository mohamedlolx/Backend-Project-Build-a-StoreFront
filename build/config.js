"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { port, nodeEnv, pgHost, pgPort, pgDb, pgDb_test, pgUser, pgPassword, saltRound, pepperHash, tokenSecret } = process.env;
exports.default = {
    port: port,
    host: pgHost,
    dbport: pgPort,
    database: nodeEnv === 'dev' ? pgDb : pgDb_test,
    user: pgUser,
    password: pgPassword,
    salt: saltRound,
    pepper: pepperHash,
    token: tokenSecret
};
