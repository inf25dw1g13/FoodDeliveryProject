import React from 'react';
import { 
  Show, 
  SimpleShowLayout, 
  TextField, 
  BooleanField,
  DateField,
} from 'react-admin';

export const IngredientesShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="nome" />
      <TextField source="tipo" />
      <BooleanField source="alergeno" />
            <DateField 
              source="created_at" 
              showTime 
              locales="pt-PT" 
              label="Criado em"/>
    </SimpleShowLayout>
  </Show>
);