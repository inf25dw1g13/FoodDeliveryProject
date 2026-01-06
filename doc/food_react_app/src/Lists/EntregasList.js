import React from 'react';
import { 
  List, 
  Datagrid, 
  TextField, 
  EditButton, 
  ShowButton,
  ReferenceField,
  SelectField,
  FunctionField,
  DateField
} from 'react-admin';

export const EntregasList = (props) => (
  <List {...props}>
    <Datagrid>
      <ReferenceField source="pedido_id" reference="pedidos">
        <TextField source="id" />
      </ReferenceField>
      <ReferenceField source="entregador_id" reference="entregadores">
        <TextField source="nome" />
      </ReferenceField>
      <ReferenceField source="restaurante_id" reference="restaurantes">
        <TextField source="nome" />
      </ReferenceField>
      <SelectField
              source="estado"
              label="Estado"
              choices={[
                { id: 'pendente', name: 'Pendente' },
                { id: 'a_caminho', name: 'A Caminho' },
                { id: 'entregue', name: 'Entregue' },
                { id: 'cancelado', name: 'Cancelado' },
              ]}/>       
            <FunctionField
              label="Tempo Estimado"
              render={record => `${record.tempo_estimado_min} min`}
            />
              <FunctionField
              label="Tempo Real"
              render={record => `${record.tempo_real_min} min`}
            />
            <DateField 
              source="hora_entrega" 
              showTime 
              locales="pt-PT" 
              label="Hora da Entrega"/>
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);