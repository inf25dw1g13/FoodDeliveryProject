"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosPratosThrough = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let PedidosPratosThrough = class PedidosPratosThrough extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.PedidosPratosThrough = PedidosPratosThrough;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], PedidosPratosThrough.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        default: 1,
    }),
    tslib_1.__metadata("design:type", Number)
], PedidosPratosThrough.prototype, "quantidade", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], PedidosPratosThrough.prototype, "pedidosId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], PedidosPratosThrough.prototype, "pratosId", void 0);
exports.PedidosPratosThrough = PedidosPratosThrough = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], PedidosPratosThrough);
//# sourceMappingURL=pedidos-pratos-through.model.js.map