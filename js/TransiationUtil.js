/**
 * 数据转换工具类
 *主要是转换client的资料到server端可识别资料
 */


	
	//转换工具类
	TransiationUtil = {
		transSuccessInfo:function(p_player){
			var successInfo = metadata.successInfo;
			 successInfo.palyer = p_player;
			 return successInfo;
		},
		transeStepInfo:function(p_player,p_coordinate){
			var stepInfo = metadata.stepInfo;
			stepInfo.coordinate = p_coordinate;
			stepInfo.player = p_player;
			return stepInfo;
		}
	}
	