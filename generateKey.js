import crypto from 'crypto';
import fs from 'fs';
const key = crypto.randomBytes(32).toString("hex");

fs.readFile(".env", 'utf8', function(err, data) {
    let searchString = 'APP_KEY=';
    let re = new RegExp('^.*' + searchString + '.*$', 'gm');
    let formatted = data.replace(re, 'APP_KEY=' + key);

    fs.writeFile(".env", formatted, 'utf8', function(err) {
        if (err) return console.log(err);
    });

    console.log("The key was generated successfully!");
});