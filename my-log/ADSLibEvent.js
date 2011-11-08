if(!window.ADS){
	window['ADS'] = {};
}

function getkeyPressed(eventObject){
	eventObject = eventObject || getEventObject(eventObject);
	
	var code = eventObject.keyCode;
	var value = String.fromCharCode(code);
	return {'code':code,'value':value};
}


window['ADS']['getkeyPressed'] = getkeyPressed;
