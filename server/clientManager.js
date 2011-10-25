
//server端的player类别
ClientInfo = function(p_socketid,p_player){
	this.palyer = p_player;
	this.socketid = p_socketid;
}

ClientInfo.prototype = {
	palyer:null,
	socketid:null
}

Player = function(p_uuid){
	this.UUID = p_uuid;
}

Player.prototype = {
	UUID:null//由client端产生的随机数+用户昵称
}


ClientManager = {
	clients:[],
	put:function(p_socketio,p_player){
		var clientItem = new ClientInfo(p_socketio,p_player);
		var _index = this.searchValue(p_key);
		if( _index != null ){
			clients.splice(_index,1,clientItem);
		}else{
			clients.push(clientItem);
		}
	},
	getClient:function(p_key){
		var _index = this.searchValue(p_key);
		if( _index != null ){
			return clients[_index].player;
		}
		return null;
	},
	remove:function(p_key){
		var _index = this.searchValue(p_key);
		if( _index != null ){
			clients.splice(_index,1);
		}
	},
	searchValue:function(p_key){
		for(var i = 0 ; i < clients.length; i ++){
			var clientInfo = clients[i];
			if(p_key == clientInfo.socketid){
				return i;
			}
		}
		return null;
	},
	getSize:function(){
		return clients.length;
	}
}

exports.Player = Player;
exports.ClientManager = ClientManager;
