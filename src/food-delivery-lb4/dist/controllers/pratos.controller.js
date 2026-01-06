"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PratosController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let PratosController = class PratosController {
    constructor(pratosRepository) {
        this.pratosRepository = pratosRepository;
    }
    async create(pratos) {
        return this.pratosRepository.create(pratos);
    }
    async count(where) {
        return this.pratosRepository.count(where);
    }
    async find(filter) {
        return this.pratosRepository.find(filter);
    }
    async updateAll(pratos, where) {
        return this.pratosRepository.updateAll(pratos, where);
    }
    async findById(id, filter) {
        return this.pratosRepository.findById(id, filter);
    }
    async updateById(id, pratos) {
        await this.pratosRepository.updateById(id, pratos);
    }
    async replaceById(id, pratos) {
        await this.pratosRepository.replaceById(id, pratos);
    }
    async deleteById(id) {
        await this.pratosRepository.deleteById(id);
    }
};
exports.PratosController = PratosController;
tslib_1.__decorate([
    (0, rest_1.post)('/pratos'),
    (0, rest_1.response)(200, {
        description: 'Pratos model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Pratos) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Pratos, {
                    title: 'NewPratos',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PratosController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/pratos/count'),
    (0, rest_1.response)(200, {
        description: 'Pratos model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Pratos)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PratosController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/pratos'),
    (0, rest_1.response)(200, {
        description: 'Array of Pratos model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Pratos, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Pratos)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PratosController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/pratos'),
    (0, rest_1.response)(200, {
        description: 'Pratos PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Pratos, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Pratos)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Pratos, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PratosController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/pratos/{id}'),
    (0, rest_1.response)(200, {
        description: 'Pratos model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Pratos, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Pratos, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PratosController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/pratos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Pratos PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Pratos, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Pratos]),
    tslib_1.__metadata("design:returntype", Promise)
], PratosController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/pratos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Pratos PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Pratos]),
    tslib_1.__metadata("design:returntype", Promise)
], PratosController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/pratos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Pratos DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], PratosController.prototype, "deleteById", null);
exports.PratosController = PratosController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.PratosRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PratosRepository])
], PratosController);
//# sourceMappingURL=pratos.controller.js.map