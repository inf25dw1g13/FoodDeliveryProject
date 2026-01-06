"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let ClientesRepository = class ClientesRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, pedidosRepositoryGetter) {
        super(models_1.Clientes, dataSource);
        this.pedidosRepositoryGetter = pedidosRepositoryGetter;
        this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidosRepositoryGetter);
        this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    }
};
exports.ClientesRepository = ClientesRepository;
exports.ClientesRepository = ClientesRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.fooddb')),
    tslib_1.__param(1, repository_1.repository.getter('PedidosRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.FooddbDataSource, Function])
], ClientesRepository);
//# sourceMappingURL=clientes.repository.js.map