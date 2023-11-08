 import main from "./indexComponent/controller.mjs"
 export default function router(request, response) {
    switch (request.url) {
        default : 
        main(request, response);
    }
}