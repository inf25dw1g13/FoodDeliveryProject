import React from 'react';
import { 
  Show, 
  SimpleShowLayout, 
  TextField,
  DateField,
  ReferenceField ,
  FunctionField,
} from 'react-admin';

export const EntregasShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField 
                  source="pedido_id" 
                  reference="pedidos" 
                  label="Pedido">
                  <TextField source="id" />
      </ReferenceField>
      <ReferenceField 
                  source="entregador_id" 
                  reference="entregadores" 
                  label="Entregador">
                  <TextField source="nome" />
      </ReferenceField>
      <ReferenceField 
                  source="restaurante_id" 
                  reference="restaurantes" 
                  label="Restaurante">
                  <TextField source="nome" />
      </ReferenceField>
      <FunctionField
          label="Estado"
          render={record => {
              const map = {
                  pendente: 'Pendente',
                  a_caminho: 'A Caminho',
                  entregue: 'Entregue',
                  cancelado: 'Cancelado',
              };
              return map[record.estado] || record.estado;
          }}/>
            
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

      <DateField 
        source="created_at" 
        showTime 
        locales="pt-PT" 
        label="Criado em"/>

      <DateField 
        source="updated_at" 
        showTime 
        locales="pt-PT" 
        label="Última Atualização em"/>
    </SimpleShowLayout>
  </Show>
);