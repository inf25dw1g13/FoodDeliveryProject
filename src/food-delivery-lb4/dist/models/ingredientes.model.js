"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredientes = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Ingredientes = class Ingredientes extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Ingredientes = Ingredientes;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Ingredientes.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Ingredientes.prototype, "nome", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Ingredientes.prototype, "tipo", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Ingredientes.prototype, "alergeno", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Ingredientes.prototype, "pratosId", void 0);
exports.Ingredientes = Ingredientes = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Ingredientes);
//# sourceMappingURL=ingredientes.model.js.map