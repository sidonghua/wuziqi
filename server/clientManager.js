
//server端的player类别
ClientInfo = function(p_socketid,p_player){
	this.player = p_player;
	this.socketid = p_socketid;
}

ClientInfo.prototype = {
	player:null,
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
		var _index = this._searchValue(p_player.UUID);
		if( _index != null ){
			this.clients.splice(_index,1,clientItem);
		}else{
			this.clients.push(clientItem);
		}
	},
	getClient:function(p_key){
		var _index = this._searchPlayer(p_key);
		if( _index != null ){
			return this.clients[_index].player;
		}
		return null;
	},
	remove:function(p_key){
		var _index = this._searchValue(p_key);
		if( _index != null ){
			this.clients.splice(_index,1);
		}
	},
	_searchValue:function(p_key){
		for(var i = 0 ; i < this.clients.length; i ++){
			var clientInfo = this.clients[i];
			if(p_key == clientInfo.socketid){
				return i;
			}
		}
		return null;
	},
	_searchPlayer:function(p_UUID){
		for(var i = 0 ; i < this.clients.length; i ++){
			var clientInfo = this.clients[i];
			if(p_UUID == clientInfo.player.UUID){
				return i;
			}
		}
		return null;
	},
	getSize:function(){
		return this.clients.length;
	}
}

exports.Player = Player;
exports.ClientManager = ClientManager;
