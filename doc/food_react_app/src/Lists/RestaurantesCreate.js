import React from 'react';
import { 
  Create, 
  SimpleForm, 
  TextInput, 
  NumberInput, 
  ReferenceInput,
  SelectInput,
  required,
  email
} from 'react-admin';

export const RestaurantesCreate = (props) => (
  <Create title="Criar Restaurante" {...props}>
    <SimpleForm>
      <TextInput source="nome" validate={[required()]} fullWidth />
      <TextInput source="morada" validate={[required()]} fullWidth />
      <ReferenceInput source="codpostal" reference="codpostais" validate={[required()]} fullWidth>
        <SelectInput optionText={choice => `${choice.codpostal} - ${choice.localidade}, ${choice.cidade}`} optionValue="codpostal" />
      </ReferenceInput>
      <TextInput source="telefone" validate={[required()]} fullWidth />
      <TextInput source="email" validate={[email(), required()]} fullWidth />
      <ReferenceInput source="especialidade_id" reference="categorias-pratos" validate={[required()]} fullWidth>
        <SelectInput optionText="nome" optionValue="id" />
      </ReferenceInput>
      <TextInput source="descricao" multiline fullWidth />
      <NumberInput source="taxa_entrega" step={0.01} fullWidth />
      <SelectInput 
        source="estado" 
        choices={[
          { id: 'aberto', name: 'Aberto' },
          { id: 'fechado', name: 'Fechado' }]}
        defaultValue="fechado"
        fullWidth 
      />
    </SimpleForm>
  </Create>
);