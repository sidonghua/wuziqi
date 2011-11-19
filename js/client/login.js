_loginForm = {
	userName : 'input_name',
	register : 'btn_register',

	getJQueryObject : function(p_id) {
		return jQuery('#' + p_id);
	},
	getRegister : function() {
		return jQuery('#btn_register');
	},
	getInputName : function() {
		return jQuery('#input_name').val();
	}
}
_loginAction = {
	register : function() {
		var _name = _loginForm.getInputName();
		player1 = new Player(_name,'red');
		//TODO 初始化player1
		Connection.connected(_name);
		
		
		divSwitch.registerAfter();//注册后的div操作
		ADS.log.write('register:' + _name);
	},
	actionListener : function() {
		_loginForm.getRegister().click(_loginAction.register);
	}
}

function initLogin() {
	_loginAction.actionListener();
}