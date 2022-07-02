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
const products_orders_model_1 = __importDefault(require("../../models/products_orders.model"));
const products_model_1 = __importDefault(require("../../models/products.model"));
const orders_model_1 = __importDefault(require("../../models/orders.model"));
const users_model_1 = __importDefault(require("../../models/users.model"));
const index_1 = __importDefault(require("../../database/index"));
const supertest_1 = __importDefault(require("supertest"));
const index_2 = __importDefault(require("../../index"));
const ProdOrderModel = new products_orders_model_1.default();
const OrderModel = new orders_model_1.default();
const ProductModel = new products_model_1.default();
const UserModel = new users_model_1.default();
const request = (0, supertest_1.default)(index_2.default);
let token = '';
describe('Testing the logic of the Products_order methods END POINTS', () => {
    const user = {
        user_name: 'test',
        first_name: 'test',
        last_name: 'test',
        password: 'test'
    };
    const product = {
        product_name: 'cola',
        price: '5LE'
    };
    const order = {
        order_status: 'In House'
    };
    const product_order = {
        quantity: 3
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield UserModel.createUser(user);
        user.user_id = createUser.user_id;
        order.user_id = createUser.user_id;
        const creatProduct = yield ProductModel.createProduct(product);
        product.product_id = creatProduct.product_id;
        product_order.product_id = creatProduct.product_id;
        const creatOrder = yield OrderModel.createOrder(order);
        order.order_id = creatOrder.order_id;
        product_order.order_id = creatOrder.order_id;
        const createProdOrd = yield ProdOrderModel.createProducts_orders(product_order);
        product_order.product_order_id = createProdOrd.product_order_id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield index_1.default.connect();
        const sql1 = `DELETE FROM products_orders`;
        yield connection.query(sql1);
        const sql2 = `DELETE FROM orders`;
        yield connection.query(sql2);
        const sql3 = `DELETE FROM products`;
        yield connection.query(sql3);
        const sql4 = `DELETE FROM users`;
        yield connection.query(sql4);
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
        it('should be failed to authenticated with wrong user_name', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .send({ user_name: '000', password: 'ssss' });
            expect(res.status).toBe(401);
        }));
    });
    describe('Testing CRUD Operation methods for Products_Orders model', () => {
        it('Create User new products_order', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/prord/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                product_id: product.product_id,
                order_id: order.order_id,
                quantity: 3
            });
            expect(res.status).toBe(200);
            const { product_id, order_id, quantity } = res.body.data;
            expect(product_id).toBe(product_order.product_id);
            expect(order_id).toBe(product_order.order_id);
            expect(quantity).toBe(product_order.quantity);
        }));
        it('should get list of products_order', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get('/api/prord/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(Object.keys(res.body.data).length).toBe(2);
        }));
        it('should get one of products_order', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/api/prord/${product_order.product_order_id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.body.data.product_order_id).toBe(product_order.product_order_id);
            expect(res.body.data.order_id).toBe(product_order.order_id);
            expect(res.body.data.product_id).toBe(product_order.product_id);
            expect(res.body.data.quantity).toBe(product_order.quantity);
        }));
        it('should update one of products_order', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .patch(`/api/prord/${product_order.product_order_id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(Object.assign(Object.assign({}, product_order), { quantity: 13 }));
            expect(res.status).toBe(200);
            const { product_order_id, order_id, product_id, quantity } = res.body.data.prodOrd;
            expect(product_order_id).toBe(product_order.product_order_id);
            expect(order_id).toBe(product_order.order_id);
            expect(product_id).toBe(product_order.product_id);
            expect(quantity).toBe(13);
        }));
        it('should delete one of products_order', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .delete(`/api/prord/${product_order.product_order_id}/`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.order_id).toBe(product_order.order_id);
            expect(res.body.data.product_order_id).toBe(product_order.product_order_id);
            expect(res.body.data.product_id).toBe(product_order.product_id);
            expect(res.body.data.quantity).toBe(13);
            const res1 = yield request
                .get('/api/prord/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res1.status).toBe(200);
            expect(Object.keys(res1.body.data).length).toBe(1);
        }));
    });
});
