//alt+L可打开/关闭log信息档查看相关内容

function myLogger(id){
	var that = this;
    this.isShow = false;
	id = id || 'ADSLogWindow';
	var logWindow = null;
	var createWindow = function(){//創建日志窗口
		var browserWindowSize = ADS.getBrowserWindowSize();
		var top = ((browserWindowSize.height - 200) / 2)|| 0 ;
		var left =  ((browserWindowSize.width - 200) / 2)|| 0 ;
		
		logWindow = document.createElement('UL');//創建作為日志窗口的dom節點
		
		//設定id值，以便必要時在dom樹種能找到
		logWindow.setAttribute('id',id);
		ADS.addClassName(logWindow,'div_logger_style');
		// logWindow.style.position = 'absolute';
		logWindow.style.top = top + 'px';
		logWindow.style.left = left +'px';
		
		//添加到文檔主體中
		document.body.appendChild(logWindow);
		
		//在此區塊禁用右擊事件
		// logWindow.oncontextmenu =function(){
			// return false;
		// };
		// //添加右擊事件響應
		// ADS.addEvent(logWindow,'mousedown',rightClick);
	//	ADS.rightClick.usedNewRightClick(logWindow);
		ADS.rightClick.addRightClickMenu(logWindow,'clear',clear);
		ADS.rightClick.addRightClickMenu(logWindow,'copy',copy);
		ADS.rightClick.addRightClickMenu(logWindow,'hide',hide);
	};
	
	function clear(){
		clearAllLog();
		while (logWindow.firstChild) {
      			var oldNode = logWindow.removeChild(logWindow.firstChild);
       			oldNode = null;
     	}
	}
	
	function copy(){
		clearAllLog();
		alert('copy');
	}
	
	function hide(){
		clearAllLog();
		that.hideLogWindow();
	}
	this.showLogWindow = function(){
		this.isShow = true;
		if(!logWindow) createWindow();
		logWindow.style.display = 'block';
	}
	
	this.hideLogWindow = function(){
		this.isShow = false;
		if(!logWindow) createWindow();
		logWindow.style.display = 'none';
	}
	this.writeRaw = function(message){
		if(!logWindow) createWindow();
		
		var li = document.createElement('LI');
	
		
		ADS.addClassName(li,'logger_li_style');
		
		if(typeof message == 'undefined'){
			li.appendChild(document.createTextNode('Message was undefined'));
		}else if(typeof li.innerHTML != undefined){
			li.innerHTML = message;
		}else {
			li.appendChild(document.createTextNode(message));
		}
		logWindow.appendChild(li);
		
		return true;
	};
}

myLogger.prototype = {
	write : function(message){
		if(typeof message == 'string' && message.length == 0){
			return this.writeRaw('ADS.log:null message');
		}
		
		if(typeof message != 'string'){
			if(message.toString)
				return this.writeRaw(message.toString());
			else 
				return this.writeRaw(typeof message);
		}
		
		message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		
		return this.writeRaw(message);
	},
	header : function(message){
		message = '<span style = "color:white;blackgroud-color:bladk;font-weight:blod;padding:0px 5px">'+message + '</span>';
		return this.writeRaw(message);
	}
};

//定义ctrl+l查看log信息
ADS.addEvent(document, 'keydown', function(w3cevent) {
	if(w3cevent.altKey && w3cevent.keyCode == 76) {
		if(ADS.log.isShow){
			ADS.log.hideLogWindow();
		}else{
			ADS.log.showLogWindow();
		}
		
	}
});



if(!window.ADS){
	window['ADS'] = {};
}
window['ADS']['log'] = new myLogger();
