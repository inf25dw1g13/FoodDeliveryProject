import React from 'react';
import { 
  Show, 
  TabbedShowLayout,
  Tab,
  TextField, 
  EmailField, 
  NumberField, 
  BooleanField,
  ReferenceManyField,
  Datagrid,
  DateField,
  ReferenceField,
  SelectField,
  EditButton
} from 'react-admin';

export const RestaurantesShow = () => (
  <Show title="Detalhes do Restaurante">
    <TabbedShowLayout>
      <Tab label="Informações">
        <TextField source="id" label="ID" />
        <TextField source="nome" label="Nome" />
        <TextField source="morada" label="Morada" />
        <ReferenceField source="codpostal" reference="codpostais" label="Código Postal">
          <TextField source="codpostal" />
        </ReferenceField>
        <TextField source="telefone" label="Telefone" />
        <EmailField source="email" label="Email" />
        <ReferenceField source="especialidade_id" reference="categorias-pratos" fullWidth></ReferenceField>
        <TextField source="descricao" label="Descrição" />
        <NumberField source="taxa_entrega" label="Taxa de Entrega" options={{ style: 'currency', currency: 'EUR' }} />
        <TextField source="hora_abertura" label="Hora de Abertura" />
        <TextField source="hora_fecho" label="Hora de Fecho" />
        <SelectField source="estado" label="Estado" choices={[
          { id: 'aberto', name: 'Aberto' },
          { id: 'fechado', name: 'Fechado' },
        ]} />
        <DateField 
          source="created_at" 
          showTime 
          locales="pt-PT" 
          label="Criado em"
        />
        <DateField 
          source="updated_at" 
          showTime 
          locales="pt-PT" 
          label="Última Atualização em"
        />
      </Tab>

      <Tab label="Pratos">
        <ReferenceManyField 
          reference="pratos" 
          target="restaurante_id"
          label="Pratos do Restaurante"
        >
          <Datagrid rowClick="show" bulkActionButtons={false}>
            <TextField source="id" label="ID" />
            <TextField source="nome" label="Nome" />
            <TextField source="descricao" label="Descrição" />
            <NumberField source="preco" label="Preço" options={{ style: 'currency', currency: 'EUR' }} />
            <BooleanField source="vegetariano" label="Vegetariano" />
            <BooleanField source="vegan" label="Vegano" />
            <BooleanField source="disponivel" label="Disponível" />
          </Datagrid>
        </ReferenceManyField>
      </Tab>

      <Tab label="Pedidos">
        <ReferenceManyField 
          reference="pedidos" 
          target="restaurante_id"
          label="Pedidos do Restaurante"
        >
          <Datagrid rowClick="show" bulkActionButtons={false}>
            <TextField source="id" label="ID" />
            <ReferenceField source="cliente_id" reference="clientes" label="Cliente">
              <TextField source="nome" />
            </ReferenceField>
            <DateField 
              source="hora_pedido" 
              showTime 
              locales="pt-PT" 
              label="Hora do Pedido"
            />
            <NumberField 
              source="total" 
              label="Total" 
              options={{ style: 'currency', currency: 'EUR' }} 
            />
            <TextField source="metodo_pagamento" label="Método de Pagamento" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
