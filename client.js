		_config = {
			server:'http://127.0.0.1:8082',
			getLib:function(){
				return (this.server+'/socket.io/socket.io.js');
			}
		}
		var  metadata = {
			// player:{
				// name:'',
				// color:'',
				// deskid:'',
				// socketid:''
			// },
			stepInfo : {
				player:null,
				coordinate:''
			},
			successInfo : {
				player:null
			}
		}
		
		getClientPlayer = function(p_serverClient){
				if(player1.name == p_serverClient.name){
					return player1;
				}else{
					return player2;
				}
			}
		
		var socket = {//处理回传信息
			_socket: null,
			socketID:'',
			event:{
				connect:function(p_data){//连接成功后的处理
					client.initClient();//初始化client端的参数内容 
					vsTypeAction.setPlayAble();
					vsTypeAction.setConnectStatue('连接成功');
					this.socketID = p_data.value;
				},
				register:function(p_data){//注册
					//TODO
				},
				selectedPalyer:function(p_data){
					player2 = new Player(p_data.name,p_data.color);
					//player2 = p_data;
					// player2
					// if(p_data.socketid != metadata.player.socketid){
						// var player = player1;
						// player1 = player2;
						// player2 = palyer;
					// }
				},
				step:function(p_stepInfo){		
					//var player = getClientPlayer(p_stepInfo.player);
					//playerStep(p_stepInfo.coordinate,player2);
					wuziqiBase.playerStep(p_stepInfo.coordinate, player2);
				},
				success:function(p_successInfo){
					alert(p_successInfo.palyer.name +' 已经赢了');
				}
			}
			
		};
		
		var Connection = {//发送当前走棋信息到server
				selectedPalyer:function(p_playerInfo){
					socket._socket.emit("selectedPalyer",p_playerInfo);
				},
				register:function(p_playerInfo){
					socket._socket.emit("register",p_playerInfo);
				},
				step:function(p_stepInfo){
					socket._socket.emit("step",p_stepInfo);
				},
				success:function(p_successInfo){
					socket._socket.emit("success",p_successInfo);
				}
		}
		
		
		//vs模式下面的操作
		client = {
			 initClient:function(){	
				socket._socket.on('selectedPalyer', function (p_data) { socket.event.selectedPalyer(p_data); });
				socket._socket.on('register', function (p_data) { socket.event.register(p_data); });
				socket._socket.on('step',function(p_data){socket.event.step(p_data);});
				socket._socket.on('success',function(p_data){socket.event.success(p_data);});
			//	ADS.log.write(_config.getLib());
		},
		//连接到server
		 connectToServer:function(){
			jQuery.getScript(_config.getLib(),function(){
					socket._socket = io.connect(_config.server);
					alert(socket._socket.id);
					socket._socket.on('connected', function (p_data) { socket.event.connect(p_data); });
			});
		}
		}
		
		
		//获取一个10000以内的随机数：确保accoutn是唯一的
		var getRandom = function(){
			var x = 10000;
			var y = 1;
			var random = Math.random();
			var i = (x - y + 1) * random + y;
			return parseInt(i);	