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
exports.deleteOneProduct = exports.updateOneProduct = exports.getOneProduct = exports.getAllProducts = exports.createProduct = void 0;
const products_model_1 = __importDefault(require("../models/products.model"));
const ProductModel = new products_model_1.default();
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductModel.createProduct(req.body);
        res.json({
            data: Object.assign({}, product),
            message: 'product created successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductModel.getAllProducts();
        res.json({
            data: Object.assign({}, products),
            message: 'All products were retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllProducts = getAllProducts;
const getOneProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductModel.getOneProduct(req.params.product_id);
        res.json({
            data: Object.assign({}, product),
            meesage: 'product retrieved successfully '
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOneProduct = getOneProduct;
const updateOneProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductModel.updateOneProduct(req.body);
        res.json({
            data: Object.assign({}, product),
            message: 'product updated successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOneProduct = updateOneProduct;
const deleteOneProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield ProductModel.deleteOneProduct(req.params.product_id);
        res.json({
            data: Object.assign({}, product),
            message: 'product is deleted successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOneProduct = deleteOneProduct;
