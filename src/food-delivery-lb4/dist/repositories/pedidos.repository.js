"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidosRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let PedidosRepository = class PedidosRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, pedidosPratosThroughRepositoryGetter, pratosRepositoryGetter) {
        super(models_1.Pedidos, dataSource);
        this.pedidosPratosThroughRepositoryGetter = pedidosPratosThroughRepositoryGetter;
        this.pratosRepositoryGetter = pratosRepositoryGetter;
        this.pratos = this.createHasManyThroughRepositoryFactoryFor('pratos', pratosRepositoryGetter, pedidosPratosThroughRepositoryGetter);
        this.registerInclusionResolver('pratos', this.pratos.inclusionResolver);
    }
};
exports.PedidosRepository = PedidosRepository;
exports.PedidosRepository = PedidosRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.fooddb')),
    tslib_1.__param(1, repository_1.repository.getter('PedidosPratosThroughRepository')),
    tslib_1.__param(2, repository_1.repository.getter('PratosRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.FooddbDataSource, Function, Function])
], PedidosRepository);
//# sourceMappingURL=pedidos.repository.js.map