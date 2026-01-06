import React from 'react';
import { 
  Create, 
  SimpleForm, 
  SelectInput,
  ReferenceInput,
  required,
  DateTimeInput,
} from 'react-admin';

export const PedidosCreate = (props) => (
  <Create title="Criar Pedido" {...props}>
    <SimpleForm>
    <ReferenceInput source="cliente_id" reference="clientes">
      <SelectInput optionText="nome" fullWidth />
    </ReferenceInput>
    <ReferenceInput source="restaurante_id" reference="restaurantes">
      <SelectInput optionText="nome" fullWidth />
    </ReferenceInput>
      <SelectInput 
        source="metodo_pagamento" 
        choices={[
          { id: 'cartao', name: 'Cartão' },
          { id: 'mbway', name: 'MBWay' },
          { id: 'dinheiro', name: 'Dinheiro' },
          { id: 'carteira', name: 'Carteira' }
        ]}
        validate={[required()]}
        fullWidth 
      />
      <DateTimeInput
        source="hora_pedido"
        label="Hora do Pedido"
        fullWidth
      />
    </SimpleForm>
  </Create>
);