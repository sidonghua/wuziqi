//右擊事件重寫
var clearAllLog = function(){
	rightMenu = ADS.$('rightMenu');
		if(rightMenu != null){
			document.body.removeChild(rightMenu);
		}	
}
window.copyRight = null;
var rightClick = function(){
	var rightMenu = null;
	
	var createRightClickMenu = function(){
			var coo = ADS.getMousecCoordinate();
			rightMenu = ADS.$('rightMenu');
			if(rightMenu != null)
				document.body.removeChild(rightMenu);
			rightMenu = document.createElement('UL');//創建作為日志窗口的dom節點
		
			//設定id值，以便必要時在dom樹種能找到
			rightMenu.setAttribute('id','rightMenu');
			// rightMenu.style.listStyleType = 'none';
			// rightMenu.style.display = 'none';
			 // rightMenu.style.padding = '2px';
			// rightMenu.style.margin = '0';
			
			// rightMenu.style.background = 'green';
			ADS.addClassName(rightMenu,'rightClick_style');
			rightMenu.oncontextmenu = function(){
				return false;
			}
			setPosition(rightMenu,coo);
			document.body.appendChild(rightMenu);
			return false;
	};
	var setPosition = function(node,cooridinate){
		node.style.position = 'absolute';
		node.style.top = cooridinate.Y + 'px';
		node.style.left = cooridinate.X +'px';
		
	}
	this.rightClick = function(){
		event = window.event || arguments[0];
		clearAllLog();	
		if(event.button == 2){
				var coo = ADS.getMousecCoordinate();
				var copyRight = window.copyRight;
				
				copyRight.style.display = 'block';
				setPosition(copyRight,coo);
				document.body.appendChild(copyRight);
		}	
	};
	this.addRightMenu = function(menuName,func){
		if(!rightMenu) createRightClickMenu();
		
		var li = document.createElement('LI');
		li.setAttribute('id', menuName);
		if( typeof li.innerHTML != undefined) {
			li.innerHTML = menuName;
		} else {
			li.appendChild(document.createTextNode(menuName));
		}
		
		
		ADS.addClassName(li,'rightClick_li_style');
		
	
		ADS.addEvent(li,'click',func);
		rightMenu.appendChild(li);
		window.copyRight = rightMenu;
		return true;
	};
	
	var menuMouseOver = function(){
		
	}
}

rightClick.prototype = {
	//禁用傳統的右擊事件
	disableRightClick : function(node){
		if(!(node = ADS.$(node)))
			return false;
		node.oncontextmenu = function(){
			return false;
		};
		return true;
	},
	//使用新的右擊事件
	usedNewRightClick : function(node){
		node.oncontextmenu = function(){
			return false;
		};
		//if(disableRightClick(node)){
		//	ADS.addEvent(node,'mousedown',createRightClickMenu);
		//}
	},
	
	addRightClickMenu:function(node,menuName,func) {
		node.oncontextmenu = function(){
			return false;
		};
		ADS.addEvent(node,'mousedown',this.rightClick);
		
		
		this.addRightMenu(menuName,func);
	}

}

if(!window.ADS){
	window['ADS'] = {};
}
window['ADS']['rightClick'] = new rightClick();
