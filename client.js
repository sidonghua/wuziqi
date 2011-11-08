		_config = {
			server:'http://127.0.0.1:8082',
			getLib:function(){
				return (this.server+'/socket.io/socket.io.js');
			}
		}
		// var  metadata = {
			// // player:{
				// // name:'',
				// // color:'',
				// // deskid:'',
				// // socketid:''
			// // },
			// stepInfo : {
				// player:null,
				// coordinate:''
			// },
			// successInfo : {
				// player:null
			// }
		// }
		
		// getClientPlayer = function(p_serverClient){
				// if(player1.name == p_serverClient.name){
					// return player1;
				// }else{
					// return player2;
				// }
			// }
		
		var socket = {//处理回传信息
			_socket: null,
			socketID:'',
			connect:function(){
					jQuery.getScript(_config.getLib(),function(){
						socket._socket = io.connect(_config.server);
						if(socket._socket != null){
							ADS.log.write("連接成功");
						}
					});
				}
			// event:{
				// selectedPalyer:function(p_data){
					// player2 = new Player(p_data.name,p_data.color);
				// },
				// step:function(p_stepInfo){		
					// wuziqiBase.playerStep(p_stepInfo.coordinate, player2);
				// },
				// success:function(p_successInfo){
					// alert(p_successInfo.palyer.name +' 已经赢了');
				// }
			// }
			
		};
		
		
		
		/** 凡是emit事件中有player信息的都是socketid，on的事件中有player的都是playerUUID
		 * 
		 *
		 * 需要接收的公共事件
		 * 1.palyerUUID_desk_info(on) para:{value:{[deskid:deskid,player:[player1,player2]],[],[],[]}} 回传值为一数组，表示当前的桌位情况
		 * 2.desk_info_sync(on)  para:{deskid:deskid,player:playerUUID}
		 *
		 * playerUUID = userName+随机数
		 * 1.connected(emit) para:{player:playerUUID}
		 * 2.p_palyerUUID(on)  para:{player:playerUUID,socketid:socketid}
		 * 3.desk_select(emit) para:{deskid:deskid,palyer:playerid}
		 * 4.p_deskid(on) para:{value:0/1}
		 * 5.p_deskid_start(emit+on) para:{deskid:deskid,player:playerid}
		 * 5.1 p_deskid_start_ok(on) para:{deskid:deskid,status:play}
		 * 6.p_deskid_step(emit+on)  para:{deskid:deskid,player:playerid,stepInfo:stepID}
		 * 7.p_deskid_win(emit+on) para:{deskid:deskid,player:playerid}
		 * 8.p_deskid_exit(emit) para:{deskid:deskid,player:playerid}
		 */
		var Connection = {//发送当前走棋信息到server
				isInit:false,
				init:function(){
					Connection.isInit = true;
					socket.connect();
				},
			    connected:function(p_player){	
			    			    	
			    	var _playerUUID = getRandom()+'_'+p_player;
			    	var _data = {player:_playerUUID};
			    	socket._socket.emit('connected',_data);
			    	socket._socket.on(_playerUUID,function(p_data){
			    		
			    		player1.setID(p_data.socketid);
			    	//	alert(player1.id);
			    	});
			    	
			    	socket._socket.on(_playerUUID+'_desk_info',function(p_data){
			    		deskServant.deskInfoInit(p_data);
			    	});
			    	
			    	socket._socket.on('desk_info_sync',function(p_data){
			    		deskServant.deskInfoSync(p_data);
			    	});
			    },
			    selectedDesk:function(p_deskid){
			    	var _deskSlected = {deskid:p_deskid,player:player1.id};
			    	socket._socket.emit('desk_select',_deskSlected);
			    	socket._socket.on(p_deskid,function(p_data){
			    		var _value = p_data.value;
			    		deskServant.selectSucess(_value);
			    		
			    		socket._socket.on(deskVal.deskid+'_start',function(p_data){//注册开始成功事件
			    			deskServant.startSync(p_data);
			    		});
			    		
			    		socket._socket.on(deskVal.deskid+'_start_ok',function(p_data){//注册开始成功事件
			    			deskServant.startOK(p_data);
			    		});
			    		socket._socket.on(deskVal.deskid+'_step',function(p_data){//注册走棋成功的事件
			    			playServant.stepSuccess(p_data);
			    		});
			    		
			    		socket._socket.on(deskVal.deskid+'_win',function(p_data){
			    			playServant.playWin(p_data);
			    		});
			    		//TODO 选择桌号成功后的动作
			    	});
			    },
			    start:function(){
			    	var _startData = {deskid:deskVal.deskid,player:player1.id};
			    	socket._socket.emit(deskVal.deskid+'_start',_startData);
			    	
			    },
			    step:function(p_stepid){
			    	var _stepInfo = {deskid:deskVal.deskid,player:player1.id,stepInfo:p_stepid}
			    	var _event = deskVal.deskid+'_step';
			    	socket._socket.emit(_event,_stepInfo);
			    },
			    win:function(){
			    	var _winData = {deskid:deskVal.deskid,player:player1.id};
			    	socket._socket.emit(deskVal.deskid+'_win',_winData);
			    }
		}
		
		function initConnection(){
			Connection.init();
		}
		
			// //vs模式下面的操作
			// client = {
				// initClient : function() {
					// socket._socket.on('selectedPalyer', function(p_data) {
						// socket.event.selectedPalyer(p_data);
					// });
					// socket._socket.on('register', function(p_data) {
						// socket.event.register(p_data);
					// });
					// socket._socket.on('step', function(p_data) {
						// socket.event.step(p_data);
					// });
					// socket._socket.on('success', function(p_data) {
						// socket.event.success(p_data);
					// });
					// //	ADS.log.write(_config.getLib());
				// },
				// //连接到server
				// connectToServer : function() {
					// jQuery.getScript(_config.getLib(), function() {
						// socket._socket = io.connect(_config.server);
// 
						// //Connection.connected({player:});
					// });
				// }
			// }

		
		
		//获取一个10000以内的随机数：确保accoutn是唯一的
		var getRandom = function(){
			var x = 10000;
			var y = 1;
			var random = Math.random();
			var i = (x - y + 1) * random + y;
			return parseInt(i);	
		}