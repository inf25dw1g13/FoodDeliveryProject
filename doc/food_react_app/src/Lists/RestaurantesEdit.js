import React from 'react';
import { 
  Edit, 
  SimpleForm, 
  TextInput, 
  NumberInput, 
  ReferenceInput,
  SelectInput,
  required,
  email
} from 'react-admin';

export const RestaurantesEdit = (props) => (
  <Edit title="Editar Restaurante" {...props}>
    <SimpleForm>
      <TextInput source="nome" validate={[required()]} fullWidth />
      <TextInput source="morada" validate={[required()]} fullWidth />
      <ReferenceInput source="codpostal" reference="codpostais" fullWidth>
        <SelectInput optionText="codpostal" optionValue="codpostal" />
      </ReferenceInput>
      <TextInput source="telefone" validate={[required()]} fullWidth />
      <TextInput source="email" validate={[email()]} fullWidth />
      <ReferenceInput source="especialidade_id" reference="categorias-pratos" fullWidth>
        <SelectInput optionText="nome" optionValue="id" />
      </ReferenceInput>
      <TextInput source="descricao" multiline fullWidth />
      <NumberInput source="taxa_entrega" step={0.01} fullWidth />
      <TextInput source="hora_abertura" label="Hora de Abertura" />
      <TextInput source="hora_fecho" label="Hora de Fecho" />
      <SelectInput source="estado" label="Estado" choices={[
                { id: 'aberto', name: 'Aberto' },
                { id: 'fechado', name: 'Fechado' },
            ]} fullWidth />
    </SimpleForm>
  </Edit>
);