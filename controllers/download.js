// import axios from "axios"
import path from 'path'
import fs from 'fs';
import fsp from 'fs/promises';
import https from 'https'

async function createPath(_path) {
    if (!(fs.existsSync(_path))) {
        await fsp.mkdir(_path)
    }
}

const download = async (uris, _path, grade, subject) => {
    let __path = _path

    try {
        //Create Temp Folder Path
        await createPath(__path)
        __path = path.join(__path, grade.toString())
        await createPath(__path)
        __path = path.join(__path, subject)
        await createPath(__path)

        //Download files
        for (let i in uris) {
            const filePath = path.join(
              __path,
              uris[i].split('https://pastpapers.wiki/').join('').split('/').join('') + '.pdf'
            );
            const file = fs.createWriteStream(filePath);
        
            https.get(uris[i], response => {
              response.pipe(file);
            });
        
            file.on('finish', () => {
              console.log(uris[i] + ' downloaded...');
            });
        
            file.on('error', (err )=> {
              throw new Error(err);
            });
          }
        }        
    catch (err) {
            throw new Error(err)
        }

        return __path
    }
export { download }