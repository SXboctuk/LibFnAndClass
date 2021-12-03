export class LibClass {

	take (array, n){
		let resultArr = [];

		if(!array || !Array.isArray(array)) return resultArr;
		if(!n) return resultArr;

		for(let i = 0; i <  n && i < array.length; i++) {
			resultArr = [...resultArr, array[i]];
		}

		return resultArr;
 	};

	skip (array, n){
		let resultArr = [];

		if(!array || !Array.isArray(array)) return resultArr;

		for(let i = (n < 0 ? 0 : n); i < array.length; i++) {
			resultArr = [...resultArr, array[i]];
		}

		return resultArr;
	};

	map (array, callback)  {
		let resultArr = [];

		if(!array || !callback) return resultArr;
		if(!Array.isArray(array) || array.length === 0) return resultArr;
		if(typeof callback(array[0], 0, array) === 'undefined') return resultArr;

		for(let i = 0; i < array.length; i++) {
			resultArr = [...resultArr, callback(array[i],i,array)];
		}

		return resultArr;
	};

	reduce (array, callback, initialValue = 0) {
		const high = (x, fn) => {
			
			return (...args) => {

				return fn(x, ...args);
			}
		};

		if (!array || !callback) return initialValue;
		if (!Array.isArray(array) || array.length === 0) return initialValue;
		

		let totalValue = initialValue;
		let innerCallBack = high(totalValue, callback);

		if(typeof innerCallBack(array[0], 0, array) === 'undefined') return initialValue;

		for(let i = 0; i < array.length; i++)
		{
			totalValue = innerCallBack(array[i], i, array);
			innerCallBack = high(totalValue, callback);
		}

		return totalValue;
	};

	filter(array, callback)  {
		let resultArr = [];

		if (!array || !callback) return resultArr;
		if (!Array.isArray(array) || array.length === 0) return resultArr;
		if(typeof callback(array[0], 0, array) === 'undefined') return resultArr;

		for(let i = 0; i < array.length; i++) {
			if(callback(array[i], i, array)){
				resultArr = [...resultArr, array[i]]
			}
		}
		return resultArr;
	};

	foreach(array, callback) {

		if (!array || !callback) return (array ? array : []);
		if (!Array.isArray(array) || array.length === 0) return [];

		for(let i = 0; i < array.length; i++) {
			callback(array[i], i, array)
		}

		return array;
	};
	
	chain  (array)  {
	
		let arrayResult = array;
		const mainThis = this;
		return {
			take: function(n)  {
				arrayResult = mainThis.take(arrayResult, n);
				return this;
			},
			skip: function(n) {
				arrayResult = mainThis.skip(arrayResult,n);
				return this;
			},
			map: function(callback) {
				arrayResult = mainThis.map(arrayResult, callback);
				return this;
			},
			reduce: function(callback, initialValue) {
				return mainThis.reduce(arrayResult, callback,initialValue);
			},
			filter: function(callback) {
				arrayResult = mainThis.filter(arrayResult, callback);
				return this;
			},
			foreach: function(callback) {
				mainThis.foreach(arrayResult, callback);
				return this;
			},
			value: function() { return arrayResult }
		}
	};
}