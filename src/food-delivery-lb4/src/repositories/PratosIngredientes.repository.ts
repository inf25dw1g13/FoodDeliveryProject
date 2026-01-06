import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, BelongsToAccessor, repository,} from '@loopback/repository';
import {FoodDeliveryDataSource} from '../datasources';
import {PratosIngredientes, Ingredientes, Pratos} from '../models';
import {IngredientesRepository} from './Ingredientes.repository';
import {PratosRepository} from './Pratos.repository';

export class PratosIngredientesRepository extends DefaultCrudRepository<
  PratosIngredientes,
  typeof PratosIngredientes.prototype.id
> {

  public readonly ingredientes: BelongsToAccessor<
    Ingredientes,
    typeof PratosIngredientes.prototype.id
  >;

  public readonly pratos: BelongsToAccessor<
    Pratos,
    typeof PratosIngredientes.prototype.id
  >;

  constructor(
    @inject('datasources.food_delivery') dataSource: FoodDeliveryDataSource,
    @repository.getter('IngredientesRepository')
    protected ingredientesRepositoryGetter: Getter<IngredientesRepository>,
    @repository.getter('PratosRepository')
    protected pratosRepositoryGetter: Getter<PratosRepository>,
  ) {
    super(PratosIngredientes, dataSource);

    this.ingredientes = this.createBelongsToAccessorFor(
      'ingredientes',
      ingredientesRepositoryGetter,
    );
    this.registerInclusionResolver(
      'ingredientes',
      this.ingredientes.inclusionResolver,
    );

    this.pratos = this.createBelongsToAccessorFor(
      'pratos',
      pratosRepositoryGetter,
    );
    this.registerInclusionResolver(
      'pratos',
      this.pratos.inclusionResolver,
    );
  }
}
