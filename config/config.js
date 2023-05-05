require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.mysql_global_username,
        "password": process.env.mysql_global_password,
        "database": process.env.mysql_global_database,
        "host": process.env.mysql_global_host,
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}