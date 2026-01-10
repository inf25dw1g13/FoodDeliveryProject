"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosPratosController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let PedidosPratosController = class PedidosPratosController {
    constructor(pedidosRepository) {
        this.pedidosRepository = pedidosRepository;
    }
    async find(id, filter) {
        return this.pedidosRepository.pratos(id).find(filter);
    }
    async create(id, pratos) {
        return this.pedidosRepository.pratos(id).create(pratos);
    }
    async patch(id, pratos, where) {
        return this.pedidosRepository.pratos(id).patch(pratos, where);
    }
    async delete(id, where) {
        return this.pedidosRepository.pratos(id).delete(where);
    }
};
exports.PedidosPratosController = PedidosPratosController;
tslib_1.__decorate([
    (0, rest_1.get)('/pedidos/{id}/pratos', {
        responses: {
            '200': {
                description: 'Array of Pedidos has many Pratos through PedidosPratosThrough',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Pratos) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PedidosPratosController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/pedidos/{id}/pratos', {
        responses: {
            '200': {
                description: 'create a Pratos model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Pratos) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Pratos, {
                    title: 'NewPratosInPedidos',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PedidosPratosController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/pedidos/{id}/pratos', {
        responses: {
            '200': {
                description: 'Pedidos.Pratos PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Pratos, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Pratos))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PedidosPratosController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/pedidos/{id}/pratos', {
        responses: {
            '200': {
                description: 'Pedidos.Pratos DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Pratos))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PedidosPratosController.prototype, "delete", null);
exports.PedidosPratosController = PedidosPratosController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.PedidosRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PedidosRepository])
], PedidosPratosController);
//# sourceMappingURL=pedidos-pratos.controller.js.map