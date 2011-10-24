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
var desk = new (require('./deskManage')).Desk('2');
var io = require('socket.io').listen(8082);
function connect(socket){
	
	var sendMessage = function(p_evenName,p_data){
		socket.emit(p_evenName,p_data);
	};
	
	desk.addPlayer({name:'admin'});
	console.log('当前玩家数量：'+desk.playerArr.length);
	
	socket.emit('connected',{value:socket.id});
	
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
