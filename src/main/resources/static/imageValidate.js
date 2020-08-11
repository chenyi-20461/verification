//x周=轴线滑动的距离
var left_binarydance = 0;
//参数
var testParams = '手机号13518705742'
$(function(){
    // 初始化图片验证码
    initImageValidate(testParams);

    /* 初始化按钮拖动事件 */
    
    $("#sliderInner-capture-bd").Tdrag({
        scope:".outer-capture-bd",
        axis:"x",
        cbStart:function(obj,self,ev){//移动前的回调函数
        },

        cbMove:function(obj,self,ev){//移动中的回调函数
            left_binarydance = obj.offsetLeft;
            $("#sliderInner-capture-bd").css("left",(left_binarydance)+"px");
            $("#slideImage-capture-bd").css("left",(left_binarydance)+"px");
        },

        cbEnd:function(obj,self,ev){//移动结束时候的回调函数
            left_binarydance = obj.offsetLeft;
            checkImageValidate(testParams);
        }
    });

});
//$("抖动元素").shake(次数, 距离, 持续时间);
jQuery.fn.shake = function (intShakes /*Amount of shakes*/, intDistance /*Shake distance*/, intDuration /*Time duration*/) {
    this.each(function () {
        var jqNode = $(this);
        jqNode.css({ position: 'relative' });
        for (var x = 1; x <= intShakes; x++) {
            jqNode.animate({ left: (intDistance * -1) }, (((intDuration / intShakes) / 4)))
            .animate({ left: intDistance }, ((intDuration / intShakes) / 2))
            .animate({ left: 0 }, (((intDuration / intShakes) / 4)));
        }
    });
    return this;
}
//服务器生成图片
function initImageValidate(param){
    $.ajax({
        async : false,
        type : "POST",
        url : "/capture/img",
        dataType: "json",
        data:{
        	param:param
        },
        success : function(data) {
            if(data.code  ==  0){
                // 设置图片的src属性
                $("#validateImage-capture-bd").attr("src", data.data.oriCopyImage);
                $("#slideImage-capture-bd").attr("src", data.data.newImage);
            }
        },
        error : function() {}
    });
}
//点击按钮请求切换图片
function exchange(){
    initImageValidate(testParams);
}

//服务器校验
function checkImageValidate(param){
    $.ajax({
        async : false,
        type : "POST",
        url : "/capture/checkImgValidate",
        dataType: "json",
        data:{
        	param:param,
        	offsetHorizontalX:left_binarydance
        },
        success : function(data) {
        	//0成功，!0失败
            if(data.code == 0){
                $("#operateResult-capture-bd").html(data.desc).css("cssText","color:lightpink!important;");
            }else{
                $("#operateResult-capture-bd").html(data.desc).css("cssText","color:red!important;");
                // 验证未通过，将按钮和拼图恢复至原位置
                $("#sliderInner-capture-bd").animate({"left":"0px"},200);
                $("#slideImage-capture-bd").animate({"left":"0px"},200);
                //震动
                $("#container-capture-bd").shake(4, 20, 400);

            }
        },
        error : function() {}
    });
}