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
const products_model_1 = __importDefault(require("../products.model"));
const index_1 = __importDefault(require("../../database/index"));
const ProductModel = new products_model_1.default();
describe('Products Model Unit Testing', () => {
    describe('Testing the existince of the methods first', () => {
        it('should have Create one product methode', () => {
            expect(ProductModel.createProduct).toBeDefined();
        });
        it('should have Get all products methode', () => {
            expect(ProductModel.getAllProducts).toBeDefined();
        });
        it('should have Get one product methode', () => {
            expect(ProductModel.getOneProduct).toBeDefined();
        });
        it('should have update one product methode', () => {
            expect(ProductModel.updateOneProduct).toBeDefined();
        });
        it('should have delete product methode', () => {
            expect(ProductModel.deleteOneProduct).toBeDefined();
        });
    });
    describe(',,Testing the loginc of the Products Model', () => {
        const product = {
            product_name: 'Big Bottle Water',
            price: '5LE'
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const creatProduct = yield ProductModel.createProduct(product);
            product.product_id = creatProduct.product_id;
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield index_1.default.connect();
            const sql = `DELETE FROM products`;
            yield connection.query(sql);
            connection.release();
        }));
        it('get all  products should  return all products in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const products = yield ProductModel.getAllProducts();
            expect(products.length).toBe(1);
        }));
        it('Create new  product should  return the new product in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const product = {
                product_name: 'Small Bottle Water',
                price: '3LE'
            };
            const creatProduct = yield ProductModel.createProduct(product);
            product.product_id = creatProduct.product_id;
            expect(creatProduct.product_id).toBe(product.product_id);
            expect(creatProduct.product_name).toBe(product.product_name);
            expect(creatProduct.price).toBe(product.price);
        }));
        it('get one  product should  return specific in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const oneProduct = yield ProductModel.getOneProduct(product.product_id);
            expect(oneProduct.product_id).toBe(product.product_id);
            expect(oneProduct.product_name).toBe(product.product_name);
            expect(oneProduct.price).toBe(product.price);
        }));
        it('update one  product should  return the updated product in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedProduct = yield ProductModel.updateOneProduct(Object.assign(Object.assign({}, product), { product_name: 'Can Pepsi', price: '6LE' }));
            expect(updatedProduct.product_id).toBe(product.product_id);
            expect(updatedProduct.product_name).toBe('Can Pepsi');
            expect(updatedProduct.price).toBe('6LE');
        }));
        it('delete one  product should  return the deleted one  in db ', () => __awaiter(void 0, void 0, void 0, function* () {
            const deleteProduct = yield ProductModel.deleteOneProduct(product.product_id);
            expect(deleteProduct.product_id).toBe(product.product_id);
            const prods = yield ProductModel.getAllProducts();
            expect(prods.length).toBe(1);
        }));
    });
});
