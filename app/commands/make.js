import fs from 'fs';

const filename = "./app/commands/" + process.argv[3] + '.js';
const js = fs.existsSync(filename);

console.log(js);

if (js) {
    console.log("\x1b[31m", "The command already exists!", "\x1b[0m");
} else {
    fs.writeFileSync(filename, "console.log('Hello world from " + process.argv[3] + " !');");
    console.log("\x1b[32m", "The command was created successfully!\nYou can now edit it in the app/commands folder.\nYou can run this command with \n\n", "\x1b[0m");

    console.log("npm run -" + process.argv[3], "\n");
}