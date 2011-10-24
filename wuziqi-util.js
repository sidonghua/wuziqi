		var Direction = function(x,y){//方向向量，八个方向向量
			this.x = x;
			this.y = y;
		}
		Direction.prototype = {
			x : 0,
			y : 0,
			equal:function(p_dire){
				if(p_dire.x == this.x && p_dire.y == this.y){
					return true;
				}
				return false;
			}
		}
		
		Point = function(p_x,p_y){//点坐标类
			this.X = p_x;
			this.Y = p_y;
		}
		Point.prototype = {
			X :0,
			Y :0,
			setX:function(p_x){
				this.X = p_x;
			},
			setY:function(p_y){
				this.Y = p_y;
			},
			getNextPoint:function(p_dire){//获取其再某一方向向量的紧邻点坐标
				var x = this.X - p_dire.x;
				var y = this.Y - p_dire.y;
				if(x < 0 || y < 0 || x > config.width || y > config.height){//当超出棋盘范围，反回null
					return null;
				}
				var _point = new Point(x,y);
				return _point;
			},
			equals:function(p_point){//判断两点是否相等
				if(this.X == p_point.X && this.Y == p_point.Y){
					return true;
				}
				return false;
			}
		}
		
		Line = function(p_dire){//线类
			this.direction = p_dire;
			this.pointArray = [];
		}
		Line.prototype = {
			direction:null,//线的方向
			pointArray:[],//组成这条线的点集合
			addPoint:function(p_point){//为这条线添加点
				this.pointArray.push(p_point);
			},
			setDirection:function(p_dire){//设置线方向
				this.direction = p_dire;
			},
			getSize:function(){//获取该线上的点个数
				return this.pointArray.length;
			}
		}
		
		
		
		Player  = function(p_name,p_color){//選手類
			this.name = p_name;
			this.color = p_color;
			this.validSucess = new ValidSucess();
			this.actived = false;
			this.isWin = false;
		}
		
		Player.prototype = {
			id:'',
			name:'',
			color:'',
			deskid:'',
			validSucess:null,
			actived:false,
			isWin:false,
			setID:function(p_id){
				this.id = p_id;
			},
			setDeskID:function(p_deskID){//设定台号
				this.deskid = p_deskID;
			},
			equals:function(p_player){
				if(this.name == p_player.name && this.color == p_player.color){
					return true;
				}
				return false;
			}
		}
		
		ValidSucess = function(){
			this.selectedPoint =[];
			this.successLine = null;
		}
		ValidSucess.prototype = {//選手走棋相關處理類
			selectedPoint:[],
			successLine:null,
			addPoint:function(p_point){
				this.selectedPoint.push(p_point);
			},
			isSuccess:function(){
				var _lineArr = this.isInARowAtFive(5);
				if(_lineArr.length > 0){
					this.successLine = _lineArr[0];
					return true;
				}
				return false;
			},
			isInARowAtFive:function(p_size){//獲取所有點數超過p_size的點
				var _lineArray = [];
				if(this.selectedPoint.length < p_size){
					return _lineArray;
				}else{
					for(var i = 0 ; i < this.selectedPoint.length; i ++){
						var _point = this.selectedPoint[i];
						for(var j = 0; j<initDirection.directionArray.length; j ++){
							var _dire = initDirection.directionArray[j];
							var _line = new Line(_dire);
							this.getLine(_line,_point);
							if(_line.getSize() >= p_size ){
								_lineArray.push(_line);
							}
						}//end for initDirectiondirectionArray
					}// end for selectedPoint
				}
				return _lineArray;
			},
			getLine:function(p_line,p_point){
				p_line.addPoint(p_point);
				var _nextPoint = p_point.getNextPoint(p_line.direction);
				if(_nextPoint == null || !this.isContainPoint(_nextPoint)){
					return p_line;
				}else{
					this.getLine(p_line,_nextPoint);
				}
			},
			isContainPoint:function(p_point){//是否是連續的線
				for(var i = 0 ; i < this.selectedPoint.length; i ++){
						var _point = this.selectedPoint[i];
						if(_point.equals(p_point)){
							return true;
						}
				}
				return false;
			}
		}
		var initDirection = {//初始化所有的方向
			directionArray:[],
			createDirection:function(){
				for(var i = -1 ; i < 2; i ++){
					for(var j = -1 ; j < 2 ; j ++){
						if(i == j && i == 0){//如果i和j同时为0，表示为当前方向
							continue;
						}
						var _dire = new Direction(i,j);
						this.directionArray.push(_dire);
					}
				}
			}
		}