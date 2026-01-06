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
import {Entregadores} from '../models';
import {EntregadoresRepository} from '../repositories';

export class EntregadoresController {
  constructor(
    @repository(EntregadoresRepository)
    public entregadoresRepository : EntregadoresRepository,
  ) {}

  @post('/entregadores')
  @response(200, {
    description: 'Entregadores model instance',
    content: {'application/json': {schema: getModelSchemaRef(Entregadores)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entregadores, {
            title: 'NewEntregadores',
            exclude: ['id'],
          }),
          example: {
            nome: 'João Delivery',
            email: 'joao.delivery@food.pt',
            telefone: '961234567',
            codpostal: '4000-001',
            estado: 'disponivel',
          },
        },
      },
    })
    entregadores: Omit<Entregadores, 'id'>,
  ): Promise<Entregadores> {
    return this.entregadoresRepository.create(entregadores);
  }

  @get('/entregadores/count')
  @response(200, {
    description: 'Entregadores model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Entregadores) where?: Where<Entregadores>,
  ): Promise<Count> {
    return this.entregadoresRepository.count(where);
  }

  @get('/entregadores')
  @response(200, {
    description: 'Array of Entregadores model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Entregadores, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Entregadores) filter?: Filter<Entregadores>,
  ): Promise<Entregadores[]> {
    return this.entregadoresRepository.find(filter);
  }

  @patch('/entregadores')
  @response(200, {
    description: 'Entregadores PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entregadores, {partial: true}),
          example: {
            estado: 'disponivel',
          },
        },
      },
    })
    entregadores: Entregadores,
    @param.where(Entregadores) where?: Where<Entregadores>,
  ): Promise<Count> {
    return this.entregadoresRepository.updateAll(entregadores, where);
  }

  @get('/entregadores/{id}')
  @response(200, {
    description: 'Entregadores model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Entregadores, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Entregadores, {exclude: 'where'}) filter?: FilterExcludingWhere<Entregadores>
  ): Promise<Entregadores> {
    return this.entregadoresRepository.findById(id, filter);
  }

  @patch('/entregadores/{id}')
  @response(204, {
    description: 'Entregadores PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entregadores, {partial: true}),
          example: {
            estado: 'ocupado',
          },
        },
      },
    })
    entregadores: Entregadores,
  ): Promise<void> {
    await this.entregadoresRepository.updateById(id, entregadores);
  }

  @put('/entregadores/{id}')
  @response(204, {
    description: 'Entregadores PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entregadores),
          example: {
            id: 1,
            nome: 'João Delivery Atualizado',
            email: 'joao.novo@food.pt',
            telefone: '969999999',
            codpostal: '4000-056',
            estado: 'disponivel',
          },
        },
      },
    }) entregadores: Entregadores,
  ): Promise<void> {
    await this.entregadoresRepository.replaceById(id, entregadores);
  }

  @del('/entregadores/{id}')
  @response(204, {
    description: 'Entregadores DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.entregadoresRepository.deleteById(id);
  }

  @get('/entregadores/disponiveis')
  @response(200, {
    description: 'Entregadores disponíveis',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Entregadores),
        },
      },
    },
  })
  async findDisponiveis(): Promise<Entregadores[]> {
    return this.entregadoresRepository.find({
      where: {estado: 'disponivel'},
    });
  }

  @get('/entregadores/{id}/entregas')
  @response(200, {
    description: 'Entregas do entregador',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
          },
        },
      },
    },
  })
  async findEntregas(
    @param.path.number('id') id: number,
  ): Promise<any[]> {
    const entregas = await this.entregadoresRepository.entregas(id).find({
      include: [{relation: 'pedido'}],
    });
    return entregas;
  }

  @get('/entregadores/{id}/stats')
  @response(200, {
    description: 'Estatísticas do entregador',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            total_entregas: {type: 'number'},
            entregas_concluidas: {type: 'number'},
            entregas_canceladas: {type: 'number'},
            tempo_medio_entrega: {type: 'number'},
          },
        },
      },
    },
  })
  async getStats(
    @param.path.number('id') id: number,
  ): Promise<any> {
    const entregas = await this.entregadoresRepository.entregas(id).find();
    const total_entregas = entregas.length;
    const entregas_concluidas = entregas.filter(e => e.estado === 'entregue').length;
    const entregas_canceladas = entregas.filter(e => e.estado === 'cancelado').length;
    
    const tempos = entregas
      .filter(e => e.tempo_real_min)
      .map(e => e.tempo_real_min!);
    
    const tempo_medio_entrega = tempos.length > 0
      ? tempos.reduce((a, b) => a + b, 0) / tempos.length
      : 0;

    return {
      total_entregas,
      entregas_concluidas,
      entregas_canceladas,
      tempo_medio_entrega: Math.round(tempo_medio_entrega),
    };
  }

  @patch('/entregadores/{id}/estado')
  @response(204, {
    description: 'Atualizar estado do entregador',
  })
  async updateEstado(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              estado: {
                type: 'string',
                enum: ['disponivel', 'ocupado', 'indisponivel'],
              },
            },
          },
          example: {
            estado: 'ocupado',
          },
        },
      },
    })
    body: {estado: string},
  ): Promise<void> {
    await this.entregadoresRepository.updateById(id, {estado: body.estado});
  }
}
