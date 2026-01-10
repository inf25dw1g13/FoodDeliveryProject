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
Pedidos,
PedidosPratos,
Pratos,
} from '../models';
import {PedidosRepository} from '../repositories';

export class PedidosPratosController {
  constructor(
    @repository(PedidosRepository) protected pedidosRepository: PedidosRepository,
  ) { }

  @get('/pedidos/{id}/pratos', {
    responses: {
      '200': {
        description: 'Array of Pedidos has many Pratos through PedidosPratos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pratos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pratos>,
  ): Promise<Pratos[]> {
    return this.pedidosRepository.pratos(id).find(filter);
  }

  @post('/pedidos/{id}/pratos', {
    responses: {
      '200': {
        description: 'create a Pratos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pratos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pedidos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pratos, {
            title: 'NewPratosInPedidos',
            exclude: ['id'],
          }),
          example: {
            restaurante_id: 1,
            categoria_id: 1,
            nome: 'Pizza Margherita',
            preco: 850,
            descricao: 'Molho de tomate, mozzarella e manjericão',
            disponivel: true,
            vegetariano: true,
            vegan: false,
            sem_gluten: false,
          },
        },
      },
    }) pratos: Omit<Pratos, 'id'>,
  ): Promise<Pratos> {
    return this.pedidosRepository.pratos(id).create(pratos);
  }

  @patch('/pedidos/{id}/pratos', {
    responses: {
      '200': {
        description: 'Pedidos.Pratos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
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
    return this.pedidosRepository.pratos(id).patch(pratos, where);
  }

  @del('/pedidos/{id}/pratos', {
    responses: {
      '200': {
        description: 'Pedidos.Pratos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pratos)) where?: Where<Pratos>,
  ): Promise<Count> {
    return this.pedidosRepository.pratos(id).delete(where);
  }
}
