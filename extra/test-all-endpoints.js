#!/usr/bin/env node


/**
 * Script para testar automaticamente todos os endpoints da API LoopBack
 * Criado com a ajuda de IA
 * 
 * Requisitos: Node.js 18+ (para fetch nativo)
 *             ou instalar: npm install node-fetch
 * 
 * Uso: node test-all-endpoints.js [baseUrl]
 * Exemplo: node test-all-endpoints.js http://localhost:3000
 */

// Verificar se fetch está disponível (Node 18+)
let fetch;
try {
  fetch = globalThis.fetch || require('node-fetch');
} catch (e) {
  console.error('ERRO: fetch não está disponível. Use Node.js 18+ ou instale: npm install node-fetch');
  process.exit(1);
}

const BASE_URL = process.argv[2] || 'http://127.0.0.1:3000';

// Cores para o terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Estatísticas dos testes
const stats = {
  total: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
};

// IDs criados durante os testes (para cleanup)
const createdIds = {
  restaurantes: [],
  clientes: [],
  entregadores: [],
  pratos: [],
  ingredientes: [],
  categorias: [],
  codpostais: [],
  pedidos: [],
  entregas: [],
  pedidosPratos: [],
  pratosIngredientes: [],
};

/**
 * Função auxiliar para fazer requisições HTTP
 */
async function request(method, url, body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    let data = null;
    
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    return {
      status: response.status,
      ok: response.ok,
      data,
      headers: Object.fromEntries(response.headers.entries()),
    };
  } catch (error) {
    return {
      status: 0,
      ok: false,
      error: error.message,
    };
  }
}

/**
 * Função para executar um teste
 */
async function test(name, testFn) {
  stats.total++;
  process.stdout.write(`\n${colors.cyan}[TEST]${colors.reset} ${name}... `);

  try {
    const result = await testFn();
    if (result.success) {
      console.log(`${colors.green}✓ PASSOU${colors.reset}`);
      stats.passed++;
      return result.data;
    } else {
      console.log(`${colors.red}✗ FALHOU${colors.reset}`);
      console.log(`  ${colors.red}→${colors.reset} ${result.message}`);
      stats.failed++;
      return null;
    }
  } catch (error) {
    console.log(`${colors.red}✗ ERRO${colors.reset}`);
    console.log(`  ${colors.red}→${colors.reset} ${error.message}`);
    stats.failed++;
    return null;
  }
}

/**
 * Testes para Códigos Postais
 */
