import { Admin, Resource } from "react-admin";
import lb4Provider from "react-admin-lb4";
import APIDashboard from "./dashboard";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";


import { RestaurantesList } from './Lists/RestaurantesList';
import { RestaurantesEdit } from './Lists/RestaurantesEdit';
import { RestaurantesShow } from './Lists/RestaurantesShow';
import { RestaurantesCreate } from './Lists/RestaurantesCreate';

import { PratosList } from './Lists/PratosList';
import { PratosEdit } from './Lists/PratosEdit';
import { PratosShow } from './Lists/PratosShow';
import { PratosCreate } from './Lists/PratosCreate';

import { ClientesList } from './Lists/ClientesList';
import { ClientesEdit } from './Lists/ClientesEdit';
import { ClientesShow } from './Lists/ClientesShow';
import { ClientesCreate } from './Lists/ClientesCreate';

import { PedidosList } from './Lists/PedidosList';
import { PedidosEdit } from './Lists/PedidosEdit';
import { PedidosShow } from './Lists/PedidosShow';
import { PedidosCreate } from './Lists/PedidosCreate';

import { EntregasList } from './Lists/EntregasList';
import { EntregasEdit } from './Lists/EntregasEdit';
import { EntregasShow } from './Lists/EntregasShow';
import { EntregasCreate } from './Lists/EntregasCreate';

import { IngredientesList } from './Lists/IngredientesList';
import { IngredientesEdit } from './Lists/IngredientesEdit';
import { IngredientesShow } from './Lists/IngredientesShow';
import { IngredientesCreate } from './Lists/IngredientesCreate';

import { EntregadoresList } from './Lists/EntregadoresList';
import { EntregadoresEdit } from './Lists/EntregadoresEdit';
import { EntregadoresShow } from './Lists/EntregadoresShow';
import { EntregadoresCreate } from './Lists/EntregadoresCreate';

import { CategoriasList } from './Lists/CategoriasList';
import { CategoriasEdit } from './Lists/CategoriasEdit';
import { CategoriasShow } from './Lists/CategoriasShow';
import { CategoriasCreate } from './Lists/CategoriasCreate';

import { CodpostaisList, CodpostaisCreate, CodpostaisEdit, CodpostaisShow } from './Lists/CodpostaisList';


const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
const baseDataProvider = lb4Provider(apiUrl);

const dataProvider = {
  getList: (resource, params) => {
    const { filter, ...restParams } = params;
    
    if (filter && Object.keys(filter).length > 0) {
      let whereFilter = filter;
      let hasLikeFilters = false;
      
      // Para codpostais, converter filtros de texto em pesquisa parcial (like)
      if (resource === 'codpostais') {
        const newFilter = {};
        if (filter.codpostal && filter.codpostal.trim()) {
          newFilter.codpostal = { like: `%${filter.codpostal.trim()}%` };
          hasLikeFilters = true;
        }
        if (filter.localidade && filter.localidade.trim()) {
          newFilter.localidade = { like: `%${filter.localidade.trim()}%` };
          hasLikeFilters = true;
        }
        if (filter.cidade && filter.cidade.trim()) {
          newFilter.cidade = { like: `%${filter.cidade.trim()}%` };
          hasLikeFilters = true;
        }
        
        // Se houver filtros válidos, usar a nova estrutura
        const filterKeys = Object.keys(newFilter);
        if (filterKeys.length > 0) {
          // Se houver múltiplos filtros, usar AND
          if (filterKeys.length > 1) {
            whereFilter = {
              and: filterKeys.map(key => ({ [key]: newFilter[key] }))
            };
          } else {
            whereFilter = newFilter;
          }
        } else {
          // Se não houver filtros válidos, manter o filtro original
          whereFilter = filter;
        }
      }

      // Para codpostais com filtros like, fazer fetch direto (react-admin-lb4 pode não suportar like)
      if (resource === 'codpostais' && hasLikeFilters) {
        const filterStr = JSON.stringify({ where: whereFilter });
        const url = `${apiUrl}/codpostais?filter=${encodeURIComponent(filterStr)}`;
        
        return fetch(url)
          .then(res => res.json())
          .then(data => ({
            data: data.map(item => ({ ...item, id: item.codpostal })),
            total: data.length
          }));
      }
      
      const loopbackParams = {
        ...restParams,
        filter: {
          where: whereFilter
        }
      };
      
      return baseDataProvider('GET_LIST', resource, loopbackParams).then(response => {
        if (resource === 'codpostais') {
          return {
            ...response,
            data: response.data.map(item => ({ ...item, id: item.codpostal }))
          };
        }
        return response;
      });
    }
    
    return baseDataProvider('GET_LIST', resource, params).then(response => {
      if (resource === 'codpostais') {
        return {
          ...response,
          data: response.data.map(item => ({ ...item, id: item.codpostal }))
        };
      }
      return response;
    });
  },
    
  getOne: (resource, params) =>
    baseDataProvider('GET_ONE', resource, params).then(response => {
      if (resource === 'codpostais') {
        return {
          ...response,
          data: { ...response.data, id: response.data.codpostal }
        };
      }
      return response;
    }),
    
  getMany: (resource, params) =>
    baseDataProvider('GET_MANY', resource, params).then(response => {
      if (resource === 'codpostais') {
        return {
          ...response,
          data: response.data.map(item => ({ ...item, id: item.codpostal }))
        };
      }
      return response;
    }),
    
  getManyReference: (resource, params) =>
    baseDataProvider('GET_MANY_REFERENCE', resource, params).then(response => {
      if (resource === 'codpostais') {
        return {
          ...response,
          data: response.data.map(item => ({ ...item, id: item.codpostal }))
        };
      }
      return response;
    }),
    
  create: (resource, params) => baseDataProvider('CREATE', resource, params),
  update: (resource, params) => baseDataProvider('UPDATE', resource, params),
  updateMany: (resource, params) => baseDataProvider('UPDATE_MANY', resource, params),
  delete: (resource, params) => baseDataProvider('DELETE', resource, params),
  deleteMany: (resource, params) => baseDataProvider('DELETE_MANY', resource, params),
};

