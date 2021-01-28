const {readFile, mkdirSync, statSync} = require("fs");
const {pushFile} = require('./pushFile');
const mediaPatern = /@media+[^@]+}+([\s]|)+}/g; // патерн поиска всех медиа выражений и его инструкций
const mediaQueryPatern = /@media+[^\}]+\)/;
const lastClipPattern = /}+([^\w^\d}]|)+}/;

let arrStyle = '(()=>{let m=['

splitMQ=(filesName, dirname = './')=>{
    try {
        statSync(dirname);
        console.log('file or directory exists');
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            mkdirSync(dirname);
        }
    }
    return new Promise((resolve,reject)=>readFile(filesName,"utf8",(err, data)=>{
        console.time('Handling media queries');
        let arrMedias = data.match(mediaPatern);
        let all = data;
        if(arrMedias){
            for(let i=0;i<arrMedias.length;i++){
                let name = arrMedias[i]
                .match(mediaQueryPatern)[0]
                .replace('@media','')
    
                pushFile(
                    name,arrMedias[i]
                    .split(mediaQueryPatern)[1]
                    .replace('{','')
                    .replace(lastClipPattern,'}'),
                    dirname
                );
    
                all = all.replace(arrMedias[i],'');
                arrStyle += `"${name.trim()}",`;
            }
        }
        pushFile('all',all,dirname);
        arrStyle += '"all"];let a=()=>m.forEach((s,i)=>{if(matchMedia(m[i]).matches){let l=document.createElement("link");l.rel="stylesheet";l.media=s;l.href=`test/${s.replace(/(\\(|\\)|:| )/g,"")}.css`;m.splice(i,1);document.head.append(l);}});a();addEventListener("resize",a);})();'
        console.timeEnd('Handling media queries');
        setTimeout(()=>{
            console.log('\n\n');
            console.log("\x1b[32m",`Embed code to your script file`);
            console.log("\x1b[33m");
            console.log(arrStyle,"\x1b[0m");
            console.log('\n\n');
            console.log("\x1b[32m",`or embed code to your index.html file - after opening a tag`,"\x1b[34m",`<body>`);
            console.log("\x1b[33m");
            console.log(`<script>${arrStyle}<script>`,"\x1b[0m");
            console.log('\n\n');
            resolve(arrStyle);
        },1000);
    }));
}

module.exports = splitMQ;