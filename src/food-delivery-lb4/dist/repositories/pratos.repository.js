"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PratosRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let PratosRepository = class PratosRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, throughPratosIngredientesRepositoryGetter, ingredientesRepositoryGetter) {
        super(models_1.Pratos, dataSource);
        this.throughPratosIngredientesRepositoryGetter = throughPratosIngredientesRepositoryGetter;
        this.ingredientesRepositoryGetter = ingredientesRepositoryGetter;
        this.ingredientes = this.createHasManyThroughRepositoryFactoryFor('ingredientes', ingredientesRepositoryGetter, throughPratosIngredientesRepositoryGetter);
        this.registerInclusionResolver('ingredientes', this.ingredientes.inclusionResolver);
    }
};
exports.PratosRepository = PratosRepository;
exports.PratosRepository = PratosRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.fooddb')),
    tslib_1.__param(1, repository_1.repository.getter('ThroughPratosIngredientesRepository')),
    tslib_1.__param(2, repository_1.repository.getter('IngredientesRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.FooddbDataSource, Function, Function])
], PratosRepository);
//# sourceMappingURL=pratos.repository.js.map