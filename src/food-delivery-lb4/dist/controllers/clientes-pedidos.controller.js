"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesPedidosController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ClientesPedidosController = class ClientesPedidosController {
    constructor(clientesRepository) {
        this.clientesRepository = clientesRepository;
    }
    async find(id, filter) {
        return this.clientesRepository.pedidos(id).find(filter);
    }
    async create(id, pedidos) {
        return this.clientesRepository.pedidos(id).create(pedidos);
    }
    async patch(id, pedidos, where) {
        return this.clientesRepository.pedidos(id).patch(pedidos, where);
    }
    async delete(id, where) {
        return this.clientesRepository.pedidos(id).delete(where);
    }
};
exports.ClientesPedidosController = ClientesPedidosController;
tslib_1.__decorate([
    (0, rest_1.get)('/clientes/{id}/pedidos', {
        responses: {
            '200': {
                description: 'Array of Clientes has many Pedidos',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Pedidos) },
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
], ClientesPedidosController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/clientes/{id}/pedidos', {
        responses: {
            '200': {
                description: 'Clientes model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Pedidos) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Pedidos, {
                    title: 'NewPedidosInClientes',
                    exclude: ['id'],
                    optional: ['clientesId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientesPedidosController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/clientes/{id}/pedidos', {
        responses: {
            '200': {
                description: 'Clientes.Pedidos PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Pedidos, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Pedidos))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientesPedidosController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/clientes/{id}/pedidos', {
        responses: {
            '200': {
                description: 'Clientes.Pedidos DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Pedidos))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientesPedidosController.prototype, "delete", null);
exports.ClientesPedidosController = ClientesPedidosController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ClientesRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ClientesRepository])
], ClientesPedidosController);
//# sourceMappingURL=clientes-pedidos.controller.js.map