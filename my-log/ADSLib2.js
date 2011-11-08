/**
 * ADSLib的后續文件
 */

//重復一個字符串
if(!String.repeat){
	String.prototype.repeat = function(p_l){
		return new Array(p_l+1).join(this);
	}
}
//清楚開頭和結尾處的空白符
if(!String.trim){
	String.prototype.trim = function(){
		return this.replace(/^\s+|\s+$/g,'');
	}
}


if(!window.ADS){
	window['ADS'] = {};
}

function walkElementsLinear(func,node){
	var root = node || window.document;
	var nodes = root.getElementsByTagName("*");
	for(var i = 0; i < nodes.length ; i ++){
		func.call(nodes[i]);
	}
}

//深度遍歷
function walkTheDOMRecursive(func,node,depth,returnedFromParent){
	var root = node || window.document;
	var returnedFromParent = func.call(root,depth ++,returnedFromParent);
	var node = root.firstChild;
	while(node){
		walkTheDOMRecursive(func,node,depth,returnedFromParent);
		node = node.nextSibling;
	}
}

function walkTheDOMWithAttributes(node,func,depth,returnedFromParent){
	var root = node || window.document;
	returnedFromParent = func(root,depth++,returnedFromParent);
	if(root.attributes){
		for(var i = 0 ; i < root.attributes.length;i ++){
			walkTheDOMWithAttributes(root.attributes[i],func,depth-1,returnedFromParent);
		}
	}
	if(root.nodeType != ADS.node.ATTRBUTE_NODE){
		node = root.firstChild;
		while(node){
			walkTheDOMWithAttributes(node,func,depth,returnedFromParent);
			node = node.nextSibling;
		}
	}
}

//把 word-word轉換為wordWord;
function camelize(s){
	return s.replace(/-(\w)/g,function(strMatch,p){
		return p.toUpperCase();
	});
}

//阻止冒泡
function stopPropagation(eventObject){
	eventObject = eventObject || getEventObject(eventObject);
	if(eventObject.stopPropagation){
		eventObject.stopPropagation();
	}else{
		eventObject.cancelBubble = true;
	}
}

function preventDefault(eventObject){
	eventObject = eventObject || getEventObject(eventObject);
	if(eventObject.preventDefault){
		eventObject.preventDefault();
	}else{
		eventObject.returnValue = false;
	}
}

window['ADS']['camelize'] = camelize;
window['ADS']['walkTheDOMRecursive'] = walkTheDOMRecursive;
window['ADS']['stopPropagation'] = stopPropagation;
window['ADS']['preventDefault'] = preventDefault;


