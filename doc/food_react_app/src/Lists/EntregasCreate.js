import React from 'react';
import { 
  Create, 
  SimpleForm, 
  SelectInput,
  ReferenceInput,
  required,
  NumberInput,
  DateTimeInput,
} from 'react-admin';
import InputAdornment from '@mui/material/InputAdornment';

export const EntregasCreate = (props) => (
  <Create title="Criar Entrega" {...props}>
    <SimpleForm>
    <ReferenceInput source="pedido_id" reference="pedidos">
      <SelectInput optionText="id" fullWidth />
    </ReferenceInput>
    <ReferenceInput source="entregador_id" reference="entregadoress">
      <SelectInput optionText="nome" fullWidth />
    </ReferenceInput>
    <ReferenceInput source="restaurante_id" reference="restaurantes">
      <SelectInput optionText="nome" fullWidth />
    </ReferenceInput>
        <NumberInput 
          source="tempo_estimado_min" 
          label="Tempo Estimado"
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">min</InputAdornment>,
          }}
        />

        <NumberInput 
          source="tempo_real_min" 
          label="Tempo Real"
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">min</InputAdornment>,
          }}
        />
      <SelectInput 
        source="estado" 
        choices={[
          { id: 'pendente', name: 'Pendente' },
          { id: 'a_caminho', name: 'A Caminho' },
          { id: 'entregue', name: 'Entregue' },
          { id: 'cancelada', name: 'Cancelada' }
        ]}
        validate={[required()]}
        defaultValue="pendente"
        fullWidth 
      />
      <DateTimeInput
        source="hora_entrega"
        label="Hora da Entrega"
        fullWidth
      />
    </SimpleForm>
  </Create>
);