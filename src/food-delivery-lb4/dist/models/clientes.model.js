"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clientes = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const pedidos_model_1 = require("./pedidos.model");
let Clientes = class Clientes extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Clientes = Clientes;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Clientes.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Clientes.prototype, "nome", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Clientes.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Clientes.prototype, "telefone", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Clientes.prototype, "morada", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => pedidos_model_1.Pedidos),
    tslib_1.__metadata("design:type", Array)
], Clientes.prototype, "pedidos", void 0);
exports.Clientes = Clientes = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Clientes);
//# sourceMappingURL=clientes.model.js.map