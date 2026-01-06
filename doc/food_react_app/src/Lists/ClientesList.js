import React from 'react';
import { 
  List, 
  Datagrid, 
  TextField, 
  EmailField, 
  EditButton, 
  ShowButton,
  ReferenceField
} from 'react-admin';

export const ClientesList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="nome" label="Nome" />
      <EmailField source="email" label="Email" />
      <TextField source="telefone" label="Telefone" />
      <TextField source="morada" label="Morada" />
      <ReferenceField source="codpostal" reference="codpostais" label="Código Postal">
        <TextField source="codpostal" />
      </ReferenceField>
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);