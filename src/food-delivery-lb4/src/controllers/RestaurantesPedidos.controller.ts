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
  Pedidos,
} from '../models';
import {RestaurantesRepository} from '../repositories';

export class RestaurantesPedidosController {
  constructor(
    @repository(RestaurantesRepository) protected restaurantesRepository: RestaurantesRepository,
  ) { }

  @get('/restaurantes/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of Restaurantes has many Pedidos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedidos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: number,
    @param.query.object('filter') filter?: Filter<Pedidos>,
  ): Promise<Pedidos[]> {
    return this.restaurantesRepository.pedidos(id).find(filter);
  }

  @post('/restaurantes/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Restaurantes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedidos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Restaurantes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {
            title: 'NewPedidosInRestaurantes',
            exclude: ['id'],
            optional: ['restaurante_id']
          }),
        },
      },
    }) pedidos: Omit<Pedidos, 'id'>,
  ): Promise<Pedidos> {
    return this.restaurantesRepository.pedidos(id).create(pedidos);
  }

  @patch('/restaurantes/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Restaurantes.Pedidos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {partial: true}),
        },
      },
    })
    pedidos: Partial<Pedidos>,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.restaurantesRepository.pedidos(id).patch(pedidos, where);
  }

  @del('/restaurantes/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Restaurantes.Pedidos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.restaurantesRepository.pedidos(id).delete(where);
  }
}
