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
class products_ordersModel {
    //create a new product_order
    createProducts_orders(product_order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `INSERT INTO products_orders (product_id ,order_id,quantity)
        VALUES ($1,$2,$3) RETURNING * `;
                const result = yield connection.query(sql, [
                    product_order.product_id,
                    product_order.order_id,
                    product_order.quantity
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to create your order of many products because:  ${error.message}`);
            }
        });
    }
    //get all orders
    getAllProducts_orders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `SELECT * FROM products_orders`;
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`unable to get all order or products from the database`);
            }
        });
    }
    //get one order
    getOneProducts_orders(product_order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `SELECT * FROM products_orders WHERE product_order_id=$1  `;
                const result = yield connection.query(sql, [product_order_id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to get the  products order from the database because ${error.message}`);
            }
        });
    }
    //update one order
    updateProdcutsOrder(product_order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `UPDATE products_orders set ( product_id, order_id, quantity) = 
        ($1,$2,$3) WHERE product_order_id=$4  RETURNING *`;
                const result = yield connection.query(sql, [
                    product_order.product_id,
                    product_order.order_id,
                    product_order.quantity,
                    product_order.product_order_id
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to update the products order from the database because ${error.message}`);
            }
        });
    }
    //delete one order
    deletePRoductsOrder(product_order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `DELETE FROM products_orders WHERE product_order_id=$1 RETURNING *`;
                const result = yield connection.query(sql, [product_order_id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not delete the products order baeause : ${error.message}`);
            }
        });
    }
}
exports.default = products_ordersModel;
