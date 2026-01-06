import React from 'react';
import { 
  Edit, 
  TabbedForm,
  FormTab,
  NumberInput, 
  SelectInput,
  ReferenceInput,
  required,
  useRecordContext,
  useNotify,
  useRefresh,
} from 'react-admin';
import { 
  Typography, 
  Button,
  Table,
  TableBody,
  TableCell, 
  TableContainer,
  TableHead,
  TableRow, 
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const PratosPedidoManager = () => {
  const record = useRecordContext();
  const [pratos, setPratos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const notify = useNotify();
  const refresh = useRefresh();

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

  const loadPratos = React.useCallback(() => {
    setLoading(true);

    const filter = JSON.stringify({
      where: { pedidosId: record.id }
    });
    
    const url = `${apiUrl}/pedidos-pratos?filter=${encodeURIComponent(filter)}`;
    
    fetch(url)
      .then(response => response.json())
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
        console.error('Erro ao carregar pratos:', error);
        notify('Erro ao carregar pratos', { type: 'error' });
        setLoading(false);
      });
  }, [record.id, apiUrl, notify]);

  React.useEffect(() => {
    if (record?.id) loadPratos();
  }, [record?.id, loadPratos]);

  const handleRemove = (id) => {
    if (!window.confirm('Remover este prato do pedido?')) return;

    fetch(`${apiUrl}/pedidos-pratos/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          notify('Prato removido do pedido');
          loadPratos();
          refresh();
        } else throw new Error();
      })
      .catch(() => notify('Erro ao remover', { type: 'error' }));
  };

  if (loading) return <Typography>Carregando...</Typography>;

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>Pratos do Pedido</Typography>
      {pratos.length > 0 && (
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Prato</strong></TableCell>
                <TableCell><strong>Quantidade</strong></TableCell>
                <TableCell><strong>Preço Unitário</strong></TableCell>
                <TableCell><strong>Subtotal</strong></TableCell>
                <TableCell align="center"><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pratos.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.pratos?.nome || 'Prato ' + item.pratosId}</TableCell>
                  <TableCell>{item.quantidade}</TableCell>
                  <TableCell>
                    {item.pratos?.preco ? 
                      new Intl.NumberFormat('pt-PT', { 
                        style: 'currency', 
                        currency: 'EUR' 
                      }).format(item.pratos.preco) 
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {item.pratos?.preco ? 
                      new Intl.NumberFormat('pt-PT', { 
                        style: 'currency', 
                        currency: 'EUR' 
                      }).format(item.pratos.preco * item.quantidade) 
                      : '-'}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="error" onClick={() => handleRemove(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Button 
        variant="contained" 
        startIcon={<AddIcon />} 
        onClick={() => setShowAddForm(!showAddForm)} 
        sx={{ mb: 2 }}
      >
        {showAddForm ? 'Cancelar' : 'Adicionar Prato'}
      </Button>

      {showAddForm && (
        <AddPratoForm 
          pedidoId={record.id} 
          onSuccess={() => { setShowAddForm(false); loadPratos(); refresh(); }}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
};

const AddPratoForm = ({ pedidoId, onSuccess, onCancel }) => {
  const [formData, setFormData] = React.useState({
    pratosId: '',
    quantidade: 1,
  });
  const [lista, setLista] = React.useState([]);
  const notify = useNotify();
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

  React.useEffect(() => {
    fetch(`${apiUrl}/pratos`).then(res => res.json()).then(setLista);
  }, [apiUrl]);

  const handleSubmit = () => {
    if (!formData.pratosId) return notify('Selecione um prato', { type: 'warning' });

    const payload = {
      pedidosId: Number(pedidoId),
      pratosId: Number(formData.pratosId),
      quantidade: Number(formData.quantidade),
    };

    fetch(`${apiUrl}/pedidos-pratos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async response => {
        const data = await response.json();
        if (response.ok) {
          notify('Prato adicionado com sucesso', { type: 'success' });
          onSuccess();
        } else {

          const errorMsg = data.error?.message || 'Erro ao adicionar';
          notify(`Erro: ${errorMsg}`, { type: 'error' });
        }
      })
      .catch(() => notify('Erro de conexão', { type: 'error' }));
  };

  return (
    <Paper sx={{ p: 2, mb: 2, border: '1px solid #ddd' }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Adicionar Prato ao Pedido</Typography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <select 
          value={formData.pratosId}
          onChange={e => setFormData({...formData, pratosId: e.target.value})}
          style={{ padding: '8px' }}
        >
          <option value="">Escolha um prato...</option>
          {lista.map(p => (
            <option key={p.id} value={p.id}>
              {p.nome} - {new Intl.NumberFormat('pt-PT', { 
                style: 'currency', 
                currency: 'EUR' 
              }).format(p.preco || 0)}
            </option>
          ))}
        </select>
        
        <input 
          type="number" 
          placeholder="Quantidade" 
          min="1"
          style={{ padding: '8px' }}
          value={formData.quantidade} 
          onChange={e => setFormData({...formData, quantidade: e.target.value})}
        />

        <div>
          <Button onClick={handleSubmit} variant="contained" sx={{ mr: 1 }}>
            Adicionar
          </Button>
          <Button onClick={onCancel}>Sair</Button>
        </div>
      </div>
    </Paper>
  );
};

export const PedidosEdit = (props) => (
  <Edit title="Editar Pedido" {...props}>
    <TabbedForm>
      <FormTab label="Informações do Pedido">
        <ReferenceInput source="cliente_id" reference="clientes">
          <SelectInput optionText="nome" validate={[required()]} fullWidth />
        </ReferenceInput>
        <ReferenceInput source="restaurante_id" reference="restaurantes">
          <SelectInput optionText="nome" validate={[required()]} fullWidth />
        </ReferenceInput>
        <SelectInput 
          source="metodo_pagamento" 
          choices={[
            { id: 'cartao', name: 'Cartão' },
            { id: 'mbway', name: 'MBWay' },
            { id: 'dinheiro', name: 'Dinheiro' },
            { id: 'carteira', name: 'Carteira' },
            { id: 'paypal', name: 'PayPal' },
            { id: 'multibanco', name: 'Multibanco' },
          ]}
          validate={[required()]}
          fullWidth 
        />
        <NumberInput source="total" step={0.01} fullWidth disabled />
      </FormTab>

      <FormTab label="Pratos do Pedido">
        <PratosPedidoManager />
      </FormTab>
    </TabbedForm>
  </Edit>
);