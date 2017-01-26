$(function(){

	var $target = $('#target');
	var $storiesGrid = $('.stories-grid');
	var $dashboard = $('.dashboard');
	var $logoContainer = $('.times-logo-container');
	var $logo = $( '.times-logo' );

	$target.change(function() {
		var $selectedTopic = $( 'select option:selected' ).val();

//Shrink dashboard and move it to top of page

		$logoContainer.animate({height: '25vh'}, 200, 'linear');
		$dashboard.animate({position: 'absolute', height: 'auto','max-width': '700px', top: 0,left: 0}, 200, 'linear');
		//$logo.animate({width:'25%', height: '25%'}, 200, 'linear');
		$storiesGrid.empty().animate({height: '75vh', display: 'block'});

//Build the url for the AJAX request
		var url = "https://api.nytimes.com/svc/topstories/v2/";
		var storiesArray = [];
		var response = {};

		var requestStories = function (i){
			$.ajax({
				url: url += $selectedTopic + '.json' + '?' + $.param({'api-key': '4bd2bd098b3449068be47890b4f42e24',}),
				method: 'GET' 
			}).done(function(data){
				response = $.extend(true, response, data);
			});
		};
		requestStories();
		console.log(response);

		for (var i=0; i<=12; i++) {
			/*var thisStory = response.results[i];*/
			$.each(response.results[i], function(){
				
			});
		}
	});
});