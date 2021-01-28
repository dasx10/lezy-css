const fs = require("fs");
let issets = [];
module.exports.pushFile=(name, data, dirname = './')=>{
    console.log('Processing request: ', name);
    name = name
    .replace(/(\(|\)|:| )/g,'');
    if(issets.includes(name)){
        console.log(`Найден дубль запроса: `,name);
        fs.appendFile(`${name}.css`,data, function(error){
            if(error) throw error; // если возникла ошибка  
            console.log(`Asynchronous recording of a take to a file ${name}.css complited.`);
        });
    }else{
        issets.push(name); // сбор пройденых запросов
        fs.writeFile(`${dirname}/${name}.css`,data, function(error){
            if(error) throw error; // если возникла ошибка
            console.log(`Writing a file asynchronously ${name}.css complited.`);
        });
    }
}