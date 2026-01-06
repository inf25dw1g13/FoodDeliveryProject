import React from 'react';
import { 
  Create, 
  SimpleForm, 
  TextInput, 
  BooleanInput,
  SelectInput,
  required
} from 'react-admin';

export const IngredientesCreate = (props) => (
  <Create title="Criar Ingrediente" {...props}>
    <SimpleForm>
      <TextInput source="nome" validate={[required()]} fullWidth />
      <SelectInput 
        source="tipo" sortable={false}
        choices={[
          { id: 'fruta', name: 'Fruta' },
          { id: 'vegetal', name: 'Vegetal' },
          { id: 'carne', name: 'Carne' },
          { id: 'peixe', name: 'Peixe' },
          { id: 'lacticinio', name: 'Lacticínio' },
          { id: 'cereal', name: 'Cereal' },
          { id: 'leguminosa', name: 'Leguminosa' },
          { id: 'condimento', name: 'Condimento' },
          { id: 'outro', name: 'Outro' }
        ]}
        defaultValue="outro"
        fullWidth 
      />
      <BooleanInput source="alergeno" defaultValue={false} />
    </SimpleForm>
  </Create>
);

