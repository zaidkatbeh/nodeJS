import { createServer } from 'http';
import { readFile } from "fs";
import router from './router.mjs';
import ResponseTrait from './responseTrait.mjs';
global.readFile = readFile;
global.responseTrait =3;

const hostname = '127.0.0.1';
const port = 3000;
console.log(`server is running on ${hostname}:${port}`);
createServer(function (request, response) {
    router(request, response);
}).listen(port, hostname);