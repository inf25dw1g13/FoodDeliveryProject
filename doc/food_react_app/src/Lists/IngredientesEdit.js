import React from 'react';
import { 
  Edit, 
  SimpleForm, 
  TextInput, 
  BooleanInput,
  required
} from 'react-admin';

export const IngredientesEdit = (props) => (
  <Edit title="Editar Ingrediente" {...props}>
    <SimpleForm>
      <TextInput source="nome" validate={[required()]} fullWidth />
      <TextInput source="tipo" sortable={false} fullWidth />
      <BooleanInput source="alergeno" defaultValue={false} />
    </SimpleForm>
  </Edit>
);