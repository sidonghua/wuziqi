/**
 * div切换相关内容
 */

divElement = {
	loginDiv:'div_login',
	loginTable:'table_login',
	desk:'fieldset_desk',  //桌号部分
	chess:'fieldset_chess',//棋盘部分
	
}
divSwitch = {
	registerAfter:function(){//注册成功后切换显示内容	
		jQuery('#'+divElement.loginDiv).css('display','none');
		jQuery('#'+divElement.desk).css('display','block');
		
	},
	selectedDeskAfter:function(){//选择桌号成功后切换显示内容
		jQuery('#'+divElement.desk).css('display','none');
		jQuery('#'+divElement.chess).css('display','block');
	},
	selectedVsType:function(){//选择对战模式后切换显示内容
		
	},
	win:function(){//赢了之后切换
		
	}
}
