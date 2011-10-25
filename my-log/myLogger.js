function myLogger(id){
	id = id || 'ADSLogWindow';
	var logWindow = null;
	var createWindow = function(){//創建日志窗口
		var browserWindowSize = ADS.getBrowserWindowSize();
		var top = ((browserWindowSize.height - 200) / 2)|| 0 ;
		var left =  ((browserWindowSize.width - 200) / 2)|| 0 ;
		
		logWindow = document.createElement('UL');//創建作為日志窗口的dom節點
		
		//設定id值，以便必要時在dom樹種能找到
		logWindow.setAttribute('id',id);
		
	//	logWindow.sytle.display = 'none';
		logWindow.style.position = 'absolute';
		// logWindow.style.top = top + 'px';
		// logWindow.style.left = left +'px';
		logWindow.style.bottom = 10 + 'px';
		logWindow.style.right = 10 +'px';
		
		//設定固定大小并允許窗口內容滾動
		logWindow.style.width = '200px';		
		logWindow.style.height = '200px';
		logWindow.style.overflow = 'scroll';
		
		logWindow.style.padding = '0';
		logWindow.style.margin = '0';
		logWindow.style.border = '1px solid black';
		logWindow.style.backgroundColor = 'white';
		logWindow.style.listStyle = 'none';
		logWindow.style.font = '10px/10px Verdana,Tahoma,Sans';
		
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
	//右擊事件
	var rightClick = function(){
		if(event.button == 2){
			var coo = ADS.getMousecCoordinate();
			ADS.log.write("rightClick,curCoordinate:x:"+coo.X+",y:"+coo.Y);
			var rightMenu = ADS.$('rightMenu');
			if(rightMenu != null)
				document.body.removeChild(rightMenu);
			rightMenu = document.createElement('UL');//創建作為日志窗口的dom節點
		
			//設定id值，以便必要時在dom樹種能找到
			rightMenu.setAttribute('id','rightMenu');
			
			rightMenu.style.position = 'absolute';
		    rightMenu.style.top = coo.Y + 'px';
		    rightMenu.style.left = coo.X +'px';
			rightMenu.style.background = 'green';
			var li = document.createElement('LI');
			li.setAttribute('id','clear');
		    if(typeof li.innerHTML != undefined){
				li.innerHTML = 'clear';
					}else {
						li.appendChild(document.createTextNode('clear'));
					}
			ADS.addEvent(li,'mouseover',menuMouseOver);
			ADS.addEvent(li,'click',clear);
			rightMenu.appendChild(li);
			document.body.appendChild(rightMenu);
			return false;
		}
	}
	
	this.writeRaw = function(message){
		if(!logWindow) createWindow();
		
		var li = document.createElement('LI');
		li.style.padding = '2px';
		li.style.border = '0';
		li.style.borderBottom = '1px dotted black';
		li.style.margin = '0';
		li.style.color = '#000';
		li.style.font = '9px/9px Verdana,Tahoma,Sans';
		
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
				return this.writeRaw(message.toString);
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

if(!window.ADS){
	window['ADS'] = {};
}
window['ADS']['log'] = new myLogger();
