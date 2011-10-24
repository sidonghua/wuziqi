//桌号类别
Desk = function(p_id){
	this.id = p_id;
	this.status = 'waitting';
	this.playerArr = new Array(2);
}

Desk.prototype = {
	id:'',
	playerArr:[],
	result:null,
	status:'',//两个值：waitting  & playing
	addPlayer:function(p_palyer){
		playerArr.push(p_player);
	},
	removePlayer:function(p_player){
		for(var i = 0 ;i < this.playerArr.length ; i ++ ){
			if(this.playerArr[i] == p_player){
				this.playerArr.splice(i,1);
				break;
			}
		}
	},
	setStatus:function(p_status){
		this.status = p_status;
	}
}

deskManage = {
	
}

exports.Desk = function(p_id){
	return new Desk(p_id);
};
