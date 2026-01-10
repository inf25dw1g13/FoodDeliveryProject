import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Restaurantes,
  Pratos,
} from '../models';
import {RestaurantesRepository} from '../repositories';

export class RestaurantesPratosController {
  constructor(
    @repository(RestaurantesRepository) protected restaurantesRepository: RestaurantesRepository,
  ) { }

  @get('/restaurantes/{id}/pratos', {
    responses: {
      '200': {
        description: 'Array of Restaurantes has many Pratos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pratos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: number,
    @param.query.object('filter') filter?: Filter<Pratos>,
  ): Promise<Pratos[]> {
    return this.restaurantesRepository.pratos(id).find(filter);
  }

  @post('/restaurantes/{id}/pratos', {
    responses: {
      '200': {
        description: 'Restaurantes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pratos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Restaurantes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pratos, {
            title: 'NewPratosInRestaurantes',
            exclude: ['id'],
            optional: ['restaurante_id']
          }),
        },
      },
    }) pratos: Omit<Pratos, 'id'>,
  ): Promise<Pratos> {
    return this.restaurantesRepository.pratos(id).create(pratos);
  }

  @patch('/restaurantes/{id}/pratos', {
    responses: {
      '200': {
        description: 'Restaurantes.Pratos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pratos, {partial: true}),
        },
      },
    })
    pratos: Partial<Pratos>,
    @param.query.object('where', getWhereSchemaFor(Pratos)) where?: Where<Pratos>,
  ): Promise<Count> {
    return this.restaurantesRepository.pratos(id).patch(pratos, where);
  }

  @del('/restaurantes/{id}/pratos', {
    responses: {
      '200': {
        description: 'Restaurantes.Pratos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pratos)) where?: Where<Pratos>,
  ): Promise<Count> {
    return this.restaurantesRepository.pratos(id).delete(where);
  }
}
