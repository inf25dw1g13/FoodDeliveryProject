"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ClientesController = class ClientesController {
    constructor(clientesRepository) {
        this.clientesRepository = clientesRepository;
    }
    async create(clientes) {
        return this.clientesRepository.create(clientes);
    }
    async count(where) {
        return this.clientesRepository.count(where);
    }
    async find(filter) {
        return this.clientesRepository.find(filter);
    }
    async updateAll(clientes, where) {
        return this.clientesRepository.updateAll(clientes, where);
    }
    async findById(id, filter) {
        return this.clientesRepository.findById(id, filter);
    }
    async updateById(id, clientes) {
        await this.clientesRepository.updateById(id, clientes);
    }
    async replaceById(id, clientes) {
        await this.clientesRepository.replaceById(id, clientes);
    }
    async deleteById(id) {
        await this.clientesRepository.deleteById(id);
    }
};
exports.ClientesController = ClientesController;
tslib_1.__decorate([
    (0, rest_1.post)('/clientes'),
    (0, rest_1.response)(200, {
        description: 'Clientes model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Clientes) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Clientes, {
                    title: 'NewClientes',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientesController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/clientes/count'),
    (0, rest_1.response)(200, {
        description: 'Clientes model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Clientes)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientesController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/clientes'),
    (0, rest_1.response)(200, {
        description: 'Array of Clientes model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Clientes, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Clientes)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientesController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/clientes'),
    (0, rest_1.response)(200, {
        description: 'Clientes PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Clientes, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Clientes)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Clientes, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientesController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/clientes/{id}'),
    (0, rest_1.response)(200, {
        description: 'Clientes model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Clientes, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Clientes, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientesController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/clientes/{id}'),
    (0, rest_1.response)(204, {
        description: 'Clientes PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Clientes, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Clientes]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientesController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/clientes/{id}'),
    (0, rest_1.response)(204, {
        description: 'Clientes PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Clientes]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientesController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/clientes/{id}'),
    (0, rest_1.response)(204, {
        description: 'Clientes DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientesController.prototype, "deleteById", null);
exports.ClientesController = ClientesController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ClientesRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ClientesRepository])
], ClientesController);
//# sourceMappingURL=clientes.controller.js.map