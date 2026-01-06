import React from 'react';
import { 
  List, 
  Datagrid, 
  TextField, 
  NumberField, 
  EditButton, 
  ShowButton,
  ReferenceField,
  SelectField,
  DateField
} from 'react-admin';

export const PedidosList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="cliente_id" reference="clientes">
        <TextField source="nome" />
      </ReferenceField>
      <ReferenceField source="restaurante_id" reference="restaurantes">
        <TextField source="nome" />
      </ReferenceField>
      
      <SelectField
        source="metodo_pagamento"
        choices={[
            { id: 'cartao', name: 'Cartão' },
            { id: 'mbway', name: 'MBWay' },
            { id: 'dinheiro', name: 'Dinheiro' },
            { id: 'carteira', name: 'Carteira' },
            { id: 'paypal', name: 'PayPal' },
            { id: 'multibanco', name: 'Multibanco' },
          ]}
      />
      
      <DateField 
        source="hora_pedido" 
        showTime 
        locales="pt-PT" 
        label="Hora do Pedido"
      />
      <NumberField source="total" options={{ style: 'currency', currency: 'EUR' }} />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);