import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PedidosPratos} from '../models';
import {PedidosPratosRepository} from '../repositories';

export class PedidosPratosTableController {
  constructor(
    @repository(PedidosPratosRepository)
    public pedidosPratosRepository : PedidosPratosRepository,
  ) {}

  @post('/pedidos-pratos')
  @response(200, {
    description: 'PedidosPratos model instance',
    content: {'application/json': {schema: getModelSchemaRef(PedidosPratos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidosPratos, {
            title: 'NewPedidosPratos',
            exclude: ['id'],
          }),
          example: {
            pedidosId: 1,
            pratosId: 1,
            quantidade: 2,
          },
        },
      },
    })
    pedidosPratos: Omit<PedidosPratos, 'id'>,
  ): Promise<PedidosPratos> {
    return this.pedidosPratosRepository.create(pedidosPratos);
  }

  @get('/pedidos-pratos/count')
  @response(200, {
    description: 'PedidosPratos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PedidosPratos) where?: Where<PedidosPratos>,
  ): Promise<Count> {
    return this.pedidosPratosRepository.count(where);
  }

  @get('/pedidos-pratos')
  @response(200, {
    description: 'Array of PedidosPratos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PedidosPratos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PedidosPratos) filter?: Filter<PedidosPratos>,
  ): Promise<PedidosPratos[]> {
    return this.pedidosPratosRepository.find(filter);
  }

  @patch('/pedidos-pratos')
  @response(200, {
    description: 'PedidosPratos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidosPratos, {partial: true}),
          example: {
            quantidade: 3,
          },
        },
      },
    })
    pedidosPratos: PedidosPratos,
    @param.where(PedidosPratos) where?: Where<PedidosPratos>,
  ): Promise<Count> {
    return this.pedidosPratosRepository.updateAll(pedidosPratos, where);
  }

  @get('/pedidos-pratos/{id}')
  @response(200, {
    description: 'PedidosPratos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PedidosPratos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PedidosPratos, {exclude: 'where'}) filter?: FilterExcludingWhere<PedidosPratos>
  ): Promise<PedidosPratos> {
    return this.pedidosPratosRepository.findById(id, filter);
  }

  @patch('/pedidos-pratos/{id}')
  @response(204, {
    description: 'PedidosPratos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidosPratos, {partial: true}),
          example: {
            quantidade: 4,
          },
        },
      },
    })
    pedidosPratos: PedidosPratos,
  ): Promise<void> {
    await this.pedidosPratosRepository.updateById(id, pedidosPratos);
  }

  @put('/pedidos-pratos/{id}')
  @response(204, {
    description: 'PedidosPratos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidosPratos),
          example: {
            id: 1,
            pedidosId: 1,
            pratosId: 1,
            quantidade: 3,
          },
        },
      },
    }) pedidosPratos: PedidosPratos,
  ): Promise<void> {
    await this.pedidosPratosRepository.replaceById(id, pedidosPratos);
  }

  @del('/pedidos-pratos/{id}')
  @response(204, {
    description: 'PedidosPratos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pedidosPratosRepository.deleteById(id);
  }
}
