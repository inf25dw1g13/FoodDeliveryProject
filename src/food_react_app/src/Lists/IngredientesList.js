import React from 'react';
import { 
  List, 
  Datagrid, 
  TextField, 
  BooleanField, 
  EditButton, 
  ShowButton
} from 'react-admin';

export const IngredientesList = (props) => {

    const defaultSort = { field: 'id', order: 'ASC' };

    return (
  <List {...props} sort={defaultSort} perPage={10} filter={{}}>
    <Datagrid>
      <TextField source="nome" />
      <TextField source="tipo" />
      <BooleanField source="alergeno" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
    );
};