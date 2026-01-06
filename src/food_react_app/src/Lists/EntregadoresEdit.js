import React from 'react';
import { 
  Edit, 
  TabbedForm,
  FormTab,
  TextInput,
  SelectInput,
  ReferenceInput,
  AutocompleteInput,
  required,
  email,
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
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const estadoChoices = [
  { id: 'disponivel', name: 'Disponível' },
  { id: 'ocupado', name: 'Ocupado' },
  { id: 'indisponivel', name: 'Indisponível' }
];

const estadoEntregaColors = {
  'pendente': 'default',
  'a_caminho': 'info',
  'entregue': 'success',
  'cancelado': 'error'
};

const EntregasManager = () => {
  const record = useRecordContext();
  const [entregas, setEntregas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const notify = useNotify();
  const refresh = useRefresh();

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

  const loadEntregas = React.useCallback(() => {
    setLoading(true);
    const filter = JSON.stringify({
      where: { entregador_id: record.id }
    });
    
    const url = `${apiUrl}/entregas?filter=${encodeURIComponent(filter)}`;
    
    fetch(url)
      .then(response => response.json())
      .then(async (data) => {

        const entregasComDetalhes = await Promise.all(
          data.map(async (item) => {
            try {
              const pedidoResponse = await fetch(`${apiUrl}/pedidos/${item.pedido_id}`);
              const pedidoData = await pedidoResponse.json();
              return {
                ...item,
                pedido: pedidoData
              };
            } catch (error) {
              console.error('Erro ao buscar pedido:', item.pedido_id, error);
              return {
                ...item,
                pedido: null
              };
            }
          })
        );
        
        setEntregas(entregasComDetalhes || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar entregas:', error);
        notify('Erro ao carregar entregas', { type: 'error' });
        setLoading(false);
      });
  }, [record.id, apiUrl, notify]);

  React.useEffect(() => {
    if (record?.id) loadEntregas();
  }, [record?.id, loadEntregas]);

  const handleRemove = (id) => {
    if (!window.confirm('Remover esta entrega?')) return;

    fetch(`${apiUrl}/entregas/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          notify('Entrega removida');
          loadEntregas();
          refresh();
        } else throw new Error();
      })
      .catch(() => notify('Erro ao remover', { type: 'error' }));
  };

  if (loading) return <Typography>Carregando...</Typography>;

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>Entregas do Entregador</Typography>
      {entregas.length > 0 && (
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Pedido #</strong></TableCell>
                <TableCell><strong>Estado</strong></TableCell>
                <TableCell><strong>Tempo Estimado</strong></TableCell>
                <TableCell><strong>Tempo Real</strong></TableCell>
                <TableCell><strong>Hora Entrega</strong></TableCell>
                <TableCell align="center"><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entregas.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>#{item.pedido_id}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.estado}
                      color={estadoEntregaColors[item.estado] || 'default'}
                      size="small"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>{item.tempo_estimado_min ? `${item.tempo_estimado_min} min` : '-'}</TableCell>
                  <TableCell>{item.tempo_real_min ? `${item.tempo_real_min} min` : '-'}</TableCell>
                  <TableCell>{item.hora_entrega || '-'}</TableCell>
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
        {showAddForm ? 'Cancelar' : 'Adicionar Entrega'}
      </Button>

      {showAddForm && (
        <AddEntregaForm 
          entregadorId={record.id} 
          onSuccess={() => { setShowAddForm(false); loadEntregas(); refresh(); }}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
};

const AddEntregaForm = ({ entregadorId, onSuccess, onCancel }) => {
  const [formData, setFormData] = React.useState({
    pedido_id: '',
    restaurante_id: '',
    tempo_estimado_min: 30,
    estado: 'pendente',
  });
  const [pedidos, setPedidos] = React.useState([]);
  const [restaurantes, setRestaurantes] = React.useState([]);
  const notify = useNotify();
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

  React.useEffect(() => {
    fetch(`${apiUrl}/pedidos`).then(res => res.json()).then(setPedidos);
    fetch(`${apiUrl}/restaurantes`).then(res => res.json()).then(setRestaurantes);
  }, [apiUrl]);

  const handleSubmit = () => {
    if (!formData.pedido_id) return notify('Selecione um pedido', { type: 'warning' });
    if (!formData.restaurante_id) return notify('Selecione um restaurante', { type: 'warning' });

    const payload = {
      pedido_id: Number(formData.pedido_id),
      entregador_id: Number(entregadorId),
      restaurante_id: Number(formData.restaurante_id),
      tempo_estimado_min: Number(formData.tempo_estimado_min),
      estado: formData.estado,
    };

    fetch(`${apiUrl}/entregas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async response => {
        const data = await response.json();
        if (response.ok) {
          notify('Entrega adicionada com sucesso', { type: 'success' });
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
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Adicionar Entrega</Typography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <select 
          value={formData.pedido_id}
          onChange={e => setFormData({...formData, pedido_id: e.target.value})}
          style={{ padding: '8px' }}
        >
          <option value="">Escolha um pedido...</option>
          {pedidos.map(p => (
            <option key={p.id} value={p.id}>
              Pedido #{p.id} - {new Intl.NumberFormat('pt-PT', { 
                style: 'currency', 
                currency: 'EUR' 
              }).format(p.total || 0)}
            </option>
          ))}
        </select>

        <select 
          value={formData.restaurante_id}
          onChange={e => setFormData({...formData, restaurante_id: e.target.value})}
          style={{ padding: '8px' }}
        >
          <option value="">Escolha um restaurante...</option>
          {restaurantes.map(r => (
            <option key={r.id} value={r.id}>{r.nome}</option>
          ))}
        </select>
        
        <input 
          type="number" 
          placeholder="Tempo Estimado (min)" 
          min="1"
          style={{ padding: '8px' }}
          value={formData.tempo_estimado_min} 
          onChange={e => setFormData({...formData, tempo_estimado_min: e.target.value})}
        />

        <select 
          value={formData.estado}
          onChange={e => setFormData({...formData, estado: e.target.value})}
          style={{ padding: '8px' }}
        >
          <option value="pendente">Pendente</option>
          <option value="a_caminho">A Caminho</option>
          <option value="entregue">Entregue</option>
          <option value="cancelado">Cancelado</option>
        </select>

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

export const EntregadoresEdit = (props) => (
  <Edit title="Editar Entregador" {...props}>
    <TabbedForm>
      <FormTab label="Entregador">
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
          validate={[email()]}
          fullWidth
        />
        <TextInput
          source="telefone"
          label="Telefone"
          placeholder="912345678"
          fullWidth
        />
        <ReferenceInput source="codpostal" reference="codpostais" label="Código Postal">
          <AutocompleteInput
            optionText={choice => `${choice.codpostal} - ${choice.localidade}, ${choice.cidade}`}
            fullWidth
          />
        </ReferenceInput>
        <SelectInput
          source="estado"
          label="Estado"
          choices={estadoChoices}
          fullWidth
        />
      </FormTab>

      <FormTab label="Entregas">
        <EntregasManager />
      </FormTab>
    </TabbedForm>
  </Edit>
);