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
const products_orders_model_1 = __importDefault(require("../products_orders.model"));
const products_model_1 = __importDefault(require("../products.model"));
const orders_model_1 = __importDefault(require("../orders.model"));
const users_model_1 = __importDefault(require("../users.model"));
const index_1 = __importDefault(require("../../database/index"));
const ProdOrderModel = new products_orders_model_1.default();
const UserModel = new users_model_1.default();
const OrderModel = new orders_model_1.default();
const ProductModel = new products_model_1.default();
describe('Products order Unit Testing', () => {
    describe('Testing the existince of the methods first', () => {
        it('should have Create one Products order methode', () => {
            expect(ProdOrderModel.createProducts_orders).toBeDefined();
        });
        it('should have Get all Products orders methode', () => {
            expect(ProdOrderModel.getAllProducts_orders).toBeDefined();
        });
        it('should have Get one Products order methode', () => {
            expect(ProdOrderModel.getOneProducts_orders).toBeDefined();
        });
        it('should have update one Products order methode', () => {
            expect(ProdOrderModel.updateProdcutsOrder).toBeDefined();
        });
        it('should have delete Products order methode', () => {
            expect(ProdOrderModel.deletePRoductsOrder).toBeDefined();
        });
    });
    describe('Testing the logic of the Products order methods', () => {
        const userr = {
            user_name: 'damn',
            first_name: 'test',
            last_name: 'test',
            password: 'test'
        };
        const product = {
            product_name: 'Big Bottle Water',
            price: '5LE'
        };
        const order = {
            order_status: 'Pending'
        };
        const product_order = {
            quantity: 7
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createUser = yield UserModel.createUser(userr);
            userr.user_id = createUser.user_id;
            const creatProduct = yield ProductModel.createProduct(product);
            product.product_id = creatProduct.product_id;
            order.user_id = createUser.user_id;
            const creatOrder = yield OrderModel.createOrder(order);
            order.order_id = creatOrder.order_id;
            product_order.product_id = creatProduct.product_id;
            product_order.order_id = creatOrder.order_id;
            const createProdOrd = yield ProdOrderModel.createProducts_orders(product_order);
            product_order.product_order_id = createProdOrd.product_order_id;
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield index_1.default.connect();
            const sql1 = `DELETE FROM products_orders`;
            yield connection.query(sql1);
            const sq1l = `DELETE FROM orders`;
            yield connection.query(sq1l);
            const sql = `DELETE FROM products`;
            yield connection.query(sql);
            const sq1l3 = `DELETE FROM users`;
            yield connection.query(sq1l3);
            connection.release();
        }));
        it('Create new products order should  return the new products order in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const creatProdOrder = yield ProdOrderModel.createProducts_orders(product_order);
            product_order.product_order_id = creatProdOrder.product_order_id;
            expect(creatProdOrder.product_id).toBe(product_order.product_id);
            expect(creatProdOrder.order_id).toBe(product_order.order_id);
            expect(creatProdOrder.quantity).toBe(product_order.quantity);
        }));
        it('get all  products orders should  return all  in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const prosOrds = yield ProdOrderModel.getAllProducts_orders();
            expect(prosOrds.length).toBe(2);
        }));
        it('get one products order should  return specific in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const prosOrd = yield ProdOrderModel.getOneProducts_orders(product_order.product_order_id);
            expect(prosOrd.product_order_id).toBe(product_order.product_order_id);
            expect(prosOrd.product_id).toBe(product_order.product_id);
            expect(prosOrd.order_id).toBe(product_order.order_id);
            expect(prosOrd.quantity).toBe(product_order.quantity);
        }));
        it('update one products order should  return the updated one in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedProdsOrder = yield ProdOrderModel.updateProdcutsOrder(Object.assign(Object.assign({}, product_order), { quantity: 19 }));
            expect(updatedProdsOrder.product_order_id).toBe(product_order.product_order_id);
            expect(updatedProdsOrder.quantity).toBe(19);
            expect(updatedProdsOrder.product_id).toBe(product_order.product_id);
            expect(updatedProdsOrder.order_id).toBe(product_order.order_id);
        }));
        it('delete one products order should  return the deleted one  in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const deleteProdOrder = yield ProdOrderModel.deletePRoductsOrder(product_order.product_order_id);
            expect(deleteProdOrder.product_order_id).toBe(product_order.product_order_id);
            const prodor = yield OrderModel.getAllOrders();
            expect(prodor.length).toBe(1);
        }));
    });
});
