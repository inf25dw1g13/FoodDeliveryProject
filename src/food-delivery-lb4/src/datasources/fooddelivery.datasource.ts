import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'food_delivery',
  connector: 'mysql',
  url: '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'api_user',
  password: process.env.DB_PASSWORD || 'api_password',
  database: process.env.DB_NAME || 'food_delivery'
};


@lifeCycleObserver('datasource')
export class FoodDeliveryDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'food_delivery';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.food_delivery', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
