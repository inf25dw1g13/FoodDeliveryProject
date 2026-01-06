import React from 'react';
import { 
  List, 
  Datagrid, 
  TextField, 
  EmailField, 
  EditButton, 
  ShowButton,
  ReferenceField,
  NumberField,
  SelectField
} from 'react-admin';

export const RestaurantesList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="nome" />
      <TextField source="morada" />
      <ReferenceField source="codpostal" reference="codpostais" label="Código Postal">
        <TextField source="codpostal" />
      </ReferenceField>
      <TextField source="telefone" />
      <EmailField source="email" />
      <ReferenceField source="especialidade_id" reference="categorias-pratos" fullWidth></ReferenceField>
      <TextField source="descricao" label="Descrição" />
      <NumberField source="taxa_entrega" label="Taxa de Entrega" options={{ style: 'currency', currency: 'EUR' }} />
      <SelectField source="estado" label="Estado" choices={[
          { id: 'aberto', name: 'Aberto' },
          { id: 'fechado', name: 'Fechado' },
      ]} />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);