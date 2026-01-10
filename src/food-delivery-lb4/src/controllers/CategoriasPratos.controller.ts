//Os filtros do loopback precisaram de ajuda AI e muito tempo de research e noites sem dormir para depois eu descobrir que provabelmente nao muda nada porque no powerpoint só tem o filtro do react

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
import {CategoriasPratos} from '../models';
import {CategoriasPratosRepository} from '../repositories';

export class CategoriasPratosController {
  constructor(
    @repository(CategoriasPratosRepository)
    public categoriasPratosRepository : CategoriasPratosRepository,
  ) {}

  @post('/categorias-pratos')
  @response(200, {
    description: 'CategoriasPratos model instance',
    content: {'application/json': {schema: getModelSchemaRef(CategoriasPratos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriasPratos, {
            title: 'NewCategoriasPratos',
            exclude: ['id'],
          }),
          example: {
            nome: 'Pizza',
          },
        },
      },
    })
    categoriasPratos: Omit<CategoriasPratos, 'id'>,
  ): Promise<CategoriasPratos> {
    return this.categoriasPratosRepository.create(categoriasPratos);
  }

  @get('/categorias-pratos/count')
  @response(200, {
    description: 'CategoriasPratos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CategoriasPratos) where?: Where<CategoriasPratos>,
  ): Promise<Count> {
    return this.categoriasPratosRepository.count(where);
  }

  @get('/categorias-pratos')
  @response(200, {
    description: 'Array of CategoriasPratos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CategoriasPratos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CategoriasPratos) filter?: Filter<CategoriasPratos>,
  ): Promise<CategoriasPratos[]> {
    // Adicionar include de pratos se não estiver especificado
    if (!filter) {
      filter = {};
    }
    if (!filter.include) {
      filter.include = [{relation: 'pratos'}];
    }
    return this.categoriasPratosRepository.find(filter);
  }

  @get('/categorias-pratos/{id}')
  @response(200, {
    description: 'CategoriasPratos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CategoriasPratos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CategoriasPratos, {exclude: 'where'}) filter?: FilterExcludingWhere<CategoriasPratos>
  ): Promise<CategoriasPratos> {
    return this.categoriasPratosRepository.findById(id, filter);
  }

  @patch('/categorias-pratos/{id}')
  @response(204, {
    description: 'CategoriasPratos PATCH success',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CategoriasPratos, {partial: true, exclude: ['id']}),
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      description: 'Partial update of CategoriasPratos (all fields optional)',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            additionalProperties: true,
            example: {
              nome: 'Pizza Atualizada',
            },
          },
        },
      },
      required: false,
    } as any)
    categoriasPratos: any,
  ): Promise<void> {
    // Usar updateAll para fazer update parcial sem validação de campos obrigatórios
    const updateData: Partial<CategoriasPratos> = {};
    if (categoriasPratos) {
      for (const key in categoriasPratos) {
        if (categoriasPratos[key] !== undefined && categoriasPratos[key] !== null) {
          updateData[key as keyof CategoriasPratos] = categoriasPratos[key];
        }
      }
    }
    await this.categoriasPratosRepository.updateAll(updateData, {id: id});
  }

  @put('/categorias-pratos/{id}')
  @response(204, {
    description: 'CategoriasPratos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriasPratos),
          example: {
            id: 1,
            nome: 'Pizza Completa',
          },
        },
      },
    }) categoriasPratos: CategoriasPratos,
  ): Promise<void> {
    await this.categoriasPratosRepository.replaceById(id, categoriasPratos);
  }

  @del('/categorias-pratos/{id}')
  @response(204, {
    description: 'CategoriasPratos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.categoriasPratosRepository.deleteById(id);
  }

  @get('/categorias-pratos/{id}/pratos')
  @response(200, {
    description: 'Pratos da categoria',
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
  async findPratos(
    @param.path.number('id') id: number,
  ): Promise<any[]> {
    const pratos = await this.categoriasPratosRepository.pratos(id).find();
    return pratos;
  }
}
