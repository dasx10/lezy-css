const {readFile} = require("fs");
const {pushFile} = require('./pushFile');
const mediaPatern = /@media+[^@]+}+([\s]|)+}/g; // патерн поиска всех медиа выражений и его инструкций
const mediaQueryPatern = /@media+[^\)]+\)/;
const lastClipPattern = /}+([^\w^\d}]|)+}/;

readFile("test.css","utf8",(err,data)=>{
    console.time('Обработки медиа запросов');
    let arrMedias = data.match(mediaPatern);
    let def = data;
    console.log(arrMedias);
    if(arrMedias){
        for(let i=0;i<arrMedias.length;i++){
            pushFile(arrMedias[i].match(mediaQueryPatern)[0].replace('@media',''),arrMedias[i].split(mediaQueryPatern)[1].replace('{','').replace(lastClipPattern,'}'));
            def = def.replace(arrMedias[i],'');
        }
    }
    pushFile('def',def);
    console.timeEnd('Обработки медиа запросов');
});