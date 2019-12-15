const dotenv = require('dotenv');
dotenv.config();
const centralDatabaseAPI = process.env.CENTRAL_DATABASE_API;
console.log(centralDatabaseAPI);

export default centralDatabaseAPI;