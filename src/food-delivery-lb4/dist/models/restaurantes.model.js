"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurantes = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const pratos_model_1 = require("./pratos.model");
const pedidos_model_1 = require("./pedidos.model");
const entregas_model_1 = require("./entregas.model");
let Restaurantes = class Restaurantes extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Restaurantes = Restaurantes;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Restaurantes.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Restaurantes.prototype, "nome", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Restaurantes.prototype, "morada", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Restaurantes.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Restaurantes.prototype, "telefone", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Restaurantes.prototype, "hora_abertura", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Restaurantes.prototype, "hora_fecho", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Restaurantes.prototype, "estado", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Restaurantes.prototype, "descricao", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Restaurantes.prototype, "taxa_entrega", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Restaurantes.prototype, "pedido_minimo", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Restaurantes.prototype, "tempo_medio_preparacao", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Restaurantes.prototype, "ativo", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => pratos_model_1.Pratos),
    tslib_1.__metadata("design:type", Array)
], Restaurantes.prototype, "pratos", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => pedidos_model_1.Pedidos),
    tslib_1.__metadata("design:type", Array)
], Restaurantes.prototype, "pedidos", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => entregas_model_1.Entregas),
    tslib_1.__metadata("design:type", Array)
], Restaurantes.prototype, "entregases", void 0);
exports.Restaurantes = Restaurantes = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Restaurantes);
//# sourceMappingURL=restaurantes.model.js.map