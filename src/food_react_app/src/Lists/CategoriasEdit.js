import React from 'react';
import { 
  Edit, 
  TabbedForm,
  FormTab,
  TextInput,
  required,
  useRecordContext,
  useNotify,
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

const PratosManager = () => {
  const record = useRecordContext();
  const [pratos, setPratos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const notify = useNotify();

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

  const loadPratos = React.useCallback(() => {
    setLoading(true);
    const filter = JSON.stringify({
      where: { categoria_id: record.id }
    });
    
    const url = `${apiUrl}/pratos?filter=${encodeURIComponent(filter)}`;
    
    fetch(url)
      .then(response => response.json())
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
              console.error('Erro ao buscar restaurante:', item.restaurante_id, error);
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
        console.error('Erro ao carregar pratos:', error);
        notify('Erro ao carregar pratos', { type: 'error' });
        setLoading(false);
      });
  }, [record.id, apiUrl, notify]);

  React.useEffect(() => {
    if (record?.id) loadPratos();
  }, [record?.id, loadPratos]);

  if (loading) return <Typography>Carregando...</Typography>;

  if (pratos.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Esta categoria não tem pratos associados.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Pratos desta Categoria ({pratos.length})
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
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
                <TableCell>#{item.id}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.restaurante?.nome || '-'}</TableCell>
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

const RestaurantesManager = () => {
  const record = useRecordContext();
  const [restaurantes, setRestaurantes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const notify = useNotify();

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

  const loadRestaurantes = React.useCallback(() => {
    setLoading(true);
    const filter = JSON.stringify({
      where: { especialidade_id: record.id }
    });
    
    const url = `${apiUrl}/restaurantes?filter=${encodeURIComponent(filter)}`;
    
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        setRestaurantes(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar restaurantes:', error);
        notify('Erro ao carregar restaurantes', { type: 'error' });
        setLoading(false);
      });
  }, [record.id, apiUrl, notify]);

  React.useEffect(() => {
    if (record?.id) loadRestaurantes();
  }, [record?.id, loadRestaurantes]);

  if (loading) return <Typography>Carregando...</Typography>;

  if (restaurantes.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Nenhum restaurante tem esta categoria como especialidade.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Restaurantes com esta Especialidade ({restaurantes.length})
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
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
                <TableCell>#{item.id}</TableCell>
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

export const CategoriasEdit = (props) => (
  <Edit title="Editar Categoria de Prato" {...props}>
    <TabbedForm>
      <FormTab label="Categoria">
        <TextInput
          source="nome"
          label="Nome da Categoria"
          validate={[required()]}
          fullWidth
        />
      </FormTab>

      <FormTab label="Pratos">
        <PratosManager />
      </FormTab>

      <FormTab label="Restaurantes">
        <RestaurantesManager />
      </FormTab>
    </TabbedForm>
  </Edit>
);