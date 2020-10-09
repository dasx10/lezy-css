const fs = require("fs");
const mediaPatern = /\((.+?)\)/g; // патерн поиска занчений (любой текст в этих скобках)


// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(`Thank you for your valuable feedback: ${answer}`);
//   rl.close();
// });

let issets = []; // хранилище пройденных запросов
let pushFile=(name,data)=>{
    console.log('Обработка запроса: ',name);
    name = name.replace('(','').replace(')','').replace(':','-');
    if(issets.includes(name)){
        console.log(`Найден дубль запроса: `,name);
        fs.appendFile(`${name}.css`,data, function(error){
            if(error) throw error; // если возникла ошибка  
            console.log(`Асинхронная дозапись дубля в файл ${name}.css завершена.`);
        });
    }else{
        issets.push(name); // сбор пройденых запросов
        fs.writeFile(`${name}.css`,data, function(error){
            if(error) throw error; // если возникла ошибка
            console.log(`Асинхронная запись файла ${name}.css завершена.`);
        });
    }
}

let cleanMediaCss=(css,media)=>{ // удаление медиазапроса и скобок
    css = css.replace('{','').replace(media,'');
    css = css.split('').reverse().join('').replace('}','').split('').reverse().join('');
    return css;
}


fs.readFile("test.css","utf8",(err,data)=>{
    console.log('Читаю файл');
    if(err) throw err;
    let arrMedias = data.split('@media'); // раздел файла по запросам
    for(let i=0;i<arrMedias.length;i++){
        let thisMedia = arrMedias[i].match(mediaPatern);
        if(thisMedia){
            if(thisMedia.length==1){
                thisMedia = thisMedia[0];
                if(thisMedia.match('max-width')){
                    pushFile(thisMedia,cleanMediaCss(arrMedias[i],thisMedia));
                }else if(thisMedia.match('min-width')){
                    pushFile(thisMedia,cleanMediaCss(arrMedias[i],thisMedia));
                }else if(thisMedia.match('min-height')){
                    pushFile(thisMedia,cleanMediaCss(arrMedias[i],thisMedia));
                }else if(thisMedia.match('max-height')){
                    pushFile(thisMedia,cleanMediaCss(arrMedias[i],thisMedia));
                }
                
                else{
                    pushFile(`default`,'@media'+arrMedias[i]);
                    console.log(thisMedia);
                }
            }else if(thisMedia.length == 2){
                arrMedias[i] = arrMedias[i].replace('{','');
                arrMedias[i] = arrMedias[i].replace(thisMedia[0],'').replace(thisMedia[1],'').replace('AND','').replace('and','').replace('And','');
                arrMedias[i] = arrMedias[i].split('').reverse().join('').replace('}','').split('').reverse().join('');
                let start = thisMedia[0].match('min-width')||thisMedia[0].match('max-width');
                let end = thisMedia[1].match('min-width')||thisMedia[1].match('max-width');
                if(start.length && end.length){
                    if(start == 'min-width' && end == 'max-width'){
                        let mediaStart = start.input.match(/\d{3,4}/);
                        let mediaEnd = end.input.match(/\d{3,4}/);
                        pushFile(`${mediaStart[0]}-${mediaEnd[0]}`,arrMedias[i]);
                    }else if(start == 'max-width' && end == 'min-width'){
                        let mediaStart = start.input.match(/\d{3,4}/);
                        let mediaEnd = end.input.match(/\d{3,4}/);
                        pushFile(`${mediaEnd[0]}-${mediaStart[0]}`,arrMedias[i]);
                    }
                }
            }
        }
        else{
            pushFile(`default`,arrMedias[i]);
        }
    }
})