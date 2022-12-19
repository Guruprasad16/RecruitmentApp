// const { Connection, Request } = require("tedious");
//  var sql = require("mssql");
// const sql = require("msnodesqlv8");
var mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 20,
    host: "192.168.20.108",
    user: "guru1",
    password: "!.t.Vdg7JO4L}^9^aG",
    database: "testapp",
    port: "3306"
  });
  
//   pool.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     // console.log(conn);
//     conn.query(`select * from complexity`, function (err, result, fields) {
//       if (err) throw err;
//       console.log("Result: " , result);
//     //   console.log("Fields: ", fields);
//     });
//   })

pool.getConnection((err,conn)=>{
    if(err) throw err
    conn.query(`select * from complexity`,(err,rows)=>{
        if(err) throw err
        console.log(rows);
        conn.release();
    })
})

// const connectionString = "server=JKTBLRCOM162;Database=Testapp;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";


module.exports.ConnectToDb = async () => {

   return pool.getConnection(async (err, connection) => {
      if (connection) {
        console.log(connection);
        return connection}
        else if(err){
            return err;
        }
    });
  };
  
module.exports.ExecuteQuery = async (conn, queryString) => {
   return new Promise((resolve,reject)=>{
       
       conn.query(queryString, (err, data) => {
        err ? reject(err) : resolve(data)
}) 
});
  
}
// for(var i=990; i<=999; i++){
// const query = `UPDATE Questions_and_Answers SET ansId = '${i}' WHERE queandansId = '${i}'`;
// sql.query(connectionString, query, (err, rows)=>{
//   console.log(rows);
// })
// }
// var query = "SELECT * FROM Complexity";

// Driver=msnodesqlv8;Server=(JKTBLRCOM162)\INSTANCE;Database=Testapp;UID=AD\Guruprasad.J;PWD=;Encrypt=false
//server=JKTBLRCOM162;Database=Testapp;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}
//Server=JKTBLRCOM162,1433;Database=Testapp;User Id=AD\Guruprasad.J;Password=;Encrypt=false;Trusted_Connection=Yes



// Create connection to database
// const sqlConfig = {
//     user: process.env.DB_USER,
//     password: process.env.DB_PWD,
//     database: process.env.DB_NAME,
//     server: process.env.SERVER,
//     driver: "msnodesqlv8",
//     pool: {
//       max: 10,
//       min: 0,
//       idleTimeoutMillis: 30000
//     },
//     options: {
//         trustedConnection: true,
//         encrypt: false, // for azure
//         trustServerCertificate: true // change to true for local dev / self-signed certs
//     }
//   }

// sql.query(connectionString, query, (err, rows) => {
//     console.log(rows);
//     console.log(err);
// })

/* 
    //Use Azure VM Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        authentication: {
            type: 'azure-active-directory-msi-vm',
        },
        options: {
            database: process.env["db_database"],
            encrypt: true,
            port: 1433
        }
    };

    //Use Azure App Service Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        authentication: {
            type: 'azure-active-directory-msi-app-service',
        },
        options: {
            database: process.env["db_database"],
            encrypt: true,
            port: 1433
        }
    });

*/

// const connection = new Connection(config);

// // Attempt to connect and execute queries if connection goes through
//  connection.on("connect",  ( err) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//  queryDatabase();
// }

// });

// connection.connect();

//  function queryDatabase() {
//   console.log("Reading rows from the Table...");

//   // Read all rows from table
//   const request = new Request(
//     `SELECT * FROM Complexity`,
//     (err, rowCount) => {
//       if (err) {
//         console.error(err.message);
//       } else {
//         console.log(`${rowCount} row(s) returned`);
//       }
//       connection.close();
//     }
//   );

//   request.on("row", columns => {
//     columns.forEach(column => {
//       console.log("%s\t%s", column.metadata.colName, column.value);
//     });
//   });

//   connection.execSql(request);
// }

// function getData() {
//     // Create connection instance
//     var conn = new sql.ConnectionPool(sqlConfig);
   
//     conn.connect()
//     // Successfull connection
//     .then(function () {
   
//       // Create request instance, passing in connection instance
//       var req = new sql.Request(conn);
   
//       // Call mssql's query method passing in params
//       req.query("SELECT * FROM Complexity")
//       .then(function (recordset) {
//         console.log(recordset);
//         conn.close();
//       })
//       // Handle sql statement execution errors
//       .catch(function (err) {
//         console.log(err);
//         conn.close();
//       })
   
//     })
//     // Handle connection errors
//     .catch(function (err) {
//       console.log(err);
//       conn.close();
//     });
//    }
   
   
//    getData();