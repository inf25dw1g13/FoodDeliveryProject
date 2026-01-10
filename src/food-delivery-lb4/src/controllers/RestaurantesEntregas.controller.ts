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
  Entregas,
} from '../models';
import {RestaurantesRepository} from '../repositories';

export class RestaurantesEntregasController {
  constructor(
    @repository(RestaurantesRepository) protected restaurantesRepository: RestaurantesRepository,
  ) { }

  @get('/restaurantes/{id}/entregas', {
    responses: {
      '200': {
        description: 'Array of Restaurantes has many Entregas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Entregas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: number,
    @param.query.object('filter') filter?: Filter<Entregas>,
  ): Promise<Entregas[]> {
    return this.restaurantesRepository.entregases(id).find(filter);
  }

  @post('/restaurantes/{id}/entregas', {
    responses: {
      '200': {
        description: 'Restaurantes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Entregas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Restaurantes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entregas, {
            title: 'NewEntregasInRestaurantes',
            exclude: ['id'],
            optional: ['restaurante_id']
          }),
        },
      },
    }) entregas: Omit<Entregas, 'id'>,
  ): Promise<Entregas> {
    return this.restaurantesRepository.entregases(id).create(entregas);
  }

  @patch('/restaurantes/{id}/entregas', {
    responses: {
      '200': {
        description: 'Restaurantes.Entregas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entregas, {partial: true}),
        },
      },
    })
    entregas: Partial<Entregas>,
    @param.query.object('where', getWhereSchemaFor(Entregas)) where?: Where<Entregas>,
  ): Promise<Count> {
    return this.restaurantesRepository.entregases(id).patch(entregas, where);
  }

  @del('/restaurantes/{id}/entregas', {
    responses: {
      '200': {
        description: 'Restaurantes.Entregas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Entregas)) where?: Where<Entregas>,
  ): Promise<Count> {
    return this.restaurantesRepository.entregases(id).delete(where);
  }
}
