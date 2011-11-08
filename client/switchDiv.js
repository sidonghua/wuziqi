/**
 * div切换相关内容
 */

divElement = {
	loginDiv:'div_login',
	loginTable:'table_login',
	deskTable:'table_desk',  //桌号部分
	tableChess:'table',//棋盘部分
	
}
divSwitch = {
	registerAfter:function(){//注册成功后切换显示内容	
		jQuery('#'+divElement.loginDiv).css('display','none');
		jQuery('#'+divElement.deskTable).css('display','block');
	},
	selectedDeskAfter:function(){//选择桌号成功后切换显示内容
		
	},
	selectedVsType:function(){//选择对战模式后切换显示内容
		
	},
	win:function(){//赢了之后切换
		
	}
}
