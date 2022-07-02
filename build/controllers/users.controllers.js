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
exports.authenticateOneUser = exports.deleteOneUser = exports.updateOneUser = exports.getOneUser = exports.getAllUsers = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = __importDefault(require("../models/users.model"));
const config_1 = __importDefault(require("../config"));
const UserModel = new users_model_1.default();
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel.createUser(req.body);
        res.json({
            data: { user },
            message: 'User created successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel.getAllUsers();
        res.json({
            data: { users },
            message: 'All Users were retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel.getOneUser(req.params.user_id);
        res.json({
            data: { user },
            meesage: 'user retrieved successfully '
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOneUser = getOneUser;
const updateOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel.updateOneUser(req.body);
        res.json({
            data: { user },
            message: 'user updated successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOneUser = updateOneUser;
const deleteOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel.deleteOneUser(req.params.user_id);
        res.json({
            data: Object.assign({}, user),
            message: 'user is deleted successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOneUser = deleteOneUser;
const authenticateOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, password } = req.body;
        const user = yield UserModel.authenticateOneUser(user_name, password);
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.token);
        if (!user) {
            return res.status(401).json({
                message: 'user name and password not match'
            });
        }
        res.json({
            data: Object.assign(Object.assign({}, user), { token }),
            message: 'user is authenticated successfully and the token is also provided '
        });
    }
    catch (error) {
        next(error);
    }
});
exports.authenticateOneUser = authenticateOneUser;
