import { createServer } from 'http';
import { readFile } from "fs";
import querystring from "querystring";

const hostname = '127.0.0.1';
const port = 3000;

console.log(`server is running on ${hostname}:${port}`);
createServer(function (request, response) {
    if (request.method == "GET" && request.url == "/") {
        readFile('./view.html', function (err, html) {
            if (err) {
                throw err;
            }
            response.write(html);
            response.end();
        });
    } else if (request.method == "POST" && request.url == "/register") {
        let body = "";
        request.on('data', data => {
            body += data;
            console.log(querystring.parse(data));
        });
        console.log(body);
        console.log("-".repeat(20));
        request.on('end', () => {
            const data = querystring.parse(body);
            try {
                if (data["username"].trim() != "" && data["password"].trim().length >= 8) {
                    response.statusCode = 200;
                    response.end("register successfuly");
                } else {
                    response.statusCode = 400;
                    response.end("please enter valid username and password");
                }
            } catch (error) {
                response.statusCode = 500;
                console.log(error);
                response.end("server could not handle the request");
            }


        });
    }
}).listen(port, hostname);