import React from 'react';
import { 
  List, 
  Datagrid, 
  TextField, 
  EditButton, 
  ShowButton,
  EmailField,
  ReferenceField
} from 'react-admin';

export const EntregadoresList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="nome" label="Nome" />
      <EmailField source="email" label="Email" />
      <TextField source="telefone" label="Telefone" />
      <ReferenceField source="codpostal" reference="codpostais" label="Código Postal">
        <TextField source="codpostal" />
      </ReferenceField>
      <TextField source="estado" label="Estado" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);