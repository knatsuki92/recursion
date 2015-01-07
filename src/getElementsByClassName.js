// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

//Outline:
//document.body - the grand-daddy node.
//element.childNodes - returns an array of all the child nodes directly under element node.
//element.classList - returns an an array containing all the class names for the element node. 

var getElementsByClassName = function(className){
  // This should return an array of all the elements with the class 'className'. 

  var returnArray = []; //the output array

  var checkInClass = function(element, className){
  	var classList = element.classList;

  	//First, push the element into returnArray if it's under the class 'className'.
  	if(classList !== undefined){ //only check for appropriate elements.
		for(var i = 0; i < classList.length; i++){
			if(classList[i] === className){
				returnArray.push(element);
			}
		}
	}
	//Next, recurse through all its child elements, child-child elements...and so on.
	var childElements = element.childNodes;
	for(var j = 0; j < childElements.length; j++){
		checkInClass(childElements[j], className);
	}
  }

  //Start from Eve.
  checkInClass(document.body, className);
  return returnArray;


};
