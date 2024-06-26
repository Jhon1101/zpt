const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "sql10.freesqldatabase.com",
    user: "ssql10716367",
    password: "GWKrpsXEqR",
    database: "sql10716367",
    port: 3306,
});

connection.connect((error) => {
    if (!error) {
        console.log("Conexión exitosa");
    } else {
        console.log("Conexión fallida", error);
    }
});
