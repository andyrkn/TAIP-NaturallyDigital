const dotenv = require('dotenv');
dotenv.config();
const centralDatabaseAPI = process.env.REACT_APP_CENTRAL_DATABASE_API;

export default centralDatabaseAPI;