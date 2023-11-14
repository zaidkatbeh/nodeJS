import { error } from "console";
import fs from "fs";
export default class User {
    static getUsers() {
        return new Promise(resolve => {
            fs.readFile("./Users.json",(error, data) => {
                if(error) {
                    throw error;
                } else {
                    const userData =JSON.parse(data.toString())
                    resolve(userData);
                }
            })
        });
    }
    static writeUsers(newData) {
        return new Promise(resolve => {
            fs.writeFile("./Users.json", JSON.stringify(newData), error => {
                if(error) {
                    throw error;
                } else {
                    resolve();
                }
            });
            resolve()
        });
    }
}