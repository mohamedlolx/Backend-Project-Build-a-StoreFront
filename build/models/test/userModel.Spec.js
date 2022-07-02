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
const users_model_1 = __importDefault(require("../users.model"));
const index_1 = __importDefault(require("../../database/index"));
const UserModel = new users_model_1.default();
describe('UserModel Unit Testing', () => {
    describe('Testing the existince of the methods first', () => {
        it('should have Create one user methode', () => {
            expect(UserModel.createUser).toBeDefined();
        });
        it('should have Get all users methode', () => {
            expect(UserModel.getAllUsers).toBeDefined();
        });
        it('should have Get one user methode', () => {
            expect(UserModel.getOneUser).toBeDefined();
        });
        it('should have update one user methode', () => {
            expect(UserModel.updateOneUser).toBeDefined();
        });
        it('should have delete user methode', () => {
            expect(UserModel.deleteOneUser).toBeDefined();
        });
        it('should have authenticate one user methode', () => {
            expect(UserModel.authenticateOneUser).toBeDefined();
        });
    });
    describe(',,Testing the loginc of the userModel', () => {
        const user = {
            user_name: 'tessdasdt',
            first_name: 'test',
            last_name: 'test',
            password: 'test'
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createUser = yield UserModel.createUser(user);
            user.user_id = createUser.user_id;
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield index_1.default.connect();
            const sql = `DELETE FROM users`;
            yield connection.query(sql);
            connection.release();
        }));
        it('get all  users should  return all users in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield UserModel.getAllUsers();
            expect(users.length).toBe(1);
        }));
        it('Create new  user should  return the new user in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                user_name: 'test',
                first_name: 'test',
                last_name: 'test',
                password: 'test'
            };
            const createUser = yield UserModel.createUser(user);
            user.user_id = createUser.user_id;
            expect(createUser.user_id).toBe(user.user_id);
            expect(createUser.user_name).toBe(user.user_name);
            expect(createUser.first_name).toBe(user.first_name);
            expect(createUser.last_name).toBe(user.last_name);
        }));
        it('get one  user should  return specific in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const oneUser = yield UserModel.getOneUser(user.user_id);
            expect(oneUser.user_id).toBe(user.user_id);
            expect(oneUser.user_name).toBe(user.user_name);
            expect(oneUser.first_name).toBe(user.first_name);
            expect(oneUser.last_name).toBe(user.last_name);
        }));
        it('update one  user should  return the updated user in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedUser = yield UserModel.updateOneUser(Object.assign(Object.assign({}, user), { first_name: 'testTO', last_name: 'testLO' }));
            expect(updatedUser.user_id).toBe(user.user_id);
            expect(updatedUser.user_name).toBe(user.user_name);
            expect(updatedUser.first_name).toBe('testTO');
            expect(updatedUser.last_name).toBe('testLO');
        }));
        it('delete one  user should  return the deleted one  in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const deleteUser = yield UserModel.deleteOneUser(user.user_id);
            expect(deleteUser.user_id).toBe(user.user_id);
            const users = yield UserModel.getAllUsers();
            expect(users.length).toBe(1);
        }));
    });
    describe('Testing the authentication of user', () => {
        const user = {
            user_name: 'test',
            first_name: 'test',
            last_name: 'test',
            password: 'test'
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createUser = yield UserModel.createUser(user);
            user.user_id = createUser.user_id;
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield index_1.default.connect();
            const sql = `DELETE FROM users`;
            yield connection.query(sql);
            connection.release();
        }));
        it('Authenticate method should return  the authenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
            const authenticatedUser = yield UserModel.authenticateOneUser(user.user_name, user.password);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.user_name).toBe(user.user_name);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.first_name).toBe(user.first_name);
            expect(authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.last_name).toBe(user.last_name);
        }));
        it('Authenticate method should return null for wrong credential', () => __awaiter(void 0, void 0, void 0, function* () {
            const authenticatedUser = yield UserModel.authenticateOneUser('asfaj@osdjf.com', 'fakeMan');
            expect(authenticatedUser).toBe(null);
        }));
    });
});
