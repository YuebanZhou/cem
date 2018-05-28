$.ajax({
  type: "post",
  dataType: "json",
  url: "/CEM/CEM10/Assets/json/publish.json",
  success: function (result) {
    console.log(result);

    var s = '';
    for (var i = 0; i < result.length; i++) {
      s += `<tr>
            <td class="list">` + result[i].pro.pro_name + `</td>
            <td class="list"><select name="" id=""><option value="">哈哈哈</option></select></td>
            <td class="list">` + result[i].time + `</td>
            <td class="list">` + result[i].pro.pro_master + `</td>
            <td class="list"><span class="sbtn publish">构建</span></td>
          </tr>`
    }
    $('#result').append(s);
  }

})
window.onload = function () {
  $(".tab").click(function(){
    window.location.href="/CEM/CEM10/index.html"
  })
  $(".con .top").css("margin-bottom","50px")
  $(".publish").click(function(){
    window.location.href="/CEM/CEM10/structure.html"
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
  //搜索框模糊匹配
}

