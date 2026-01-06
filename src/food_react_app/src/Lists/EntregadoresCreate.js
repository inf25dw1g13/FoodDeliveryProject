import React from 'react';
import { 
  Create, 
  SimpleForm, 
  TextInput,
  SelectInput,
  ReferenceInput,
  AutocompleteInput,
  required,
  email
} from 'react-admin';

const estadoChoices = [
  { id: 'disponivel', name: 'Disponível' },
  { id: 'ocupado', name: 'Ocupado' },
  { id: 'indisponivel', name: 'Indisponível' }
];

export const EntregadoresCreate = (props) => (
  <Create title="Criar Entregador" {...props}>
    <SimpleForm>
      <TextInput
        source="nome"
        label="Nome"
        validate={[required()]}
        fullWidth
      />
      <TextInput
        source="email"
        label="Email"
        type="email"
        validate={[email(), required()]}
        fullWidth
      />
      <TextInput
        source="telefone"
        label="Telefone"
        placeholder="912345678"
        validate={[required()]}
        fullWidth
      />
      <ReferenceInput source="codpostal" reference="codpostais" label="Código Postal">
        <AutocompleteInput
          optionText={choice => `${choice.codpostal} - ${choice.localidade}, ${choice.cidade}`}
          fullWidth
        />
      </ReferenceInput>
      <SelectInput
        source="estado"
        label="Estado"
        choices={estadoChoices}
        defaultValue="disponivel"
        fullWidth
      />
    </SimpleForm>
  </Create>
);