// import {jest} from '@jest/globals';

// jest.useFakeTimers();
 import  {LibClass} from './libClass.js';
// const {take}  = require('./libFun.js');
describe('libFunClass test suite', () => {
	let libFun = new LibClass();
	describe('take function', () => {
		it('take function correct parametrs', () => {
			expect(libFun.take([1,2,3,4,5,6,7],2)).toEqual([1,2]);
			expect(libFun.take([1,2,3,4,5,6,7],1)).toEqual([1]);
			expect(libFun.take([1,2,3,4,5,6,7],4)).toEqual([1,2,3,4]);
			expect(libFun.take([1,2,3,4,5,6,7],7)).toEqual([1,2,3,4,5,6,7]);
			expect(libFun.take([1,2,3,4,5,6,7],0)).toEqual([]);
		});
		it('take function invalid parametrs', () => {
			expect(libFun.take()).toEqual([]);
			expect(libFun.take([1,2,3,4,5,6,7],12)).toEqual([1,2,3,4,5,6,7]);
			expect(libFun.take([1,2,3,4,5,6,7],-4)).toEqual([]);
			expect(libFun.take(7,12)).toEqual([]);
		});
	});
	describe('skip function', () => {
		it('skip function correct parametrs', () => {
			expect(libFun.skip([1,2,3,4,5,6,7],0)).toEqual([1,2,3,4,5,6,7]);
			expect(libFun.skip([1,2,3,4,5,6,7],1)).toEqual([2,3,4,5,6,7]);
			expect(libFun.skip([1,2,3,4,5,6,7],4)).toEqual([5,6,7]);
			expect(libFun.skip([1,2,3,4,5,6,7],7)).toEqual([]);
		});
		it('skip function invalid parametrs', () => {
			expect(libFun.skip()).toEqual([]);
			expect(libFun.skip([1,2,3,4,5,6,7],-3)).toEqual([1,2,3,4,5,6,7]);
			expect(libFun.skip([1,2,3,4,5,6,7],444)).toEqual([]);
			expect(libFun.skip(7,44)).toEqual([]);
		});
	});
	describe('map function', () => {
		it('map function correct parametrs', () => {
			expect(libFun.map([1,2,3,4,5,6,7],
				(elem) => {return elem * 2}))
				.toEqual([2,4,6,8,10,12,14]);
			expect(libFun.map([1,2,3,4,5,6,7],
				(elem, i) => {return elem + i}))
				.toEqual([1,3,5,7,9,11,13]);
				expect(libFun.map([1,2,3,4,5,6,7],
				(elem, i, array) => {return (elem + i) / array.length}))
				.toEqual([1/7,3/7,5/7,7/7,9/7,11/7,13/7]);
		});
		it('map function invalid parametrs', () => {
			expect(libFun.map([],
				(elem, i, array) => {return elem * 2}))
				.toEqual([]);
			expect(libFun.map([1,2]))
				.toEqual([]);
			expect(libFun.map([1,2], () => {}))
				.toEqual([]);
			expect(libFun.map())
				.toEqual([]);
		});
	});
	describe('reduce function', () => {
		it('reduce function correct parametrs', () => {
			expect(libFun.reduce([1,2,3,4,5,6,7],
				(total, amount) => {return total + amount}))
				.toEqual(28);
			expect(libFun.reduce([1,2,3,4],
				(total, amount, index) => {return total + amount + index}))
				.toEqual(16);
			expect(libFun.reduce([1,2,3,4],
				(total, amount, index, array) => {return total + amount + index + array.length}))
				.toEqual(32);
			expect(libFun.reduce([1,2,3,4,5,6,7],
				(total, amount) => {return total + amount}, 10))
				.toEqual(38);
			expect(libFun.reduce([1,2,3,4],
				(total, amount, index) => {return total + amount + index}, 10))
				.toEqual(26);
			expect(libFun.reduce([1,2,3,4],
				(total, amount, index, array) => {return total + amount + index + array.length}, 10))
				.toEqual(42);
		});
		it('reduce function invalid parametrs', () => {
			expect(libFun.reduce())
				.toEqual(0);
			expect(libFun.reduce({},{},40))
				.toEqual(40);
			expect(libFun.reduce(10,(total, amount) => {return total + amount}))
				.toEqual(0);
			expect(libFun.reduce([1,3],(total, amount) => {total + amount}))
				.toEqual(0);
		});
	});
	describe('filter function', () => {
		it('filter function correct parametrs', () => {
			expect(libFun.filter([1,2,3,4,5,6,7],
				(elem) => {return (elem % 2 === 0)}))
				.toEqual([2,4,6]);
			expect(libFun.filter([1,2,3,4,5,6,7],
				(elem, i) => {return ((elem % 2 === 0) && (i > 2))}))
				.toEqual([4,6]);
			expect(libFun.filter([1,5,2,7],
				(elem, i, array) => {return (((array.length + i) / elem) === 1)}))
				.toEqual([5,7]);
		});
		it('filter function invalid parametrs', () => {
			expect(libFun.filter())
				.toEqual([]);
			expect(libFun.filter())
				.toEqual([],(elem) => {return (elem % 2 === 0)});
			expect(libFun.filter([1,2,3,4], ()=> {}))
				.toEqual([]);
			expect(libFun.filter(14, (elem) => {return (elem % 2 === 0)}))
				.toEqual([]);
		});
	});
	describe('foreach function', () => {
		it('foreach function correct parametrs', () => {
			const log = console.log;
			console.log = jest.fn(); 

			const testData = [1,2,3,4,5,6,7];
			expect(libFun.foreach(testData,
				(elem) => {console.log(elem)}))
				.toEqual(testData);
			expect(console.log).toHaveBeenCalledTimes(testData.length);
			for(let i = 0; i < testData.length; i++) {
				expect(console.log.mock.calls[i][0]).toEqual(testData[i]);
			}
			console.log = log; 

			console.log = jest.fn(); 
			const testDataString = ['text1','text2','test3','text4'];
			expect(libFun.foreach(testDataString,
				(elem, i, array) => {console.log(elem, i, array)}))
				.toEqual(testDataString);
			expect(console.log).toHaveBeenCalledTimes(testDataString.length);
			for(let i = 0; i < testDataString.length; i++) {
				expect(console.log.mock.calls[i][0]).toEqual(testDataString[i]);
				expect(console.log.mock.calls[i][1]).toEqual(i);
				expect(console.log.mock.calls[i][2]).toEqual(testDataString);
			}
			console.log = log; 
		});
		it('foreach function invalid parametrs', () => {
			expect(libFun.foreach())
				.toEqual([]);
			expect(libFun.foreach({},{}))
				.toEqual([]);
			expect(libFun.foreach(123,()=>{}))
				.toEqual([]);
		});
	});
	describe('chain function', () => {
		it('chain take take', () => {
			expect(libFun.chain([1,2,3,4,5,6,7]).take(5).take(2).value())
				.toEqual([1,2]);
			expect(libFun.chain([1,2,3,4,5,6,7]).take(10).take(5).value())
				.toEqual([1,2,3,4,5]);
		});
		it('chain take skip', () => {
			expect(libFun.chain([1,2,3,4,5,6,7]).take(5).skip(2).value())
				.toEqual([3,4,5]);
			expect(libFun.chain([1,2,3,4,5,6,7]).take(19).skip(10).value())
				.toEqual([]);
		});
		it('chain take map', () => {
			expect(libFun.chain([1,2,3,4,5,6,7]).take(5).map(
				(elem) => {return elem*2}
				).value())
				.toEqual([2,4,6,8,10]);
			expect(libFun.chain([1,2,3,4]).take(2).map(
				(elem,i,array) => {return elem+i+array.length}
				).value())
			.toEqual([3,5]);
		});
		it('chain take reduce', () => {
			expect(libFun.chain([1,2,3,4,5,6,7]).take(5).reduce(
				(total, amount) => {return total + amount}
				))
				.toEqual(15);
			expect(libFun.chain([1,2,3,4]).take(2).reduce(
				(total, amount) => {return total + amount}, 10
				))
			.toEqual(13);
		});
		it('chain take filter', () => {
			expect(libFun.chain([1,2,3,4,5,6,7]).take(5).filter(
				(elem) => {return (elem % 2 === 0)}
				).value())
				.toEqual([2,4]);
			expect(libFun.chain([4,2,3,4]).take(2).filter(
				(elem, i,array) => {return (elem -i >= array.length)}
				).value())
			.toEqual([4]);
		});
		it('chain take foreach', () => {
			const log = console.log;
			console.log = jest.fn(); 

			const testData = [1,2,3,4,5,6,7];
			const testDataOut = [1,2,3,4,5];

			expect(libFun.chain(testData).take(5).foreach(
				(elem) => {console.log(elem)}
				).value())
				.toEqual(testDataOut);

			expect(console.log).toHaveBeenCalledTimes(testDataOut.length);

			for(let i = 0; i < testDataOut.length; i++) {
				expect(console.log.mock.calls[i][0]).toEqual(testDataOut[i]);
			}
			console.log = log; 
		});
	});
});