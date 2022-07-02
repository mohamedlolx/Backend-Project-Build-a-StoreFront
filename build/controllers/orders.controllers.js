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
exports.deleteOneOrder = exports.updateOneOrder = exports.getOneOrder = exports.getAllOrders = exports.createOrder = void 0;
const orders_model_1 = __importDefault(require("../models/orders.model"));
const OrderModel = new orders_model_1.default();
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield OrderModel.createOrder(req.body);
        res.json({
            data: Object.assign({}, product),
            message: 'order is placed successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createOrder = createOrder;
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield OrderModel.getAllOrders();
        res.json({
            data: Object.assign({}, orders),
            message: 'All order were retrieved successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllOrders = getAllOrders;
const getOneOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield OrderModel.getOneOrder(req.params.order_id);
        res.json({
            data: Object.assign({}, order),
            meesage: 'order retrieved successfully '
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOneOrder = getOneOrder;
const updateOneOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield OrderModel.updateOneOrder(req.body);
        res.json({
            data: { order },
            message: 'order updated successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateOneOrder = updateOneOrder;
const deleteOneOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield OrderModel.deleteOneOrder(req.params.order_id);
        res.json({
            data: Object.assign({}, order),
            message: 'order is deleted successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOneOrder = deleteOneOrder;
