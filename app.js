var fs = require('fs');
var http = require('http');
const mysql = require('mysql');


http.createServer((req , res) => {

    if(req.url.toLowerCase() === '/home' || req.url === '/' || req.url.toLowerCase() === '/index'){
        res.writeHead( 200 , {'Content-Type' : 'text/html' });
        fs.createReadStream('home.html').pipe(res);


    } else if (req.url.toLowerCase() === '/about') {
        res.setHeader('Content-Type' , 'text/html' );
        fs.createReadStream('about.html').pipe(res);
        
    } else if (req.url.toLowerCase() === '/connection_check') {
      
        return res.end(JSON.stringify({
            "message": "Connection create success ",
            "api v": 1
        }));
            try {

                console.log("yes");
                const connectionMySQL = mysql.createPool({
                    connectionLimit: 5,
                    host: "localhost",
                    user: "root",
                    password: "Root#321@",
                    database: "mydatabase"
                });
        
                // This is for Pool connect
                connectionMySQL.getConnection(function (err, connection) {
                    if (err) {
                        console.log(err);
                        connection.release();
                        return res.end(JSON.stringify({
                            "message": "Connection create fail",
                            "error": err,
                            "api v": 1
                        }));
                    }
        
                    connection.release();
                    return res.end(JSON.stringify({
                        "message": "Connection create success ",
                        "api v": 1,
                        "precess": connectionMySQL._acquiringConnections.length,
                        "length": connectionMySQL._allConnections.length  
                    }));
                   
                });
        
               
            } catch (error) {
                console.log(error);
                return res.end(JSON.stringify({
                    "status": 404,
                    "message": "Connection create fail try",
                    "api v": 1,
                    "error": error
                }));
                
            }

    } else if (req.url.toLowerCase() === '/api'){

        res.writeHead( 200 , {'Content-Type' : 'application/json' });
        var jsonObj =  [
            { 
                Name : 'Komol' ,
                Reg : 'Muslim' ,
                age : 23 } ,
    
            {
                Name : 'Roly' ,
                Reg : 'Muslim' ,
                age : 20 }
            ];

        res.end(JSON.stringify(jsonObj));

    } else {

        res.writeHead(404 , {'Content-Type': 'text/html'}) ;
        fs.createReadStream('error.html').pipe(res);

    }

}).listen(3000) ;

console.log(`Routing Server is Run now (port 3000) ..............`);