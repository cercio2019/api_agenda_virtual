import mysql from "mysql";
import database from "./keys";

const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{

    if(err)throw err;
    connection.release();
    console.log("Base de datos conectada");
    return;
});

export default pool;