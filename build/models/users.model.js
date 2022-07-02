"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../database/index"));
const hashPassword_middleware_1 = __importDefault(require("../middleware/hashPassword.middleware"));
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class userModel {
    //create user
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `INSERT INTO users (user_name, first_name, last_name, password)
        VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, first_name, last_name`;
                const result = yield connection.query(sql, [
                    user.user_name,
                    user.first_name,
                    user.last_name,
                    (0, hashPassword_middleware_1.default)(user.password)
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to create your user_name:(${user.user_name}) because:  ${error.message}`);
            }
        });
    }
    //get all users
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `SELECT  user_id, user_name, first_name, last_name FROM users`;
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`unable to get all users from the database`);
            }
        });
    }
    //get one user
    getOneUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `SELECT  user_id, user_name, first_name, last_name FROM users WHERE user_id=$1`;
                const result = yield connection.query(sql, [user_id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to get the user from the database because ${error.message}`);
            }
        });
    }
    //update one user
    updateOneUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `UPDATE users set ( user_name, first_name, last_name, password) = 
      ($1,$2,$3,$4) WHERE user_id=$5  RETURNING user_id, user_name, first_name, last_name`;
                const result = yield connection.query(sql, [
                    user.user_name,
                    user.first_name,
                    user.last_name,
                    (0, hashPassword_middleware_1.default)(user.password),
                    user.user_id
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to update user from the database because ${error.message}`);
            }
        });
    }
    //delete one user
    deleteOneUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `DELETE FROM users WHERE user_id=$1 RETURNING user_id, user_name, first_name, last_name`;
                const result = yield connection.query(sql, [user_id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not delte user baeause : ${error.message}`);
            }
        });
    }
    //authenticate one user
    authenticateOneUser(user_name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `SELECT password FROM users WHERE user_name=$1`;
                const result = yield connection.query(sql, [user_name]);
                connection.release();
                if (result.rows.length) {
                    const { password: hashPassword } = result.rows[0];
                    const isValid = bcrypt_1.default.compareSync(`${password}${config_1.default.pepper}`, hashPassword);
                    if (isValid) {
                        const connection = yield index_1.default.connect();
                        const dataUser = yield connection.query(`
          SELECT user_id, user_name, first_name, last_name FROM users where user_name=$1`, [user_name]);
                        connection.release();
                        return dataUser.rows[0];
                    }
                }
                return null;
            }
            catch (error) {
                throw new Error(`Can not authenticate user baeause : ${error.message}`);
            }
        });
    }
}
exports.default = userModel;
