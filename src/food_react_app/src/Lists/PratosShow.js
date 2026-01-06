import React from 'react';
import { 
  Show, 
  TabbedShowLayout,
  Tab,
  TextField, 
  NumberField, 
  BooleanField,
  ReferenceField,
  useRecordContext,
  useNotify,
  DateField
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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const IngredientesList = ({ pratoId }) => {
  const [ingredientes, setIngredientes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const notify = useNotify();

  React.useEffect(() => {
    if (pratoId) {
      setLoading(true);

      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
      
      const filter = JSON.stringify({
        where: { pratosId: pratoId },  
        include: ['ingredientes']
      });
      
      const url = `${apiUrl}/pratos-ingredientes?filter=${encodeURIComponent(filter)}`;
      
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao carregar ingredientes');
          }
          return response.json();
        })
        .then(data => {
          setIngredientes(data || []);
          setLoading(false);
        })
        .catch((error) => {
          notify('Erro ao carregar ingredientes', { type: 'error' });
          setIngredientes([]);
          setLoading(false);
        });
    } else {
      setIngredientes([]);
      setLoading(false);
    }
  }, [pratoId, notify]);


  if (loading) {
    return (
      <Typography variant="body2" color="text.secondary">
        Carregando ingredientes...
      </Typography>
    );
  }
  
  if (ingredientes.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Este prato não tem ingredientes associados.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><strong>Nome</strong></TableCell>
            <TableCell><strong>Quantidade</strong></TableCell>
            <TableCell><strong>Tipo</strong></TableCell>
            <TableCell align="center"><strong>Alergeno</strong></TableCell>
            <TableCell align="center"><strong>Obrigatório</strong></TableCell>
          </TableRow>
        </TableHead>
<TableBody>
  {ingredientes.map((item) => (
    <TableRow key={item.id}>
      <TableCell>
        {item.ingredientes?.nome || '-'}
      </TableCell>

      <TableCell>
        {item.quantidade
          ? `${item.quantidade} ${item.unidade || ''}`
          : '-'}
      </TableCell>

      <TableCell>
        {item.ingredientes?.tipo || '-'}
      </TableCell>

      <TableCell align="center">
        <Chip
          label={item.ingredientes?.alergeno ? 'Sim' : 'Não'}
          color={item.ingredientes?.alergeno ? 'error' : 'success'}
          size="small"
        />
      </TableCell>

      <TableCell align="center">
        {item.obrigatorio ? (
          <CheckIcon />
        ) : (
          <CloseIcon />
        )}
      </TableCell>

    </TableRow>
  ))}
</TableBody>
      </Table>
    </TableContainer>
  );
};

const IngredientesTab = () => {
  const record = useRecordContext();
  
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Ingredientes do Prato
      </Typography>
      {record?.id ? (
        <IngredientesList pratoId={record.id} />
      ) : (
        <Typography>Carregando...</Typography>
      )}
    </>
  );
};

export const PratosShow = () => {
  return (
    <Show title="Detalhes do Prato">
      <TabbedShowLayout>
        <Tab label="Informações">
          <TextField source="id" label="ID" />
          <TextField source="nome" label="Nome" />
          <TextField source="descricao" label="Descrição" />
          <NumberField 
            source="preco" 
            label="Preço" 
            options={{ style: 'currency', currency: 'EUR' }} 
          />
          <ReferenceField 
            source="restaurante_id" 
            reference="restaurantes" 
            label="Restaurante"
          >
            <TextField source="nome" />
          </ReferenceField>
          <ReferenceField 
            source="categoria_id" 
            reference="categorias-pratos" 
            label="Categoria"
          >
            <TextField source="nome" />
          </ReferenceField>
          <BooleanField source="vegetariano" label="Vegetariano" />
          <BooleanField source="vegan" label="Vegano" />
          <BooleanField source="sem_gluten" label="Sem Glúten" />
          <BooleanField source="disponivel" label="Disponível" />

          <DateField 
            source="created_at" 
            showTime 
            locales="pt-PT" 
            label="Criado em"/>
    
          <DateField 
            source="updated_at" 
            showTime 
            locales="pt-PT" 
            label="Última Atualização em"/>

        </Tab>
        
        <Tab label="Ingredientes">
          <IngredientesTab />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};