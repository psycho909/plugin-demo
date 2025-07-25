// 網頁截入時做的事 //////////////////////////////////////////////////////////////////////////////////////////////////
$(function(){
	$('body').append('<div class="ie7-loading"><img src="https://tw.hicdn.beanfun.com/beanfun/GamaWWW/Anydoor/modernised/assets/img/loading.gif" /></div>');
});

// 顯示/隱藏loading //////////////////////////////////////////////////////////////////////////////////////////////////
function showLoading(){
	$('.ie7-loading').show();
}
function hideLoading(){
	$('.ie7-loading').hide();
}

// date time picker預設參數 //////////////////////////////////////////////////////////////////////////////////////////////////
var datePickerSettings = {
	showButtonPanel: true,
	closeText: 'Close',
	showOtherMonths: true,
	selectOtherMonths: true,
	changeMonth: true,
	changeYear: true,
	numberOfMonths: 1,
	dateFormat: 'yy/mm/dd',
	timeFormat: "HH:mm",
	buttonImage: 'https://tw.hicdn.beanfun.com/beanfun/GamaWWW/Anydoor/modernised/assets/img/calendar.png',
	buttonImageOnly: true,
	showOn: 'both'
};
var dateTimePickerSettings = {
	showButtonPanel: true,
	closeText: 'Close',
	showOtherMonths: true,
	selectOtherMonths: true,
	changeMonth: true,
	changeYear: true,
	numberOfMonths: 1,
	dateFormat: 'yy/mm/dd',
	timeFormat: "HH:mm",
	buttonImage: 'https://tw.hicdn.beanfun.com/beanfun/GamaWWW/Anydoor/modernised/assets/img/calendar.png',
	buttonImageOnly: true,
	showOn: 'both'
};
$('.datepicker').datepicker(datePickerSettings);
$('.datetimepicker').datetimepicker(dateTimePickerSettings);

// 清除空的node //////////////////////////////////////////////////////////////////////////////////////////////////
function clean(node){
	for(var n = 0; n < node.childNodes.length; n ++){
		var child = node.childNodes[n];
		if(child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))){
			node.removeChild(child);
			n --;
		}else if(child.nodeType === 1){
			clean(child);
		}
	}
}
clean(document.body);

// DOM更新時要做的事 //////////////////////////////////////////////////////////////////////////////////////////////////
const observer = new MutationObserver(function(mutations){
	$('.datepicker').each(function(){
		if(!$(this).is('.hasDatepicker')){
			$(this).datepicker(datePickerSettings);
		}
	});
	$('.datetimepicker').each(function(){
		if(!$(this).is('.hasDatepicker')){
			$(this).datepicker(dateTimePickerSettings);
		}
	});
	clean(document.body);
});
observer.observe(document.querySelector('body'), {
	attributes: true, 
	childList: true, 
	characterData: true
});






// IE7專用未來要淘汰的：//////////////////////////////////////////////////////////////////////////////////////////////////

// ie7box //
var ie7box = {};
ie7box.open = function(arg){
	$('.ie7box').remove();
	$('html').addClass('overflowHidden');
	if(!arg){
		alert('參數為必填');
		return;
	}else{
		var titleText = arg.titleText || '';
		var contentHTML = arg.contentHTML || '參數「contentHTML」為必填';
		var showCloseBtn = arg.showCloseBtn || false;
		var modalClose = arg.modalClose || false;
		var escClose = arg.escClose || false;
		var addClass = arg.addClass || '';
		var callbackOpened = arg.callbackOpened || null;
		this.callbackClosed = arg.callbackClosed || null;
		var actionBtns = arg.actionBtns || [{text:'確 認',id:'i7bConfirm',callback:function(){ie7box.close();}}];
	}
	if(callbackOpened){
		setTimeout(function(){
			callbackOpened();
		});
	}
	var titleBarHTML = '';
	if(titleText){
		titleBarHTML = '<div class="i7b-title">'+titleText+'</div>';
	}
	var closeBtnHTML = '';
	if(showCloseBtn == true){
		closeBtnHTML = '<div class="i7b-close"></div>';
	}
	if(modalClose == true){
		setTimeout(function(){
			$(document).one('click', function(event){
				var $target = $(event.target);
				if(!$target.closest('.i7b-wrap').length && $('.i7b-wrap').is(":visible")){
					ie7box.close();
					modalClose = false;
				}
			});
		});
	}
	var actionBtnsHTML = '';
	if(arg.actionBtns){
		for(var i = 0; i < actionBtns.length; i++){
			var $text = actionBtns[i].text ? actionBtns[i].text : '未定義';
			var $id = actionBtns[i].id ? ' id="'+actionBtns[i].id+'"' : '';
			var $btnClass = actionBtns[i].btnClass ? ' class="btn '+actionBtns[i].btnClass+'"' : ' class="btn"';
			var $callback = actionBtns[i].callback ? ' onclick="('+actionBtns[i].callback+')()"' : '';
			var $gotoURL = actionBtns[i].gotoURL ? ' href="'+actionBtns[i].gotoURL+'"' : '';
			actionBtnsHTML += '<a'+$id+$btnClass+$callback+$gotoURL+'>'+$text+'</a>';
		}
	}else{
		actionBtnsHTML = '<a class="btn" id="'+actionBtns[0].id+'" onclick="('+actionBtns[0].callback+')()">'+actionBtns[0].text+'</a>';
	}
	var i7bHTML = '\
		<div class="ie7box '+addClass+'" id="ie7box">\
			<div class="i7b-wrap-before"></div>\
			<div class="i7b-wrap">\
				'+closeBtnHTML+'\
				'+titleBarHTML+'\
				<div class="i7b-content">'+contentHTML+'</div>\
				<div class="i7b-action">'+actionBtnsHTML+'</div>\
			</div>\
		</div>\
	';
	$(document).on('click', '.i7b-close', function(){
		ie7box.close();
	});
	$(document).on('keydown', function(e){
		if(e.which == 27 && escClose){
			ie7box.close();
		}
	});

	$('body').append(i7bHTML);
	clean(document.body);
	$('.i7b-wrap').css({width:$('.i7b-wrap').width()});
}
ie7box.close = function(){
	$('html').removeClass('overflowHidden');
	$('.ie7box').remove();
	setTimeout(function(){
		try{ie7box.callbackClosed();
		}catch(e){};
	});
	$(document).click();
}

// 裝飾IE7的checkbox、radio樣式 //
function updateCheckStatus(){
	if(isIE7){
		$('input[type="checkbox"]').each(function(){
			var _this = $(this);
			if(!_this.parent().is('.checkWrap')){
				_this.wrap('<span class="checkWrap"></span>');
			}
			if(_this.is(':checked')){
				_this.parent().addClass('chekced');
			}else{
				_this.parent().removeClass('chekced');
			}
		});
		$('input[type="radio"]').each(function(){
			var _this = $(this);
			if(!_this.parent().is('.radioWrap')){
				_this.wrap('<span class="radioWrap"></span>');
			}
			if(_this.is(':checked')){
				_this.parent().addClass('chekced');
			}else{
				_this.parent().removeClass('chekced');
			}
		});
	}
}
function updateCheckUI(){
	updateCheckStatus();
	$('input[type="checkbox"], input[type="radio"]').change(function(){
		updateCheckStatus();
	});
}

// 讓IE7有placeholder //
function doPlaceholder(){
	if(isIE7){
		$('[placeholder]').focus(function(){
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
		}).blur(function(){
			var input = $(this);
			if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			}
		}).blur();
	}
}