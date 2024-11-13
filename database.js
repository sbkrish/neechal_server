// database.js
import { Sequelize } from 'sequelize';
import config from './config/config.js';

const env = process.env.NODE_ENV || 'development';
console.log('Current Environment:', env);
const { database, username, password, host, dialect } = config[env];

const sequelize = new Sequelize(database, username, password, {
  host, dialect,
  timezone: '+05:30',
});

try {
  await sequelize.authenticate();
  console.log('MySQL DB Connection has been established successfully.'['yellow']);
} catch (error) {
  console.error('Unable to connect to the MySQL database:'['red'], error.message['red']);
}

export default sequelize;
