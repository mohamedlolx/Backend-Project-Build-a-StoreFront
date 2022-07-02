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
class orderModel {
    //create a new order
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `INSERT INTO orders (order_status ,user_id)
        VALUES ($1,$2) RETURNING order_id, order_status, user_id `;
                const result = yield connection.query(sql, [
                    order.order_status,
                    order.user_id
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to create your order because:  ${error.message}`);
            }
        });
    }
    //get all orders
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `SELECT * FROM orders`;
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`unable to get all orders from the database`);
            }
        });
    }
    //get one order
    getOneOrder(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `SELECT user_id, order_status , order_id FROM orders  WHERE order_id=($1)`;
                const result = yield connection.query(sql, [order_id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to get the  order from the database because ${error.message}`);
            }
        });
    }
    //update one order
    updateOneOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `UPDATE orders set ( order_status, user_id) = 
        ($1,$2) WHERE order_id=$3  RETURNING *`;
                const result = yield connection.query(sql, [
                    order.order_status,
                    order.user_id,
                    order.order_id
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to update the order from the database because ${error.message}`);
            }
        });
    }
    //delete one order
    deleteOneOrder(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `DELETE FROM orders WHERE order_id=$1 RETURNING *`;
                const result = yield connection.query(sql, [order_id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not delete the order baeause : ${error.message}`);
            }
        });
    }
}
exports.default = orderModel;
