"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntregasController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let EntregasController = class EntregasController {
    constructor(entregasRepository) {
        this.entregasRepository = entregasRepository;
    }
    async create(entregas) {
        return this.entregasRepository.create(entregas);
    }
    async count(where) {
        return this.entregasRepository.count(where);
    }
    async find(filter) {
        return this.entregasRepository.find(filter);
    }
    async updateAll(entregas, where) {
        return this.entregasRepository.updateAll(entregas, where);
    }
    async findById(id, filter) {
        return this.entregasRepository.findById(id, filter);
    }
    async updateById(id, entregas) {
        await this.entregasRepository.updateById(id, entregas);
    }
    async replaceById(id, entregas) {
        await this.entregasRepository.replaceById(id, entregas);
    }
    async deleteById(id) {
        await this.entregasRepository.deleteById(id);
    }
};
exports.EntregasController = EntregasController;
tslib_1.__decorate([
    (0, rest_1.post)('/entregas'),
    (0, rest_1.response)(200, {
        description: 'Entregas model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Entregas) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Entregas, {
                    title: 'NewEntregas',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EntregasController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/entregas/count'),
    (0, rest_1.response)(200, {
        description: 'Entregas model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Entregas)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EntregasController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/entregas'),
    (0, rest_1.response)(200, {
        description: 'Array of Entregas model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Entregas, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Entregas)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EntregasController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/entregas'),
    (0, rest_1.response)(200, {
        description: 'Entregas PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Entregas, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Entregas)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Entregas, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EntregasController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/entregas/{id}'),
    (0, rest_1.response)(200, {
        description: 'Entregas model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Entregas, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Entregas, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EntregasController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/entregas/{id}'),
    (0, rest_1.response)(204, {
        description: 'Entregas PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Entregas, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Entregas]),
    tslib_1.__metadata("design:returntype", Promise)
], EntregasController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/entregas/{id}'),
    (0, rest_1.response)(204, {
        description: 'Entregas PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Entregas]),
    tslib_1.__metadata("design:returntype", Promise)
], EntregasController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/entregas/{id}'),
    (0, rest_1.response)(204, {
        description: 'Entregas DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], EntregasController.prototype, "deleteById", null);
exports.EntregasController = EntregasController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.EntregasRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.EntregasRepository])
], EntregasController);
//# sourceMappingURL=entregas.controller.js.map