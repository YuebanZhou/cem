$.ajax({
  type: "post",
  dataType: "json",
  url: "/CEM/CEM10/Assets/json/structure.json",
  success: function (result) {
    var s26 = '';
    var s31 = '';
    var s41 = '';
    var s42 = '';
    for (var i = 0; i < result.length; i++) {
      for (var j = 0; j < result[i].jenkins_list.msg1.length; j++) {
        s26 += "<option value=" + result[i].jenkins_list.msg1[j] + ">" + result[i].jenkins_list.msg1[j] + "</option>"
      }
      for (var j = 0; j < result[i].sonar_list.msg1.length; j++) {
        s31 += "<option value=" + result[i].sonar_list.msg1[j] + ">" + result[i].sonar_list.msg1[j] + "</option>"
      }
      for (var j = 0; j < result[i].web_worker.msg1.length; j++) {
        s41 += "<option value=" + result[i].web_worker.msg1[j] + ">" + result[i].web_worker.msg1[j] + "</option>"
      }
      for (var j = 0; j < result[i].web_worker.msg2.length; j++) {
        s42 += "<option value=" + result[i].web_worker.msg2[j] + ">" + result[i].web_worker.msg2[j] + "</option>"
      }
      $("#p26").append(s26)
      $("#p31").append(s31)
      $("#p41").append(s41)
      $("#p42").append(s42)
    }
  }

})

window.onload = function () {
  $("select").change(function () {
    localStorage.setItem("jenkins_list", $("#p26").val())
    localStorage.setItem("sonar_list", $("#p31").val())
    localStorage.setItem("web_worker1", $("#p41").val())
    localStorage.setItem("web_worker2", $("#p42").val())
  })
  $("input").change(function () {
    localStorage.setItem("jobname", $(".p21 input").val())
    localStorage.setItem("prodec", $(".p22 input").val())
  })

  var proid = localStorage.getItem("proid")
  var username = localStorage.getItem("username")
  var time = localStorage.getItem("time")
  var prolist = localStorage.getItem("prolist")
  var proname = localStorage.getItem("proname")
  var propath = localStorage.getItem("propath")
  var proflag = localStorage.getItem("proflag")
  var proinfo = localStorage.getItem("proinfo")
  var promaster = localStorage.getItem("promaster")

  var jenkins_list = localStorage.getItem("jenkins_list")
  var sonar_list = localStorage.getItem("sonar_list")
  var web_worker1 = localStorage.getItem("web_worker1")
  var web_worker2 = localStorage.getItem("web_worker2")

  var jobname = localStorage.getItem("jobname")
  var prodec = localStorage.getItem("prodec")

  $(".p11").text("项目id：" + proid)
  $(".p12").text("用户名：" + username)
  $(".p13").text("时间：" + time)
  $(".p14").text("项目信息：" + prolist)
  $(".p15").text("项目名称：" + proname)
  $(".p16").text("项目路径：" + propath)
  $(".p17").text("项目状态：" + proflag)
  $(".p18").text("项目详情：" + proinfo)
  $(".p19").text("项目负责人：" + promaster)

  $(function () {
    $('.review').on('hide.bs.modal', function () {
      $(".rbtn1").css("background-color","rgb(217,83,79)")
      $(".rbtn1").css("border","1px solid rgb(217,83,79)")
    })
  });
  $(".rbtn2").click(function(){
    window.location.href="/CEM/CEM10/flow.html"
  })
  $(".tab").click(function () {
    window.location.href = "/CEM/CEM10/index.html"
  })
  //时间
  setInterval(function () {
    var date = new Date();
    var year = date.getFullYear(); //获取当前年份   
    var mon = date.getMonth() + 1; //获取当前月份   
    var da = date.getDate(); //获取当前日   
    var h = date.getHours(); //获取小时   
    var m = date.getMinutes(); //获取分钟   
    var s = date.getSeconds(); //获取秒   
    $(".head .time").html(year + '年' + mon + '月' + da + '日' + h + ':' + m + ':' + s)
  }, 1000)
}