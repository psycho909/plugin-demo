initialPage(function() {
	if (APPLICATION.data.selectedCommunityId) $('#criteria_community_id').val(APPLICATION.data.selectedCommunityId).trigger('change');
	refresh();
}, null, ['knob', 'chartjs', 'chartjs-datalabels']);

/*
var noControlSidebar = false;
var noNotification = true;
var noReload = true;
var noThemeSwitch = true;
*/

var language;

var criteriaForm;
var criteriaValidator;

var hourConsumptionChart;

//initialPage(null, {sidebar: false});

var colors = {
	'red': '#dc3545',
	'orange': '#fd7e14',
	'blue': '#0d6efd',
	'indigo': '#6610f2',
	'purple': '#6f42c1',
	'pink': '#d63384',
	'yellow': '#ffc107',
	'green': '#198754',
	'teal': '#20c997',
	'cyan': '#0dcaf0',
	'cyan': '#0dcaf0',
	'grey': '#808080',
	'lightgrey': '#d3d3d3',
	'white': '#ffffff'
};

var chartLabels = [];
for (var i = 0; i < 24; i++) chartLabels.push(i);

var parkingGarages;
var chargingStatus;
var columns;

var sharedFloor = '000';
var sharedFloorText;

var parkingGarageId;
var parkingGarageFloors;
var activeFloor;
var statusCountTotal;

function loadI18n() {
	var deferred = $.Deferred();
	if (!language) language = getPageLocale();
	$.i18n.properties({
		language: language,
		name: [APPLICATION.SETTING.defaultLanguageFileName, 'index-message', 'parking_record-message', 'garage-message'],
		path: APPLICATION.SETTING.defaultLanguageFilePath,
		mode: 'map',
		cache: false,
		callback: function() {
			APPLICATION.documentTitle = $.i18n.prop('index.charging.management') + '-' + $.i18n.prop('index.floor');
			$('#title_section').text(APPLICATION.documentTitle);

			$('#criteria_record_time_label').text($.i18n.prop('terms.date.only'));

			$('.charging_summary_floor_title').text($.i18n.prop('index.charging.now'));
			$('.charging_percentage_title').text($.i18n.prop('index.charging.summary'));
			$('.permanent_charg_point_status_title').text($.i18n.prop('index.charging.permanent.charge_point.status'));
			$('.charging_consumption_time_title').text($.i18n.prop('index.charging.time'));

			$('#consumption_percent_label1').text($.i18n.prop('index.charging.consumption.permanent'));
			$('#consumption_percent_label2').text($.i18n.prop('index.charging.consumption.shared'));
			$('#consumption_percent_label3').text($.i18n.prop('index.charging.consumption.device'));
			
			$('.shared_charge_point').text($.i18n.prop('index.charging.shared'));


			$('#refresh').append($.i18n.prop('operation.refresh'));

			deferred.resolve();
		}
	});
	return deferred.promise();
}

