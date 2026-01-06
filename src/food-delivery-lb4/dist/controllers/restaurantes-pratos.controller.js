"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantesPratosController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let RestaurantesPratosController = class RestaurantesPratosController {
    constructor(restaurantesRepository) {
        this.restaurantesRepository = restaurantesRepository;
    }
    async find(id, filter) {
        return this.restaurantesRepository.pratos(id).find(filter);
    }
    async create(id, pratos) {
        return this.restaurantesRepository.pratos(id).create(pratos);
    }
    async patch(id, pratos, where) {
        return this.restaurantesRepository.pratos(id).patch(pratos, where);
    }
    async delete(id, where) {
        return this.restaurantesRepository.pratos(id).delete(where);
    }
};
exports.RestaurantesPratosController = RestaurantesPratosController;
tslib_1.__decorate([
    (0, rest_1.get)('/restaurantes/{id}/pratos', {
        responses: {
            '200': {
                description: 'Array of Restaurantes has many Pratos',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Pratos) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantesPratosController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/restaurantes/{id}/pratos', {
        responses: {
            '200': {
                description: 'Restaurantes model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Pratos) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Pratos, {
                    title: 'NewPratosInRestaurantes',
                    exclude: ['id'],
                    optional: ['restaurantesId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantesPratosController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/restaurantes/{id}/pratos', {
        responses: {
            '200': {
                description: 'Restaurantes.Pratos PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
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
], RestaurantesPratosController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/restaurantes/{id}/pratos', {
        responses: {
            '200': {
                description: 'Restaurantes.Pratos DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Pratos))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantesPratosController.prototype, "delete", null);
exports.RestaurantesPratosController = RestaurantesPratosController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.RestaurantesRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.RestaurantesRepository])
], RestaurantesPratosController);
//# sourceMappingURL=restaurantes-pratos.controller.js.map