const App = () => (
  <Admin 
    dashboard={APIDashboard} 
    dataProvider={dataProvider}
    title="Food Delivery - Admin"
  >
    {/* Recursos Principais */}
    <Resource
      name="restaurantes"
      icon={RestaurantIcon}
      list={RestaurantesList}
      edit={RestaurantesEdit}
      show={RestaurantesShow}
      create={RestaurantesCreate}
      options={{ label: 'Restaurantes' }}
    />
    <Resource
      name="pratos"
      icon={LocalPizzaIcon}
      list={PratosList}
      edit={PratosEdit}
      show={PratosShow}
      create={PratosCreate}
      options={{ label: 'Pratos' }}
    />
    <Resource
      name="pedidos"
      icon={ShoppingCartIcon}
      list={PedidosList}
      edit={PedidosEdit}
      show={PedidosShow}
      create={PedidosCreate}
      options={{ label: 'Pedidos' }}
    />
    
    {/* Recursos de Entrega */}
    <Resource
      name="entregas"
      icon={LocalShippingIcon}
      list={EntregasList}
      edit={EntregasEdit}
      show={EntregasShow}
      create={EntregasCreate}
      options={{ label: 'Entregas' }}
    />
    <Resource
      name="entregadores"
      icon={DeliveryDiningIcon}
      list={EntregadoresList}
      edit={EntregadoresEdit}
      show={EntregadoresShow}
      create={EntregadoresCreate}
      options={{ label: 'Entregadores' }}
    />
    
    {/* Recursos de Clientes */}
    <Resource
      name="clientes"
      icon={PersonIcon}
      list={ClientesList}
      edit={ClientesEdit}
      show={ClientesShow}
      create={ClientesCreate}
      options={{ label: 'Clientes' }}
    />
    
    {/* Recursos de Configuração */}
    <Resource
      name="categorias-pratos"
      icon={CategoryIcon}
      list={CategoriasList}
      edit={CategoriasEdit}
      show={CategoriasShow}
      create={CategoriasCreate}
      options={{ label: 'Categorias' }}
    />
    <Resource
      name="ingredientes"
      icon={FastfoodIcon}
      list={IngredientesList}
      edit={IngredientesEdit}
      show={IngredientesShow}
      create={IngredientesCreate}
      options={{ label: 'Ingredientes' }}
    />
    <Resource
      name="codpostais"
      icon={LocationOnIcon}
      list={CodpostaisList}
      edit={CodpostaisEdit}
      show={CodpostaisShow}
      create={CodpostaisCreate}
      options={{ label: 'Códigos Postais' }}
    />
  </Admin>
);

export default App;
