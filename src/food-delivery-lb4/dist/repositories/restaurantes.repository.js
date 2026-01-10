"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantesRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let RestaurantesRepository = class RestaurantesRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, pratosRepositoryGetter, pedidosRepositoryGetter, entregasRepositoryGetter) {
        super(models_1.Restaurantes, dataSource);
        this.pratosRepositoryGetter = pratosRepositoryGetter;
        this.pedidosRepositoryGetter = pedidosRepositoryGetter;
        this.entregasRepositoryGetter = entregasRepositoryGetter;
        this.entregases = this.createHasManyRepositoryFactoryFor('entregases', entregasRepositoryGetter);
        this.registerInclusionResolver('entregases', this.entregases.inclusionResolver);
        this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidosRepositoryGetter);
        this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
        this.pratos = this.createHasManyRepositoryFactoryFor('pratos', pratosRepositoryGetter);
        this.registerInclusionResolver('pratos', this.pratos.inclusionResolver);
    }
};
exports.RestaurantesRepository = RestaurantesRepository;
exports.RestaurantesRepository = RestaurantesRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.fooddb')),
    tslib_1.__param(1, repository_1.repository.getter('PratosRepository')),
    tslib_1.__param(2, repository_1.repository.getter('PedidosRepository')),
    tslib_1.__param(3, repository_1.repository.getter('EntregasRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.FooddbDataSource, Function, Function, Function])
], RestaurantesRepository);
//# sourceMappingURL=restaurantes.repository.js.map