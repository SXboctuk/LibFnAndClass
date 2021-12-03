import * as lib from './libFun.js';


console.log(lib.chain([1,2,3,4]).take(3).skip(1).map((elem) => elem*2).value());