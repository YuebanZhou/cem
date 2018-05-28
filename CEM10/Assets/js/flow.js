$(function () {
  $(".tab").click(function () {
    window.location.href = "/CEM/CEM10/index.html"
  })

  var num = 0;
  setInterval(function () {
    var date = new Date();
    var year = date.getFullYear(); //获取当前年份   
    var mon = date.getMonth() + 1; //获取当前月份   
    var da = date.getDate(); //获取当前日   
    var h = date.getHours(); //获取小时   
    var m = date.getMinutes(); //获取分钟   
    var s = date.getSeconds(); //获取秒   
    $(".head .time").html(year + '年' + mon + '月' + da + '日' + h + ':' + m + ':' + s)
    num += 1;
    //console.log(num);
    if (num <= 100) {
      $(".rate .active").attr("style", "width:" + num + "%")
    } else {
      num = 0;
    }


  }, 1000)

});