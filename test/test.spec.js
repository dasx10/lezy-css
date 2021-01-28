const mq = require('../media');

mq('test.css','./dist').then((code)=>console.log(code))