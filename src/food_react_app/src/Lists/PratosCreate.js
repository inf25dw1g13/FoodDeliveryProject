import React from 'react';
import { 
  Create, 
  SimpleForm, 
  TextInput, 
  NumberInput, 
  BooleanInput,
  ReferenceInput,
  SelectInput,
  required
} from 'react-admin';

export const PratosCreate = (props) => (
  <Create title="Criar Prato" {...props}>
    <SimpleForm>
      <TextInput source="nome" validate={[required()]} fullWidth />
      <ReferenceInput source="restaurante_id" reference="restaurantes" label="Restaurante" fullWidth>
        <SelectInput optionText="nome" />
      </ReferenceInput>
      <ReferenceInput source="categoria_id" reference="categorias-pratos" label="Categoria" fullWidth>
        <SelectInput optionText="nome" />
      </ReferenceInput>
      <NumberInput source="preco" step={0.01} validate={[required()]} label="Preço" fullWidth />
      <TextInput source="descricao" label="Descrição" fullWidth />
      <BooleanInput source="vegetariano" />
      <BooleanInput source="vegan" />
      <BooleanInput source="sem_gluten" label="Sem Glúten" />
      <BooleanInput source="disponivel" defaultValue={true} />
    </SimpleForm>
  </Create>
);