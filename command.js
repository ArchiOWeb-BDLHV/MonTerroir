import fs from 'fs';

const js = fs.readFileSync("./app/commands/" + process.argv[2] + '.js') + '';

const encodedJs = encodeURIComponent(js);
const dataUri = 'data:text/javascript;charset=utf-8,' + encodedJs;
import (dataUri);