function initial() {

	"use strict";
	applyLayoutOption({ 'showQueryResultHeader': true });

	parkingGarageId = getUrlParam('p');
	activeFloor = getUrlParam('f');

	$(document).ajaxStart(function() { Pace.restart(); });

	var dashedLanguage = language.replace('_', '-');
	moment.locale(dashedLanguage.toLowerCase());
	criteriaForm = $('#criteria_form');

	var deferred = $.Deferred();
	var deferreds = [];

	deferreds.push($.getScript(getDataTableTranslation(language)));

	deferreds.push(
		ajaxGet(URLS.PARKING_GARAGE.LIST_BY_COMMUNITY + APPLICATION.data.selectedCommunityId, null, (json) => {
			parkingGarages = json;
		}),
		ajaxGet(URLS.CODE.LIST.CHARGING_STATUS, null, (json) => {
			chargingStatus = json;
		})
	);

	//createDatePicker($('#criteria_record_time'), moment().format(APPLICATION.SETTING.defaultDateFormat), false, true);
	createDatePicker($('#criteria_record_time'), '2025-05-27', false, true);

	if (!language.startsWith('en')) deferreds.push($.getScript(getValidatorTranslation(language)));
	
	$.when.apply($, deferreds)
	.done(function() {
		if (parkingGarages) {
			if (!parkingGarageId) parkingGarageId = parkingGarages[0].id;
			sharedFloorText = $.i18n.prop('garage.shared');
			
			ajaxGet(URLS.GARAGE.LIST_FLOOR_BY_PARKING_GARAGE + parkingGarageId, null, (data) => {
				parkingGarageFloors = data;
				if (parkingGarageFloors) {
					var floorText = $.i18n.prop('garage.floor')
					if (!activeFloor) activeFloor = parkingGarageFloors[0];
					parkingGarageFloors.forEach((f) => {
						$('.floor_button_container').append('<li class="nav-item mr-2"><a class="nav-link h5 {1}" floor="{0}">{0} {2}</a></li>'
							.format(f, (f == activeFloor ? "active" : ""), floorText));
					});
					$('.floor_button_container').append('<li class="nav-item mr-2"><a class="nav-link h5 {1}" floor="{0}">{2}</a></li>'
						.format(sharedFloor, (sharedFloor == activeFloor ? "active" : ""), sharedFloorText));
					
					$('.floor_button_container .nav-link').on('click', (e) => {
						e.preventDefault();
						$('.floor_button_container .active').removeClass('active');
						$(e.target).addClass('active');
						activeFloor = $(e.target).attr('floor');
						refresh();
					});
				}
				return deferred.resolve();
			});
		}
		
		addValidatorMethod();
		criteriaValidator = criteriaForm.validate({
			rules: {
				recordTime: {
					required: true
				},
			}
		});
		configValidator(criteriaValidator);
		
		addTitleOperation($('#title_operation_container'), null, { 'search': true });

		loadChartDefaults();
		Chart.plugins.register(ChartDataLabels);
		
		$('#refresh').on('click', refresh);
		
		if (!parkingGarages) {
			return deferred.resolve();
		}
	});

	return deferred.promise();
}

function getColor(status) {
	var color;
	if (!status) {
		color = colors.blue;
	}
	else {
		switch (status) {
			case APPLICATION.codeHelper.chargingStatusIdle.id: color = colors.blue; break;
			case APPLICATION.codeHelper.chargingStatusQueuing.id: color = colors.yellow; break;
			case APPLICATION.codeHelper.chargingStatusCharging.id: color = colors.red; break;
			case APPLICATION.codeHelper.chargingStatusNotUsed.id: color = colors.lightgrey; break;
			case APPLICATION.codeHelper.chargingStatusFault.id: color = colors.grey; break;
			default: color = colors.white;
		}
	}
	return color;
}

