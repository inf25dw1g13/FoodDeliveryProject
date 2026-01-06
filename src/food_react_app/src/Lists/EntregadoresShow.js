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
} from '@mui/material';

const EntregasList = ({ entregadorId }) => {
  const [entregas, setEntregas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const notify = useNotify();

  React.useEffect(() => {
    if (entregadorId) {
      setLoading(true);

      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
      
      const filter = JSON.stringify({
        where: { entregador_id: entregadorId }
      });
      
      const url = `${apiUrl}/entregas?filter=${encodeURIComponent(filter)}`;
      
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao carregar entregas');
          }
          return response.json();
        })
        .then(async (data) => {

          const entregasComDetalhes = await Promise.all(
            data.map(async (item) => {
              try {
                const pedidoResponse = await fetch(`${apiUrl}/pedidos/${item.pedido_id}`);
                const pedidoData = await pedidoResponse.json();
                
                let clienteData = null;
                if (pedidoData.cliente_id) {
                  const clienteResponse = await fetch(`${apiUrl}/clientes/${pedidoData.cliente_id}`);
                  clienteData = await clienteResponse.json();
                }
                
                return {
                  ...item,
                  pedido: pedidoData,
                  cliente: clienteData
                };
              } catch (error) {
                console.error('Erro ao buscar detalhes:', item.pedido_id, error);
                return {
                  ...item,
                  pedido: null,
                  cliente: null
                };
              }
            })
          );
          
          setEntregas(entregasComDetalhes || []);
          setLoading(false);
        })
        .catch((error) => {
          notify('Erro ao carregar entregas', { type: 'error' });
          console.error('Erro completo:', error);
          setEntregas([]);
          setLoading(false);
        });
    } else {
      setEntregas([]);
      setLoading(false);
    }
  }, [entregadorId, notify]);

  if (loading) {
    return (
      <Typography variant="body2" color="text.secondary">
        Carregando entregas...
      </Typography>
    );
  }
  
  if (entregas.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Este entregador não tem entregas associadas.
      </Typography>
    );
  }

  const totalEntregas = entregas.length;
  const entregasCompletas = entregas.filter(e => e.estado === 'entregue').length;
  const entregasComTempo = entregas.filter(e => Boolean(e.tempo_real_min));
  const tempoMedio = entregasComTempo.length ? 
    entregasComTempo.reduce((acc, e) => acc + e.tempo_real_min, 0) / entregasComTempo.length : 
    0;

  return (
    <>
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 3 }}>
        <div>
          <Typography variant="caption" color="text.secondary">Total de Entregas</Typography>
          <Typography variant="h5">{totalEntregas}</Typography>
        </div>
        <div>
          <Typography variant="caption" color="text.secondary">Entregas Completas</Typography>
          <Typography variant="h5">{entregasCompletas}</Typography>
        </div>
        <div>
          <Typography variant="caption" color="text.secondary">Tempo Médio</Typography>
          <Typography variant="h5">
            {tempoMedio ? `${Math.round(tempoMedio)} min` : '-'}
          </Typography>
        </div>
      </Paper>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Pedido</strong></TableCell>
              <TableCell><strong>Cliente</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
              <TableCell><strong>Valor</strong></TableCell>
              <TableCell><strong>Tempo Estimado</strong></TableCell>
              <TableCell><strong>Tempo Real</strong></TableCell>
              <TableCell><strong>Hora da Entrega</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entregas.map((item) => ( 
              <TableRow key={item.id}>

          {/* Pedido ID */}
          <TableCell>
            <ReferenceField 
              record={item}          
              source="pedido_id"      
              reference="pedidos"
              link="show" 
            >
              <TextField source="id" />
            </ReferenceField>
          </TableCell>

          {/* Nome do Cliente */}
          <TableCell>
            {item.cliente?.id ? (
              <ReferenceField 
                record={{ cliente_id: item.cliente.id }}  
                source="cliente_id"      
                reference="clientes"
                link="show"  
              >
                <TextField source="nome" />
              </ReferenceField>
            ) : (
              item.cliente?.nome || '-'
            )}
          </TableCell>

                <TableCell>{item.estado}</TableCell>

                <TableCell>
                  {item.pedido?.total ? 
                    new Intl.NumberFormat('pt-PT', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    }).format(item.pedido.total) 
                    : '-'}
                </TableCell>

                <TableCell>{item.tempo_estimado_min ? `${item.tempo_estimado_min} min` : '-'}</TableCell>
                <TableCell>{item.tempo_real_min ? `${item.tempo_real_min} min` : '-'}</TableCell>
                <TableCell>{item.hora_entrega || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const EntregasTab = () => {
  const record = useRecordContext();
  
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Entregas deste Entregador
      </Typography>
      {record?.id ? (
        <EntregasList entregadorId={record.id} />
      ) : (
        <Typography>Carregando...</Typography>
      )}
    </>
  );
};

export const EntregadoresShow = () => {
  return (
    <Show title="Detalhes do Entregador">
      <TabbedShowLayout>
        <Tab label="Informações">
          <TextField source="id" label="ID" />
          <TextField source="nome" label="Nome" />
          <EmailField source="email" label="Email" />
          <TextField source="telefone" label="Telefone" />
          <ReferenceField source="codpostal" reference="codpostais" label="Código Postal">
            <TextField source="codpostal" />
          </ReferenceField>
          <TextField source="estado" label="Estado" />
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
        <Tab label="Entregas">
          <EntregasTab />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};