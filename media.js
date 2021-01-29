const {readFile, mkdir, stat} = require("fs").promises;
const {pushFile} = require('./pushFile');
const mediaPatern = /@media+[^@]+}+([\s]|)+}/g; // патерн поиска всех медиа выражений и его инструкций
const mediaQueryPatern = /@media+[^\{]+/;
const lastClipPattern = /}+([^\w^\d}]|)+}/;

let arrStyle = '(()=>{let m=['

splitMQ= async (filesName, dirname = './') => {
    try {
        await stat(dirname);
        console.log('file or directory exists');
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            await mkdir(dirname);
            console.log('make directory');
        }
    }

    let data = await readFile(filesName,"utf8")
    console.time('Handling media queries');
    let arrRequest = [];
    let arrMedias = data.match(mediaPatern);
    // console.log(arrMedias);
    let all = data;
    let nameArr = new Set()
    if(arrMedias){
        for(let i=0;i< arrMedias.length ;i++){
            let name = '';
            try{
                name = arrMedias[i]
                .match(mediaQueryPatern)[0]
                .replace('@media','')
                console.log(`name`,name);
            }catch{
                console.log(arrMedias[i]);
            }
            

            arrRequest.push(pushFile(
                name,arrMedias[i]
                .split(mediaQueryPatern)[1]
                .replace('{','')
                .replace(lastClipPattern,'}'),
                dirname
            ));

            all = all.replace(arrMedias[i],'');
            nameArr.add(`"${name.trim()}",`);
        }
    }
    arrRequest.push(pushFile('all', all, dirname));
    nameArr.forEach((name)=>arrStyle+=name);

    arrStyle += '"all"];let a=()=>m.forEach((s,i)=>{if(matchMedia(m[i]).matches){let l=document.createElement("link");l.rel="stylesheet";l.media=s;l.href=`'
    arrStyle += dirname.replace('./','')+'/${s.replace(/(\\(|\\)|:| )/g,"")}.css`;m.splice(i,1);document.head.append(l);}});a();addEventListener("resize",a);})();'
    await Promise.all(arrRequest)
    console.timeEnd('Handling media queries');
    console.log('\n\n');
    console.log("\x1b[32m",`Embed code to your script file`);
    console.log("\x1b[33m");
    console.log(arrStyle,"\x1b[0m");
    console.log('\n\n');
    console.log("\x1b[32m",`or embed code to your index.html file - after opening a tag`,"\x1b[34m",`<body>`);
    console.log("\x1b[33m");
    console.log(`<script>${arrStyle}</script>`,"\x1b[0m");
    console.log('\n\n');
    return (arrStyle);
}   

module.exports = splitMQ;