function refresh(e) {
	if (e) e.preventDefault();
	if (!parkingGarages) return false;
	
	if (parkingGarageFloors) {
		if (!activeFloor) activeFloor = parkingGarageFloors[0];
	}

	var floorContainer = $('#floor_container');
	floorContainer.empty();
	
	//var sharedFloor = $.i18n.prop('index.charging.consumption.shared');

	//parkingGarages.forEach((p) => {
	//if (!parkingGarageId) parkingGarageId = parkingGarages[0].id;
	var containerElement = $('#container_template').clone().attr('id', 'floor_container' + parkingGarageId);
	containerElement.removeClass('d-none');
	floorContainer.append(containerElement);

	//if (parkingGarages.length > 1) $('.parking_garage_title', parkingGarageElement).text(p.name).removeClass('d-none');

	var floorInfoContainer = $('.floor_info_container', containerElement);
	var floorConsumptionContainer = $('.floor_consumption_container', containerElement);
	floorInfoContainer.empty();
	floorConsumptionContainer.empty();
	
	$('.charge_point_status_title', containerElement).text($.i18n.prop('index.charge_point.status'));
	$('.hour_consumption_title', containerElement).text($.i18n.prop('index.charging.time'));

	var table = $('.status_table', containerElement).DataTable(
		getDataTableOptions({
			'info': false,
			'paging': false,
			"columns": [
				{"data": "description", 'width': 80},
				{"data": 'count', 'width': 120, 'class': 'align-middle status_count'},
			], 
			"ordering": false,
			"serverSide": false
		})
	);

	var ownershipId;
	if (activeFloor == sharedFloor) {
		$('.floor_caption').text($.i18n.prop('terms.shared'));
		ownershipId = APPLICATION.codeHelper.garageOwnershipShared.id
	}
	else {
		$('.floor_caption').text(activeFloor);
		ownershipId = APPLICATION.codeHelper.garageOwnershipPrivate.id
	}

	//ajaxGet(URLS.GARAGE.LIST_FLOOR_BY_PARKING_GARAGE + parkingGarageId, null, (data) => {

	/*
	var criteria = {
		'parkingGarageId': parkingGarageId,
		'floor': activeFloor,
		'serviceTypeId': APPLICATION.codeHelper.serviceTypeCharging.id,
		'fromTime': $('#criteria_record_time').val() + ' 00:00:00',
		'toTime': $('#criteria_record_time').val() + ' 23:59:59'
	};
	*/

	var floors = [];
	floors.push({ 'floor': sharedFloor, 'consumption': 0 });
	if ((parkingGarageFloors) && (parkingGarageFloors.length)) {
		parkingGarageFloors.forEach((f) => floors.push({ 'floor': f, 'consumption': 0, 'count': 0 }));
	}

	var latestCriteria = {
		'parkingGarageId': parkingGarageId,
		'serviceTypeId': APPLICATION.codeHelper.serviceTypeCharging.id,
		'fromTime': $('#criteria_record_time').val() + ' 00:00:00',
		'ownershipId': ownershipId, 
		//'floor': activeFloor, 
		'floor': (activeFloor != sharedFloor ? activeFloor : null),
		'toTime': $('#criteria_record_time').val() + ' 23:59:59'
	};

	ajaxPost(URLS.METER_RECORD.STATISTICS_BY_LATEST, latestCriteria, (consumptions) => {
		var privateTotal = 0;
		var sharedTotal = 0;
		var theFloor;

		consumptions.forEach((c) => {
			if (c.ownershipId == APPLICATION.codeHelper.garageOwnershipPrivate.id) {
				//theFloor = floors.find((f) => f.floor == c.floor);
				privateTotal += c.consumption;
			}
			else if (c.ownershipId == APPLICATION.codeHelper.garageOwnershipShared.id) {
				//theFloor = floors.find((f) => f.floor == sharedFloor);
				sharedTotal += c.consumption;
			}
			//if (theFloor) theFloor.consumption += c.consumption;
		});

		var template = $('#floor_info_template');

		theFloor = floors.find((f) => f.floor == activeFloor);
		if (theFloor) {
			var total = privateTotal + sharedTotal;
			var floorTotal = ownershipId == APPLICATION.codeHelper.garageOwnershipShared.id ? sharedTotal : privateTotal;
			var element = template.clone().prop('id', 'floor_info_' + i);
			element.removeClass('d-none');
			var percentage = Math.round(floorTotal / total * 100);
			$('.knob', element).val(percentage);
			var consumptionText = $.i18n.prop('index.charging.consumption') + ' ' 
				+ '<span class="px-1 h5 {0} rounded">'.format(floorTotal > 0 ? 'bg-warning' : 'bg-light')
				+ formatDecimal(floorTotal / 1000, 1).toString() + '</span> ' + APPLICATION.systemConfig.defaultTotalizerUnit;
			$('.floor_consumption_label', element).html(consumptionText);
			floorInfoContainer.append(element);

			$(".knob", element).knob({
				'angleArc': 200,
				'angleOffset': -100,
				"fgColor": colors[i],
				//"skin": "tron",
				"readOnly": true,
				'width': 180,
				'height': 100,
				'format': function(v) {
					return v > 0 ? v + '%' : '-';
				}
			});
		}
		//});
	});
	//});

	var statusCriteria = {
		'parkingGarageId': parkingGarageId,
		'ownershipId': ownershipId, 
		'floor': (activeFloor != sharedFloor ? activeFloor : null),
		'serviceTypeId': APPLICATION.codeHelper.serviceTypeCharging.id,
		'fromTime': $('#criteria_record_time').val() + ' 00:00:00',
		'toTime': $('#criteria_record_time').val() + ' 23:59:59'
	};

	ajaxPost(URLS.GARAGE.COUNT_CHARGING_STATUS_BY_PARKING_GARAGE, statusCriteria, (json) => {
		//console.log(json);
		if ((json) && (json.length)) {
			
			var rows = [];
			if ((chargingStatus) && (chargingStatus.length)) {
				var icon;
				chargingStatus.forEach((c, i) => {
					if (c.id != APPLICATION.codeHelper.chargingStatusFault.id) {
						//element.append('<span class="mx-1"><i class="fa-solid fa-square" style="color: {0};"></i>&nbsp;<span>{1}</span></span>'.format(getColor(c.id), c.description));
						if (c.id == APPLICATION.codeHelper.chargingStatusCharging.id) icon = 'fas fa-bolt text-success';
						else if (c.id == APPLICATION.codeHelper.chargingStatusQueuing.id) icon = 'fas fa-cars text-orange';
						else if (c.id == APPLICATION.codeHelper.chargingStatusNotUsed.id) icon = 'fa fa-circle-question text-warning';
						else if (c.id == APPLICATION.codeHelper.chargingStatusIdle.id) icon = 'fas fa-power-off text-info';
						rows.push({
							"id": c.id, 
							"textDescription": c.description, 
							"description": '<i class="p-3 fa-2x {0}"></i>'.format(icon) + ' <span class="h5">' + c.description + '</span>', 
							'count': 0
						});
					}
				});
			}
			
			if ((json) && (json.length)) {
				var floors = [];
				var privateCount = 0;
				var sharedCount = 0;
				var row;
				json.forEach((f) => {
					floor = null;
					row = null;
					if (f.ownershipId == APPLICATION.codeHelper.garageOwnershipPrivate.id) privateCount += f.count;
					else sharedCount += f.count;
					floor = floors.find((r) => f.floor == r.floor);
					if (!floor) {
						floor = { 'floor': f.floor };
						floors.push(floor);
					}
					
					if (f.chargingStatusId) row = rows.find((r) => r.id == f.chargingStatusId);
					else row = rows.find((r) => r.id == APPLICATION.codeHelper.chargingStatusIdle.id);
					if (row) row.count += f.count;

					if (!f.chargingStatusId) floor['status_' + APPLICATION.codeHelper.chargingStatusIdle.id] += f.count;
					else floor['status_' + f.chargingStatusId] += f.count;
				});

				$('.private_charge_point_count_label').text($.i18n.prop('index.charge_point.private'));
				$('.shared_charge_point_count_label').text($.i18n.prop('index.charge_point.shared'));

				$('.private_charge_point_count').text(privateCount);
				$('.shared_charge_point_count').text(sharedCount);
				
				var data = [];
				var labels = [];
				statusCountTotal = 0;
				rows.forEach((r) => {
					if (r.count > 0) {
						statusCountTotal += r.count;
						data.push(r.count);
						labels.push(r.textDescription);
					}
				});
				
				var pieChart = getPieChart($('.status_count_chart', containerElement));
				pieChart.data.datasets[0].data = data;
				pieChart.data.labels = labels;
				pieChart.update();
			}
			
			table.rows.add(rows).draw(false);
		}
	});

	var dailyStart = moment($('#criteria_record_time').val()).set({hour: 0, minute: 0, second: 0, millisecond: 0 }).format(APPLICATION.SETTING.defaultDateTimeFormat);
	var dailyEnd = moment(dailyStart).add(1, 'days').subtract(1, 'millisecond').format(APPLICATION.SETTING.defaultDateTimeFormat);
	var dailyCriteria = {
		'parkingGarageId': parkingGarageId,
		'ownershipId': ownershipId, 
		//'floor': activeFloor,
		'floor': (activeFloor != sharedFloor ? activeFloor : null),
		'serviceTypeId': APPLICATION.codeHelper.serviceTypeCharging.id,
		'fromTime': dailyStart,
		'toTime': dailyEnd
	};
	
	var latetCriteria = dailyCriteria;
	
	var monthStart = moment($('#criteria_record_time').val()).set({date: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }).format(APPLICATION.SETTING.defaultDateTimeFormat);
	var monthEnd = moment(monthStart).add(1, 'month').subtract(1, 'millisecond').format(APPLICATION.SETTING.defaultDateTimeFormat);
	var monthlyCriteria = {
		'parkingGarageId': parkingGarageId,
		'ownershipId': ownershipId, 
		//'floor': activeFloor,
		'floor': (activeFloor != sharedFloor ? activeFloor : null),
		'serviceTypeId': APPLICATION.codeHelper.serviceTypeCharging.id,
		'fromTime': monthStart,
		'toTime': monthEnd
	};
	
	var template = $('#floor_consumption_template');
	var element = template.clone().attr('id', 'floor_consumption');
	$('.floor_consumption_unit', element).text(APPLICATION.systemConfig.defaultTotalizerUnit);
	element.removeClass('d-none');
	floorConsumptionContainer.append(element);
	
	ajaxPost(URLS.METER_RECORD.STATISTICS_BY_LATEST, latetCriteria, (consumptions) => {
		var privateTotal = 0;
		var sharedTotal = 0;
		var voltage = 0;
		var power = 0;
		consumptions.forEach((c) => {
			if (c.ownershipId == APPLICATION.codeHelper.garageOwnershipPrivate.id) privateTotal += c.consumption;
			else if (c.ownershipId == APPLICATION.codeHelper.garageOwnershipShared.id) sharedTotal += c.consumption;
			voltage += c.voltage;
			power += c.power;
		});
		var total = privateTotal + sharedTotal;
		$('.floor_consumption_latest_label', element).text($.i18n.prop('index.charging.consumption.latest'));
		$('.floor_consumption_latest', element).text(formatTotalizer(total / 1000, 1));
		
		latetCriteria.fromTime = moment(dailyStart).subtract(1, 'days').format(APPLICATION.SETTING.defaultDateTimeFormat);
		latetCriteria.toTime = moment(dailyEnd).subtract(1, 'days').format(APPLICATION.SETTING.defaultDateTimeFormat);
		
		
		$('.floor_voltage_guage_label', element).text($.i18n.prop('index.voltage'));
		$('.floor_power_guage_label', element).text($.i18n.prop('index.power'));
		$('.floor_consumption_guage_label', element).text($.i18n.prop('index.consumption'));
		$('.floor_voltage_guage', element).val(voltage);
		$('.floor_power_guage', element).val(power);
		
		$(".floor_voltage_guage", element).knob({
			'min': 0, 
			'max': 400, 
			'angleArc': 200,
			'angleOffset': -100,
			"fgColor": colors.yellow,
			//"skin": "tron",
			"readOnly": true,
			'width': 150,
			'height': 90,
			'format': function(v) {
				return v > 0 ? v : '-';
			}
		});
		
		$(".floor_power_guage", element).knob({
			'min': 0, 
			'max': 1000, 
			'angleArc': 200,
			'angleOffset': -100,
			"fgColor": colors.orange,
			//"skin": "tron",
			"readOnly": true,
			'width': 150,
			'height': 90,
			'format': function(v) {
				return v > 0 ? v : '-';
			}
		});
		
		$(".floor_consumption_guage", element).knob({
			'min': 0, 
			'max': 1000, 
			'angleArc': 200,
			'angleOffset': -100,
			"fgColor": colors.red,
			//"skin": "tron",
			"readOnly": true,
			'width': 150,
			'height': 90,
			'format': function(v) {
				return v > 0 ? v : '-';
			}
		});
		
		ajaxPost(URLS.METER_RECORD.STATISTICS_BY_LATEST, latetCriteria, (consumptions) => {
			var privateTotal = 0;
			var sharedTotal = 0;
			consumptions.forEach((c) => {
				if (c.ownershipId == APPLICATION.codeHelper.garageOwnershipPrivate.id) privateTotal += c.consumption;
				else if (c.ownershipId == APPLICATION.codeHelper.garageOwnershipShared.id) sharedTotal += c.consumption;
			});
			var yesterdayTotal = privateTotal + sharedTotal;
			$('.floor_latest_compare_label', element).text($.i18n.prop('index.compare.yesterday'));
			if (yesterdayTotal > 0) $('.floor_latest_compare_percentage', element).text(formatTotalizer(total / yesterdayTotal * 100, 0));
			else $('.floor_latest_compare_percentage', element).text('-');
		});
	});
	
	ajaxPost(URLS.METER_RECORD.STATISTICS_BY_DATES, dailyCriteria, (consumptions) => {
		var privateTotal = 0;
		var sharedTotal = 0;
		consumptions.forEach((c) => {
			if (c.ownershipId == APPLICATION.codeHelper.garageOwnershipPrivate.id) privateTotal += c.consumption;
			else if (c.ownershipId == APPLICATION.codeHelper.garageOwnershipShared.id) sharedTotal += c.consumption;
		});
		var total = privateTotal + sharedTotal;
		$('.floor_consumption_daily_label', element).text($.i18n.prop('index.charging.consumption.daily'));
		$('.floor_consumption_daily', element).text(formatTotalizer(total / 1000, 1));
		//
		dailyCriteria.fromTime = moment(dailyStart).subtract(1, 'days').format(APPLICATION.SETTING.defaultDateTimeFormat);
		dailyCriteria.toTime = moment(dailyEnd).subtract(1, 'days').format(APPLICATION.SETTING.defaultDateTimeFormat);
		ajaxPost(URLS.METER_RECORD.STATISTICS_BY_DATES, dailyCriteria, (consumptions) => {
			var privateTotal = 0;
			var sharedTotal = 0;
			consumptions.forEach((c) => {
				if (c.ownershipId == APPLICATION.codeHelper.garageOwnershipPrivate.id) privateTotal += c.consumption;
				else if (c.ownershipId == APPLICATION.codeHelper.garageOwnershipShared.id) sharedTotal += c.consumption;
			});
			var yesterdayTotal = privateTotal + sharedTotal;
			$('.floor_daily_compare_label', element).text($.i18n.prop('index.compare.yesterday'));
			if (yesterdayTotal > 0) $('.floor_daily_compare_percentage', element).text(formatTotalizer(total / yesterdayTotal * 100, 0));
			else $('.floor_daily_compare_percentage', element).text('-');
		});
	});

	ajaxPost(URLS.METER_RECORD.STATISTICS_BY_DATES, monthlyCriteria, (consumptions) => {
		var privateTotal = 0;
		var sharedTotal = 0;
		consumptions.forEach((c) => {
			if (c.ownershipId == APPLICATION.codeHelper.garageOwnershipPrivate.id) privateTotal += c.consumption;
			else if (c.ownershipId == APPLICATION.codeHelper.garageOwnershipShared.id) sharedTotal += c.consumption;
		});
		var total = privateTotal + sharedTotal;
		$('.floor_consumption_monthly_label', element).text($.i18n.prop('index.charging.consumption.monthly'));
		$('.floor_consumption_monthly', element).text(formatTotalizer(total / 1000, 1));
		//
		monthlyCriteria.fromTime = moment(monthStart).subtract(1, 'months').format(APPLICATION.SETTING.defaultDateTimeFormat);
		monthlyCriteria.toTime = moment(monthEnd).subtract(1, 'months').format(APPLICATION.SETTING.defaultDateTimeFormat);
		ajaxPost(URLS.METER_RECORD.STATISTICS_BY_DATES, monthlyCriteria, (consumptions) => {
			var privateTotal = 0;
			var sharedTotal = 0;
			consumptions.forEach((c) => {
				if (c.ownershipId == APPLICATION.codeHelper.garageOwnershipPrivate.id) privateTotal += c.consumption;
				else if (c.ownershipId == APPLICATION.codeHelper.garageOwnershipShared.id) sharedTotal += c.consumption;
			});
			var lastMonthTotal = privateTotal + sharedTotal;
			$('.floor_monthly_compare_label', element).text($.i18n.prop('index.compare.last_month'));
			if (lastMonthTotal > 0) $('.floor_monthly_compare_percentage', element).text(formatTotalizer(total / lastMonthTotal * 100, 0));
			else $('.floor_monthly_compare_percentage', element).text('-');
		});
	});

	// 
	var chartCriteria = {
		'parkingGarageId': parkingGarageId,
		//'floor': activeFloor,
		'floor': (activeFloor != sharedFloor ? activeFloor : null),
		'serviceTypeId': APPLICATION.codeHelper.serviceTypeCharging.id,
		'ownershipId': APPLICATION.codeHelper.garageOwnershipPrivate.id,
		'fromTime': $('#criteria_record_time').val() + ' 00:00:00',
		'toTime': $('#criteria_record_time').val() + ' 23:59:59'
	};
	var deferreds = [];
	var hourConsumptionChart = getLineChart($('.hour_consumption_chart', containerElement));

	deferreds.push(
		ajaxPost(URLS.METER_RECORD.STATISTICS_BY_HOUR, chartCriteria, (json) => {
			var data = new Array(24);
			data.fill(0);
			if ((json) && (json.length)) json.forEach((e) => data[e.hour] = roundDecimal(e.consumption / 1000, 3));
			hourConsumptionChart.data.datasets[0].data = data;
		})
	);

	chartCriteria.ownershipId = APPLICATION.codeHelper.garageOwnershipShared.id;

	deferreds.push(
		ajaxPost(URLS.METER_RECORD.STATISTICS_BY_HOUR, chartCriteria, (json) => {
			//console.log(json);
			var data = new Array(24);
			data.fill(0);
			if ((json) && (json.length)) json.forEach((e) => data[e.hour] = roundDecimal(e.consumption / 1000, 3));
			hourConsumptionChart.data.datasets[1].data = data;
		})
	);

	$.when.apply($, deferreds)
	.done(() => hourConsumptionChart.update());

}

