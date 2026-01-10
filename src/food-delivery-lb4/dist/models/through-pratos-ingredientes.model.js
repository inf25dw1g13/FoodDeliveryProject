"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThroughPratosIngredientes = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let ThroughPratosIngredientes = class ThroughPratosIngredientes extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.ThroughPratosIngredientes = ThroughPratosIngredientes;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ThroughPratosIngredientes.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: 0,
    }),
    tslib_1.__metadata("design:type", String)
], ThroughPratosIngredientes.prototype, "quantidade", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], ThroughPratosIngredientes.prototype, "obrigatorio", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ThroughPratosIngredientes.prototype, "pratosId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ThroughPratosIngredientes.prototype, "ingredientesId", void 0);
exports.ThroughPratosIngredientes = ThroughPratosIngredientes = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ThroughPratosIngredientes);
//# sourceMappingURL=through-pratos-ingredientes.model.js.map