import React from 'react';
import { 
  Show, 
  TabbedShowLayout,
  Tab,
  TextField, 
  useRecordContext,
  useNotify,
  ReferenceField,
  DateField,
} from 'react-admin';
import { 
  Typography, 
  Table,
  TableBody,
  TableCell, 
  TableContainer,
  TableHead,
  TableRow, 
  Paper,
  Chip,
} from '@mui/material';

const PratosList = ({ categoriaId }) => {
  const [pratos, setPratos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const notify = useNotify();

  React.useEffect(() => {
    if (categoriaId) {
      setLoading(true);

      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
      
      const filter = JSON.stringify({
        where: { categoria_id: categoriaId }
      });
      
      const url = `${apiUrl}/pratos?filter=${encodeURIComponent(filter)}`;
      
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao carregar pratos');
          }
          return response.json();
        })
        .then(async (data) => {

          const pratosComDetalhes = await Promise.all(
            data.map(async (item) => {
              try {
                const restauranteResponse = await fetch(`${apiUrl}/restaurantes/${item.restaurante_id}`);
                const restauranteData = await restauranteResponse.json();
                
                return {
                  ...item,
                  restaurante: restauranteData
                };
              } catch (error) {
                console.error('Erro ao buscar detalhes:', item.restaurante_id, error);
                return {
                  ...item,
                  restaurante: null
                };
              }
            })
          );
          
          setPratos(pratosComDetalhes || []);
          setLoading(false);
        })
        .catch((error) => {
          notify('Erro ao carregar pratos', { type: 'error' });
          console.error('Erro completo:', error);
          setPratos([]);
          setLoading(false);
        });
    } else {
      setPratos([]);
      setLoading(false);
    }
  }, [categoriaId, notify]);

  if (loading) {
    return (
      <Typography variant="body2" color="text.secondary">
        Carregando pratos...
      </Typography>
    );
  }
  
  if (pratos.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Esta categoria não tem pratos associados.
      </Typography>
    );
  }

  const totalPratos = pratos.length;
  const pratosDisponiveis = pratos.filter(p => p.disponivel).length;
  const precoMedio = pratos.length > 0 
    ? pratos.reduce((acc, p) => acc + (p.preco || 0), 0) / pratos.length 
    : 0;

  return (
    <>
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 3 }}>
        <div>
          <Typography variant="caption" color="text.secondary">Total de Pratos</Typography>
          <Typography variant="h5">{totalPratos}</Typography>
        </div>
        <div>
          <Typography variant="caption" color="text.secondary">Disponíveis</Typography>
          <Typography variant="h5">{pratosDisponiveis}</Typography>
        </div>
        <div>
          <Typography variant="caption" color="text.secondary">Preço Médio</Typography>
          <Typography variant="h5">
            {new Intl.NumberFormat('pt-PT', { 
              style: 'currency', 
              currency: 'EUR' 
            }).format(precoMedio)}
          </Typography>
        </div>
      </Paper>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Restaurante</strong></TableCell>
              <TableCell><strong>Preço</strong></TableCell>
              <TableCell><strong>Disponível</strong></TableCell>
              <TableCell><strong>Características</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pratos.map((item) => (
              <TableRow key={item.id}>
                {/* Prato ID - Clicável */}
                <TableCell>
                  <ReferenceField 
                    record={item}          
                    source="id"      
                    reference="pratos"
                    link="show"
                  >
                    <TextField source="id" />
                  </ReferenceField>
                </TableCell>

                <TableCell>{item.nome}</TableCell>

                {/* Restaurante - Clicável */}
                <TableCell>
                  {item.restaurante?.id ? (
                    <ReferenceField 
                      record={{ restaurante_id: item.restaurante.id }}
                      source="restaurante_id"      
                      reference="restaurantes"
                      link="show"
                    >
                      <TextField source="nome" />
                    </ReferenceField>
                  ) : (
                    item.restaurante?.nome || '-'
                  )}
                </TableCell>

                <TableCell>
                  {new Intl.NumberFormat('pt-PT', { 
                    style: 'currency', 
                    currency: 'EUR' 
                  }).format(item.preco || 0)}
                </TableCell>

                <TableCell>
                  <Chip
                    label={item.disponivel ? 'Sim' : 'Não'}
                    color={item.disponivel ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {item.vegetariano && (
                      <Chip label="Vegetariano" size="small" color="success" variant="outlined" />
                    )}
                    {item.vegan && (
                      <Chip label="Vegan" size="small" color="success" variant="outlined" />
                    )}
                    {item.sem_gluten && (
                      <Chip label="Sem Glúten" size="small" color="info" variant="outlined" />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const RestaurantesList = ({ categoriaId }) => {
  const [restaurantes, setRestaurantes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const notify = useNotify();

  React.useEffect(() => {
    if (categoriaId) {
      setLoading(true);

      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
      
      const filter = JSON.stringify({
        where: { especialidade_id: categoriaId }
      });
      
      const url = `${apiUrl}/restaurantes?filter=${encodeURIComponent(filter)}`;
      
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao carregar restaurantes');
          }
          return response.json();
        })
        .then((data) => {
          setRestaurantes(data || []);
          setLoading(false);
        })
        .catch((error) => {
          notify('Erro ao carregar restaurantes', { type: 'error' });
          console.error('Erro completo:', error);
          setRestaurantes([]);
          setLoading(false);
        });
    } else {
      setRestaurantes([]);
      setLoading(false);
    }
  }, [categoriaId, notify]);

  if (loading) {
    return (
      <Typography variant="body2" color="text.secondary">
        Carregando restaurantes...
      </Typography>
    );
  }
  
  if (restaurantes.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Nenhum restaurante tem esta categoria como especialidade.
      </Typography>
    );
  }

  const totalRestaurantes = restaurantes.length;
  const restaurantesAtivos = restaurantes.filter(r => r.estado === 'aberto').length;

  return (
    <>
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 3 }}>
        <div>
          <Typography variant="caption" color="text.secondary">Total de Restaurantes</Typography>
          <Typography variant="h5">{totalRestaurantes}</Typography>
        </div>
        <div>
          <Typography variant="caption" color="text.secondary">Restaurantes Ativos</Typography>
          <Typography variant="h5">{restaurantesAtivos}</Typography>
        </div>
      </Paper>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Morada</strong></TableCell>
              <TableCell><strong>Telefone</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantes.map((item) => (
              <TableRow key={item.id}>
                {/* Restaurante ID - Clicável */}
                <TableCell>
                  <ReferenceField 
                    record={item}          
                    source="id"      
                    reference="restaurantes"
                    link="show"
                  >
                    <TextField source="id" />
                  </ReferenceField>
                </TableCell>

                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.morada || '-'}</TableCell>
                <TableCell>{item.telefone || '-'}</TableCell>

                <TableCell>
                  <Chip
                    label={item.estado}
                    size="small"
                    color={item.estado === 'aberto' ? 'success' : 'default'}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const PratosTab = () => {
  const record = useRecordContext();
  
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Pratos desta Categoria
      </Typography>
      {record?.id ? (
        <PratosList categoriaId={record.id} />
      ) : (
        <Typography>Carregando...</Typography>
      )}
    </>
  );
};

const RestaurantesTab = () => {
  const record = useRecordContext();
  
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Restaurantes com esta Especialidade
      </Typography>
      {record?.id ? (
        <RestaurantesList categoriaId={record.id} />
      ) : (
        <Typography>Carregando...</Typography>
      )}
    </>
  );
};

export const CategoriasShow = () => {
  return (
    <Show title="Detalhes da Categoria">
      <TabbedShowLayout>
        <Tab label="Informações">
          <TextField source="id" label="ID" />
          <TextField source="nome" label="Nome da Categoria" />
          <DateField 
            source="created_at" 
            showTime 
            locales="pt-PT" 
            label="Criado em"
          />
        </Tab>
        <Tab label="Pratos">
          <PratosTab />
        </Tab>
        <Tab label="Restaurantes">
          <RestaurantesTab />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};