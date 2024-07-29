import mysql from 'mysql';
import database from '../keys';

const connection = mysql.createConnection(database);

export default connection;