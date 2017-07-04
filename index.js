'use strict';
const fs = require('fs');

 module.exports = (fileName = 'timeManager.json') => {
   return {
     'init':function(){ // функция инициализации.   Принимает имя файла в который делать записи или использует стандартный
         if (!fs.existsSync(process.cwd() + '/' + fileName) ){// проверка есть ли файл
           let initData = {}; // переменная для создания новго файла
           let date = new Date();
           initData.HstartDate = date.getDate()+'-' + date.getMonth()+'-' +date.getFullYear() +' '+date.getHours() + ':' + date.getMinutes();// дата начала разработки в удобочитаемом виде
           initData.UstartDate = Date.now();// дата начала разработки в формате UNIX
           initData.startCount = 0;//   количество запусков разработки
           initData.UpureTimeSpent = 0;// чистое затраченое время в формате UNIX
           initData.HpureTimeSpent = 0;// чистое затраченое время в удобочитаемом виде
           initData.allTimeSpent = 0;// "грязное" затраченое время(сколько в общем дней прошло)
           fs.writeFileSync(process.cwd() + '/' + fileName, JSON.stringify(initData));
         }
        //инициализация нового запуска разработки
        let CurrentData = Date.now();
        let readData = fs.readFileSync(fileName);
        const DAYAGO = 86400000; //дней прошло
        const MINAGO = 60000; //минут прошло
        readData = JSON.parse(readData.toString());//получаем нормальный обьект
        readData.startCount++; //добавляем одно включение разработки
        readData.allTimeSpent = Math.floor((CurrentData - readData.UstartDate)/DAYAGO) ; // изменяем общее время работы над проектом
        readData.UpureTimeSpent +=  readData.currentDurationDev;
        readData.HpureTimeSpent = Math.floor(readData.UpureTimeSpent / MINAGO);// изменяем общее время работы над проектом
        readData.currentStartDev = CurrentData; // сделано для подсчета затраченого времени за одно включение
        readData.currentDurationDev = 0; // сколько длилась сесия , для подсчета время разработки
        fs.writeFileSync(process.cwd() + '/' + fileName, JSON.stringify(readData));
        // 33 - name yellow
        // 34 - value blue
        //разноцветный вывод информации
          console.log();
          console.log('\x1b[33m', 'Development is started' ,'\x1b[0m');
          console.log('\x1b[33m', 'It is spent on development precisely: ' ,'\x1b[34m', readData.HpureTimeSpent+ ' minutes','\x1b[0m');
          console.log('\x1b[33m', 'Total starts: ' ,'\x1b[34m', readData.startCount + ' time','\x1b[0m');
          console.log('\x1b[33m', 'Spent on development in general: ' ,'\x1b[34m', readData.allTimeSpent + ' day','\x1b[0m');
          console.log('\x1b[33m', 'Development was started: ' ,'\x1b[34m', readData.HstartDate ,'\x1b[0m');
          console.log();
     },
      'count' : function() { // функция для изменения текущего затраченого время
        let readData = fs.readFileSync(fileName);
        readData = JSON.parse(readData.toString());//получаем нормальный обьект
        readData.currentDurationDev = Date.now() - readData.currentStartDev; // время что прошло с момента инициализации до сейчас
        fs.writeFileSync(process.cwd() + '/' + fileName, JSON.stringify(readData));
      }
   }
 }
