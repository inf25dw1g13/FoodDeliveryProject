import React from 'react';
import { 
  Edit, 
  TabbedForm,
  FormTab,
  TextInput, 
  NumberInput, 
  BooleanInput,
  ReferenceInput,
  SelectInput,
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

const IngredientesManager = () => {
  const record = useRecordContext();
  const [ingredientes, setIngredientes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const notify = useNotify();
  const refresh = useRefresh();

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

  const loadIngredientes = React.useCallback(() => {
    setLoading(true);

    const filter = JSON.stringify({
      where: { pratosId: record.id },
      include: [{ relation: 'ingredientes' }] 
    });
    
    const url = `${apiUrl}/pratos-ingredientes?filter=${encodeURIComponent(filter)}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setIngredientes(data || []);
        setLoading(false);
      })
      .catch(() => {
        notify('Erro ao carregar ingredientes', { type: 'error' });
        setLoading(false);
      });
  }, [record.id, apiUrl, notify]);

  React.useEffect(() => {
    if (record?.id) loadIngredientes();
  }, [record?.id, loadIngredientes]);

  const handleRemove = (id) => {
    if (!window.confirm('Remover este ingrediente?')) return;

    fetch(`${apiUrl}/pratos-ingredientes/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          notify('Ingrediente removido');
          loadIngredientes();
          refresh();
        } else throw new Error();
      })
      .catch(() => notify('Erro ao remover', { type: 'error' }));
  };

  if (loading) return <Typography>Carregando...</Typography>;

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>Ingredientes do Prato</Typography>
      {ingredientes.length > 0 && (
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Ingrediente</strong></TableCell>
                <TableCell><strong>Qtd</strong></TableCell>
                <TableCell align="center"><strong>Obrigatório</strong></TableCell>
                <TableCell align="center"><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredientes.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.ingredientes?.nome || 'Ingrediente ' + item.ingredientesId}</TableCell>
                  <TableCell>{item.quantidade} {item.unidade}</TableCell>
                  <TableCell align="center">{item.obrigatorio ? 'Sim' : 'Não'}</TableCell>
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

      <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowAddForm(!showAddForm)} sx={{ mb: 2 }}>
        {showAddForm ? 'Cancelar' : 'Adicionar Ingrediente'}
      </Button>

      {showAddForm && (
        <AddIngredienteForm 
          pratoId={record.id} 
          onSuccess={() => { setShowAddForm(false); loadIngredientes(); refresh(); }}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
};

const AddIngredienteForm = ({ pratoId, onSuccess, onCancel }) => {
  const [formData, setFormData] = React.useState({
    ingredientesId: '',
    quantidade: '0',
    unidade: 'g',
    obrigatorio: true,
  });
  const [lista, setLista] = React.useState([]);
  const notify = useNotify();
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

  React.useEffect(() => {
    fetch(`${apiUrl}/ingredientes`).then(res => res.json()).then(setLista);
  }, [apiUrl]);

  const handleSubmit = () => {
    if (!formData.ingredientesId) return notify('Selecione um ingrediente', { type: 'warning' });

    const payload = {
      pratosId: Number(pratoId),
      ingredientesId: Number(formData.ingredientesId),
      quantidade: String(formData.quantidade), 
      unidade: formData.unidade,
      obrigatorio: Boolean(formData.obrigatorio)
    };

    fetch(`${apiUrl}/pratos-ingredientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async response => {
        const data = await response.json();
        if (response.ok) {
          notify('Adicionado com sucesso', { type: 'success' });
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
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Novo Ingrediente</Typography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <select 
          value={formData.ingredientesId}
          onChange={e => setFormData({...formData, ingredientesId: e.target.value})}
          style={{ padding: '8px' }}
        >
          <option value="">Escolha um ingrediente...</option>
          {lista.map(i => <option key={i.id} value={i.id}>{i.nome}</option>)}
        </select>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" placeholder="Quantidade" style={{ flex: 1, padding: '8px' }}
            value={formData.quantidade} onChange={e => setFormData({...formData, quantidade: e.target.value})}
          />
          <input 
            type="text" placeholder="Unidade" style={{ flex: 1, padding: '8px' }}
            value={formData.unidade} onChange={e => setFormData({...formData, unidade: e.target.value})}
          />
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            type="checkbox" checked={formData.obrigatorio}
            onChange={e => setFormData({...formData, obrigatorio: e.target.checked})}
          /> Obrigatório?
        </label>

        <div>
          <Button onClick={handleSubmit} variant="contained" sx={{ mr: 1 }}>Adicionar</Button>
          <Button onClick={onCancel}>Sair</Button>
        </div>
      </div>
    </Paper>
  );
};

export const PratosEdit = (props) => (
  <Edit title="Editar Prato" {...props}>
    <TabbedForm>
      <FormTab label="Informações">
        <TextInput source="nome" validate={[required()]} fullWidth />
        <TextInput source="descricao" multiline fullWidth />
        <NumberInput source="preco" validate={[required()]} />
        <ReferenceInput source="restaurante_id" reference="restaurantes">
          <SelectInput optionText="nome" />
        </ReferenceInput>
        <ReferenceInput source="categoria_id" reference="categorias-pratos">
          <SelectInput optionText="nome" />
        </ReferenceInput>
        <BooleanInput source="disponivel" />
      </FormTab>
      <FormTab label="Ingredientes">
        <IngredientesManager />
      </FormTab>
    </TabbedForm>
  </Edit>
);