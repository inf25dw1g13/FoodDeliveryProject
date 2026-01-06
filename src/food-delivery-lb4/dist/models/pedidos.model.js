"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedidos = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const pratos_model_1 = require("./pratos.model");
const pedidos_pratos_through_model_1 = require("./pedidos-pratos-through.model");
let Pedidos = class Pedidos extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Pedidos = Pedidos;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Pedidos.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Pedidos.prototype, "metodo_pagamento", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: 'pendente',
    }),
    tslib_1.__metadata("design:type", String)
], Pedidos.prototype, "estado", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], Pedidos.prototype, "hora_pedido", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        default: 10,
    }),
    tslib_1.__metadata("design:type", Number)
], Pedidos.prototype, "total", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Pedidos.prototype, "restaurantesId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Pedidos.prototype, "clientesId", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => pratos_model_1.Pratos, { through: { model: () => pedidos_pratos_through_model_1.PedidosPratosThrough } }),
    tslib_1.__metadata("design:type", Array)
], Pedidos.prototype, "pratos", void 0);
exports.Pedidos = Pedidos = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Pedidos);
//# sourceMappingURL=pedidos.model.js.map