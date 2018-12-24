jQuery(document).ready(function($) {

	$('.menu li').click(function() {
		$('.menu li').removeClass('active');
		$(this).addClass('active');
	});

	

	$("#myCalendar-1").ionCalendar({
		onReady: false,
	    lang: "ru",                     // язык календаря
	    sundayFirst: false,             // первый день недели
	    years: "2018-2050",                    // диапазон лет
	    format: "DD.MM.YYYY",           // формат возвращаемой даты
	    onClick: function(data){        // клик по дням вернет сюда дату
	    	getDaySchedule(data);
	    	$('#tab td input').click(function(){
	    		$(this).parent().parent().parent().toggleClass('select');
	    		var text = $(this).prev().text();
	    		if(text == 'выбрать'){
	    			$(this).prev().text('выбрано');
	    		}else{
	    			$(this).prev().text('выбрать');
	    		}
	    	});
	    }  
	});

	$("#myCalendar-2").ionCalendar({
		type: 'repetition',
		onReady: false,
	    lang: "ru",                     // язык календаря
	    sundayFirst: false,             // первый день недели
	    years: "2018-2050",                    // диапазон лет
	    format: "DD.MM.YYYY",           // формат возвращаемой даты
	    onClick: function(data){        // клик по дням вернет сюда дату
	    	getDaySchedule(data);
	    	$('#tab td input').click(function(){
	    		$(this).parent().parent().parent().toggleClass('select');
	    		var text = $(this).prev().text();
	    		if(text == 'выбрать'){
	    			$(this).prev().text('выбрано');
	    		}else{
	    			$(this).prev().text('выбрать');
	    		}
	    	});
	    }  
	});




	$('.ic__header').append('<div class="ic__title"><span class="month"></span><span class="year"></span></div>');

	$('.back, .next').click(function(event){
		event.preventDefault();
		var year = $('.ic__year select').text();
		var month = $('.ic__month option:selected').text();
		$('.ic__header:before').css({
			'content': year+ ' '+ month
		})
	});

	function getDaySchedule(data){
		$('.ic__day .tab').remove();
		var title = data[0];
		var el = data[1];
		var pos = data[2];
		var table = getTable(title, pos);
		$('#tab .unavailable').parent().attr('colspan','2');
	}

	function getTable(d, pos){

		// test data
		data = [
		{
			'id': 1,
			'time': '9:00 - 10:00',
			'price': '100$',
			'status': 'доступно'

		},
		{
			'id': 2,
			'time': '10:00 - 11:00',
			'price': '100',
			'status': 'доступно'
			
		},
		{
			'id': 3,
			'time': '11:00 - 12:00',
			'price': '100',
			'status': 'недоступно'
			
		},
		{
			'id': 4,
			'time': '12:00 - 13:00',
			'price': '100',
			'status': 'доступно'
		},
		{
			'id': 5,
			'time': '13:00 - 14:00',
			'price': '100',
			'status': 'занято'
		},
		{
			'id': 6,
			'time': '14:00 - 15:00',
			'price': '100',
			'status': 'доступно'
		},
		{
			'id': 7,
			'time': '15:00 - 16:00',
			'price': '100',
			'status': 'доступно'
		},
		{
			'id': 8,
			'time': '16:00 - 17:00',
			'price': '100',
			'status': 'доступно'
		},
		{
			'id': 9,
			'time': '17:00 - 18:00',
			'price': '100',
			'status': 'доступно'
		},
		{
			'id': 8,
			'time': '18:00 - 19:00',
			'price': '100',
			'status': 'доступно'
		},
		
		];

		if ($('#solo').is(':checked')) {
			 // = 'недоступно';
			 for (var i=7; i < data.length; i++){
			 	data[i].status = 'недоступно';
			 }
		}

		$('#tab').DataTable({
			paging: false,
			ordering: false,
			responsive: false,
			searching:false,
			destroy: true,
			autoWidth: false,
			info: false,
			order: [[1, 'desc']],
			data: data,

			rowId: "id",

			columnDefs: [
			{
				targets: 0,
				data: {time:'time',status: 'status'},
				render: function (data, type, full, meta) {
					if (data.status == 'недоступно') {
						return `<span class="unavailable-time time ">`+data.time+`</span>`;
					}else if(data.status == 'занято'){
						return `<span class="unavailable-time time red-color">`+data.time+`</span>`;
					}
					else {
						return `<span class=" time main-color">`+data.time+`</span>`;
					}
				},
			},
			{
				targets: 1,
				data: {price:'price',status:'status'},
				render: function (data, type, full, meta) {
					if (data.status == 'недоступно') {
						return `<span class="unavailable">`+ data.status+`</span>`;
					}else if(data.status == 'занято') {
						return `<span class="unavailable red-color">`+ data.status+`</span>`;
					}else {
						return `<span class="price main-color">`+ data.price+` &#8372;</span>`;
					}
				},
			},
			{
				targets: 2,
				data: 'status',
				render: function (data, type, full, meta) {
					if (data == 'недоступно' || data == 'занято') {
						data = "";
					}
					return data
				},
			},
			{
				targets: 3,
				data: {buy: 'buy' ,status:'status', id: 'id'},
				render: function (data, type, full, meta) {
					if (data.status !== 'недоступно' && data.status !== 'занято') {
						return `<label href="#" ><span class="main-color text-input">выбрать</span> <input type="checkbox" name="data-time" id="choose-`+data.id+`"></label>`
					}else {
						return ''
					}
				},
			}
			]
		});
		var table = $('#component');

		table.find('header').text(d);

		if ($(document).width() > 768) {
				table.css(pos);
			}else {
				table.css($('.ic__days').offset());
			}

			$('#component').removeClass('hide');

			if(!$('*').is('.tab-bg')){
				$('body').append('<div class="tab-bg" onClick="hideBg($(this));"></div>');
			}


		// var table = $('#component');
		// table.find('header').text(d);
		// return table[0];
	}
	

});



function hideBg(el){
	$('#component').addClass('hide');
	$(el).remove();
}