function getLineChart(element) {
	return new Chart(element.get(0).getContext("2d"), {
		type: 'line',
		data: {
			labels: chartLabels,
			datasets: [
				{
					//borderColor: 'rgba(0,0,255,0.7)',
					borderColor: colors.red,
					borderWidth: 2,
					fill: false,
					//backgroundColor: 'rgba(0,0,255,0.7)',
					//pointBorderColor: 'rgba(0,0,255,0.7)',
					backgroundColor: colors.red,
					pointBorderColor: colors.red,
					pointBorderWidth: 1,
					label: $.i18n.prop('index.charging.consumption.permanent'),
					data: []
				},
				{
					//borderColor: 'rgba(255,0,0,0.7)',
					borderColor: colors.orange,
					borderWidth: 2,
					fill: false,
					//backgroundColor: 'rgba(255,0,0,0.7)',
					//pointBorderColor: 'rgba(255,0,0,0.7)',
					backgroundColor: colors.orange,
					pointBorderColor: colors.orange,
					pointBorderWidth: 1,
					label: $.i18n.prop('index.charging.consumption.shared'),
					data: []
				}
			]
		},
		options: {
			responsive: true,
			animation: false, // for Performance
			maintainAspectRatio: false,
			title: { display: false },
			tooltips: {
				mode: 'index',
				intersect: false
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: $.i18n.prop('terms.hour')
					}
				}],
				yAxes: [{
					type: 'linear',
					position: 'left',
					scaleLabel: {
						display: true,
						labelString: APPLICATION.systemConfig.defaultTotalizerUnit
					}
				}]
			},
			legend: {
				position: 'bottom'
			}, 
			plugins: {
				datalabels: {
					display: false
				}
			}
		}
	});

}

function getPieChart(element) {
	return new Chart(element.get(0).getContext("2d"), {
		type: 'pie',
		options: {
			//showAllTooltips: false,
			title: {display: false},
			legend: {display: false},
			//maintainAspectRatio: false,
			responsive: true,
			plugins: {
				/*
				datalabels: {
					display: true,
					formatter: (value) => {
						return value;
					},
				},
				*/
				datalabels: {
					borderColor: colors.white, 
					borderWidth: 2,
					backgroundColor: function(context) {
						return context.dataset.backgroundColor;
					},
					borderRadius: 4,
					color: 'white',
					font: {
						size: 16,
						weight: 'bold'
					},
					//formatter: Math.round,
					formatter: (value) => {
						return statusCountTotal ? Math.round(value * 100 / statusCountTotal) + '%' : '';
					},
					padding: 6
				}
			},			
		},
		data: {
			datasets: [
				{
					borderWidth: 2,
					borderColor: colors.white,
					backgroundColor: [colors.green, colors.blue, colors.orange, colors.yellow],
					data: [0]
				}
			],
			//labels: []
		}
	});
}
