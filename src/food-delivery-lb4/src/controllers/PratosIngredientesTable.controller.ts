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
import {PratosIngredientes} from '../models';
import {PratosIngredientesRepository} from '../repositories';

export class PratosIngredientesTableController {
  constructor(
    @repository(PratosIngredientesRepository)
    public pratosIngredientesRepository : PratosIngredientesRepository,
  ) {}

  @post('/pratos-ingredientes')
  @response(200, {
    description: 'PratosIngredientes model instance',
    content: {'application/json': {schema: getModelSchemaRef(PratosIngredientes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PratosIngredientes, {
            title: 'NewPratosIngredientes',
            exclude: ['id'],
          }),
          example: {
            pratosId: 11,
            ingredientesId: 11,
            quantidade: '200',
            obrigatorio: true,
            unidade: 'g',
          },
        },
      },
    })
    pratosIngredientes: Omit<PratosIngredientes, 'id'>,
  ): Promise<PratosIngredientes> {
    return this.pratosIngredientesRepository.create(pratosIngredientes);
  }

  @get('/pratos-ingredientes/count')
  @response(200, {
    description: 'PratosIngredientes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PratosIngredientes) where?: Where<PratosIngredientes>,
  ): Promise<Count> {
    return this.pratosIngredientesRepository.count(where);
  }

  @get('/pratos-ingredientes')
  @response(200, {
    description: 'Array of PratosIngredientes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PratosIngredientes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PratosIngredientes) filter?: Filter<PratosIngredientes>,
  ): Promise<PratosIngredientes[]> {
    return this.pratosIngredientesRepository.find(filter);
  }

  @patch('/pratos-ingredientes')
  @response(200, {
    description: 'PratosIngredientes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PratosIngredientes, {partial: true}),
          example: {
            obrigatorio: false,
          },
        },
      },
    })
    pratosIngredientes: PratosIngredientes,
    @param.where(PratosIngredientes) where?: Where<PratosIngredientes>,
  ): Promise<Count> {
    return this.pratosIngredientesRepository.updateAll(pratosIngredientes, where);
  }

  @get('/pratos-ingredientes/{id}')
  @response(200, {
    description: 'PratosIngredientes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PratosIngredientes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PratosIngredientes, {exclude: 'where'}) filter?: FilterExcludingWhere<PratosIngredientes>
  ): Promise<PratosIngredientes> {
    return this.pratosIngredientesRepository.findById(id, filter);
  }

  @patch('/pratos-ingredientes/{id}')
  @response(204, {
    description: 'PratosIngredientes PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PratosIngredientes, {partial: true}),
          example: {
            quantidade: '300',
            obrigatorio: false,
          },
        },
      },
    })
    pratosIngredientes: PratosIngredientes,
  ): Promise<void> {
    await this.pratosIngredientesRepository.updateById(id, pratosIngredientes);
  }

  @put('/pratos-ingredientes/{id}')
  @response(204, {
    description: 'PratosIngredientes PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PratosIngredientes),
          example: {
            id: 1,
            pratosId: 1,
            ingredientesId: 1,
            quantidade: '250',
            obrigatorio: true,
            unidade: 'g',
          },
        },
      },
    }) pratosIngredientes: PratosIngredientes,
  ): Promise<void> {
    await this.pratosIngredientesRepository.replaceById(id, pratosIngredientes);
  }

  @del('/pratos-ingredientes/{id}')
  @response(204, {
    description: 'PratosIngredientes DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pratosIngredientesRepository.deleteById(id);
  }
}
