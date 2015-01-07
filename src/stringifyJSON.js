// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  //Initial outline of my approach. 
  	//Start with the most rudimentary element and build up using recursion.
  //Three different parts: 1. object, 2. array, 3. values
  /*
  	case 1: Object
		stringifyJSON({a : 3}) = "{"a" = 3}"
		stringifyJSON({d: {da:8}}) = "{"d":{"da":8}}"
	case 2: Array
		stringifyJSON([1, 2, 3])= "[1, 2 ,3]"
		stringifyJSON([{a:3}, {b: true}, {c: 'hello'}, false, 'bye', null], [6,7], {d: {da:8}}])) = "[{"a":3},{"b":true},{"c":"hello"},false,"bye",null,[6,7], {"d":{"da":8}}]"
	case 3: Value
		stringifyJSON(1) = "1"
		stringifyJSON(true) = "true"
		stringifyJSON('true') = ""true""
	case 4: null
		stringifyJSON(null) = "null"
  */
	var outputJSON = "";
	//case: function & undefined
	if(typeof(obj) === 'function' || obj === undefined){
		return undefined;
	}

	//case: null
	else if(obj === null){
		outputJSON += obj;
		return outputJSON;
	}
	//case: value
	else if(!Array.isArray(obj) && typeof(obj) !== 'object'){
		outputJSON += obj;
		if(typeof(obj) === 'string'){
			outputJSON = "\"" + outputJSON + "\""; //strings are double-quoted.
		}
		return outputJSON;
	}
	//case: array
	//*NOTE: it's crucial for array case to be considered before the object case since typeof(array) === 'object' is true.
	else if(Array.isArray(obj)){
		outputJSON += "[";
		for(var i = 0; i < obj.length; i++){
			if(typeof(obj[i]) !== 'function' && obj[i] !== undefined){
				outputJSON += stringifyJSON(obj[i]) + ","; //using recursion here as well.
			} else{
				outputJSON += "null," //case: return null for function and undefined values within array.
			}
		}
		if(obj.length > 0) { //only if it isn't an empty array
			outputJSON = outputJSON.substr(0,outputJSON.length - 1); //delete the last comma.
		}
		outputJSON += "]";
		return outputJSON;
	}
	//case: object
	else if(typeof(obj) === 'object'){
		outputJSON += "{"

		var numChild = 0; //check for empty set.
		for(var child in obj){
			if(typeof(obj[child]) !== 'function' && obj[child] !== undefined){ //skip for functions and undefined within object.
				outputJSON += "\"" + child + "\":" + stringifyJSON(obj[child]) + ","; //using recursion here.
				numChild += 1;
			}
		}
		if(numChild !== 0){
			outputJSON = outputJSON.substr(0,outputJSON.length - 1); //delete the last comma.
		}
		outputJSON += "}";
		return outputJSON;
	}

	

};
