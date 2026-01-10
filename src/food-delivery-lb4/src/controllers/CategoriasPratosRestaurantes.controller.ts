import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CategoriasPratos,
  Restaurantes,
} from '../models';
import {CategoriasPratosRepository} from '../repositories';

export class CategoriasPratosRestaurantesController {
  constructor(
    @repository(CategoriasPratosRepository) protected categoriasPratosRepository: CategoriasPratosRepository,
  ) { }

  @get('/categorias-pratos/{id}/restaurantes', {
    responses: {
      '200': {
        description: 'Array of CategoriasPratos has many Restaurantes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Restaurantes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
  ): Promise<Restaurantes[]> {
    return this.categoriasPratosRepository.restaurantes(id).find();
  }
}
