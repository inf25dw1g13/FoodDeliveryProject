import React from 'react';
import { 
  Show, 
  TabbedShowLayout,
  Tab,
  TextField, 
  useRecordContext,
  useNotify,
  EmailField,
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

const metodoPagamentoColors = {
  'cartao': 'primary',
  'mbway': 'secondary',
  'dinheiro': 'success',
  'carteira': 'info',
  'paypal': 'warning',
  'multibanco': 'default'
};

const PedidosList = ({ clienteId }) => {
  const [pedidos, setPedidos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const notify = useNotify();

  React.useEffect(() => {
    if (clienteId) {
      setLoading(true);

      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
      
      const filter = JSON.stringify({
        where: { cliente_id: clienteId }
      });
      
      const url = `${apiUrl}/pedidos?filter=${encodeURIComponent(filter)}`;
      
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao carregar pedidos');
          }
          return response.json();
        })
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
                console.error('Erro ao buscar detalhes:', item.restaurante_id, error);
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
          notify('Erro ao carregar pedidos', { type: 'error' });
          console.error('Erro completo:', error);
          setPedidos([]);
          setLoading(false);
        });
    } else {
      setPedidos([]);
      setLoading(false);
    }
  }, [clienteId, notify]);

  if (loading) {
    return (
      <Typography variant="body2" color="text.secondary">
        Carregando pedidos...
      </Typography>
    );
  }
  
  if (pedidos.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Este cliente não tem pedidos associados.
      </Typography>
    );
  }

  const totalPedidos = pedidos.length;
  const valorTotal = pedidos.reduce((acc, p) => acc + (p.total || 0), 0);
  const valorMedio = totalPedidos > 0 ? valorTotal / totalPedidos : 0;

  return (
    <>
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 3 }}>
        <div>
          <Typography variant="caption" color="text.secondary">Total de Pedidos</Typography>
          <Typography variant="h5">{totalPedidos}</Typography>
        </div>
        <div>
          <Typography variant="caption" color="text.secondary">Valor Total Gasto</Typography>
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

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Pedido</strong></TableCell>
              <TableCell><strong>Restaurante</strong></TableCell>
              <TableCell><strong>Método de Pagamento</strong></TableCell>
              <TableCell><strong>Data/Hora</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((item) => (
              <TableRow key={item.id}>
                {/* Pedido ID - Clicável */}
                <TableCell>
                  <ReferenceField 
                    record={item}          
                    source="id"      
                    reference="pedidos"
                    link="show"
                  >
                    <TextField source="id" />
                  </ReferenceField>
                </TableCell>

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

const PedidosTab = () => {
  const record = useRecordContext();
  
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Pedidos deste Cliente
      </Typography>
      {record?.id ? (
        <PedidosList clienteId={record.id} />
      ) : (
        <Typography>Carregando...</Typography>
      )}
    </>
  );
};

export const ClientesShow = () => {
  return (
    <Show title="Detalhes do Cliente">
      <TabbedShowLayout>
        <Tab label="Informações">
          <TextField source="id" label="ID" />
          <TextField source="nome" label="Nome" />
          <EmailField source="email" label="Email" />
          <TextField source="telefone" label="Telefone" />
          <TextField source="morada" label="Morada" />
          <ReferenceField source="codpostal" reference="codpostais" label="Código Postal">
            <TextField source="codpostal" />
          </ReferenceField>
          <DateField 
            source="created_at" 
            showTime 
            locales="pt-PT" 
            label="Criado em"
          />
          <DateField 
            source="updated_at" 
            showTime 
            locales="pt-PT" 
            label="Última Atualização em"
          />
        </Tab>
        <Tab label="Pedidos">
          <PedidosTab />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};