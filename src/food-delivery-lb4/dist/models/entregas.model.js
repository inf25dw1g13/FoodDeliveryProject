"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entregas = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Entregas = class Entregas extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Entregas = Entregas;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Entregas.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        default: 30,
    }),
    tslib_1.__metadata("design:type", Number)
], Entregas.prototype, "tempo_estimado_min", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        default: 25,
    }),
    tslib_1.__metadata("design:type", Number)
], Entregas.prototype, "tempo_real_min", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Entregas.prototype, "hora_entrega", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: 'pendente',
    }),
    tslib_1.__metadata("design:type", String)
], Entregas.prototype, "estado", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Entregas.prototype, "restaurantesId", void 0);
exports.Entregas = Entregas = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Entregas);
//# sourceMappingURL=entregas.model.js.map