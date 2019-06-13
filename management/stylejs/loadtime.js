function loadTime(){
    var today = new Date();
    var n = today.getFullYear();
    $(".loadtime").html(n -1);
    $(".lastyear").html(n-2);
    // document.getElementById('loadtime').innerText = n;
    // t=setTimeout(function(){loadTime()},100);
    currentyears();
}

var currentyears;
var lastyear;
function currentyears(){
	  lastyear = $(".lastyear").html();
      currentyears = $(".loadtime").html();
      console.log("当前的年份",currentyears)
}
