$(function(){

	$('.animation-slider').hide();

	var $target = $('#target');
	var $storiesGrid = $('.stories-grid');
	var $dashboard = $('.dashboard');
	var $logoContainer = $('.times-logo-container');
	var $logo = $( '.times-logo' );
	var $selectedTopic = '';

	$target.change(function() {
		$selectedTopic = $( 'select option:selected' ).val();
		var apiLink = 'https://api.nytimes.com/svc/topstories/v2/';

//Shrink dashboard and move it to top of page (and append loading spinner gif)
		
		$dashboard.addClass('dash-to-top');
		$('.animation-slider').show();
		$logoContainer.addClass('resize-logo');
		$storiesGrid.empty().append('<img class="loading-gif" src="../images/ajax-loader.gif" alt="loading"/>');

//Make ajax request to get stories

		$.ajax({
			url: apiLink += $selectedTopic + '.json' + '?' + $.param({'api-key': '4bd2bd098b3449068be47890b4f42e24'}),
			method: 'GET' 
		}).done(function(data){
			var storiesGridItem = '';
		/*	var storiesFetched = 0;*/

			$storiesGrid.empty();

//Filter stories array (data.results) to get first 12 stories with images

			var filteredStoriesArray = data.results.filter(function(story){
				return story.multimedia.length !== 0;
			}).slice('0', '12');

			$('.animation-slider').animate({height: '0px'}, 900, 'linear');

			$.each(filteredStoriesArray, function(i, val){

					storiesGridItem = '';

					storiesGridItem += '<li class="story" style="background-image: url(\'' + val.multimedia[4].url + '\');">';
					storiesGridItem += '<a href="' + val.url + '">';
					storiesGridItem += '<p class="story-abstract">' + val.abstract + '</p> </a>' + '</li>';
					$storiesGrid.append(storiesGridItem);
				/*	storiesFetched++;*/
			});
		}).fail(function(){

//Delete loading gif and append div with error message if ajax request fails

			$storiesGrid.empty().append('<div class="error-message"><p>Something went wrong. Please try again later</p></div>');
		});
	});
});