;(function($){
  $.fn.autocomplete = function(options){
    var defaults ={
      borderColor : "#C7F4EE"
    };
    var opts = $.extend(defaults,options);
    var self = $(this);
    flag = '0'; //没有下拉框
    record ="";
    // 发起ajax请求拿数据
    $.ajax({
      url : '/autocomplete/json.htm',
      type : 'GET',
      dataType : 'json',
      success : function(data){
        record = data; //取到json数据
      }
    });
    function getFocus(){
      var len = self.val().length;
      var str = self.val().toLowerCase();
      if(len > 0){ //输入框中有数据
          if(flag == '0'){
            $("<div class='down'></div>").css({
                'width':self.outerWidth()-2,
                'border': '1px solid',
                'border-color':opts.borderColor,
                'border-top':'none',
                'overflow' : 'hidden'
              }).insertAfter(self);
              flag = '1'; //容器已显示
              // 遍历 data 取数据放入容器
              $.each( record ,function(i,v){
                $.each(v,function(j,k){
                var jsonText = k.text;
                var jsonMean = k.mean;
                if( jsonText.indexOf(str) > '-1'){
                  $("<div class='single' data-mean='"+jsonMean+"'>"+jsonText+"</div>").appendTo($(".down"));
                }
                });
              });

          }
      }else{ //输入框中无数据
        $(".down").remove();
        flag = '0';
      }
    }
    self.on({
      keyup :function(e){
        $(".down").remove();
        flag = '0';
        getFocus();
        function translate(){
          var string =self.val().toLowerCase();
          $.each( record ,function(i,v){
            $.each(v,function(j,k){
            var jsonText = k.text;
            var jsonMean = k.mean;
            if( jsonText.indexOf(string) > '-1'){
              $("#show").text(string+" ------ " + jsonMean);
            }
            });
          });
        }
        $(".down").on('click',".single",function(){
          self.val($(this).text());
          translate();
          $(".down").remove();
          flag = '0';
        });
        self.siblings('button').on('click',function(){
          translate();
        });
      },
      blur : function(e){
        setTimeout(function(){
          $(".down").remove();
          flag = '0';
        },200);
      }
    });

  };
})(jQuery);
