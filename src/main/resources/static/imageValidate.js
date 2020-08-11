var left_binarydance = 0;
var positionX = 0;
$(function(){
    // 初始化图片验证码
    initImageValidate();

    /* 初始化按钮拖动事件 */
    
    $("#sliderInner-capture-bd").Tdrag({
        scope:".outer-capture-bd",
        axis:"x",
        cbStart:function(ev){//移动前的回调函数
            //console.log(ev.clientX);
        },

        cbMove:function(obj,self,ev){//移动中的回调函数
            //console.log(ev.clientX);
            left_binarydance = ev.clientX;
            if(left_binarydance >= 67 && left_binarydance <= 563){
                $("#sliderInner-capture-bd").css("left",(left_binarydance-67)+"px");
                $("#slideImage-capture-bd").css("left",(left_binarydance-67)+"px");
            }
        },

        cbEnd:function(ev){//移动结束时候的回调函数
            left_binarydance = 67;
            console.log(ev.clientX - 67 == positionX ? 'true' : 'false');
            if(!(ev.clientX - 67 == positionX)){
                $("#sliderInner-capture-bd").css("left",(left_binarydance-67)+"px");
                $("#slideImage-capture-bd").css("left",(left_binarydance-67)+"px");
            }
            //checkImageValidate();
        }
    });

});

function initImageValidate(){
    $.ajax({
        async : false,
        type : "POST",
        url : "/capture/img",
        dataType: "json",
        data:{
            telephone:'13518705742'
        },
        success : function(data) {
            if(data.code  ==  0){
                // 设置图片的src属性
                $("#validateImage-capture-bd").attr("src", data.data.oriCopyImage);
                $("#slideImage-capture-bd").attr("src", data.data.newImage);
                //X位置
                positionX = data.data.positionXy.x;
            }else{
                layer.open({
                    icon:2,
                    title: "温馨提示",
                    content: data.info
                });
            }
        },
        error : function() {}
    });
}

function exchange(){
    initImageValidate();
}

// 校验
function checkImageValidate(){
    $.ajax({
        async : false,
        type : "POST",
        url : "/capture/checkImgValidate",
        dataType: "json",
        data:{
            telephone:'13518705742',
            offsetHorizontal:left_binarydance
        },
        success : function(data) {
            if(data.status == 0){
                $("#operateResult-capture-bd").html(data.info).css("color","#28a745");
            }else{
                $("#operateResult-capture-bd").html(data.info).css("color","#dc3545");
                // 验证未通过，将按钮和拼图恢复至原位置
                $("#sliderInner-capture-bd").animate({"left":"0px"},200);
                $("#slideImage-capture-bd").animate({"left":"0px"},200);
            }
        },
        error : function() {}
    });
}