import React from 'react';
import { 
  Show, 
  TabbedShowLayout,
  Tab,
  TextField, 
  NumberField, 
  ReferenceField,
  SelectField,
  DateField,
  useRecordContext,
  useNotify
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
} from '@mui/material';

const PratosPedidoList = ({ pedidoId }) => {
  const [pratos, setPratos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const notify = useNotify();

  React.useEffect(() => {
    if (pedidoId) {
      setLoading(true);

      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
      
      const filter = JSON.stringify({
        where: { pedidosId: pedidoId }
      });
      
      const url = `${apiUrl}/pedidos-pratos?filter=${encodeURIComponent(filter)}`;
      
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
                const pratoResponse = await fetch(`${apiUrl}/pratos/${item.pratosId}`);
                const pratoData = await pratoResponse.json();
                return {
                  ...item,
                  pratos: pratoData
                };
              } catch (error) {
                console.error('Erro ao buscar prato:', item.pratosId, error);
                return {
                  ...item,
                  pratos: null
                };
              }
            })
          );
          
          setPratos(pratosComDetalhes || []);
          setLoading(false);
        })
        .catch((error) => {
          notify('Erro ao carregar pratos do pedido', { type: 'error' });
          console.error('Erro completo:', error);
          setPratos([]);
          setLoading(false);
        });
    } else {
      setPratos([]);
      setLoading(false);
    }
  }, [pedidoId, notify]);

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
        Este pedido não tem pratos associados.
      </Typography>
    );
  }

  const totalPedido = pratos.reduce((acc, item) => {
    const precoUnitario = item.pratos?.preco || 0;
    return acc + (precoUnitario * item.quantidade);
  }, 0);

  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Prato</strong></TableCell>
              <TableCell><strong>Descrição</strong></TableCell>
              <TableCell align="center"><strong>Quantidade</strong></TableCell>
              <TableCell align="right"><strong>Preço Unit.</strong></TableCell>
              <TableCell align="right"><strong>Subtotal</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pratos.map((item) => {
              const precoUnitario = item.pratos?.preco || 0;
              const subtotal = precoUnitario * item.quantidade;
              
              return (
                <TableRow key={item.id}>

                <TableCell>
                  <ReferenceField 
                    record={item}          
                    source="pratosId"      
                    reference="pratos"       
                  >
                    <TextField source="nome" />
                  </ReferenceField>
                </TableCell>

                  <TableCell>
                    {item.pratos?.descricao || '-'}
                  </TableCell>
                  <TableCell align="center">
                    {item.quantidade}
                  </TableCell>
                  <TableCell align="right">
                    {new Intl.NumberFormat('pt-PT', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    }).format(precoUnitario)}
                  </TableCell>
                  <TableCell align="right">
                    
                      {new Intl.NumberFormat('pt-PT', { 
                        style: 'currency', 
                        currency: 'EUR' 
                      }).format(subtotal)}
                    
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={4} align="right">
                <strong>Total do Pedido:</strong>
              </TableCell>
              <TableCell align="right">
                <strong style={{ fontSize: '1.1em', color: '#1976d2' }}>
                  {new Intl.NumberFormat('pt-PT', { 
                    style: 'currency', 
                    currency: 'EUR' 
                  }).format(totalPedido)}
                </strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const PratosPedidoTab = () => {
  const record = useRecordContext();
  
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Pratos do Pedido
      </Typography>
      {record?.id ? (
        <PratosPedidoList pedidoId={record.id} />
      ) : (
        <Typography>Carregando...</Typography>
      )}
    </>
  );
};

export const PedidosShow = () => {
  return (
    <Show title="Detalhes do Pedido">
      <TabbedShowLayout>
        <Tab label="Informações">
          <TextField source="id" label="ID" />
          <ReferenceField 
            source="cliente_id" 
            reference="clientes" 
            label="Cliente"
          >
            <TextField source="nome" />
          </ReferenceField>
          <ReferenceField 
            source="restaurante_id" 
            reference="restaurantes" 
            label="Restaurante"
          >
            <TextField source="nome" />
          </ReferenceField>
          <SelectField
            source="metodo_pagamento"
            label="Método de Pagamento"
            choices={[
              { id: 'cartao', name: 'Cartão' },
              { id: 'mbway', name: 'MBWay' },
              { id: 'dinheiro', name: 'Dinheiro' },
              { id: 'carteira', name: 'Carteira' },
              { id: 'paypal', name: 'PayPal' },
              { id: 'multibanco', name: 'Multibanco' },
            ]}
          />
          <DateField 
            source="hora_pedido" 
            showTime 
            locales="pt-PT" 
            label="Hora do Pedido"
          />
          <NumberField 
            source="total" 
            label="Total"
            options={{ style: 'currency', currency: 'EUR' }} 
          />

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
        
        <Tab label="Pratos do Pedido">
          <PratosPedidoTab />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};