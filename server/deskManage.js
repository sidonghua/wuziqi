//桌号类别
Desk = function(p_id){
	this.id = p_id;
	this.index = p_id;//开始默认桌号index为id
	this.status = 'waitting';
	this.playerArr = new Array();
	this.observer = new Array();
}

Desk.prototype = {
	id:'',
	index:'',
	playerArr:[],
	observer:[],//观察者
	result:null,
	status:'',//两个值：waitting  & playing
	addPlayer:function(p_player){
		if(this.playerArr.length >= 2){
			console.log('该桌玩家数已满，不能再添加'+this.id);
			return ;
		}
		this.playerArr.push(p_player);
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

DeskManage = {
	_desks:[],
	addDesk:function(p_desk){
		this._desks.splice(p_desk.index,1,p_desk);
	},
	getSize:function(){
		return this._desks.length;
	}
}

exports.Desk = Desk;
exports.DeskManage = DeskManage;
