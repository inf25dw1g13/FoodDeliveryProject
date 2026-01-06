"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientesController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let IngredientesController = class IngredientesController {
    constructor(ingredientesRepository) {
        this.ingredientesRepository = ingredientesRepository;
    }
    async create(ingredientes) {
        return this.ingredientesRepository.create(ingredientes);
    }
    async count(where) {
        return this.ingredientesRepository.count(where);
    }
    async find(filter) {
        return this.ingredientesRepository.find(filter);
    }
    async updateAll(ingredientes, where) {
        return this.ingredientesRepository.updateAll(ingredientes, where);
    }
    async findById(id, filter) {
        return this.ingredientesRepository.findById(id, filter);
    }
    async updateById(id, ingredientes) {
        await this.ingredientesRepository.updateById(id, ingredientes);
    }
    async replaceById(id, ingredientes) {
        await this.ingredientesRepository.replaceById(id, ingredientes);
    }
    async deleteById(id) {
        await this.ingredientesRepository.deleteById(id);
    }
};
exports.IngredientesController = IngredientesController;
tslib_1.__decorate([
    (0, rest_1.post)('/ingredientes'),
    (0, rest_1.response)(200, {
        description: 'Ingredientes model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Ingredientes) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Ingredientes, {
                    title: 'NewIngredientes',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IngredientesController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/ingredientes/count'),
    (0, rest_1.response)(200, {
        description: 'Ingredientes model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Ingredientes)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IngredientesController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/ingredientes'),
    (0, rest_1.response)(200, {
        description: 'Array of Ingredientes model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Ingredientes, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Ingredientes)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IngredientesController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/ingredientes'),
    (0, rest_1.response)(200, {
        description: 'Ingredientes PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Ingredientes, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Ingredientes)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Ingredientes, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IngredientesController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/ingredientes/{id}'),
    (0, rest_1.response)(200, {
        description: 'Ingredientes model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Ingredientes, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Ingredientes, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IngredientesController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/ingredientes/{id}'),
    (0, rest_1.response)(204, {
        description: 'Ingredientes PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Ingredientes, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Ingredientes]),
    tslib_1.__metadata("design:returntype", Promise)
], IngredientesController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/ingredientes/{id}'),
    (0, rest_1.response)(204, {
        description: 'Ingredientes PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Ingredientes]),
    tslib_1.__metadata("design:returntype", Promise)
], IngredientesController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/ingredientes/{id}'),
    (0, rest_1.response)(204, {
        description: 'Ingredientes DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], IngredientesController.prototype, "deleteById", null);
exports.IngredientesController = IngredientesController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.IngredientesRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.IngredientesRepository])
], IngredientesController);
//# sourceMappingURL=ingredientes.controller.js.map