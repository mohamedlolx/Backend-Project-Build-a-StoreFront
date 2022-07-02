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
exports.deletePRoductsOrder = exports.updateProdcutsOrder = exports.getOneProducts_orders = exports.getAllProducts_orders = exports.createProducts_orders = void 0;
const products_orders_model_1 = __importDefault(require("../models/products_orders.model"));
const Products_OrdersModel = new products_orders_model_1.default();
const createProducts_orders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prodOrd = yield Products_OrdersModel.createProducts_orders(req.body);
        res.json({
            data: Object.assign({}, prodOrd),
            message: 'products in order are placed successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createProducts_orders = createProducts_orders;
const getAllProducts_orders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prodOrd = yield Products_OrdersModel.getAllProducts_orders();
        res.json({
            data: Object.assign({}, prodOrd),
            message: 'products in order were retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllProducts_orders = getAllProducts_orders;
const getOneProducts_orders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prodOrd = yield Products_OrdersModel.getOneProducts_orders(req.params.product_order_id);
        res.json({
            data: Object.assign({}, prodOrd),
            meesage: 'products in order were retrieved successfully '
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOneProducts_orders = getOneProducts_orders;
const updateProdcutsOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prodOrd = yield Products_OrdersModel.updateProdcutsOrder(req.body);
        res.json({
            data: { prodOrd },
            message: 'products in order are updated successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProdcutsOrder = updateProdcutsOrder;
const deletePRoductsOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prodOrd = yield Products_OrdersModel.deletePRoductsOrder(req.params.product_order_id);
        res.json({
            data: Object.assign({}, prodOrd),
            message: 'products in order are deleted successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePRoductsOrder = deletePRoductsOrder;
