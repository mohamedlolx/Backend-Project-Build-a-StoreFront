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
const orders_model_1 = __importDefault(require("../orders.model"));
const users_model_1 = __importDefault(require("../users.model"));
const index_1 = __importDefault(require("../../database/index"));
const UserModel = new users_model_1.default();
const OrderModel = new orders_model_1.default();
describe('OrdersModel Unit Testing', () => {
    describe('Testing the existince of the methods first', () => {
        it('should have Create one order methode', () => {
            expect(OrderModel.createOrder).toBeDefined();
        });
        it('should have Get all orders methode', () => {
            expect(OrderModel.getAllOrders).toBeDefined();
        });
        it('should have Get one order methode', () => {
            expect(OrderModel.getOneOrder).toBeDefined();
        });
        it('should have update one order methode', () => {
            expect(OrderModel.updateOneOrder).toBeDefined();
        });
        it('should have delete order methode', () => {
            expect(OrderModel.deleteOneOrder).toBeDefined();
        });
    });
    describe(',,Testing the loginc of the orders Model', () => {
        const userr = {
            user_name: 'damn',
            first_name: 'test',
            last_name: 'test',
            password: 'test'
        };
        const order = {
            order_status: 'Pending'
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createUser = yield UserModel.createUser(userr);
            userr.user_id = createUser.user_id;
            order.user_id = createUser.user_id;
            const creatOrder = yield OrderModel.createOrder(order);
            order.order_id = creatOrder.order_id;
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield index_1.default.connect();
            const sql = `DELETE FROM orders`;
            yield connection.query(sql);
            const sq1l = `DELETE FROM users`;
            yield connection.query(sq1l);
            connection.release();
        }));
        it('Create new  order should  return the new order in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const creatOrder = yield OrderModel.createOrder(Object.assign(Object.assign({}, order), { user_id: userr.user_id }));
            order.order_id = creatOrder.order_id;
            expect(creatOrder.order_id).toBe(order.order_id);
            expect(creatOrder.order_status).toBe(order.order_status);
            expect(creatOrder.user_id).toBe(order.user_id);
        }));
        it('get all  orders should  return all orders in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield OrderModel.getAllOrders();
            expect(orders.length).toBe(2);
        }));
        it('get one  order should  return specific in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const oneOrder = yield OrderModel.getOneOrder(order.order_id);
            expect(oneOrder.order_id).toBe(order.order_id);
            expect(oneOrder.order_status).toBe(order.order_status);
            expect(oneOrder.user_id).toBe(order.user_id);
        }));
        it('update one  order should  return the updated order in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedOrder = yield OrderModel.updateOneOrder(Object.assign(Object.assign({}, order), { order_status: 'Active' }));
            expect(updatedOrder.order_id).toBe(order.order_id);
            expect(updatedOrder.order_status).toBe('Active');
            expect(updatedOrder.user_id).toBe(order.user_id);
        }));
        it('delete one  order should  return the deleted one  in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const deleteOrder = yield OrderModel.deleteOneOrder(order.order_id);
            expect(deleteOrder.order_id).toBe(order.order_id);
            const orders = yield OrderModel.getAllOrders();
            expect(orders.length).toBe(1);
        }));
    });
});
