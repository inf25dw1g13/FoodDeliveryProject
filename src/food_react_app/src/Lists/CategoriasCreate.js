import React from 'react';
import { 
  Create, 
  SimpleForm, 
  TextInput, 
  required
} from 'react-admin';

export const CategoriasCreate = (props) => (
  <Create title="Criar Categoria de Prato" {...props}>
    <SimpleForm>
      <TextInput
        source="nome"
        label="Nome da Categoria"
        placeholder="Ex: Pizza, Massas, Sobremesas..."
        validate={[required()]}
        fullWidth
      />
    </SimpleForm>
  </Create>
);