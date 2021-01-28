const {pushFile} = require('./pushFile');
const {readFile} = require("fs");
const keyframePattern = /@keyframes+[^@]+}+([\s]|)+}/g; // патерн поиска всех frame выражений и его инструкций


readFile("test.css","utf8",(err,data)=>{
    console.time();
    let arrMedias = data.match(keyframePattern);
    let def = data;
    let key = '';
    console.log(def);
    if(arrMedias){
        for(let i=0;i<arrMedias.length;i++){
            console.log(arrMedias);
            key += arrMedias[i];
            def = def.replace(arrMedias[i],'');
        }
    }
    if(key){
        pushFile('keyframe',key);
    }
    pushFile('cleanAnim',def);
    console.timeEnd();
});