// var clients = require('./clients');
// 
// var client = {
	// index : -1,
	// playerName : '',
	// player : '',
	// socketid:''
// }
// 
// var _metadata = {
	// data:{
		// player: '',
	    // coordinate: ''
	// },
	// client: function () {
		// return ({
			// player: '',
			// coordinate: ''
		// });
	// },
	// register: function () {
		// return ({
			// value: ''
		// });
	// },
	// step:function(){
// 		
	// }
// };
// 
// var events = {
		// values: {
			// connected: function () {
				// return({
					// value: client.sessionId
				// });
			// },
			// clientCount: function () {
				// return({
					// value: clients.count()
				// });
			// },
			// registered: function () {
				// return({
					// value: client.registered,
					// index: client.index
				// });
			// },
			// clientCount: function () {
				// return({
					// value: clients.count()
				// });
			// },
			// clientInfo: function () {
				// return ({
					// value: client
				// });
			// },
			// message: function (data) {
				// return ({
					// friend: client.nickname,
					// message: data
				// });
			// }
		// },
		// connect: function () {
			// client.sessionId = socket.id;
			// socket.emit ('connected', this.values.connected());
			// io.sockets.emit('clientCount', this.values.clientCount());
		// },
		// message: function (data) {
			// socket.broadcast.emit('messagexx', this.values.message(data));
		// },
		// disconnect: function () {
			// clients.remove(client);
			// console.log ('!!!!!! client ' + client.myId + ' disconnected !!!!!!');
		// },
		// setClientInfo: function (data) {
			// client.myId = data.myId;
			// client.nickname = data.nickname;
			// client.email = data.email;
			// client.registered = true;
// 
			// clients.add(client);
// 
			// socket.emit ('registered', this.values.registered());
			// io.sockets.emit('clientCount', this.values.clientCount());
		// },
		// sendClientInfo: function () {
			// socket.emit ('clientInfo', this.values.clientInfo());
		// }
	// };
// 
/**
 * 各桌(client)需要实现的监听事件：
 * 
 * messageEvent:发布公告消息内容（on）
 * 桌号+play:发布走棋信息(emit+on)
 * 桌号+message:发布私聊信息（emit+on）
 * 桌号+success:发布赢棋信息(emit+on)
 * 桌号+successResult:发布对战信息(emit+on)
 * 1.连接server//选择对战模式后，即连接server，传输资料：玩家昵称+唯一值(socketid),保存到playerMap中(保存玩家昵称和socketid)
 * 2.选择桌号//资料格式：玩家唯一值+桌号
 * 3.另外一人加入//资料格式:玩家唯一值+桌号
 * 4.开始游戏(先加入的人先出棋) //资料格式：桌号+start
 * 5.回传走棋资料并判定输赢 //资料格式：桌号+玩家唯一值+坐标
 * 6.如果赢棋，则给此桌玩家广播赢棋，保存资料 //资料格式：桌号+赢方玩家唯一值
 * 7.重新开始，返回4步
 */
var desk = new (require('./deskManage')).Desk('2');
var io = require('socket.io').listen(8082);
function connect(socket){
	
	var sendMessage = function(p_evenName,p_data){
		socket.emit(p_evenName,p_data);
	};
	
	desk.addPlayer({name:'admin'});
	console.log('当前玩家数量：'+desk.playerArr.length);
	
	socket.emit('connected',{value:socket.id});
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
};
io.sockets.on("connection",connect);
