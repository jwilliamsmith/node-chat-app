'use strict';

const moment = require('moment');
let ts = moment().valueOf().toString()
console.log(ts)
console.log(ts.length)
let date = moment();
//date.add(2, 'months');
console.log(date.format('YYYY MM DD'));