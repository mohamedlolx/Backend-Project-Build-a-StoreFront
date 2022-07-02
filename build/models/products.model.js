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
class productModel {
    //create a new product
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `INSERT INTO products (product_name, price)
        VALUES ($1, $2) RETURNING *`;
                const result = yield connection.query(sql, [
                    product.product_name,
                    product.price
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to create your product_name:(${product.product_name}) because:  ${error.message}`);
            }
        });
    }
    //get all products
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `SELECT * FROM products`;
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`unable to get all products from the database`);
            }
        });
    }
    //get one product
    getOneProduct(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `SELECT  product_id, product_name, price FROM products WHERE product_id=$1 `;
                const result = yield connection.query(sql, [product_id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to get the  product from the database because ${error.message}`);
            }
        });
    }
    //update one product
    updateOneProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `UPDATE products set (product_name, price) = 
      ($1,$2) WHERE product_id=$3 RETURNING *`;
                const result = yield connection.query(sql, [
                    product.product_name,
                    product.price,
                    product.product_id
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to update the product from the database because ${error.message}`);
            }
        });
    }
    //delete one product
    deleteOneProduct(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `DELETE FROM products WHERE product_id=($1) RETURNING product_id, product_name, price  `;
                const result = yield connection.query(sql, [product_id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not delete the product baeause : ${error.message}`);
            }
        });
    }
}
exports.default = productModel;
