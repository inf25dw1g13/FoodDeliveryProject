import React from 'react';
import { 
  Create, 
  SimpleForm, 
  TextInput, 
  ReferenceInput,
  AutocompleteInput,
  required,
  email
} from 'react-admin';

export const ClientesCreate = (props) => (
  <Create title="Criar Cliente" {...props}>
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
      <TextInput
        source="morada"
        label="Morada"
        placeholder="Rua Example, nº 123"
        validate={[required()]}
        fullWidth
      />
      <ReferenceInput 
        source="codpostal" 
        reference="codpostais" 
        label="Código Postal"
      >
        <AutocompleteInput
          optionText={choice => `${choice.codpostal} - ${choice.localidade}, ${choice.cidade}`}
          filterToQuery={searchText => ({ codpostal: searchText })}
          fullWidth
        />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);