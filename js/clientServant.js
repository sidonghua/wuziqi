//player2的初始化，可以借由开战的时候从server取

deskServant = {
	deskInfoInit:function(p_value){
		var _deskInfoArray = p_value.value;
		for(var i = 0 ; i < _deskInfoArray.length ; i ++){
			var _deskInfo = _deskInfoArray[i];
			var _deskid = _deskInfo.deskid;
			var _playerArr = _deskInfo.player;
			
			//TODO 初始化桌位信息
			var _player1;
			var _player2;
			if(_playerArr.length >=2){
				_player1 = _playerArr[0];
				_player2 = _playerArr[1];
			}else{
				_player1 = _playerArr[0];
			}
			ADS.log.write('deskInfo:'+_deskid + ',_playerArr:'+_player1.UUID+",player2:"+_player2);
		}
	},
	deskInfoSync:function(p_data){
		var _deskid = p_data.deskid;
		var _playerUUID = p_data.player;
		
		ADS.log.write('deskInfo同步,deskid:'+_deskid+',_playerUUID:'+_playerUUID);
	},
	selectSucess : function(p_value) {
		if(p_value == 1) {
			ADS.log.write('deskid slected success');
			//TODO
		} else {
			deskVal.deskid = null;
			ADS.log.write('deskid slected failed');
			//TODO
		}
	},
	startSync:function(p_data){//桌号开始同步
		var _deskid = p_data.deskid;
		var _playerUUID = p_data.player;
		
		ADS.log.writean('start ansy:'+_deskid +','+_playerUUID);
	},
	startOK : function(p_data) {
		ADS.log.write('start play');
		//TODO
	}
}
playServant = {
	stepSuccess : function(p_data) {
		var _deskid = p_data.deskid;
		var _playerid = p_data.player;
		var _stepid = p_data.stepInfo;
		
		//TODO
	},
	playWin :function(p_data){
		var _playerid= p_data.player;
		
		//TODO
		ADS.log.write('sucess:'+_playerid);
	}
};
