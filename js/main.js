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
		var table = getTable(title);
		el.append(table);
		$('#tab .unavailable').parent().attr('colspan','2');

	}

	function getTable(d){
		data = [
		{
			'id': 1,
			'time': '9:00 - 10:00',
			'price': '100$',
			'status': 'доступно'

		},
		{
			'id': 2,
			'time': '9:00 - 10:00',
			'price': '100$',
			'status': 'доступно'
			
		},
		{
			'id': 3,
			'time': '9:00 - 10:00',
			'price': '',
			'status': 'недоступно'
			
		},
		{
			'id': 4,
			'time': '9:00 - 10:00',
			'price': '100$',
			'status': 'доступно'
		},
		
	];
	
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
					return `<span class="unavailable-time time main-color">`+data.time+`</span>`;
				}else {
					return `<span class=" time">`+data.time+`</span>`;
				}
			},
		},
		{
			targets: 1,
			data: {price:'price',status:'status'},
			render: function (data, type, full, meta) {
				
				if (data.status !== 'недоступно') {
					return `<span class="price main-color">`+ data.price+` &#8372;</span>`;
				}else {
					return `<span class="unavailable">`+ data.status+`</span>`;
				}
			},
		},
		{
			targets: 2,
			data: 'status',
			render: function (data, type, full, meta) {
				if (data == 'недоступно') {
					data = "";
				}
				return data
			},
		},
		{
			targets: 3,
			data: {buy: 'buy' ,status:'status', id: 'id'},
			render: function (data, type, full, meta) {
				if (data.status !== 'недоступно') {
					return `<label href="#" class="main-color">добавить <input type="checkbox" name="choose-`+data.id+`" id="choose"></label>`
				}else {
					return ''
				}
			},
		}
		]
	});
		var table = $('#component');
		table.find('header').text(d);
		return table[0];
	}

	
	
});

