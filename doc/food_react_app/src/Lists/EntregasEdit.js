import React from 'react';
import { 
  Edit, 
  SimpleForm, 
  SelectInput,
  ReferenceInput,
  required,
  NumberInput,
  DateTimeInput,
} from 'react-admin';
import { InputAdornment } from '@mui/material';

export const EntregasEdit = (props) => (
  <Edit title="Editar Entrega" {...props}>
    <SimpleForm>
        <ReferenceInput source="pedido_id" reference="pedidos">
          <SelectInput optionText="id" validate={[required()]} fullWidth />
        </ReferenceInput>
        <ReferenceInput source="entregador_id" reference="entregadores">
          <SelectInput optionText="nome" validate={[required()]} fullWidth />
        </ReferenceInput>
        <ReferenceInput source="restaurante_id" reference="restaurantes">
        <SelectInput optionText="nome" validate={[required()]} fullWidth />
        </ReferenceInput>
        <SelectInput 
          source="estado" 
          choices={[
          { id: 'pendente', name: 'Pendente' },
          { id: 'a_caminho', name: 'A Caminho' },
          { id: 'entregue', name: 'Entregue' },
          { id: 'cancelada', name: 'Cancelada' }
        ]}
        validate={[required()]} fullWidth/>
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
        <DateTimeInput
        source="hora_entrega"
        label="Hora da Entrega"
        fullWidth
        InputLabelProps={{ shrink: true }}
        />
    </SimpleForm>
  </Edit>
);