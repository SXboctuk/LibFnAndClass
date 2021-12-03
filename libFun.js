
 export function take (array, n){
	let resultArr = [];

	if(!array || !Array.isArray(array)) return resultArr;
	if(!n) return resultArr;

	for(let i = 0; i <  n && i < array.length; i++) {
		resultArr = [...resultArr, array[i]];
	}

	return resultArr;
 };

export function skip (array, n){
	let resultArr = [];

	if(!array || !Array.isArray(array)) return resultArr;

	for(let i = (n < 0 ? 0 : n); i < array.length; i++) {
		resultArr = [...resultArr, array[i]];
	}

	return resultArr;
};
// callback(elem, i, array)
export  function map (array, callback)  {
	let resultArr = [];

	if(!array || !callback) return resultArr;
	if(!Array.isArray(array) || array.length === 0) return resultArr;
	if(typeof callback(array[0], 0, array) === 'undefined') return resultArr;

	for(let i = 0; i < array.length; i++) {
		resultArr = [...resultArr, callback(array[i],i,array)];
	}

	return resultArr;
};

function  high(x, fn) {
	
	return (...args) => {

		return fn(x, ...args);
	}
};
//callback => (total, amount, index, array)
export function reduce (array, callback, initialValue = 0) {

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
//callback (elem, i, array)
export function filter(array, callback)  {
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

export function foreach(array, callback) {

	if (!array || !callback) return (array ? array : []);
	if (!Array.isArray(array) || array.length === 0) return [];

	for(let i = 0; i < array.length; i++) {
		callback(array[i], i, array)
	}

	return array;
};

export function chain(array) {
	
	let arrayResult = array;
	return {
		take: function(n) {
			arrayResult = take(arrayResult, n);
			return this;
		},
		skip: function(n) {
			arrayResult = skip(arrayResult,n);
			return this;
		},
		map: function(callback) {
			arrayResult = map(arrayResult, callback);
			return this;
		},
		reduce: function(callback, initialValue) {
			return reduce(arrayResult, callback,initialValue);
		},
		filter: function(callback) {
			arrayResult = filter(arrayResult, callback);
			return this;
		},
		foreach: function(callback) {
			foreach(arrayResult, callback);
			return this;
		},
		value: function() { return arrayResult }
	}
	
};
