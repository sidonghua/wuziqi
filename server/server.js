
/**
 * 各桌(client)需要实现的监听事件：
 * connect：连接信息
 * desk_select:桌号选择信息
 * messageEvent:发布公告消息内容（on）
 * 桌号+play:发布走棋信息(emit+on)
 * 桌号+message:发布私聊信息（emit+on）
 * 桌号+success:发布赢棋信息(emit+on)
 * 桌号+successResult:发布对战信息(emit+on)
 * 1.连接server//注册后，即连接server，传输资料：玩家昵称+唯一值(socketid),保存到playerMap中(保存玩家昵称和socketid)
 * 2.选择桌号//资料格式：玩家唯一值+桌号  
 * 3.另外一人加入//资料格式:玩家唯一值+桌号
 * 4.开始游戏(先加入的人先出棋) //资料格式：桌号+start
 * 5.回传走棋资料并判定输赢 //资料格式：桌号+玩家唯一值+坐标
 * 6.如果赢棋，则给此桌玩家广播赢棋，保存资料 //资料格式：桌号+赢方玩家唯一值
 * 7.重新开始，返回4步
 */
var Desk = require('./deskManage').Desk;
var DeskManage = require('./deskManage').DeskManage;
var ClientManager = require('./clientManager').ClientManager;

var Player = require('./clientManager').Player;
var io = require('socket.io').listen(8082);

function connect(socket){
	
	var sendMessage = function(p_evenName,p_data){
		socket.emit(p_evenName,p_data);
	};
	
	//desk.addPlayer({name:'admin'});
	//console.log('当前玩家数量：'+desk.playerArr.length);
	
	//socket.emit('connected',{value:socket.id});
	
	socket.on('connected',function(p_data){//注册连接，数据资料:{player:随机数+name}
		var UUID = p_data.player;
		var player = new Player(UUID);
		var _socketid = socket.id;
		ClientManager.put(_socketid,player);
		console.log('************ClientManager:'+ClientManager.getSize());
		socket.emit(UUID,{player:UUID,socketid:_socketid});//回传用户注册资料
		var _deskInfoArr = [];
		
		for(var i = 0; i < DeskManage.getSize() ; i ++){
			var _deskTemp = DeskManage.getDesks()[i];
			var _deskInfo = {};
			_deskInfo.deskid = _deskTemp.id;
			_deskInfo.player = _deskTemp.playerArr;
			
			_deskInfoArr.push(_deskInfo);
		}
		socket.emit(UUID+'_desk_info',{value:_deskInfoArr});
	});
	
	/**
	 *   * 5.p_deskid_start(emit+on) para:{deskid:deskid,player:playerid}
	 *     p_deskid_start_ok(on) para:{deskid:deskid,status:play}
		 * 6.p_deskid_step(emit+on)  para:{deskid:deskid,player:playerid,stepInfo:stepID}
		 * 7.p_deskid_win(emit+on) para:{deskid:deskid,player:playerid}
		 * 8.p_deskid_exit(emit) para:{deskid:deskid,player:playerid}
	 */
	
	socket.on('desk_select',function(p_data){
		var _deskid = p_data.deskid;
		var _player_id = p_data.player;
		var _desk = DeskManage.getDesk(_deskid);
		var _player = ClientManager.getClient(_player_id);//此处需要再斟酌
		_desk.addPlayer(_player);
		DeskManage.addDesk(_desk);
		socket.emit(_deskid,{value:1});//发送选择结果信息
		io.broadcast.emit('desk_info_sync',{deskid:_deskid,player:_player.UUID});//广播同步桌号信息
		
		socket.on(_deskid+'_start',function(p_data){
			var _player =  ClientManager.getClient(p_data.player);
			var _desk = DeskManage.getDesk(p_data.deskid);
			_desk.playing(_player,'playing');
			if(_desk.status == 'playing'){
				socket.emit(p_data.deskid+'_start_ok',{value:'playing'});
			}else{
				io.broadcast.emit(p_data.deskid+'_start',{deskid:p_data.deskid,player:_player.UUID})
			}
			
		});
		
		socket.on(_deskid+'_step',function(p_data){
			var _player =ClientManager.getClient(p_data.player);
			p_data.player = _player;
			io.broadcast.emit(p_data.deskid+'_deskid',p_data);
		});
		
		socket.on(_deskid+'_win',function(p_data){
			var _player =ClientManager.getClient(p_data.player);
			p_data.player = _player;
			socket.emit(p_data.deskid+'_win',p_data);
		});
		
	});
	
	console.log('socketID:'+socket.id);
	
	socket.on("selectedPalyer",function(data){
		sendMessage('selectedPalyer',data);
	});

	socket.on("step",function(data){
		socket.broadcast.emit('step',data);
	});
	socket.on("success",function(data){
		sendMessage('success',data);
	});	
	
  socket.on('disconnect', function () {
  	disconnectAfter(socket.io);
  	
    io.sockets.emit('user disconnected');
  });
};
io.sockets.on("connection",connect);

function disconnectAfter(socketio){
	//ClientManager.remove(socket.id);//客户端断开连接时，可以做统一处理
	// DeskManager.
}

 
