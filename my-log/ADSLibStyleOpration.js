if(!window.ADS){
	window['ADS'] = {};
}


function getClassName(element){
	if(!(element = $(element)))
		return false;
	return element.className.replace(/\s+/,' ').split(' ');
}

function hasClassName(element,className){
	if(!(element = $(element)))
		return false;
	var classes = getClassName(element);
	for(var i = 0 ; i < classes.length ; i++){
		if(classes[i] === className){
			return true;
		}
	}
	return false;
}

function addClassName(element,className){
	if(!(element = $(element)))
		return false;
	element.className += (element.className ? ' ' : '')+className;
	return true;
}

function removeClassName(element , className){
	if(!(element = $(element)))
		return false;
	var classes = getClassName(element);
	var length = classes.length;
	for(var i = length - 1; i >= 0; i--){
		if(classes[i] === className){
			delete(classes[i]);
		}
	}
	element.className = classes.join(' ');
	return (length == classes.length ? false : true);
}

window['ADS']['getClassName'] = getClassName;
window['ADS']['hasClassName'] = hasClassName;
window['ADS']['addClassName'] = addClassName;
window['ADS']['removeClassName'] = removeClassName;
