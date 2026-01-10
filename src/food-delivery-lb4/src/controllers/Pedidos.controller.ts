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
import {Pedidos} from '../models';
import {PedidosRepository} from '../repositories';

export class PedidosController {
  constructor(
    @repository(PedidosRepository)
    public pedidosRepository : PedidosRepository,
  ) {}

  @post('/pedidos')
  @response(200, {
    description: 'Pedidos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pedidos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {
            title: 'NewPedidos',
            exclude: ['id'],
          }),
          example: {
            cliente_id: 1,
            restaurante_id: 1,
            metodo_pagamento: 'cartao',
            hora_pedido: new Date().toISOString(),
            total: 45.50,
          },
        },
      },
    })
    pedidos: Omit<Pedidos, 'id'>,
  ): Promise<Pedidos> {
    return this.pedidosRepository.create(pedidos);
  }

  @get('/pedidos/count')
  @response(200, {
    description: 'Pedidos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pedidos) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.pedidosRepository.count(where);
  }

  @get('/pedidos')
  @response(200, {
    description: 'Array of Pedidos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pedidos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pedidos) filter?: Filter<Pedidos>,
  ): Promise<Pedidos[]> {
    return this.pedidosRepository.find(filter);
  }

  @patch('/pedidos')
  @response(200, {
    description: 'Pedidos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {partial: true}),
          example: {
            metodo_pagamento: 'paypal',
          },
        },
      },
    })
    pedidos: Pedidos,
    @param.where(Pedidos) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.pedidosRepository.updateAll(pedidos, where);
  }

  @get('/pedidos/{id}')
  @response(200, {
    description: 'Pedidos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pedidos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pedidos, {exclude: 'where'}) filter?: FilterExcludingWhere<Pedidos>
  ): Promise<Pedidos> {
    return this.pedidosRepository.findById(id, filter);
  }

  @patch('/pedidos/{id}')
  @response(204, {
    description: 'Pedidos PATCH success',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pedidos, {partial: true, exclude: ['id']}),
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      description: 'Partial update of Pedidos (all fields optional)',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            additionalProperties: true,
            example: {
              metodo_pagamento: 'paypal',
            },
          },
        },
      },
      required: false,
    } as any)
    pedidos: any,
  ): Promise<void> {
    // Usar updateAll para fazer update parcial sem validação de campos obrigatórios
    const updateData: Partial<Pedidos> = {};
    if (pedidos) {
      for (const key in pedidos) {
        if (pedidos[key] !== undefined && pedidos[key] !== null) {
          updateData[key as keyof Pedidos] = pedidos[key];
        }
      }
    }
    await this.pedidosRepository.updateAll(updateData, {id: id});
  }

  @put('/pedidos/{id}')
  @response(204, {
    description: 'Pedidos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos),
          example: {
            id: 1,
            cliente_id: 1,
            restaurante_id: 1,
            metodo_pagamento: 'dinheiro',
            hora_pedido: new Date().toISOString(),
            total: 45.50,
          },
        },
      },
    }) pedidos: Pedidos,
  ): Promise<void> {
    await this.pedidosRepository.replaceById(id, pedidos);
  }

  @del('/pedidos/{id}')
  @response(204, {
    description: 'Pedidos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pedidosRepository.deleteById(id);
  }
}
