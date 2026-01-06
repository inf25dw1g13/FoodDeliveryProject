import React from 'react';
import { 
  List, 
  Datagrid, 
  TextField, 
  NumberField, 
  BooleanField, 
  EditButton, 
  ShowButton,
  ReferenceField
} from 'react-admin';

export const PratosList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="nome" />
      <TextField source="descricao" />
      <NumberField source="preco" options={{ style: 'currency', currency: 'EUR' }} />
      <ReferenceField source="restaurante_id" reference="restaurantes" fullWidth>
        <TextField source="nome" />
      </ReferenceField>
      <BooleanField source="vegetariano" label="Vegetariano" />
      <BooleanField source="vegan" label="Vegano" />
      <BooleanField source="sem_gluten" label="Sem Glúten" />
      <BooleanField source="disponivel" label="Disponível" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);