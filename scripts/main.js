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
		var currHeight = $dashboard.height();
		var autoHeight = $dashboard.css('height', 'auto').height();
		$dashboard.height(currHeight).animate({height: autoHeight, position: 'absolute', top: 0, left: 0}, 100, 'linear');

		$logoContainer.animate({width: '20vh'}, 100, 'linear');
		/*$dashboard.animate({position: 'absolute', height: 'auto','max-width': '700px', top: 0,left: 0}, 200, 'linear');*/
		//$logo.animate({width:'25%', height: '25%'}, 200, 'linear');
		$storiesGrid.empty()/*.animate({height: '75%'})*/;

		var apiLink = "https://aptimes.com/svc/topstories/v2/";
		
		$.ajax({
			url: apiLink += $selectedTopic + '.json' + '?' + $.param({'api-key': '4bd2bd098b3449068be47890b4f42e24'}),
			method: 'GET' 
		}).done(function(data){
			var storiesGridItem = '';
			var storiesFetched = 0;

			$.each(data.results, function(i, val){


				if (storiesFetched < 12 && val.multimedia.length !== 0) {
					storiesGridItem = '';

					storiesGridItem += ' <li class="story" style="background-image: url(\'' + val.multimedia[4].url + '\');"> ';
					storiesGridItem += ' <a href="' + val.url + '"class="story-image-link" > ';
					storiesGridItem += ' <p class="story-abstract"> ' + val.abstract + ' </p> </a> ' + ' </li> ';
					$storiesGrid.append(storiesGridItem);
					storiesFetched++;

				}

			});
		}).fail(function(){
			$storiesGrid.animate({width: '50vw', height: '25vh'});
			$storiesGrid.append('<div class="error-message"><p>Something went wrong. Please try again later</p></div>');
		});

	});
});