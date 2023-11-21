import multiparty from "multiparty"
export default function getFormBodyMiddleware(request, callback) {
    console.log("test");

        const FORM = new multiparty.Form();
        request.fields = [];
        request.files = [];
        FORM.parse(request, async(error, fields, files) => {
            if (!error) {
                request.fields = fields;
                request.files = files;
            }
            callback(null);
    });
}