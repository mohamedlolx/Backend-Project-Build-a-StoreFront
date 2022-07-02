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
const orders_model_1 = __importDefault(require("../../models/orders.model"));
const users_model_1 = __importDefault(require("../../models/users.model"));
const OrderModel = new orders_model_1.default();
const UserModel = new users_model_1.default();
const request = (0, supertest_1.default)(index_1.default);
let token = '';
describe(',,Testing the logic of the Orders Model END POINTS', () => {
    const user = {
        user_name: 'test',
        first_name: 'test',
        last_name: 'test',
        password: 'test'
    };
    const order = {
        order_status: 'Pending'
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield UserModel.createUser(user);
        user.user_id = createUser.user_id;
        order.user_id = createUser.user_id;
        const creatOrder = yield OrderModel.createOrder(order);
        order.order_id = creatOrder.order_id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield index_2.default.connect();
        const sql1 = `DELETE FROM orders`;
        yield connection.query(sql1);
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
    describe('Testing CRUD Operation methods for orders model', () => {
        it('Create User new order', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/orders/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                user_id: user.user_id,
                order_status: 'nearly to rech the house'
            });
            expect(res.status).toBe(200);
            const { user_id, order_status } = res.body.data;
            expect(user_id).toBe(user.user_id);
            expect(order_status).toBe('nearly to rech the house');
        }));
        it('should get list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get('/api/orders/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(Object.keys(res.body.data).length).toBe(2);
        }));
        it('should get one of orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/api/orders/${order.order_id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.body.data.order_status).toBe(order.order_status);
            expect(res.body.data.order_id).toBe(order.order_id);
            expect(res.body.data.user_id).toBe(order.user_id);
        }));
        it('should update one of order', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .patch(`/api/orders/${order.order_id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(Object.assign(Object.assign({}, order), { order_status: 'Active' }));
            expect(res.status).toBe(200);
            const { order_id, user_id, order_status } = res.body.data.order;
            expect(order_id).toBe(order.order_id);
            expect(user_id).toBe(order.user_id);
            expect(order_status).toBe('Active');
        }));
        it('should delete one of orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .delete(`/api/orders/${order.order_id}/`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.order_id).toBe(order.order_id);
            expect(res.body.data.user_id).toBe(order.user_id);
            expect(res.body.data.order_status).toBe('Active');
            const res1 = yield request
                .get('/api/orders/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res1.status).toBe(200);
            expect(Object.keys(res1.body.data).length).toBe(1);
        }));
    });
});
