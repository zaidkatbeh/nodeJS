import AccountController from "./controllers/AccountController.mjs";
import AuthController from "./controllers/AuthController.mjs";
import ResponseTrait from './responseTrait.mjs';

export default function router (request, response){
    const responseTrait = new ResponseTrait(request, response);
    switch (request.url.slice(1)) {
        case "registerForm" :
            new AuthController(request,response).getRegisterForm();
            break;

        case "register":
            new AuthController(request,response).register();
            break;

        case "login":
            new AuthController(request,response).login();
            break;

        case "logout":
            new AuthController(request,response).logout();
            break;

        case "edit":
            new AccountController(request,response).edit();
            break;

        case "pdf" :
            response.setHeader("Content-Type","application/pdf");
            readFile("./public/pdfs/dummy.pdf",(error,fileData) => {
                if(error) {
                    return responseTrait.serverErrorResponse("an error accorded while trying to read the file");
                } else {
                    response.statusCode = 200;
                    response.setHeader("Content-Type","text/html");
                    fileData = Buffer.from(fileData).toString("base64");
                    const html = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                        </head>
                        <body>
                            <h1>test</h1>
                            <iframe src="data:application/pdf;base64,${fileData}" title="W3Schools Free Online Web Tutorials"></iframe>
                            </body>
                        </html>
                    `
                    response.end(html)
                }
            });
            break;
            
        default :
        responseTrait.apiResponse(404,"not found !");
    }
}