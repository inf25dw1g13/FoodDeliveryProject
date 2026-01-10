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
import {Clientes} from '../models';
import {ClientesRepository} from '../repositories';

export class ClientesController {
  constructor(
    @repository(ClientesRepository)
    public clientesRepository : ClientesRepository,
  ) {}

  @post('/clientes')
  @response(200, {
    description: 'Clientes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Clientes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {
            title: 'NewClientes',
            exclude: ['id'],
          }),
          example: {
            nome: 'João Silva',
            email: 'joao.silva@email.pt',
            telefone: '912345678',
            morada: 'Rua das Flores, 45',
            codpostal: '4000-001',
          },
        },
      },
    })
    clientes: Omit<Clientes, 'id'>,
  ): Promise<Clientes> {
    return this.clientesRepository.create(clientes);
  }

  @get('/clientes/count')
  @response(200, {
    description: 'Clientes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Clientes) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.clientesRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Clientes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Clientes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Clientes) filter?: Filter<Clientes>,
  ): Promise<Clientes[]> {
    return this.clientesRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Clientes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {partial: true}),
          example: {
            telefone: '919999999',
          },
        },
      },
    })
    clientes: Clientes,
    @param.where(Clientes) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.clientesRepository.updateAll(clientes, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Clientes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Clientes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Clientes, {exclude: 'where'}) filter?: FilterExcludingWhere<Clientes>
  ): Promise<Clientes> {
    return this.clientesRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Clientes PATCH success',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Clientes, {partial: true, exclude: ['id']}),
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
              telefone: '919999999',
              morada: 'Nova morada, 123',
            },
          },
        },
      },
      required: false,
    } as any)
    clientes: any,
  ): Promise<void> {
    const updateData: Partial<Clientes> = {};
    if (clientes) {
      for (const key in clientes) {
        if (clientes[key] !== undefined && clientes[key] !== null) {
          updateData[key as keyof Clientes] = clientes[key];
        }
      }
    }
    await this.clientesRepository.updateAll(updateData, {id: id});
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Clientes PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes),
          example: {
            nome: 'João Silva Atualizado',
            email: 'joao.silva.novo@email.pt',
            telefone: '919999999',
            morada: 'Nova Rua, 789',
            codpostal: '4000-056',
          },
        },
      },
    }) clientes: Clientes,
  ): Promise<void> {
    await this.clientesRepository.replaceById(id, clientes);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Clientes DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clientesRepository.deleteById(id);
  }
}
