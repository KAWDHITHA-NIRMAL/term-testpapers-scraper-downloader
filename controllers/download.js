import axios from "axios"
import path from 'path'
import fs from 'fs';
import fsp from 'fs/promises';

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
        if(!uris)throw new Error("fucked up")
        console.log(uris.length)
        for (let i in uris) {
            let x = uris[i].split('https://pastpapers.wiki/').join('')
            x = x.slice(x.indexOf("grade-10"))
            x = x.split('/')
            x.shift()
            x.shift()
           x =  x.join('') + '.pdf'
            const filePath = path.join(
                __path,
                x
            );
            if(x.startsWith('wp-adminadmin-ajax.php'))continue;
            const writer = fs.createWriteStream(filePath);

            const response = await axios({
                url: uris[i],
                method: 'GET',
                responseType: 'stream',
            });

            response.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', ()=>{
                 console.log('err')
                });
            });

            console.log(uris[i] + ' downloaded...');
        }
    }
    catch (err) {
        throw new Error(err)
    }

    return __path
}
export { download }