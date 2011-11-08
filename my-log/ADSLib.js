//初始化ADS的namespace
if(!window.ADS){
	window['ADS'] = {};
}


function $(){
	var elements = new Array();
	
	for(var i = 0; i < arguments.length; i++){
		var element = arguments[i];
		
		if(typeof element == 'string'){
			element = document.getElementById(element);
		}
		
		if(arguments.length == 1){
			return element;
		}
		elements.push(element);
	}
	return elements;
}

function isCompatible(other) {
	//使用能力檢測，來檢查必要條件
	if(other === false 
		|| !Array.prototype.push 
		|| !Object.hasOwnProperty 
		|| !document.createElement 
		|| !document.getElementByTagName) {
		return false;
	}

	return true;
}


function addEvent(node,type,listener){
	if(!isCompatible){
		return false;
	}
		if(!(node = $(node))){
			return false;
		}
		
		if(node.addEventListener){//W3C方法
			node.addEventListener(type,listener,false);
			return true;
		}else if(node.attachEvent){
			node['e'+type+listener] = listener;
			node[type+listener] = function(){
				node['e'+type+listener](window.event);
			}
			node.attachEvent('on'+type,node[type+listener]);
			return true;
		}
		return false;
}

//根據classname找出所有符合的元素
function getElementsByClassName(className,tag,parent){
	
	parent = parent || document;
	if(!(parent = $(parent))){
		return false;
	}
	var allTags = (tag == "*" && parent.all) ? parent.all:parent.getElementsByTagName(tag);
	
	className = className.replace(/\-/g,"\\-");
	var regex = new RegExp("(^|\\s)"+className +"(\\s|$)");
	
	var element;
	var matchingElements = new Array();
	for(var i = 0; i < allTags.length; i ++){
		element = allTags[i];
		if(regex.test(element.className)){
			matchingElements.push(element);
		}
	}
	return matchingElements;
}


function toggleDisplay(node,value){
	if(!(node = $(node))){
		return false;
	}
	if(node.style.display != 'none'){
		node.style.display = 'none';
	}else{
		node.style.display = value || '';
	}
	return true;
}

function insertAfter(node,referenceNode){
	if(!(node = $(node))){
		return false;
	}
	if(!(referenceNode = $(referenceNode))){
		return false;
	}
	return referenceNode.parentNode.insertBefore(node,referenceNode.nextSibling);
}

function bindingFunction(obj,func){
	return function(){
		func.apply(obj,arguments);
	}
}


function getBrowserWindowSize() {
	var de = document.documentElement;
	return {
		'width' : (window.innerWidth || de && de.clientWidth || document.body.clientWidth),
		'height' : (window.innerHeight || de && de.clientHeight || document.body.clientHeight)
	}
}

//獲取當前鼠標坐標
function getMousecCoordinate(){
	event = window.event || arguments[0];
	return {
		'X':event.clientX || document.body.scrollLeft|| document.documentElement.scrollLeft,
		'Y':event.clientY || document.body.scrollTop || document.documentElement.scrollTop 
	};
}
window['ADS']['$'] = $;
window['ADS']['isCompatible'] = isCompatible;
window['ADS']['addEvent'] = addEvent;
window['ADS']['getElementsByClassName'] = getElementsByClassName;
window['ADS']['toggleDisplay'] = toggleDisplay;
window['ADS']['insertAfter'] = insertAfter;
window['ADS']['bindingFunction'] = bindingFunction;
window['ADS']['getBrowserWindowSize'] = getBrowserWindowSize;
window['ADS']['getMousecCoordinate'] = getMousecCoordinate;