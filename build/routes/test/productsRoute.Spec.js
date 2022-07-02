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
const products_model_1 = __importDefault(require("../../models/products.model"));
const users_model_1 = __importDefault(require("../../models/users.model"));
const ProductModel = new products_model_1.default();
const UserModel = new users_model_1.default();
const request = (0, supertest_1.default)(index_1.default);
let token = '';
describe(',,Testing the loginc of the Products Model END POINTS', () => {
    const product = {
        product_name: 'Big Bottle Water',
        price: '5LE'
    };
    const user = {
        user_name: 'test',
        first_name: 'test',
        last_name: 'test',
        password: 'test'
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield UserModel.createUser(user);
        user.user_id = createUser.user_id;
        const creatProduct = yield ProductModel.createProduct(product);
        product.product_id = creatProduct.product_id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield index_2.default.connect();
        const sql1 = `DELETE FROM users`;
        yield connection.query(sql1);
        const sql = `DELETE FROM products`;
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
    describe('Testing CRUD Operation methods for Products model', () => {
        it('Create User new product', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/products/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                product_name: 'product',
                price: '10LE'
            });
            expect(res.status).toBe(200);
            const { product_name, price } = res.body.data;
            expect(product_name).toBe('product');
            expect(price).toBe('10LE');
        }));
        it('should get list of products', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get('/api/products/')
                .set('Content-type', 'application/json');
            expect(res.status).toBe(200);
            expect(Object.keys(res.body.data).length).toBe(2);
        }));
        it('should get one of product', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/api/products/${product.product_id}/`)
                .set('Content-type', 'application/json');
            const { product_name, price } = res.body.data;
            expect(product_name).toBe('Big Bottle Water');
            expect(price).toBe('5LE');
        }));
        it('should update one of product', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .patch(`/api/products/${product.product_id}/`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(Object.assign(Object.assign({}, product), { product_name: 'Chips Large', price: '9LE' }));
            expect(res.status).toBe(200);
            const { product_id, product_name, price } = res.body.data;
            expect(product_id).toBe(product.product_id);
            expect(product_name).toBe('Chips Large');
            expect(price).toBe('9LE');
        }));
        it('should delete one of products', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .delete(`/api/products/${product.product_id}/`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.product_id).toBe(product.product_id);
            expect(res.body.data.product_name).toBe('Chips Large');
            expect(res.body.data.price).toBe('9LE');
        }));
    });
});
