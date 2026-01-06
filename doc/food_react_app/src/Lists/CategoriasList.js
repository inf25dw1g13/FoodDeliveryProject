import React from 'react';
import { 
  List, 
  Datagrid, 
  TextField, 
  EditButton, 
  ShowButton,
  FunctionField,
  useNotify
} from 'react-admin';

const PratosCount = ({ categoriaId }) => {
  const [count, setCount] = React.useState(null);
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
        .then((data) => {
          setCount(data?.length || 0);
          setLoading(false);
        })
        .catch((error) => {
          notify('Erro ao carregar contagem de pratos', { type: 'error' });
          console.error('Erro completo:', error);
          setCount(0);
          setLoading(false);
        });
    } else {
      setCount(0);
      setLoading(false);
    }
  }, [categoriaId, notify]);

  if (loading) return <span>...</span>;
  return <span>{count}</span>;
};

export const CategoriasList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="nome" label="Nome da Categoria" /> 
      <FunctionField 
        label="Total de Pratos"
        render={record => <PratosCount categoriaId={record.id} />}
      />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);
