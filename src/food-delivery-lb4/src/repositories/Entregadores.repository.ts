import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {FoodDeliveryDataSource} from '../datasources';
import {Entregadores, EntregadoresRelations, Entregas, Codpostal} from '../models';
import {EntregasRepository} from './Entregas.repository';
import {CodpostalRepository} from './Codpostal.repository';

export class EntregadoresRepository extends DefaultCrudRepository<
  Entregadores,
  typeof Entregadores.prototype.id,
  EntregadoresRelations
> {

  public readonly entregas: HasManyRepositoryFactory<Entregas, typeof Entregadores.prototype.id>;

  public readonly codpostalRel: BelongsToAccessor<Codpostal, typeof Entregadores.prototype.id>;

  constructor(
    @inject('datasources.food_delivery') dataSource: FoodDeliveryDataSource, @repository.getter('EntregasRepository') protected entregasRepositoryGetter: Getter<EntregasRepository>, @repository.getter('CodpostalRepository') protected codpostalRepositoryGetter: Getter<CodpostalRepository>,
  ) {
    super(Entregadores, dataSource);
    this.codpostalRel = this.createBelongsToAccessorFor('codpostalRel', codpostalRepositoryGetter,);
    this.registerInclusionResolver('codpostalRel', this.codpostalRel.inclusionResolver);
    this.entregas = this.createHasManyRepositoryFactoryFor('entregas', entregasRepositoryGetter,);
    this.registerInclusionResolver('entregas', this.entregas.inclusionResolver);
  }
}
