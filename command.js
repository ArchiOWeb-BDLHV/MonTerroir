import fs from 'fs';

const filename = "./app/commands/" + process.argv[2] + '.js';
if (fs.existsSync(filename)) {
    const js = fs.readFileSync(filename) + '';
    const encodedJs = encodeURIComponent(js);
    const dataUri = 'data:text/javascript;charset=utf-8,' + encodedJs;
    import (dataUri);
} else {
    console.log("\x1b[31m", "The command doesn't exists!\n", "\x1b[0m");
    console.log("You can create it with \nnpm run - make " + process.argv[2]);
}