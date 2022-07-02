"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./database/index"));
const routes_1 = __importDefault(require("./routes"));
//create isntace of express to our app
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('short'));
//to pare the input date as json
app.use(express_1.default.json());
//just normal get request for the server
app.get('/', (req, res) => {
    res.json({
        message: "'Hello from Server Side Get Request'"
    });
});
//here the server is listening on the post to check it's running
app.listen(config_1.default.port, () => {
    console.log(`Server is working on port ${config_1.default.port}`);
});
//this is just a db test connection to give me time when the connection is done
index_1.default.connect().then((client) => {
    return client
        .query('SELECT NOW()')
        .then((res) => {
        client.release();
        console.log(res.rows);
    })
        .catch((err) => {
        client.release();
        console.log(err);
    });
});
//this is the end point to connect server to our routes
app.use('/api', routes_1.default);
// this line will handle anyerror related to wrong end poing
app.use((_req, res) => {
    res.status(404).json({
        message: 'You are lost this is wrong route check the api routes'
    });
});
exports.default = app;
