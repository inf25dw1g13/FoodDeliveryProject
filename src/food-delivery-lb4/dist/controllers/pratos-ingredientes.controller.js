"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PratosIngredientesController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let PratosIngredientesController = class PratosIngredientesController {
    constructor(pratosRepository) {
        this.pratosRepository = pratosRepository;
    }
    async find(id, filter) {
        return this.pratosRepository.ingredientes(id).find(filter);
    }
    async create(id, ingredientes) {
        return this.pratosRepository.ingredientes(id).create(ingredientes);
    }
    async patch(id, ingredientes, where) {
        return this.pratosRepository.ingredientes(id).patch(ingredientes, where);
    }
    async delete(id, where) {
        return this.pratosRepository.ingredientes(id).delete(where);
    }
};
exports.PratosIngredientesController = PratosIngredientesController;
tslib_1.__decorate([
    (0, rest_1.get)('/pratos/{id}/ingredientes', {
        responses: {
            '200': {
                description: 'Array of Pratos has many Ingredientes through ThroughPratosIngredientes',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Ingredientes) },
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
], PratosIngredientesController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/pratos/{id}/ingredientes', {
        responses: {
            '200': {
                description: 'create a Ingredientes model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Ingredientes) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Ingredientes, {
                    title: 'NewIngredientesInPratos',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PratosIngredientesController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/pratos/{id}/ingredientes', {
        responses: {
            '200': {
                description: 'Pratos.Ingredientes PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Ingredientes, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Ingredientes))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PratosIngredientesController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/pratos/{id}/ingredientes', {
        responses: {
            '200': {
                description: 'Pratos.Ingredientes DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Ingredientes))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PratosIngredientesController.prototype, "delete", null);
exports.PratosIngredientesController = PratosIngredientesController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.PratosRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PratosRepository])
], PratosIngredientesController);
//# sourceMappingURL=pratos-ingredientes.controller.js.map