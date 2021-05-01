"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var morgan_1 = __importDefault(require("morgan"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var usuarios_1 = __importDefault(require("./routers/usuarios"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config();
        this.routers();
    }
    Server.prototype.config = function () {
        this.app.set('port', process.env.PORT || 3001);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    };
    Server.prototype.routers = function () {
        this.app.use("/", usuarios_1.default.router);
    };
    Server.prototype.initServer = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log('el servidor ha iniciado en el puerto', _this.app.get('port'));
        });
    };
    return Server;
}());
var server = new Server();
server.initServer();
