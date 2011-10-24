/**
 * 主要处理form表单的相关问题
 */

var vsType = null;
//取值为vs和self模式两种

_formElement = {
	curPalyer : 'id_output_player', //当前走子方
	action_vsType : 'id_select_vsType', //选择对战模式
	reset:'id_btn_reset',
	selfDiv : 'id_div_self',
	vsDiv : 'id_div_vsType',
	
	
	setValue:function(p_id,p_value){
		var target = this.getJqueryObject(p_id); 
		target.text(p_value);
		//TODO 继续完善
	},
	getValue:function(p_id){
		var target = this.getJqueryObject(p_id); 
		return target.val();//TODO 继续完善
	},
	getJqueryID : function(p_id) {
		return '#' + p_id
	},
	getJqueryObject : function(p_id) {
		return jQuery('#' + p_id);
	},
	getJSObject : function(p_id) {
		return ADS.$(p_id);
	}
};

selfType_form = {
		player1 : 'id_input_self-palyer1',
		player2 : 'id_input_self-palyer2',
		action_play : 'id_btn_self-play'
}
vsType_form = {
		player : 'id_input_player',
		roleColor : 'id_select_color',
		action_connect : 'id_btn_connect',
		connectStatu : 'id_output_connectStatus',
		action_play : 'id_btn_vs-play'
}

//页面元素action
_formElementAction = {
	showVsPanel : function() {//显示所有的对战panel
		var showDisplay = null;
		var hideDidplaye = null;
		if(vsType == 'self') {
			showDisplay = _formElement.getJqueryObject(_formElement.selfDiv);
			hideDidplaye = _formElement.getJqueryObject(_formElement.vsDiv);
		} else {
			showDisplay = _formElement.getJqueryObject(_formElement.vsDiv);
			hideDidplaye = _formElement.getJqueryObject(_formElement.selfDiv);
		}
		hideDidplaye.css("display", "none");
		showDisplay.css("display", "block");
	},
	hideVSPanel : function() {//隐藏所有的对战panel
		_formElement.getJqueryObject(_formElement.selfDiv).css("display", "none");
		_formElement.getJqueryObject(_formElement.vsDiv).css("display", "none");
	}
}
_formAction = {
	setCurPlayer:function(p_value){//设定当前的下子方名称
		_formElement.setValue(_formElement.curPalyer,p_value);
	},
	reset:{
		submit:function(){
			 location.reload() ;
		}
		
	},
	select_vsType : {//选择对战平台响应事件
		submit : function() {
			var _value = jQuery(this).children('option:selected').val()//获取当前选择的值

			if(_value == 'none') {
				_formElementAction.hideVSPanel();
				_formAction.select_vsType.failed();
			} else {
				vsType = _value;
				if(_value == 'vs'){
					try{
						client.connectToServer();//连接到server
					}catch(e){
						alert('连接server失败'+e);
					}
				}
				
				_formAction.select_vsType.success();
			}

			//var disPlay
		},
		success : function() {
			_formElementAction.showVsPanel();
		},
		failed : function() {
			alert('请选择对战模式');
		}
	}
}
selfTypeAction = {//
		getPlayer1:function(){//获取player1的name
			var p1_name = _formElement.getValue(selfType_form.player1);
			if(p1_name == null || p1_name == ''){
					p1_name = 'player1';
				}
			return p1_name;
		},
		getPlayer2:function(){
			var p2_name =  _formElement.getValue(selfType_form.player2);
			if(p2_name == null || p2_name == ''){
					p2_name = 'player2';
				}
			return p2_name;
		},
		action_play:{
			submit:function(){
				try{
					selfTypeAction.action_play.success();
				}catch(e){
					selfTypeAction.action_play.failed(e);
				}
				
			},
			success:function(){
				var p1_name = selfTypeAction.getPlayer1();
				var p2_name = selfTypeAction.getPlayer2();
				player1 = new Player(p1_name,'red');
				player1.actived = true;
				
				curActivedPlayer = player1;
				
				player2 = new Player(p2_name,'green');
				_formElementAction.hideVSPanel();
				//_formElement.setValue(_formElement.curPalyer,player1.name);
			},
			failed:function(e){
				alert('发生错误:'+e);
			}
	}
}

vsTypeAction = {
	
	getPlayer:function(){
		var _name =  _formElement.getValue(vsType_form.player);
		if(_name == null || _name == ''){
			_name = 'player_guest';
		}
		return _name;
	},
	getColor:function(){
		var _color =  _formElement.getValue(vsType_form.roleColor);
		if(_color == '' || _color == null){
			_color = 'red';
		}
		return _color;
	},
	setConnectStatue:function(p_value){
		_formElement.setValue(vsType_form.connectStatu,p_value);
	},
	setPlayAble:function(){
		_formElement.getJqueryObject(vsType_form.action_play).attr("disabled",false);;
	},
	action_connect:{//注册玩家
		submit:function(){
			//alert('connect');
			var _name = vsTypeAction.getPlayer();
			var _color = vsTypeAction.getColor();
			player1 = new Player(_name,_color);
			player1.id = socket.socketID;
			player1.actived = true;
			
			curActivedPlayer = player1;
			
			Connection.selectedPalyer(player1);
			//vsTypeAction.action_connect.success();
		},
		success:function(){
			
			
		},
		failed:function(){
			vsTypeAction.setConnectStatue('连接失败');
		}
	},
	action_play:{
		submit:function(){
			//alert('action');
			_formElementAction.hideVSPanel();
			
		},
		success:function(p_data){
			
			
			player2 = p_data;
			
			_formElementAction.hideVSPanel();
		},
		failed:function(){
			
		}
	}
}

_fromInit = {
	initEventBind : function() {//TODO 添加事件响应
		ADS.addEvent(_formElement.action_vsType, 'change', _formAction.select_vsType.submit);
		ADS.addEvent(_formElement.reset, 'click', _formAction.reset.submit);
		
		//左右手互博模式下的事件监听声明
		ADS.addEvent(selfType_form.action_play, 'click', selfTypeAction.action_play.submit);
		
		//在线对战模式的事件监听
		ADS.addEvent(vsType_form.action_connect, 'click', vsTypeAction.action_connect.submit);
		ADS.addEvent(vsType_form.action_play, 'click', vsTypeAction.action_play.submit);
	},
	clickChessboard:function(){
		
		if(vsType == 'self'){
			if(player1.isWin || player2.isWin){
				_formElement.setValue(_formElement.curPalyer,player1.isWin ? player1.name : player2.name + '已经赢了');
				return ;
			}
			wuziqiBase.playerStep(this.id, curActivedPlayer);
			curActivedPlayer = player1.actived ? player1 : player2;
		}else if(vsType == 'vs'){
			wuziqiBase.playerStep(this.id, player1);
			var stepInfo = TransiationUtil.transeStepInfo(player1,this.id);
			Connection.step(stepInfo);
		}
		
		_formElement.setValue(_formElement.curPalyer,curActivedPlayer.name);
	}
}
