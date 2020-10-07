const fs = require("fs");
const mediaPatern = /\((.+?)\)/g;


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

fs.readFile("test.css","utf8",(err,data)=>{
    console.log('Читаю файл');
    if(err) throw err;
    // console.log(data);
    let arrMedias = data.split('@media');
    for(let i=0;i<arrMedias.length;i++){
        let thisMedia = arrMedias[i].match(mediaPatern);
        if(thisMedia){
            if(thisMedia.length==1){
                arrMedias[i] = arrMedias[i].replace('{','').replace(thisMedia,'');
                arrMedias[i] = arrMedias[i].split('').reverse().join('').replace('}','').split('').reverse().join('');
                if(thisMedia[0].match('max-width')&&!thisMedia[0].match('min-width')){
                    let media = thisMedia[0].match(/\d{3,4}/);
                    fs.writeFile(`-${media[0]}.css`,arrMedias[i], function(error){
                        if(error) throw error; // если возникла ошибка
                        console.log(`Асинхронная запись файла -${media[0]}.css завершена.`);
                    });
                }else if(!thisMedia[0].match('max-width')&&thisMedia[0].match('min-width')){
                    let media = thisMedia[0].match(/\d{3,4}/);
                    fs.writeFile(`${media[0]}.css`,arrMedias[i], function(error){
                        if(error) throw error; // если возникла ошибка
                        console.log(`Асинхронная запись файла ${media[0]}.css завершена.`);
                    });
                }
            }else{
                arrMedias[i] = arrMedias[i].replace('{','');
                arrMedias[i] = arrMedias[i].replace(thisMedia[0],'').replace(thisMedia[1],'').replace('AND','').replace('and','').replace('And','');
                arrMedias[i] = arrMedias[i].split('').reverse().join('').replace('}','').split('').reverse().join('');
                let start = thisMedia[0].match('min-width')||thisMedia[0].match('max-width');
                let end = thisMedia[1].match('min-width')||thisMedia[1].match('max-width');
                if(start.length && end.length){
                    if(start == 'min-width' && end == 'max-width'){
                        let mediaStart = start.input.match(/\d{3,4}/);
                        let mediaEnd = end.input.match(/\d{3,4}/);
                        fs.writeFile(`${mediaStart[0]}-${mediaEnd[0]}.css`,arrMedias[i], function(error){
                            if(error) throw error; // если возникла ошибка
                            console.log(`Асинхронная запись файла ${mediaStart[0]}-${mediaEnd[0]}.css завершена.`);
                        });
                    }else if(start == 'max-width' && end == 'min-width'){
                        let mediaStart = start.input.match(/\d{3,4}/);
                        let mediaEnd = end.input.match(/\d{3,4}/);
                        fs.writeFile(`${mediaEnd[0]}-${mediaStart[0]}.css`,arrMedias[i], function(error){
                            if(error) throw error; // если возникла ошибка
                            console.log(`Асинхронная запись файла ${mediaEnd[0]}-${mediaStart[0]}.css завершена.`);
                        });
                    }
                }
                console.log(start.input);
                console.log(start,end);
            }
        }
        else{
            fs.writeFile("def.css",arrMedias[i], function(error){
                if(error) throw error; // если возникла ошибка
                console.log("Асинхронная запись файла def.css завершена.");
            });
        }
    }
})