async function testCodpostais() {
  console.log(`\n${colors.bright}${colors.blue}=== TESTANDO CÓDIGOS POSTAIS ===${colors.reset}`);

  // GET /codpostais
  await test('GET /codpostais', async () => {
    const res = await request('GET', `${BASE_URL}/codpostais`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    if (!Array.isArray(res.data)) return { success: false, message: 'Resposta não é array' };
    return { success: true, data: res.data };
  });

  // GET /codpostais/{id}
  const codpostalId = '4000-001';
  await test(`GET /codpostais/${codpostalId}`, async () => {
    const res = await request('GET', `${BASE_URL}/codpostais/${codpostalId}`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // POST /codpostais
  const newCodpostal = {
    codpostal: '9999-999',
    localidade: 'Teste',
    cidade: 'TesteCity',
  };
  const createdCodpostal = await test('POST /codpostais', async () => {
    const res = await request('POST', `${BASE_URL}/codpostais`, newCodpostal);
    if (!res.ok) return { success: false, message: `Status ${res.status}: ${JSON.stringify(res.data)}` };
    createdIds.codpostais.push(res.data.codpostal);
    return { success: true, data: res.data };
  });

  // GET /codpostais/count
  await test('GET /codpostais/count', async () => {
    const res = await request('GET', `${BASE_URL}/codpostais/count`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // PATCH /codpostais/{id}
  if (createdCodpostal) {
    await test(`PATCH /codpostais/${createdCodpostal.codpostal}`, async () => {
      const res = await request('PATCH', `${BASE_URL}/codpostais/${createdCodpostal.codpostal}`, { localidade: 'Localidade Atualizada' });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PUT /codpostais/{id}
    await test(`PUT /codpostais/${createdCodpostal.codpostal}`, async () => {
      const res = await request('PUT', `${BASE_URL}/codpostais/${createdCodpostal.codpostal}`, {
        codpostal: createdCodpostal.codpostal,
        localidade: 'Localidade Nova',
        cidade: 'Cidade Nova',
      });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // DELETE /codpostais/{id}
    // Não vamos deletar aqui porque pode quebrar outras entidades - fazemos no cleanup
  }

  // GET /codpostais/search/{term}
  await test('GET /codpostais/search/Porto', async () => {
    const res = await request('GET', `${BASE_URL}/codpostais/search/Porto`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // GET /codpostais/cidade/{cidade}
  await test('GET /codpostais/cidade/Porto', async () => {
    const res = await request('GET', `${BASE_URL}/codpostais/cidade/Porto`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });
}

/**
 * Testes para Categorias de Pratos
 */
async function testCategoriasPratos() {
  console.log(`\n${colors.bright}${colors.blue}=== TESTANDO CATEGORIAS DE PRATOS ===${colors.reset}`);

  // POST /categorias-pratos
  const newCategoria = { nome: 'Teste Categoria ' + Date.now() };
  const createdCategoria = await test('POST /categorias-pratos', async () => {
    const res = await request('POST', `${BASE_URL}/categorias-pratos`, newCategoria);
    if (!res.ok) return { success: false, message: `Status ${res.status}: ${JSON.stringify(res.data)}` };
    createdIds.categorias.push(res.data.id);
    return { success: true, data: res.data };
  });

  // GET /categorias-pratos
  await test('GET /categorias-pratos', async () => {
    const res = await request('GET', `${BASE_URL}/categorias-pratos`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // GET /categorias-pratos/count
  await test('GET /categorias-pratos/count', async () => {
    const res = await request('GET', `${BASE_URL}/categorias-pratos/count`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  if (createdCategoria) {
    const catId = createdCategoria.id;
    // GET /categorias-pratos/{id}
    await test(`GET /categorias-pratos/${catId}`, async () => {
      const res = await request('GET', `${BASE_URL}/categorias-pratos/${catId}`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PATCH /categorias-pratos/{id}
    await test(`PATCH /categorias-pratos/${catId}`, async () => {
      const res = await request('PATCH', `${BASE_URL}/categorias-pratos/${catId}`, { nome: 'Categoria Atualizada' });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PUT /categorias-pratos/{id}
    await test(`PUT /categorias-pratos/${catId}`, async () => {
      const res = await request('PUT', `${BASE_URL}/categorias-pratos/${catId}`, { id: catId, nome: 'Categoria Completa' });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // GET /categorias-pratos/{id}/pratos
    await test(`GET /categorias-pratos/${catId}/pratos`, async () => {
      const res = await request('GET', `${BASE_URL}/categorias-pratos/${catId}/pratos`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });
  }

}

/**
 * Testes para Ingredientes
 */
async function testIngredientes() {
  console.log(`\n${colors.bright}${colors.blue}=== TESTANDO INGREDIENTES ===${colors.reset}`);

  // POST /ingredientes
  const newIngrediente = {
    nome: 'Ingrediente Teste ' + Date.now(),
    tipo: 'vegetal',
    alergeno: false,
  };
  const createdIngrediente = await test('POST /ingredientes', async () => {
    const res = await request('POST', `${BASE_URL}/ingredientes`, newIngrediente);
    if (!res.ok) return { success: false, message: `Status ${res.status}: ${JSON.stringify(res.data)}` };
    createdIds.ingredientes.push(res.data.id);
    return { success: true, data: res.data };
  });

  // GET /ingredientes
  await test('GET /ingredientes', async () => {
    const res = await request('GET', `${BASE_URL}/ingredientes`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // GET /ingredientes/count
  await test('GET /ingredientes/count', async () => {
    const res = await request('GET', `${BASE_URL}/ingredientes/count`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  if (createdIngrediente) {
    const ingId = createdIngrediente.id;
    // GET /ingredientes/{id}
    await test(`GET /ingredientes/${ingId}`, async () => {
      const res = await request('GET', `${BASE_URL}/ingredientes/${ingId}`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PATCH /ingredientes/{id}
    await test(`PATCH /ingredientes/${ingId}`, async () => {
      const res = await request('PATCH', `${BASE_URL}/ingredientes/${ingId}`, { tipo: 'fruta' });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PUT /ingredientes/{id}
    await test(`PUT /ingredientes/${ingId}`, async () => {
      const res = await request('PUT', `${BASE_URL}/ingredientes/${ingId}`, {
        id: ingId,
        nome: createdIngrediente.nome,
        tipo: 'vegetal',
        alergeno: true,
      });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });
  }

  // PATCH /ingredientes (updateAll)
  await test('PATCH /ingredientes', async () => {
    const res = await request('PATCH', `${BASE_URL}/ingredientes`, { tipo: 'vegetal' });
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  return createdIngrediente;
}

/**
 * Testes para Restaurantes
 */
async function testRestaurantes() {
  console.log(`\n${colors.bright}${colors.blue}=== TESTANDO RESTAURANTES ===${colors.reset}`);

  // POST /restaurantes
  const newRestaurante = {
    nome: 'Restaurante Teste ' + Date.now(),
    morada: 'Rua Teste, 123',
    codpostal: '4000-001',
    telefone: '223456789',
    email: 'teste@restaurante.pt',
    especialidade_id: 1,
    hora_abertura: '12:00:00',
    hora_fecho: '23:00:00',
    estado: 'aberto',
    descricao: 'Restaurante de teste',
    taxa_entrega: 2.99,
  };
  const createdRestaurante = await test('POST /restaurantes', async () => {
    const res = await request('POST', `${BASE_URL}/restaurantes`, newRestaurante);
    if (!res.ok) return { success: false, message: `Status ${res.status}: ${JSON.stringify(res.data)}` };
    createdIds.restaurantes.push(res.data.id);
    return { success: true, data: res.data };
  });

  // GET /restaurantes
  await test('GET /restaurantes', async () => {
    const res = await request('GET', `${BASE_URL}/restaurantes`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // GET /restaurantes/count
  await test('GET /restaurantes/count', async () => {
    const res = await request('GET', `${BASE_URL}/restaurantes/count`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  if (createdRestaurante) {
    const restId = createdRestaurante.id;
    // GET /restaurantes/{id}
    await test(`GET /restaurantes/${restId}`, async () => {
      const res = await request('GET', `${BASE_URL}/restaurantes/${restId}`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PATCH /restaurantes/{id}
    await test(`PATCH /restaurantes/${restId}`, async () => {
      const res = await request('PATCH', `${BASE_URL}/restaurantes/${restId}`, { descricao: 'Descrição atualizada' });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PUT /restaurantes/{id}
    await test(`PUT /restaurantes/${restId}`, async () => {
      const res = await request('PUT', `${BASE_URL}/restaurantes/${restId}`, {
        ...createdRestaurante,
        descricao: 'Descrição completa atualizada',
      });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // GET /restaurantes/{id}/pedidos
    await test(`GET /restaurantes/${restId}/pedidos`, async () => {
      const res = await request('GET', `${BASE_URL}/restaurantes/${restId}/pedidos`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // GET /restaurantes/{id}/pratos
    await test(`GET /restaurantes/${restId}/pratos`, async () => {
      const res = await request('GET', `${BASE_URL}/restaurantes/${restId}/pratos`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // GET /restaurantes/{id}/entregas
    await test(`GET /restaurantes/${restId}/entregas`, async () => {
      const res = await request('GET', `${BASE_URL}/restaurantes/${restId}/entregas`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });
  }

  // PATCH /restaurantes (updateAll)
  await test('PATCH /restaurantes', async () => {
    const res = await request('PATCH', `${BASE_URL}/restaurantes`, { estado: 'fechado' });
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  return createdRestaurante;
}

/**
 * Testes para Pratos
 */
async function testPratos(restauranteId) {
  console.log(`\n${colors.bright}${colors.blue}=== TESTANDO PRATOS ===${colors.reset}`);

  if (!restauranteId) {
    console.log(`${colors.yellow}[SKIP]${colors.reset} Pratos requerem um restaurante válido`);
    stats.skipped++;
    return null;
  }

  // POST /pratos
  const newPrato = {
    restaurante_id: restauranteId,
    categoria_id: 1,
    nome: 'Prato Teste xpto',
    preco: 8.50,
    descricao: 'Descrição do prato teste',
    disponivel: true,
    vegetariano: false,
    vegan: false,
    sem_gluten: false,
  };
  const createdPrato = await test('POST /pratos', async () => {
    const res = await request('POST', `${BASE_URL}/pratos`, newPrato);
    if (!res.ok) return { success: false, message: `Status ${res.status}: ${JSON.stringify(res.data)}` };
    createdIds.pratos.push(res.data.id);
    return { success: true, data: res.data };
  });

  // GET /pratos
  await test('GET /pratos', async () => {
    const res = await request('GET', `${BASE_URL}/pratos`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // GET /pratos/count
  await test('GET /pratos/count', async () => {
    const res = await request('GET', `${BASE_URL}/pratos/count`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  if (createdPrato) {
    const pratoId = createdPrato.id;
    // GET /pratos/{id}
    await test(`GET /pratos/${pratoId}`, async () => {
      const res = await request('GET', `${BASE_URL}/pratos/${pratoId}`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PATCH /pratos/{id}
    await test(`PATCH /pratos/${pratoId}`, async () => {
      const res = await request('PATCH', `${BASE_URL}/pratos/${pratoId}`, { descricao: 'Descrição atualizada' });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PUT /pratos/{id}
    await test(`PUT /pratos/${pratoId}`, async () => {
      const res = await request('PUT', `${BASE_URL}/pratos/${pratoId}`, {
        ...createdPrato,
        descricao: 'Descrição completa atualizada',
      });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // GET /pratos/{id}/ingredientes
    await test(`GET /pratos/${pratoId}/ingredientes`, async () => {
      const res = await request('GET', `${BASE_URL}/pratos/${pratoId}/ingredientes`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });
  }

  // PATCH /pratos (updateAll)
  await test('PATCH /pratos', async () => {
    const res = await request('PATCH', `${BASE_URL}/pratos`, { disponivel: false });
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  return createdPrato;
}

/**
 * Testes para Clientes
 */
async function testClientes() {
  console.log(`\n${colors.bright}${colors.blue}=== TESTANDO CLIENTES ===${colors.reset}`);

  // POST /clientes
  const newCliente = {
    nome: 'Cliente Teste ' + Date.now(),
    email: `teste${Date.now()}@email.pt`,
    telefone: '912345678',
    morada: 'Rua Teste, 456',
    codpostal: '4000-001',
  };
  const createdCliente = await test('POST /clientes', async () => {
    const res = await request('POST', `${BASE_URL}/clientes`, newCliente);
    if (!res.ok) return { success: false, message: `Status ${res.status}: ${JSON.stringify(res.data)}` };
    createdIds.clientes.push(res.data.id);
    return { success: true, data: res.data };
  });

  // GET /clientes
  await test('GET /clientes', async () => {
    const res = await request('GET', `${BASE_URL}/clientes`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // GET /clientes/count
  await test('GET /clientes/count', async () => {
    const res = await request('GET', `${BASE_URL}/clientes/count`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  if (createdCliente) {
    const clienteId = createdCliente.id;
    // GET /clientes/{id}
    await test(`GET /clientes/${clienteId}`, async () => {
      const res = await request('GET', `${BASE_URL}/clientes/${clienteId}`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PATCH /clientes/{id}
    await test(`PATCH /clientes/${clienteId}`, async () => {
      const res = await request('PATCH', `${BASE_URL}/clientes/${clienteId}`, { telefone: '919999999' });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PUT /clientes/{id}
    await test(`PUT /clientes/${clienteId}`, async () => {
      const res = await request('PUT', `${BASE_URL}/clientes/${clienteId}`, {
        ...createdCliente,
        telefone: '919888888',
      });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // GET /clientes/{id}/pedidos
    await test(`GET /clientes/${clienteId}/pedidos`, async () => {
      const res = await request('GET', `${BASE_URL}/clientes/${clienteId}/pedidos`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });
  }

  // PATCH /clientes (updateAll)
  await test('PATCH /clientes', async () => {
    const res = await request('PATCH', `${BASE_URL}/clientes`, { telefone: '910000000' });
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  return createdCliente;
}

/**
 * Testes para Entregadores
 */
async function testEntregadores() {
  console.log(`\n${colors.bright}${colors.blue}=== TESTANDO ENTREGADORES ===${colors.reset}`);

  // POST /entregadores
  const newEntregador = {
    nome: 'Entregador Teste ' + Date.now(),
    email: `entregador${Date.now()}@food.pt`,
    telefone: `96${Date.now().toString().slice(-7)}`, // Garantir telefone único
    codpostal: '4000-001',
    estado: 'disponivel',
  };
  const createdEntregador = await test('POST /entregadores', async () => {
    const res = await request('POST', `${BASE_URL}/entregadores`, newEntregador);
    if (!res.ok) return { success: false, message: `Status ${res.status}: ${JSON.stringify(res.data)}` };
    createdIds.entregadores.push(res.data.id);
    return { success: true, data: res.data };
  });

  // GET /entregadores
  await test('GET /entregadores', async () => {
    const res = await request('GET', `${BASE_URL}/entregadores`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // GET /entregadores/disponiveis
  await test('GET /entregadores/disponiveis', async () => {
    const res = await request('GET', `${BASE_URL}/entregadores/disponiveis`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // GET /entregadores/count
  await test('GET /entregadores/count', async () => {
    const res = await request('GET', `${BASE_URL}/entregadores/count`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  if (createdEntregador) {
    const entregadorId = createdEntregador.id;
    // GET /entregadores/{id}
    await test(`GET /entregadores/${entregadorId}`, async () => {
      const res = await request('GET', `${BASE_URL}/entregadores/${entregadorId}`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PATCH /entregadores/{id}
    await test(`PATCH /entregadores/${entregadorId}`, async () => {
      const res = await request('PATCH', `${BASE_URL}/entregadores/${entregadorId}`, { estado: 'ocupado' });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PUT /entregadores/{id}
    await test(`PUT /entregadores/${entregadorId}`, async () => {
      const res = await request('PUT', `${BASE_URL}/entregadores/${entregadorId}`, {
        ...createdEntregador,
        estado: 'disponivel',
      });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PATCH /entregadores/{id}/estado
    await test(`PATCH /entregadores/${entregadorId}/estado`, async () => {
      const res = await request('PATCH', `${BASE_URL}/entregadores/${entregadorId}/estado`, { estado: 'indisponivel' });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // GET /entregadores/{id}/entregas
    await test(`GET /entregadores/${entregadorId}/entregas`, async () => {
      const res = await request('GET', `${BASE_URL}/entregadores/${entregadorId}/entregas`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // GET /entregadores/{id}/stats
    await test(`GET /entregadores/${entregadorId}/stats`, async () => {
      const res = await request('GET', `${BASE_URL}/entregadores/${entregadorId}/stats`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });
  }

  // PATCH /entregadores (updateAll)
  await test('PATCH /entregadores', async () => {
    const res = await request('PATCH', `${BASE_URL}/entregadores`, { estado: 'disponivel' });
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  return createdEntregador;
}

/**
 * Testes para Pedidos
 */
async function testPedidos(clienteId, restauranteId) {
  console.log(`\n${colors.bright}${colors.blue}=== TESTANDO PEDIDOS ===${colors.reset}`);

  if (!clienteId || !restauranteId) {
    console.log(`${colors.yellow}[SKIP]${colors.reset} Pedidos requerem cliente e restaurante válidos`);
    stats.skipped++;
    return null;
  }

  // POST /pedidos
  const newPedido = {
    cliente_id: 1,
    restaurante_id: 1,
    metodo_pagamento: 'cartao',
    hora_pedido: new Date().toISOString(),
    total: 45.50,
  };
  const createdPedido = await test('POST /pedidos', async () => {
    const res = await request('POST', `${BASE_URL}/pedidos`, newPedido);
    if (!res.ok) return { success: false, message: `Status ${res.status}: ${JSON.stringify(res.data)}` };
    createdIds.pedidos.push(res.data.id);
    return { success: true, data: res.data };
  });

  // GET /pedidos
  await test('GET /pedidos', async () => {
    const res = await request('GET', `${BASE_URL}/pedidos`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // GET /pedidos/count
  await test('GET /pedidos/count', async () => {
    const res = await request('GET', `${BASE_URL}/pedidos/count`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  if (createdPedido) {
    const pedidoId = createdPedido.id;
    // GET /pedidos/{id}
    await test(`GET /pedidos/${pedidoId}`, async () => {
      const res = await request('GET', `${BASE_URL}/pedidos/${pedidoId}`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PATCH /pedidos/{id}
    await test(`PATCH /pedidos/${pedidoId}`, async () => {
      const res = await request('PATCH', `${BASE_URL}/pedidos/${pedidoId}`, { metodo_pagamento: 'paypal' });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PUT /pedidos/{id}
    await test(`PUT /pedidos/${pedidoId}`, async () => {
      const res = await request('PUT', `${BASE_URL}/pedidos/${pedidoId}`, {
        ...createdPedido,
        metodo_pagamento: 'dinheiro',
      });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // GET /pedidos/{id}/pratos
    await test(`GET /pedidos/${pedidoId}/pratos`, async () => {
      const res = await request('GET', `${BASE_URL}/pedidos/${pedidoId}/pratos`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });
  }

  // PATCH /pedidos (updateAll)
  await test('PATCH /pedidos', async () => {
    const res = await request('PATCH', `${BASE_URL}/pedidos`, { metodo_pagamento: 'cartao' });
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  return createdPedido;
}

/**
 * Testes para Entregas
 */
async function testEntregas(pedidoId, entregadorId, restauranteId) {
  console.log(`\n${colors.bright}${colors.blue}=== TESTANDO ENTREGAS ===${colors.reset}`);

  if (!pedidoId || !entregadorId || !restauranteId) {
    console.log(`${colors.yellow}[SKIP]${colors.reset} Entregas requerem pedido, entregador e restaurante válidos`);
    stats.skipped++;
    return null;
  }

  // POST /entregas
  const newEntrega = {
    pedido_id: pedidoId,
    entregador_id: entregadorId,
    restaurante_id: restauranteId,
    tempo_estimado_min: 30,
    estado: 'pendente',
  };
  const createdEntrega = await test('POST /entregas', async () => {
    const res = await request('POST', `${BASE_URL}/entregas`, newEntrega);
    if (!res.ok) return { success: false, message: `Status ${res.status}: ${JSON.stringify(res.data)}` };
    createdIds.entregas.push(res.data.id);
    return { success: true, data: res.data };
  });

  // GET /entregas
  await test('GET /entregas', async () => {
    const res = await request('GET', `${BASE_URL}/entregas`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // GET /entregas/count
  await test('GET /entregas/count', async () => {
    const res = await request('GET', `${BASE_URL}/entregas/count`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // GET /entregas?filter={"where":{"entregador_id":X}} - Teste do filtro como no React
  await test(`GET /entregas?filter={"where":{"entregador_id":${entregadorId}}}`, async () => {
    // Usar o mesmo formato que o React usa
    const filter = JSON.stringify({
      where: { entregador_id: entregadorId }
    });
    const url = `${BASE_URL}/entregas?filter=${encodeURIComponent(filter)}`;
    const res = await request('GET', url);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    if (!Array.isArray(res.data)) return { success: false, message: 'Resposta não é array' };
    // Verificar se todas as entregas retornadas pertencem ao entregador correto
    const allMatch = res.data.every(entrega => entrega.entregador_id === entregadorId);
    if (!allMatch) return { success: false, message: 'Algumas entregas não pertencem ao entregador filtrado' };
    return { success: true, data: res.data };
  });

  if (createdEntrega) {
    const entregaId = createdEntrega.id;
    // GET /entregas/{id}
    await test(`GET /entregas/${entregaId}`, async () => {
      const res = await request('GET', `${BASE_URL}/entregas/${entregaId}`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PATCH /entregas/{id}
    await test(`PATCH /entregas/${entregaId}`, async () => {
      const res = await request('PATCH', `${BASE_URL}/entregas/${entregaId}`, { estado: 'a_caminho' });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PUT /entregas/{id}
    await test(`PUT /entregas/${entregaId}`, async () => {
      const res = await request('PUT', `${BASE_URL}/entregas/${entregaId}`, {
        ...createdEntrega,
        estado: 'entregue',
        tempo_real_min: 25,
      });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });
  }

  // PATCH /entregas (updateAll)
  await test('PATCH /entregas', async () => {
    const res = await request('PATCH', `${BASE_URL}/entregas`, { estado: 'pendente' });
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  return createdEntrega;
}

/**
 * Testes para Pedidos-Pratos (relação)
 */
async function testPedidosPratos(pedidoId, pratoId) {
  console.log(`\n${colors.bright}${colors.blue}=== TESTANDO PEDIDOS-PRATOS ===${colors.reset}`);

  if (!pedidoId || !pratoId) {
    console.log(`${colors.yellow}[SKIP]${colors.reset} Pedidos-Pratos requerem pedido e prato válidos`);
    stats.skipped++;
    return;
  }

  // POST /pedidos-pratos
  const newPedidoPrato = {
    pedidosId: 1,
    pratosId: 1,
    quantidade: 2,
  };
  const createdPedidoPrato = await test('POST /pedidos-pratos', async () => {
    const res = await request('POST', `${BASE_URL}/pedidos-pratos`, newPedidoPrato);
    if (!res.ok) return { success: false, message: `Status ${res.status}: ${JSON.stringify(res.data)}` };
    return { success: true, data: res.data };
  });

  // GET /pedidos-pratos
  await test('GET /pedidos-pratos', async () => {
    const res = await request('GET', `${BASE_URL}/pedidos-pratos`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // GET /pedidos-pratos/count
  await test('GET /pedidos-pratos/count', async () => {
    const res = await request('GET', `${BASE_URL}/pedidos-pratos/count`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  if (createdPedidoPrato) {
    const ppId = createdPedidoPrato.id;
    // GET /pedidos-pratos/{id}
    await test(`GET /pedidos-pratos/${ppId}`, async () => {
      const res = await request('GET', `${BASE_URL}/pedidos-pratos/${ppId}`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PATCH /pedidos-pratos/{id}
    await test(`PATCH /pedidos-pratos/${ppId}`, async () => {
      const res = await request('PATCH', `${BASE_URL}/pedidos-pratos/${ppId}`, { quantidade: 3 });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PUT /pedidos-pratos/{id}
    await test(`PUT /pedidos-pratos/${ppId}`, async () => {
      const res = await request('PUT', `${BASE_URL}/pedidos-pratos/${ppId}`, {
        ...createdPedidoPrato,
        quantidade: 4,
      });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });
  }

  // POST /pedidos/{id}/pratos (adicionar prato ao pedido)
  await test(`POST /pedidos/${pedidoId}/pratos`, async () => {
    const pratoToAdd = {
      restaurante_id: 1,
      categoria_id: 1,
      nome: 'Prato Adicionado ' + Date.now(),
      preco: 1000,
      descricao: 'Prato adicionado ao pedido',
      disponivel: true,
      vegetariano: false,
      vegan: false,
      sem_gluten: false,
    };
    const res = await request('POST', `${BASE_URL}/pedidos/${pedidoId}/pratos`, pratoToAdd);
    if (!res.ok) return { success: false, message: `Status ${res.status}: ${JSON.stringify(res.data)}` };
    return { success: true, data: res.data };
  });

  // PATCH /pedidos/{id}/pratos
  await test(`PATCH /pedidos/${pedidoId}/pratos`, async () => {
    const res = await request('PATCH', `${BASE_URL}/pedidos/${pedidoId}/pratos`, { disponivel: false });
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // DELETE /pedidos/{id}/pratos
  await test(`DELETE /pedidos/${pedidoId}/pratos`, async () => {
      const res = await request('DELETE', `${BASE_URL}/pedidos/${pedidoId}/pratos`, null);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    if (createdPedidoPrato) {
      createdIds.pedidosPratos.push(createdPedidoPrato.id);
    }

    return createdPedidoPrato;
}

/**
 * Testes para Pratos-Ingredientes (relação)
 */
async function testPratosIngredientes(pratoId, ingredienteId) {
  console.log(`\n${colors.bright}${colors.blue}=== TESTANDO PRATOS-INGREDIENTES ===${colors.reset}`);

  if (!pratoId || !ingredienteId) {
    console.log(`${colors.yellow}[SKIP]${colors.reset} Pratos-Ingredientes requerem prato e ingrediente válidos`);
    stats.skipped++;
    return;
  }

  // GET /pratos/{id}/ingredientes
  await test(`GET /pratos/${pratoId}/ingredientes`, async () => {
    const res = await request('GET', `${BASE_URL}/pratos/${pratoId}/ingredientes`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // POST /pratos/{id}/ingredientes
  await test(`POST /pratos/${pratoId}/ingredientes`, async () => {
    const ingredienteToAdd = {
      nome: 'Batata',
      tipo: 'vegetal',
      alergeno: false,
    };
    const res = await request('POST', `${BASE_URL}/pratos/${pratoId}/ingredientes`, ingredienteToAdd);
    if (!res.ok) return { success: false, message: `Status ${res.status}: ${JSON.stringify(res.data)}` };
    return { success: true, data: res.data };
  });

  // PATCH /pratos/{id}/ingredientes
  await test(`PATCH /pratos/${pratoId}/ingredientes`, async () => {
    const res = await request('PATCH', `${BASE_URL}/pratos/${pratoId}/ingredientes`, { tipo: 'fruta' });
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // DELETE /pratos/{id}/ingredientes
  await test(`DELETE /pratos/${pratoId}/ingredientes`, async () => {
    const res = await request('DELETE', `${BASE_URL}/pratos/${pratoId}/ingredientes`, null);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });
}

/**
 * Testes para PratosIngredientesTable
 */
async function testPratosIngredientesTable(pratoId, ingredienteId) {
  console.log(`\n${colors.bright}${colors.blue}=== TESTANDO PRATOS-INGREDIENTES TABLE ===${colors.reset}`);

  if (!pratoId || !ingredienteId) {
    console.log(`${colors.yellow}[SKIP]${colors.reset} PratosIngredientesTable requer prato e ingrediente válidos`);
    stats.skipped++;
    return;
  }

  // POST /pratos-ingredientes
  const newPratoIngrediente = {
    pratosId: 11,
    ingredientesId: 11,
    quantidade: '200',
    obrigatorio: true,
    unidade: 'g',
  };
  const createdPratoIngrediente = await test('POST /pratos-ingredientes', async () => {
    const res = await request('POST', `${BASE_URL}/pratos-ingredientes`, newPratoIngrediente);
    if (!res.ok) return { success: false, message: `Status ${res.status}: ${JSON.stringify(res.data)}` };
    createdIds.pratosIngredientes.push(res.data.id);
    return { success: true, data: res.data };
  });

  // GET /pratos-ingredientes
  await test('GET /pratos-ingredientes', async () => {
    const res = await request('GET', `${BASE_URL}/pratos-ingredientes`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  // GET /pratos-ingredientes/count
  await test('GET /pratos-ingredientes/count', async () => {
    const res = await request('GET', `${BASE_URL}/pratos-ingredientes/count`);
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });

  if (createdPratoIngrediente) {
    const piId = createdPratoIngrediente.id;
    // GET /pratos-ingredientes/{id}
    await test(`GET /pratos-ingredientes/${piId}`, async () => {
      const res = await request('GET', `${BASE_URL}/pratos-ingredientes/${piId}`);
      if (!res.ok) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PATCH /pratos-ingredientes/{id}
    await test(`PATCH /pratos-ingredientes/${piId}`, async () => {
      const res = await request('PATCH', `${BASE_URL}/pratos-ingredientes/${piId}`, { quantidade: '300' });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });

    // PUT /pratos-ingredientes/{id}
    await test(`PUT /pratos-ingredientes/${piId}`, async () => {
      const res = await request('PUT', `${BASE_URL}/pratos-ingredientes/${piId}`, {
        ...createdPratoIngrediente,
        quantidade: '250',
      });
      if (!res.ok && res.status !== 204) return { success: false, message: `Status ${res.status}` };
      return { success: true, data: res.data };
    });
  }

  // PATCH /pratos-ingredientes (updateAll)
  await test('PATCH /pratos-ingredientes', async () => {
    const res = await request('PATCH', `${BASE_URL}/pratos-ingredientes`, { obrigatorio: false });
    if (!res.ok) return { success: false, message: `Status ${res.status}` };
    return { success: true, data: res.data };
  });
}

/**
 * Limpeza: Remove recursos criados durante os testes
 */
async function cleanup() {
  console.log(`\n${colors.bright}${colors.yellow}=== LIMPEZA ===${colors.reset}`);
  
  // Deletar em ordem inversa para respeitar foreign keys
  for (const id of createdIds.pratosIngredientes.reverse()) {
    await request('DELETE', `${BASE_URL}/pratos-ingredientes/${id}`);
  }
  for (const id of createdIds.pedidosPratos.reverse()) {
    await request('DELETE', `${BASE_URL}/pedidos-pratos/${id}`);
  }
  for (const id of createdIds.entregas.reverse()) {
    await request('DELETE', `${BASE_URL}/entregas/${id}`);
  }
  for (const id of createdIds.pedidos.reverse()) {
    await request('DELETE', `${BASE_URL}/pedidos/${id}`);
  }
  for (const id of createdIds.pratos.reverse()) {
    await request('DELETE', `${BASE_URL}/pratos/${id}`);
  }
  for (const id of createdIds.entregadores.reverse()) {
    await request('DELETE', `${BASE_URL}/entregadores/${id}`);
  }
  for (const id of createdIds.clientes.reverse()) {
    await request('DELETE', `${BASE_URL}/clientes/${id}`);
  }
  for (const id of createdIds.restaurantes.reverse()) {
    await request('DELETE', `${BASE_URL}/restaurantes/${id}`);
  }
  for (const id of createdIds.ingredientes.reverse()) {
    await request('DELETE', `${BASE_URL}/ingredientes/${id}`);
  }
  for (const id of createdIds.categorias.reverse()) {
    await request('DELETE', `${BASE_URL}/categorias-pratos/${id}`);
  }
  for (const codpostal of createdIds.codpostais.reverse()) {
    await request('DELETE', `${BASE_URL}/codpostais/${codpostal}`);
  }

  console.log(`${colors.cyan}Limpeza concluída${colors.reset}`);
}

/**
 * Função principal
 */
async function main() {
  console.log(`${colors.bright}${colors.cyan}`);
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║   TESTE AUTOMÁTICO DE TODOS OS ENDPOINTS DA API      ║');
  console.log('╚═══════════════════════════════════════════════════════╝');
  console.log(`${colors.reset}`);
  console.log(`Base URL: ${colors.bright}${BASE_URL}${colors.reset}\n`);

  // Verificar se o servidor está acessível
  console.log(`${colors.cyan}[INFO]${colors.reset} Verificando conectividade...`);
  const pingRes = await request('GET', `${BASE_URL}/ping`);
  if (!pingRes.ok) {
    console.log(`${colors.red}[ERRO]${colors.reset} Servidor não está acessível em ${BASE_URL}`);
    console.log(`${colors.red}[ERRO]${colors.reset} Certifique-se de que o servidor está a correr: npm start`);
    process.exit(1);
  }
  console.log(`${colors.green}[OK]${colors.reset} Servidor acessível\n`);

  try {
    // Executar testes na ordem correta
    await testCodpostais();
    await testCategoriasPratos();
    const ingrediente = await testIngredientes();
    const restaurante = await testRestaurantes();
    const prato = await testPratos(restaurante?.id || 1);
    const cliente = await testClientes();
    const entregador = await testEntregadores();
    const pedido = await testPedidos(cliente?.id || 1, restaurante?.id || 1);
    await testEntregas(pedido?.id || 1, entregador?.id || 1, restaurante?.id || 1);
    await testPedidosPratos(pedido?.id || 1, prato?.id || 1);
    await testPratosIngredientes(prato?.id || 1, ingrediente?.id || 1);
    await testPratosIngredientesTable(prato?.id || 1, ingrediente?.id || 1);

    // Limpeza
    await cleanup();

    // Relatório final
    console.log(`\n${colors.bright}${colors.cyan}╔═══════════════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}║                   RELATÓRIO FINAL                     ║${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}╚═══════════════════════════════════════════════════════╝${colors.reset}`);
    console.log(`\n${colors.bright}Total de testes:${colors.reset} ${stats.total}`);
    console.log(`${colors.green}✓ Passou:${colors.reset} ${stats.passed}`);
    console.log(`${colors.red}✗ Falhou:${colors.reset} ${stats.failed}`);
    console.log(`${colors.yellow}⊘ Ignorado:${colors.reset} ${stats.skipped}`);
    
    const successRate = ((stats.passed / (stats.total - stats.skipped)) * 100).toFixed(1);
    console.log(`\n${colors.bright}Taxa de sucesso:${colors.reset} ${successRate}%`);
    
    if (stats.failed === 0) {
      console.log(`\n${colors.green}${colors.bright}🎉 Todos os testes passaram!${colors.reset}\n`);
      process.exit(0);
    } else {
      console.log(`\n${colors.red}${colors.bright}⚠ Alguns testes falharam${colors.reset}\n`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`\n${colors.red}[ERRO FATAL]${colors.reset} ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Executar
main();

