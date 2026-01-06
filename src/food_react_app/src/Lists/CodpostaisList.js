import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    Create,
    Edit,
    SimpleForm,
    TextInput,
    Show,
    SimpleShowLayout,
    required,
    Filter,
    EditButton,
    ShowButton,
    useRecordContext
} from 'react-admin';

const CodpostalFilter = (props) => (
    <Filter {...props}>
        <TextInput source="codpostal" label="Código Postal" alwaysOn />
        <TextInput source="localidade" label="Localidade" />
        <TextInput source="cidade" label="Cidade" />
    </Filter>
);

export const CodpostaisList = (props) => (
    <List {...props} filters={<CodpostalFilter />}>
        <Datagrid rowClick="show">
            <TextField source="codpostal" label="Código Postal" />
            <TextField source="localidade" label="Localidade" />
            <TextField source="cidade" label="Cidade" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

export const CodpostaisCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput
                source="codpostal"
                label="Código Postal"
                validate={[required()]}
                placeholder="4000-001"
                fullWidth
            />
            <TextInput
                source="localidade"
                label="Localidade"
                validate={[required()]}
                fullWidth
            />
            <TextInput
                source="cidade"
                label="Cidade"
                validate={[required()]}
                fullWidth
            />
        </SimpleForm>
    </Create>
);

export const CodpostaisEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput
                source="codpostal"
                label="Código Postal"
                validate={[required()]}
                fullWidth
            />
            <TextInput
                source="localidade"
                label="Localidade"
                validate={[required()]}
                fullWidth
            />
            <TextInput
                source="cidade"
                label="Cidade"
                validate={[required()]}
                fullWidth
            />
        </SimpleForm>
    </Edit>
);

export const CodpostaisShow = () => {
    const record = useRecordContext();
    const title = record ? `Código Postal ${record.codpostal}` : 'Código Postal';
    
    return (
        <Show title={title}>
            <SimpleShowLayout>
                <TextField source="codpostal" label="Código Postal" />
                <TextField source="localidade" label="Localidade" />
                <TextField source="cidade" label="Cidade" />
            </SimpleShowLayout>
        </Show>
    );
};
