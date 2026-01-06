import React from 'react';
import { 
  Edit, 
  TabbedForm,
  FormTab,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  required,
  email,
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

const metodoPagamentoColors = {
  'cartao': 'primary',
  'mbway': 'secondary',
  'dinheiro': 'success',
  'carteira': 'info',
  'paypal': 'warning',
  'multibanco': 'default'
};

const PedidosManager = () => {
  const record = useRecordContext();
  const [pedidos, setPedidos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const notify = useNotify();

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

  const loadPedidos = React.useCallback(() => {
    setLoading(true);
    const filter = JSON.stringify({
      where: { cliente_id: record.id }
    });
    
    const url = `${apiUrl}/pedidos?filter=${encodeURIComponent(filter)}`;
    
    fetch(url)
      .then(response => response.json())
      .then(async (data) => {

        const pedidosComDetalhes = await Promise.all(
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
        
        setPedidos(pedidosComDetalhes || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar pedidos:', error);
        notify('Erro ao carregar pedidos', { type: 'error' });
        setLoading(false);
      });
  }, [record.id, apiUrl, notify]);

  React.useEffect(() => {
    if (record?.id) loadPedidos();
  }, [record?.id, loadPedidos]);

  if (loading) return <Typography>Carregando...</Typography>;

  if (pedidos.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Este cliente não tem pedidos.
      </Typography>
    );
  }

  const totalPedidos = pedidos.length;
  const valorTotal = pedidos.reduce((acc, p) => acc + (p.total || 0), 0);
  const valorMedio = totalPedidos > 0 ? valorTotal / totalPedidos : 0;

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>Pedidos do Cliente</Typography>
      
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 3 }}>
        <div>
          <Typography variant="caption" color="text.secondary">Total de Pedidos</Typography>
          <Typography variant="h5">{totalPedidos}</Typography>
        </div>
        <div>
          <Typography variant="caption" color="text.secondary">Valor Total</Typography>
          <Typography variant="h5">
            {new Intl.NumberFormat('pt-PT', { 
              style: 'currency', 
              currency: 'EUR' 
            }).format(valorTotal)}
          </Typography>
        </div>
        <div>
          <Typography variant="caption" color="text.secondary">Valor Médio</Typography>
          <Typography variant="h5">
            {new Intl.NumberFormat('pt-PT', { 
              style: 'currency', 
              currency: 'EUR' 
            }).format(valorMedio)}
          </Typography>
        </div>
      </Paper>

      <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Pedido #</strong></TableCell>
              <TableCell><strong>Restaurante</strong></TableCell>
              <TableCell><strong>Método Pagamento</strong></TableCell>
              <TableCell><strong>Data/Hora</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((item) => (
              <TableRow key={item.id}>
                <TableCell>#{item.id}</TableCell>
                <TableCell>{item.restaurante?.nome || '-'}</TableCell>
                <TableCell>
                  <Chip
                    label={item.metodo_pagamento || '-'}
                    color={metodoPagamentoColors[item.metodo_pagamento] || 'default'}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell>
                  {item.hora_pedido ? 
                    new Date(item.hora_pedido).toLocaleString('pt-PT') 
                    : '-'}
                </TableCell>
                <TableCell>
                  {item.total ? 
                    new Intl.NumberFormat('pt-PT', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    }).format(item.total) 
                    : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export const ClientesEdit = (props) => (
  <Edit title="Editar Cliente" {...props}>
    <TabbedForm>
      <FormTab label="Cliente">
        <TextInput
          source="nome"
          label="Nome"
          validate={[required()]}
          fullWidth
        />
        <TextInput
          source="email"
          label="Email"
          type="email"
          validate={[email(), required()]}
          fullWidth
        />
        <TextInput
          source="telefone"
          label="Telefone"
          validate={[required()]}
          fullWidth
        />
        <TextInput
          source="morada"
          label="Morada"
          multiline
          rows={2}
          fullWidth
        />
        <ReferenceInput source="codpostal" reference="codpostais" label="Código Postal">
          <AutocompleteInput
            optionText={choice => `${choice.codpostal} - ${choice.localidade}, ${choice.cidade}`}
            fullWidth
          />
        </ReferenceInput>
      </FormTab>

      <FormTab label="Pedidos">
        <PedidosManager />
      </FormTab>
    </TabbedForm>
  </Edit>
);