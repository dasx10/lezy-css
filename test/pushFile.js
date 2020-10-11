const fs = require("fs");
let issets = [];
module.exports.pushFile=(name,data)=>{
    console.log('Обработка запроса: ',name);
    // name = name.replace(/\(/g,'').replace(/\)/g,'').replace(/\:/g,'-');
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