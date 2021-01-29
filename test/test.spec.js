const mq = require('../media');

mq('test/test.css','./dist').then((code)=>console.log(code))