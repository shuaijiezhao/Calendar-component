(function (){
	var datepicker = {};

	datepicker.getMonthData = function (year, month){
		var ret = [];

		if (!year || !month) {
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}

		// 本月第一天
		var firstDay = new Date(year, month - 1, 1);
		// 本月第一天是周几
		var firstDayWeekDay = firstDay.getDay();
		if (firstDayWeekDay === 0) firstDayWeekDay = 7;
		// 上个月的天数
		var preMonthDayCount = firstDayWeekDay - 1;

		// 返回本天所属的年份和月份
		var year = firstDay.getFullYear();
		var month = firstDay.getMonth() + 1;

		// 上个月的最后一天
		var lastDayOfLastMonth = new Date(year, month -1, 0);
		// 上个月最后一天是几号
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

		// 本月最后一天
		var lastDay = new Date(year, month, 0);
		// 本月最后一天是几号
		var lastDate = lastDay.getDate();

		for (var i=0; i<7*6; i++) {
			// 当前日期
			var date = i + 1 - preMonthDayCount;
			var showDate = date;
			var thisMonth = month; 

			if (date <= 0) {
				// 上一月
				thisMonth = month - 1;
				showDate = lastDateOfLastMonth + date;
			} else if (date > lastDate) {
				// 下一月
				thisMonth = month + 1;
				showDate = showDate - lastDate;
			}

			if (thisMonth === 0) thisMonth = 12;
			if (thisMonth === 13) thisMonth = 1;

			ret.push({
				month: thisMonth,
				date: date,
				showDate: showDate
			})
		}

		return {
			year: year,
			month: month,
			days: ret
		};
	}

	window.datepicker = datepicker;
})();