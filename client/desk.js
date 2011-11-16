deskVal = {
	deskid : null,
	keepPlayerInfo : false
}
deskInit = {
	initDeskTopIcon : function() {
		var str = '<div class = "div_deskIcon_style" > ' 
		+ '<img id = "img_player1_icon" class = "img_player-icon_style" src="img/who.png" />' 
		+ '<img src="img/desk.png" /> ' 
		+ '<img id = "img_player2_icon" class = "img_player-icon_style" src="img/who.png" />' 
		+ '</div> ';
		var _div_icon = jQuery(str);
		jQuery("#table_desk .td_style").append(_div_icon);
		//jQuery("#0000").append(_div_icon);
	},
	showPlayerInfo : function() {
		jQuery("#div_playerInfo").mouseover(function() {
			jQuery("#div_playerInfo").animate({
				left : 0
			}, 1000);
			jQuery("#div_playerInfo").clearQueue();
		});

		jQuery("#div_playerInfo").mouseout(function() {
			if(!deskVal.keepPlayerInfo) {
				jQuery("#div_playerInfo").animate({
					left : -80
				}, 1000);
			}
			jQuery("#div_playerInfo").clearQueue();
		});
	}
}
_deskForm = {
	div_playlerInfo : 'div_playerInfo',
	check_keepPlayerInfo : 'check_keepPlayerInfo',
	getInputValue : function(p_id) {
		return jQuery('#' + p_id).val();
	},
	getCheckValue : function(p_id) {
		return jQuery('#' + p_id).attr('checked');
	},
	getJQueryObject : function(p_id) {
		return jQuery('#' + p_id);
	}
}
_deskAction = {
	actionListener : function() {//添加监听事件
		var _keepPlayerInfo = _deskForm.check_keepPlayerInfo;
		_deskForm.getJQueryObject(_keepPlayerInfo).click(function() {//是否始终显示信息监听
			deskVal.keepPlayerInfo = _deskForm.getCheckValue(_keepPlayerInfo);
		});

		jQuery("#table_desk .td_style").click(_deskAction.clickDesk);
		//监听选择桌号信息
	},
	clickDesk : function() {
		deskVal.deskid = this.id;
		ADS.log.write('当前单击桌号：' +deskVal.deskid);
		Connection.selectedDesk(deskVal.deskid);
		
		//TODO 转换DIV
		
		jQuery("#table_desk .td_style").unbind();
		
		divSwitch.selectedDeskAfter();
	}
}




function initDesk() {

	wuziqiBase.createTable('table_desk', 6, 10);

	deskInit.initDeskTopIcon();
	deskInit.showPlayerInfo();
	_deskAction.actionListener();

}