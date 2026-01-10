"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantesEntregasController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let RestaurantesEntregasController = class RestaurantesEntregasController {
    constructor(restaurantesRepository) {
        this.restaurantesRepository = restaurantesRepository;
    }
    async find(id, filter) {
        return this.restaurantesRepository.entregases(id).find(filter);
    }
    async create(id, entregas) {
        return this.restaurantesRepository.entregases(id).create(entregas);
    }
    async patch(id, entregas, where) {
        return this.restaurantesRepository.entregases(id).patch(entregas, where);
    }
    async delete(id, where) {
        return this.restaurantesRepository.entregases(id).delete(where);
    }
};
exports.RestaurantesEntregasController = RestaurantesEntregasController;
tslib_1.__decorate([
    (0, rest_1.get)('/restaurantes/{id}/entregas', {
        responses: {
            '200': {
                description: 'Array of Restaurantes has many Entregas',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Entregas) },
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
], RestaurantesEntregasController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/restaurantes/{id}/entregas', {
        responses: {
            '200': {
                description: 'Restaurantes model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Entregas) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Entregas, {
                    title: 'NewEntregasInRestaurantes',
                    exclude: ['id'],
                    optional: ['restaurantesId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantesEntregasController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/restaurantes/{id}/entregas', {
        responses: {
            '200': {
                description: 'Restaurantes.Entregas PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Entregas, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Entregas))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantesEntregasController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/restaurantes/{id}/entregas', {
        responses: {
            '200': {
                description: 'Restaurantes.Entregas DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Entregas))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantesEntregasController.prototype, "delete", null);
exports.RestaurantesEntregasController = RestaurantesEntregasController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.RestaurantesRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.RestaurantesRepository])
], RestaurantesEntregasController);
//# sourceMappingURL=restaurantes-entregas.controller.js.map