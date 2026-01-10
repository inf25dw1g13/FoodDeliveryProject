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
import {Codpostal} from '../models';
import {CodpostalRepository} from '../repositories';

export class CodpostalController {
  constructor(
    @repository(CodpostalRepository)
    public codpostalRepository : CodpostalRepository,
  ) {}

  @post('/codpostais')
  @response(200, {
    description: 'Codpostal model instance',
    content: {'application/json': {schema: getModelSchemaRef(Codpostal)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Codpostal, {
            title: 'NewCodpostal',
          }),
          example: {
            codpostal: '4000-001',
            localidade: 'Sé',
            cidade: 'Porto',
          },
        },
      },
    })
    codpostal: Codpostal,
  ): Promise<Codpostal> {
    return this.codpostalRepository.create(codpostal);
  }

  @get('/codpostais/count')
  @response(200, {
    description: 'Codpostal model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Codpostal) where?: Where<Codpostal>,
  ): Promise<Count> {
    return this.codpostalRepository.count(where);
  }

  @get('/codpostais')
  @response(200, {
    description: 'Array of Codpostal model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Codpostal, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Codpostal) filter?: Filter<Codpostal>,
  ): Promise<Codpostal[]> {
    // Remover order por id se existir, usar codpostal
    if (filter?.order) {
      const orderArray = Array.isArray(filter.order) ? filter.order : [filter.order];
      filter.order = orderArray.map(o => {
        if (typeof o === 'string') {
          return o.replace('id ', 'codpostal ').replace('id+', 'codpostal ');
        }
        return o;
      });
    }
    return this.codpostalRepository.find(filter);
  }

  @patch('/codpostais')
  @response(200, {
    description: 'Codpostal PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Codpostal, {partial: true}),
          example: {
            localidade: 'Localidade Atualizada',
          },
        },
      },
    })
    codpostal: Codpostal,
    @param.where(Codpostal) where?: Where<Codpostal>,
  ): Promise<Count> {
    return this.codpostalRepository.updateAll(codpostal, where);
  }

  @get('/codpostais/{id}')
  @response(200, {
    description: 'Codpostal model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Codpostal, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Codpostal, {exclude: 'where'}) filter?: FilterExcludingWhere<Codpostal>
  ): Promise<Codpostal> {
    return this.codpostalRepository.findById(id, filter);
  }

  @patch('/codpostais/{id}')
  @response(204, {
    description: 'Codpostal PATCH success',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Codpostal, {partial: true}),
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      description: 'Partial update of Codpostal (all fields optional)',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            additionalProperties: true,
            example: {
              localidade: 'Nova Localidade',
            },
          },
        },
      },
      required: false,
    } as any)
    codpostal: any,
  ): Promise<void> {
    // Usar updateAll para fazer update parcial sem validação de campos obrigatórios
    const updateData: Partial<Codpostal> = {};
    if (codpostal) {
      for (const key in codpostal) {
        if (codpostal[key] !== undefined && codpostal[key] !== null) {
          updateData[key as keyof Codpostal] = codpostal[key];
        }
      }
    }
    await this.codpostalRepository.updateAll(updateData, {codpostal: id});
  }

  @put('/codpostais/{id}')
  @response(204, {
    description: 'Codpostal PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Codpostal),
          example: {
            codpostal: '4000-001',
            localidade: 'Sé Atualizada',
            cidade: 'Porto',
          },
        },
      },
    }) codpostal: Codpostal,
  ): Promise<void> {
    await this.codpostalRepository.replaceById(id, codpostal);
  }

  @del('/codpostais/{id}')
  @response(204, {
    description: 'Codpostal DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.codpostalRepository.deleteById(id);
  }

  @get('/codpostais/search/{term}')
  @response(200, {
    description: 'Buscar códigos postais por termo',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Codpostal),
        },
      },
    },
  })
  async search(
    @param.path.string('term') term: string,
  ): Promise<Codpostal[]> {
    return this.codpostalRepository.find({
      where: {
        or: [
          {localidade: {like: `%${term}%`}},
          {cidade: {like: `%${term}%`}},
          {codpostal: {like: `%${term}%`}},
        ],
      },
      limit: 20,
    });
  }

  @get('/codpostais/cidade/{cidade}')
  @response(200, {
    description: 'Códigos postais por cidade',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Codpostal),
        },
      },
    },
  })
  async findByCidade(
    @param.path.string('cidade') cidade: string,
  ): Promise<Codpostal[]> {
    return this.codpostalRepository.find({
      where: {cidade: cidade},
    });
  }
}