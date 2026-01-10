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
import {Entregas} from '../models';
import {EntregasRepository} from '../repositories';

export class EntregasController {
  constructor(
    @repository(EntregasRepository)
    public entregasRepository : EntregasRepository,
  ) {}

  @post('/entregas')
  @response(200, {
    description: 'Entregas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Entregas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entregas, {
            title: 'NewEntregas',
            exclude: ['id'],
          }),
          example: {
            pedido_id: 100,
            entregador_id: 1,
            restaurante_id: 1,
            tempo_estimado_min: 30,
            estado: 'pendente',
          },
        },
      },
    })
    entregas: Omit<Entregas, 'id'>,
  ): Promise<Entregas> {
    return this.entregasRepository.create(entregas);
  }

  @get('/entregas/count')
  @response(200, {
    description: 'Entregas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Entregas) where?: Where<Entregas>,
  ): Promise<Count> {
    return this.entregasRepository.count(where);
  }

  @get('/entregas')
  @response(200, {
    description: 'Array of Entregas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Entregas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Entregas) filter?: Filter<Entregas>,
  ): Promise<Entregas[]> {
    return this.entregasRepository.find(filter);
  }

  @patch('/entregas')
  @response(200, {
    description: 'Entregas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entregas, {partial: true}),
          example: {
            estado: 'a_caminho',
          },
        },
      },
    })
    entregas: Entregas,
    @param.where(Entregas) where?: Where<Entregas>,
  ): Promise<Count> {
    return this.entregasRepository.updateAll(entregas, where);
  }

  @get('/entregas/{id}')
  @response(200, {
    description: 'Entregas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Entregas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Entregas, {exclude: 'where'}) filter?: FilterExcludingWhere<Entregas>
  ): Promise<Entregas> {
    return this.entregasRepository.findById(id, filter);
  }

  @patch('/entregas/{id}')
  @response(204, {
    description: 'Entregas PATCH success',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Entregas, {partial: true, exclude: ['id']}),
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            additionalProperties: true,
            example: {
              estado: 'entregue',
              tempo_real_min: 25,
            },
          },
        },
      },
      required: false,
    } as any)
    entregas: any,
  ): Promise<void> {
    const updateData: Partial<Entregas> = {};
    if (entregas) {
      for (const key in entregas) {
        if (entregas[key] !== undefined && entregas[key] !== null) {
          updateData[key as keyof Entregas] = entregas[key];
        }
      }
    }
    await this.entregasRepository.updateAll(updateData, {id: id});
  }

  @put('/entregas/{id}')
  @response(204, {
    description: 'Entregas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entregas),
          example: {
            id: 1,
            pedido_id: 1,
            entregador_id: 1,
            restaurante_id: 1,
            tempo_estimado_min: 30,
            tempo_real_min: 28,
            estado: 'entregue',
            hora_entrega: '14:30',
          },
        },
      },
    }) entregas: Entregas,
  ): Promise<void> {
    await this.entregasRepository.replaceById(id, entregas);
  }

  @del('/entregas/{id}')
  @response(204, {
    description: 'Entregas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.entregasRepository.deleteById(id);
  }
}
