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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const index_2 = __importDefault(require("../../database/index"));
const users_model_1 = __importDefault(require("../../models/users.model"));
const UserModel = new users_model_1.default();
const request = (0, supertest_1.default)(index_1.default);
let token = '';
describe('User Api end-point', () => {
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
        const connection = yield index_2.default.connect();
        const sql = `DELETE FROM users`;
        yield connection.query(sql);
        connection.release();
    }));
    describe('Test Authentication Method', () => {
        it('should be able to authenticate to get token ', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .send({ user_name: 'test', password: 'test' });
            expect(res.status).toBe(200);
            const { user_id, user_name, first_name, last_name, token: userToken } = res.body.data;
            expect(user_id).toBe(user.user_id);
            expect(user_name).toBe(user.user_name);
            expect(first_name).toBe(user.first_name);
            expect(last_name).toBe(user.last_name);
            token = userToken;
        }));
        it('should be failed to authenticated  with wrong user_name', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .send({ user_name: 'asd', password: 'asd' });
            expect(res.status).toBe(401);
        }));
    });
    describe('Testing CRUD Operation methods for USERMODEL', () => {
        it('Create User new one', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users/')
                .set('Content-type', 'application/json')
                .send({
                user_name: 'test1',
                first_name: 'test1',
                last_name: 'test1',
                password: 'test1'
            });
            expect(res.status).toBe(200);
            const { user_name, first_name, last_name } = res.body.data.user;
            expect(user_name).toBe('test1');
            expect(first_name).toBe('test1');
            expect(last_name).toBe('test1');
        }));
        it('should get list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.users.length).toBe(2);
        }));
        it('should get one of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/api/users/${user.user_id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            const { user_id, user_name, first_name, last_name } = res.body.data.user;
            expect(user_id).toBe(user.user_id);
            expect(user_name).toBe('test');
            expect(first_name).toBe('test');
            expect(last_name).toBe('test');
        }));
        it('should update one of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .patch(`/api/users/${user.user_id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(Object.assign(Object.assign({}, user), { user_name: 'test2', first_name: 'test2', last_name: 'test2' }));
            expect(res.status).toBe(200);
            const { user_id, user_name, first_name, last_name } = res.body.data.user;
            expect(user_id).toBe(user.user_id);
            expect(user_name).toBe('test2');
            expect(first_name).toBe('test2');
            expect(last_name).toBe('test2');
        }));
        it('should delete one of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .delete(`/api/users/${user.user_id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.user_id).toBe(user.user_id);
            expect(res.body.data.user_name).toBe('test2');
        }));
    });
});
