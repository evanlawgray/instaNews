$(function(){

	var $target = $('#target');
	var $storiesGrid = $('.stories-grid');
	var $dashboard = $('.dashboard');
	var $logoContainer = $('.times-logo-container');
	var $logo = $( '.times-logo' );
	var $selectedTopic = '';

	$target.change(function() {
		$selectedTopic = $( 'select option:selected' ).val();

//Shrink dashboard and move it to top of page

		$logoContainer.animate({height: '25vh'}, 200, 'linear');
		$dashboard.animate({position: 'absolute', height: 'auto','max-width': '700px', top: 0,left: 0}, 200, 'linear');
		//$logo.animate({width:'25%', height: '25%'}, 200, 'linear');
		$storiesGrid.empty().animate({height: '75vh'});

		var apiLink = "https://api.nytimes.com/svc/topstories/v2/";
		var storiesArray = [];
		var response = {};
		
		$.ajax({
			url: apiLink += $selectedTopic + '.json' + '?' + $.param({'api-key': '4bd2bd098b3449068be47890b4f42e24'}),
			method: 'GET' 
		}).done(function(data){
			var storiesGridItem = '';
			var storiesFetched = 0;
			console.log(data);

			$.each(data.results, function(i, val){

				if (storiesFetched < 12 && val.multimedia.length !== 0) {
			
					storiesGridItem = '<li class="story"> <a href="' + val.url + '"class="story-image-link">';
					storiesGridItem += '<img class="story-image" src="' + val.multimedia[0].url + '"/> </a>';
					storiesGridItem += '<p class="story-abstract">' + val.abstract + '</p></li>';
					$storiesGrid.append(storiesGridItem);
					storiesFetched++;
	
					console.log(val);
				}

			});
		}); 

	});
});