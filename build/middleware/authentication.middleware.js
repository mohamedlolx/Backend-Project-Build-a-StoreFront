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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const Validation = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auth = req.get('Authorization');
        if (auth) {
            const token = auth.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.token);
            if (decoded) {
                next();
            }
            else {
                throw new Error('Loging Error: Please Try Again');
            }
        }
        else {
            throw new Error('Loging Error: Please Try Again');
        }
    }
    catch (error) {
        throw new Error('Loging Error: Please Try Again');
    }
});
exports.default = Validation;
