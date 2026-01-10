"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pratos = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const ingredientes_model_1 = require("./ingredientes.model");
const through_pratos_ingredientes_model_1 = require("./through-pratos-ingredientes.model");
let Pratos = class Pratos extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Pratos = Pratos;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Pratos.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Pratos.prototype, "nome", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Pratos.prototype, "preco", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Pratos.prototype, "descricao", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Pratos.prototype, "disponivel", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Pratos.prototype, "vegetariano", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Pratos.prototype, "vegan", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Pratos.prototype, "sem_gluten", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Pratos.prototype, "restaurantesId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Pratos.prototype, "pedidosId", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => ingredientes_model_1.Ingredientes, { through: { model: () => through_pratos_ingredientes_model_1.ThroughPratosIngredientes } }),
    tslib_1.__metadata("design:type", Array)
], Pratos.prototype, "ingredientes", void 0);
exports.Pratos = Pratos = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Pratos);
//# sourceMappingURL=pratos.model.js.map