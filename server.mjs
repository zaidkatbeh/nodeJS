import { createServer } from 'http';
import { readFile } from "fs";
const hostname = '127.0.0.1';
const port = 3000;
console.log(`server is running on ${hostname}:${port}`);      
createServer(function(request, response) {  
    readFile('./main.html', function (err, html) {
        if (err) {
            throw err; 
        }
            response.write(html); 
            response.end();  
    });
}).listen(port,hostname);