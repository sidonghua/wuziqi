config = {//生成的棋盘大小
	width : 25,
	height : 20
}
wuziqiBase = {
	createTable : function(table_id, row, col) {//创建棋盘
		var table = document.getElementById(table_id);
		var str = '';
		for(var i = 0; i < row; i++) {
			str += '<tr>';
			for(var j = 0; j < col; j++) {
				var id = this.paraseString(i) + this.paraseString(j);
				str += '<td class = "td_style" id = "' + id + '"></td>';
			}
			str += '</tr>';
		}
		table.innerHTML = str;
		document.body.appendChild(table);
	},
	playerStep : function(p_id, p_player) {
		//jQuery('#' + p_id).css("background", p_player.color);
		if(p_player.isWin) {
			winSuccessAfter(p_player);
			return;
		}
		var _div = visitedFlag(p_player.color);
		jQuery('#' + p_id).append(_div);
		jQuery('#' + p_id).unbind();
		
		jQuery(".td_style").css("background","none");
		jQuery('#'+p_id).css("background", "#8A8A8A");
		
		var _point = this.parasePoint(p_id);
		p_player.validSucess.addPoint(_point);
		playerWinProcess(p_player);
		this.returnActived();
	},
	parasePoint : function(p_id) {//解析当前点坐标
		var x = p_id.substr(0, 2);
		var y = p_id.substr(2, 2);
		var _point = new Point();
		_point.setX(Number(x));
		_point.setY(Number(y));
		return _point;
	},
	paraseString : function(num) {
		if(num < 10) {
			return '0' + num;
		} else
			return num.toString();
	},
	returnActived : function() {
		var _return = player1.actived;
		player2.actived = _return;
		player1.actived = player2.actived ? false : true;
	}
}

//访问过的td标识
var visitedFlag = function(color) {
	var div = jQuery('<div class = "div_visited"/>');
	// var div = document.createElement('DIV');
	// div.style.background = color;
	//div.css("-webkit-border-radius','18px;");
	div.css("background", color);
	return div;
}
//当赢了之后的处理
function playerWinProcess(p_player) {
	if(p_player.validSucess.isSuccess()) {
		alert(p_player.name + ',你成功了...');
		p_player.isWin = true;

		var _line = p_player.validSucess.successLine;
		showLines(_line);

		winSuccessAfter(p_player);

	}
}

//成功之后的处理，需要重写，根据不同类型复写不同的
function winSuccessAfter(p_player) {

}

function showLines(p_line) {
	setLineColor(p_line, 'yellow');
	//	sleepTime(1000);
	//setLineColor(p_line, player1.isWin ? player1.color: player2.color);
}

function sleepTime(p_time) {
	var data_start = new Date();

	while((new Date()).getTime() - data_start.getTime() < p_time) {
		;
	}
}

//设定线的颜色
function setLineColor(p_line, p_color) {
	var _pointArr = p_line.pointArray;
	for(var i = 0; i < _pointArr.length; i++) {
		var point = _pointArr[i];
		var id = wuziqiBase.paraseString(point.X) +  wuziqiBase.paraseString(point.Y);
		jQuery('#' + id).find('.div_visited').css("background", p_color);
	}
}

//当前是否
function isActived() {

}

var player1 = null;
var player2 = null;
var curActivedPalyer = null;
//当前走子的player

var type = 1;
var hasWin = false;
//戰斗模式，1為對戰模式，0為左右手互搏模式

function initPlayer() {
	player1 = new Player('admin', 'red');
	player1.actived = true;
	player2 = new Player('sdh', 'green');
	//	returnActived();
}

var initWuziqi = function() {
	wuziqiBase.createTable('table', config.height, config.width);
	//畫棋盤
	initDirection.createDirection();
	
	jQuery(".td_style").click(_fromInit.clickChessboard);
	//initType();
	//创建方向向量
	// if(type == 0) {
		// initPlayer();
		// //初始化選手信息
		// var winPlayer = null;
		// jQuery(".td_style").click(function() {
			// if(player1.actived) {
				// playerStep(this.id, player1);
				// jQuery('#player').text(player2.name);
			// } else {
				// playerStep(this.id, player2);
				// jQuery('#player').text(player1.name);
			// }
// 
		// });
	// } else {
		// initPlayer();
		// jQuery(".td_style").click(function() {
			// var stepInfo = metadata.stepInfo;
// 
			// stepInfo.player = metadata.player;
			// stepInfo.coordinate = this.id;
// 
			// _main.action.step(stepInfo);
// 
			// var successInfo = metadata.successInfo;
			// successInfo.palyer = stepInfo.player;
// 
			// if(player1.isWin) {
				// _main.action.success(successInfo);
			// }
			// //jQuery('#player').text(metadata.player.name);
		// });
//	}

	// var stepOnclick = function(){
	//
	// }

	// function initType(){
	// if(type == 1){
	// winSuccessAfter = function(p_player){
	// var transUtil = new TransiationUtil(p_player);
	// _main.action.success(transUtil.transSuccessInfo());
	// alert('別掙扎了，已經贏了:'+p_player.name);
	// };
	// }else{
	//
	// }
	//
	// }
}