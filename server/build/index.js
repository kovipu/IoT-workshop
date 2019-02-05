"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
app.use(body_parser_1.default.json());
/**
 * POST /api/newreading
 * Send a new reading from the sensor to the server
 */
app.post('/api/newreading', function (req, res) {
    console.log('received new reading:', req.body);
    res.send(req.body);
});
var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
