import fs from 'fs';

const js = fs.existsSync("./" + process.argv[2] + '.js');

console.log(js);

if (js) {
    console.log("\x1b[31m", "The command already exists!", "\x1b[0m");
} else {
    fs.writeFileSync("./app/commands/" + process.argv[3] + '.js', "");
    console.log("\x1b[32m", "The command was created successfully! You can now edit it in the app/commands folder.", "\x1b[0m");
}