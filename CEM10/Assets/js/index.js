$.ajax({
  type: "post",
  dataType: "json",
  url: "/CEM/CEM10/Assets/json/list.json",
  success: function (result) {
    console.log(result);

    var s = '';
    for (var i = 0; i < result.length; i++) {
      s += `<tr>
            <td class="list proid">` + result[i].pro_id + `</td>
            <td class="list">` + result[i].username + `</td>
            <td class="list">` + result[i].time + `</td>
            <td class="list">` + result[i].pro.pro_list + `</td>
            <td class="list">` + result[i].pro.pro_name + `</td>
            <td class="list">` + result[i].pro.pro_path + `</td>
            <td class="list flag">` + result[i].pro.pro_flag + `</td>
            <td class="list">` + result[i].pro.pro_info + `</td>
            <td class="list">` + result[i].pro.pro_master + `</td>
            <td class="list"><span class="sbtn history">历史</span><span class="sbtn publish">发布</span></td>
          </tr>`
    }
    $('#result').append(s);
    for (var i = 0; i < $('#result tr').length; i++) {
      var flag = $("#result").children("tr").eq(i).find(".flag").text()
      if (flag == 1) {
        $("#result").children("tr").eq(i).find(".history").css("background-color", "#ccc");

      }
    }
    goPage(1)
  }

})
window.onload = function () {
  $(".history").click(function () {
    window.location.href = "/CEM/CEM10/history.html"
    var proid = $(this).parent().parent().children("td").eq(0).html()
    localStorage.setItem("proid", proid)

  })
  $(".publish").click(function () {
    window.location.href = "/CEM/CEM10/publish.html"
    var proid = $(this).parent().parent().children("td").eq(0).html()
    var username = $(this).parent().parent().children("td").eq(1).html()
    var time = $(this).parent().parent().children("td").eq(2).html()
    var prolist = $(this).parent().parent().children("td").eq(3).html()
    var proname = $(this).parent().parent().children("td").eq(4).html()
    var propath = $(this).parent().parent().children("td").eq(5).html()
    var proflag = $(this).parent().parent().children("td").eq(6).html()
    var proinfo = $(this).parent().parent().children("td").eq(7).html()
    var promaster = $(this).parent().parent().children("td").eq(8).html()
    localStorage.setItem("proid", proid)
    localStorage.setItem("username", username)
    localStorage.setItem("time", time)
    localStorage.setItem("prolist", prolist)
    localStorage.setItem("proname", proname)
    localStorage.setItem("propath", propath)
    localStorage.setItem("proflag", proflag)
    localStorage.setItem("proinfo", proinfo)
    localStorage.setItem("promaster", promaster)
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
  var keyWords = [];
  for (var i = 0; i < $("#result tr").length; i++) {
    keyWords.push($("#result tr").children("td").eq(0 + 10 * i).text())
  }
  $("#txt1").keyup(function () {
    $(".se1").html("")
    var text = $(this).val();
    var tempArr = [];
    //和数组中的每个元素字符串进行对比
    for (var i = 0; i < keyWords.length; i++) {
      if (keyWords[i].indexOf(text) == 0) {
        tempArr.push(keyWords[i]);
      }
    }
    var newArr = [];
    //数组重复，只显示一项
    for (var j = 0; j < tempArr.length; j++) {
      if (newArr.indexOf(tempArr[j]) == -1) {　　　　
        newArr.push(tempArr[j]);　　
      }
    }
    //console.log(tempArr);
    //console.log(newArr);
    tempArr = newArr;
    //如果文本框中没有数据或者临时数组中没有数据,就没有必要创建div
    if ($(this).val().length == 0 || tempArr.length == 0) {
      return;
    }
    for (var j = 0; j < tempArr.length; j++) {
      $p = $("<p></p>")
      $(".se1").append($p);
      $p.html(tempArr[j]);
      $p.height(30)
      $p.css("color", "#000");
      $p.css("line-height", "30px");
      $p.css("margin", "0");
      $p.css("padding", "0");
      $p.css("cursor", "pointer");
      $p.css("fontSize", "14px");
      //注册鼠标进入和鼠标离开事件
      $p.mouseover(function () {
        $(this).css("background-color", "rgba(0,0,0,.2)")
      })
      $p.mouseleave(function () {
        $(this).css("background-color", "")
      })
      $p.click(function () {
        $("#txt1").val($(this).text())
        $(".se1").html("");
      })
    }

  })
  $("#txt1").blur(function () {
    var text = $(this).val();
    if (text == "") {
      console.log("为空");
      $(".se1").html("");
    }
  })
  $("#btn").click(function () {
    for (var i = 0; i < $("#result tr").length; i++) {
      var vall = $("#result").children("tr").eq(i).find(".proid").text();
      var val = $("#txt1").val();
      if (val == vall) {
        $("#result").children("tr").eq(i).find(".proid").parent().addClass("sel")
        if ($("#result tr").eq(i).hasClass("sel")) {
          console.log("相等了");
          $("#result").hide()
          $("#resultr").append("<tr>" + $("#result tr").eq(i).html() + "</tr>")
          goPager(1)
          //console.log("<tr>"+$("#result tr").eq(i).html()+"</tr>");
          //$("#result").html("")
          //$("#result").append("<tr>"+$("#result tr").eq(i).html()+"</tr>")

        }

      }
    }
    //goPage(1)
  })
}

function goPage(pno) {
  var itable = document.getElementById("result");

  var num = itable.rows.length; //表格所有行数(所有记录数)
  //console.log(num);
  var totalPage = 0; //总页数
  var pageSize = 3; //每页显示行数
  //总共分几页
  if (num / pageSize > parseInt(num / pageSize)) {
    totalPage = parseInt(num / pageSize) + 1;
  } else {
    totalPage = parseInt(num / pageSize);
  }
  var currentPage = pno; //当前页数
  var startRow = (currentPage - 1) * pageSize + 1; //开始显示的行  31
  var endRow = currentPage * pageSize; //结束显示的行   40
  endRow = (endRow > num) ? num : endRow; //40
  //遍历显示数据实现分页
  for (var i = 1; i < (num + 1); i++) {
    var irow = itable.rows[i - 1];
    if (i >= startRow && i <= endRow) {
      irow.style.display = "table-row";
    } else {
      irow.style.display = "none";
    }
  }
  var pageEnd = document.getElementById("pageEnd");
  var tempStr = "<span>共" + totalPage + "页</span>";
  if (currentPage > 1) {
    tempStr += "<span class='btn spanbtn' href=\"#\" onClick=\"goPage(" + (1) + ")\">首页</span>";
    tempStr += "<span class='btn spanbtn' href=\"#\" onClick=\"goPage(" + (currentPage - 1) + ")\">上一页</span>"
  } else {
    tempStr += "<span class='btn spanbtn'>首页</span>";
    tempStr += "<span class='btn spanbtn'>上一页</span>";
  }

  if (totalPage == 0) {
    tempStr += ""

  } else if (totalPage == 1) {
    tempStr += "<a onclick=\"goPage(" + currentPage + ")\"><span class='spanbtn nowpage pageicon'>" + currentPage +
      "</span></a>"

  } else if (totalPage == 2 && currentPage == 1) {
    tempStr += "<a onclick=\"goPage(" + currentPage + ")\"><span class='spanbtn pageicon nowpage'>" + currentPage +
      "</span></a>" + "<a onclick=\"goPage(" + (currentPage + 1) + ")\"><span class='spanbtn pageicon'>" +
      (currentPage + 1) + "</span></a>"
  } else if (totalPage == 2 && currentPage == 2) {
    tempStr += "<a onclick=\"goPage(" + (currentPage - 1) + ")\"><span class='spanbtn pageicon'>" + (currentPage -
        1) + "</span></a>" + "<a onclick=\"goPage(" + currentPage + ")\"><span class='spanbtn nowpage pageicon'>" +
      currentPage + "</span></a>"
  } else if (totalPage >= 3 && currentPage == 1) {
    tempStr += "<a onclick=\"goPage(" + currentPage + ")\"><span class='spanbtn nowpage pageicon'>" + currentPage +
      "</span></a>" + "<a onclick=\"goPage(" + (currentPage + 1) + ")\"><span class='spanbtn pageicon'>" +
      (currentPage + 1) +
      "</span></a>" + "<a onclick=\"goPage(" + (currentPage + 2) + ")\"><span class='spanbtn pageicon'>" + (
        currentPage + 2) +
      "</span></a>"
  } else if (totalPage >= 3 && currentPage == totalPage) {
    tempStr += "<a onclick=\"goPage(" + (currentPage - 2) + ")\"><span class='spanbtn pageicon'>" + (currentPage -
        2) +
      "</span></a>" + "<a onclick=\"goPage(" + (currentPage - 1) + ")\"><span class='spanbtn pageicon'>" +
      (currentPage - 1) +
      "</span></a>" + "<a onclick=\"goPage(" + currentPage + ")\"><span class='spanbtn nowpage  pageicon'>" +
      currentPage +
      "</span></a>"
  } else {
    tempStr += "<a onclick=\"goPage(" + (currentPage - 1) + ")\"><span class='spanbtn pageicon'>" + (currentPage -
        1) +
      "</span></a>" + "<a onclick=\"goPage(" + currentPage + ")\"><span class='spanbtn nowpage pageicon'>" +
      currentPage +
      "</span></a>" + "<a onclick=\"goPage(" + (currentPage + 1) + ")\"><span class='spanbtn pageicon'>" + (
        currentPage + 1) +
      "</span></a>"
  }

  if (currentPage < totalPage) {
    tempStr += "<span class='btn spanbtn' href=\"#\" onClick=\"goPage(" + (currentPage + 1) + ")\">下一页</span>";
    tempStr += "<span class='btn spanbtn' href=\"#\" onClick=\"goPage(" + (totalPage) + ")\">尾页</span>";
  } else {
    tempStr += "<span class='btn spanbtn'>下一页</span>";
    tempStr += "<span class='btn spanbtn'>尾页</span>";
  }

  document.getElementById("barcon").innerHTML = tempStr;

}

function goPager(pno) {
  var itable = document.getElementById("resultr");

  var num = itable.rows.length; //表格所有行数(所有记录数)
  var totalPage = 0; //总页数
  var pageSize = 3; //每页显示行数
  //总共分几页
  if (num / pageSize > parseInt(num / pageSize)) {
    totalPage = parseInt(num / pageSize) + 1;
  } else {
    totalPage = parseInt(num / pageSize);
  }
  var currentPage = pno; //当前页数
  var startRow = (currentPage - 1) * pageSize + 1; //开始显示的行  31
  var endRow = currentPage * pageSize; //结束显示的行   40
  endRow = (endRow > num) ? num : endRow; //40
  //遍历显示数据实现分页
  for (var i = 1; i < (num + 1); i++) {
    var irow = itable.rows[i - 1];
    if (i >= startRow && i <= endRow) {
      irow.style.display = "table-row";
    } else {
      irow.style.display = "none";
    }
  }
  var pageEnd = document.getElementById("pageEnd");
  var tempStr = "<span>共" + totalPage + "页</span>";
  if (currentPage > 1) {
    tempStr += "<span class='btn spanbtn' href=\"#\" onClick=\"goPager(" + (1) + ")\">首页</span>";
    tempStr += "<span class='btn spanbtn' href=\"#\" onClick=\"goPager(" + (currentPage - 1) + ")\">上一页</span>"
  } else {
    tempStr += "<span class='btn spanbtn'>首页</span>";
    tempStr += "<span class='btn spanbtn'>上一页</span>";
  }

  if (totalPage == 0) {
    tempStr += ""

  } else if (totalPage == 1) {
    tempStr += "<a onclick=\"goPager(" + currentPage + ")\"><span class='spanbtn nowpage pageicon'>" + currentPage +
      "</span></a>"

  } else if (totalPage == 2 && currentPage == 1) {
    tempStr += "<a onclick=\"goPager(" + currentPage + ")\"><span class='spanbtn pageicon nowpage'>" + currentPage +
      "</span></a>" + "<a onclick=\"goPager(" + (currentPage + 1) + ")\"><span class='spanbtn pageicon'>" +
      (currentPage + 1) + "</span></a>"
  } else if (totalPage == 2 && currentPage == 2) {
    tempStr += "<a onclick=\"goPager(" + (currentPage - 1) + ")\"><span class='spanbtn pageicon'>" + (currentPage -
        1) + "</span></a>" + "<a onclick=\"goPager(" + currentPage + ")\"><span class='spanbtn nowpage pageicon'>" +
      currentPage + "</span></a>"
  } else if (totalPage >= 3 && currentPage == 1) {
    tempStr += "<a onclick=\"goPager(" + currentPage + ")\"><span class='spanbtn nowpage pageicon'>" + currentPage +
      "</span></a>" + "<a onclick=\"goPager(" + (currentPage + 1) + ")\"><span class='spanbtn pageicon'>" +
      (currentPage + 1) +
      "</span></a>" + "<a onclick=\"goPager(" + (currentPage + 2) + ")\"><span class='spanbtn pageicon'>" + (
        currentPage + 2) +
      "</span></a>"
  } else if (totalPage >= 3 && currentPage == totalPage) {
    tempStr += "<a onclick=\"goPager(" + (currentPage - 2) + ")\"><span class='spanbtn pageicon'>" + (currentPage -
        2) +
      "</span></a>" + "<a onclick=\"goPager(" + (currentPage - 1) + ")\"><span class='spanbtn pageicon'>" +
      (currentPage - 1) +
      "</span></a>" + "<a onclick=\"goPager(" + currentPage + ")\"><span class='spanbtn nowpage  pageicon'>" +
      currentPage +
      "</span></a>"
  } else {
    tempStr += "<a onclick=\"goPager(" + (currentPage - 1) + ")\"><span class='spanbtn pageicon'>" + (currentPage -
        1) +
      "</span></a>" + "<a onclick=\"goPager(" + currentPage + ")\"><span class='spanbtn nowpage pageicon'>" +
      currentPage +
      "</span></a>" + "<a onclick=\"goPager(" + (currentPage + 1) + ")\"><span class='spanbtn pageicon'>" + (
        currentPage + 1) +
      "</span></a>"
  }

  if (currentPage < totalPage) {
    tempStr += "<span class='btn spanbtn' href=\"#\" onClick=\"goPager(" + (currentPage + 1) + ")\">下一页</span>";
    tempStr += "<span class='btn spanbtn' href=\"#\" onClick=\"goPager(" + (totalPage) + ")\">尾页</span>";
  } else {
    tempStr += "<span class='btn spanbtn'>下一页</span>";
    tempStr += "<span class='btn spanbtn'>尾页</span>";
  }
  $("#barcon").hide()
  document.getElementById("barconr").innerHTML = tempStr;

}