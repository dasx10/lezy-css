const {readFile} = require("fs");
const {pushFile} = require('./pushFile');
const mediaPatern = /@media+[^@]+}+([\s]|)+}/g; // патерн поиска всех медиа выражений и его инструкций
const mediaQueryPatern = /@media+[^\}]+\)/;
const lastClipPattern = /}+([^\w^\d}]|)+}/;

let arrStyle = '(()=>{let m=['

readFile("test.css","utf8",(err,data)=>{
    console.time('Обработки медиа запросов');
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
                .replace(lastClipPattern,'}')
            );

            all = all.replace(arrMedias[i],'');

            arrStyle += `"${name.trim()}",`;
        }
    }
    pushFile('all',all);
    arrStyle += '"all"];let a=()=>m.forEach((s,i)=>{if(matchMedia(m[i]).matches){let l=document.createElement("link");l.rel="stylesheet";l.media=s;l.href=`test/${s.replace(/(\\(|\\)|:| )/g,"")}.css`;m.splice(i,1);document.head.append(l);}});a();addEventListener("resize",a);})();'
    console.timeEnd('Обработки медиа запросов');
    setTimeout(()=>console.log(arrStyle),1000);
    // console.log(arrMediasStyle+']')
});