const fs = require('fs');
const path = require('path');

function listFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            fileList = listFiles(path.join(dir, file), fileList);
        } else {
            fileList.push(path.join(dir, file));
        }
    });
    return fileList;
}

const fileList = listFiles('docs');
fs.writeFileSync('file_list_tree.json', JSON.stringify(fileList, null, 2));
