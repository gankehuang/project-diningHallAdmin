/**
 * Simplified Chinese translation for bootstrap-datepicker
 * Yuan Cheung <advanimal@gmail.com>
 */
// ;(function($){
// 	$.fn.datepicker.dates['zh-CN'] = {
// 		days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
// 		daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
// 		daysMin:  ["日", "一", "二", "三", "四", "五", "六"],
// 		months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
// 		monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
// 		today: "今日",
// 		clear: "清除",
// 		format: "yyyy年mm月dd日",
// 		titleFormat: "yyyy年mm月",
// 		weekStart: 1
// 	};
// }(jQuery));


jQuery(function($){
	$.datepicker.regional['zh-CN'] = {
	closeText: '关闭',
	prevText: '<上月',
	nextText: '下月>',
	currentText: '今天',
	monthNames: ['一月','二月','三月','四月','五月','六月',
	'七月','八月','九月','十月','十一月','十二月'],
	monthNamesShort: ['一','二','三','四','五','六',
	'七','八','九','十','十一','十二'],
	dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
	dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
	dayNamesMin: ['日','一','二','三','四','五','六'],
	weekHeader: '周',
	dateFormat: 'yy-mm-dd',
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: true,
	yearSuffix: '年'};
	$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});
