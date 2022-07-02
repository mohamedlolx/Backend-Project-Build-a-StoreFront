"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_routes_1 = __importDefault(require("./api/users.routes"));
const products_routes_1 = __importDefault(require("./api/products.routes"));
const orders_routes_1 = __importDefault(require("./api/orders.routes"));
const products_orders_routes_1 = __importDefault(require("./api/products_orders.routes"));
const route = (0, express_1.Router)();
route.use('/users', users_routes_1.default);
route.use('/products', products_routes_1.default);
route.use('/orders', orders_routes_1.default);
route.use('/prord', products_orders_routes_1.default);
exports.default = route;
