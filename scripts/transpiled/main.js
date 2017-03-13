'use strict';

$(function () {

	$('.animation-slider').hide();
	var $animationSlider = $('.animation-slider');

	var $target = $('#target');
	var $storiesGrid = $('.stories-grid');
	var $dashboard = $('.dashboard');
	var $logoContainer = $('.times-logo-container');
	var $selectedTopic = '';

	$target.change(function () {
		$selectedTopic = $('select option:selected').val();
		var apiLink = 'https://api.nytimes.com/svc/topstories/v2/';

		//Make sure selected topic is valid

		if ($selectedTopic !== 'sections') {

			//Shrink dashboard and move it to top of page (and append loading spinner gif)

			$dashboard.addClass('dash-to-top');
			$animationSlider.show();
			$logoContainer.addClass('resize-logo');
			$storiesGrid.empty().append('<img class="loading-gif" src="../images/ajax-loader.gif"/>');

			//Make ajax request to get stories

			$.ajax({
				url: apiLink += $selectedTopic + '.json' + '?' + $.param({ 'api-key': '4bd2bd098b3449068be47890b4f42e24' }),
				method: 'GET'
			}).done(function (data) {
				var storiesGridItem = '';

				$storiesGrid.empty();

				//Filter stories array (data.results) to get first 12 stories with images

				// let filteredStoriesArray = data.results.filter(function(story){
				// 	return story.multimedia.length !== 0;
				// }).slice('0', '12');

				var filteredStoriesArray = void 0;

				filteredStoriesArray = data.results.filter(function (story) {
					return story.multimedia.length !== 0;
				}).slice('0', '12');

				if (filteredStoriesArray.length < 12) {
					filteredStoriesArray = data.results.filter(function (story) {
						return story.multimedia.length !== 0;
					}).slice('0', '8');
				}

				$animationSlider.animate({ height: '0px' }, 400, 'swing');

				$.each(filteredStoriesArray, function (i, val) {

					storiesGridItem = '';

					storiesGridItem += '<li class="story" style="background-image: url(\'' + val.multimedia[4].url + '\');">';
					storiesGridItem += '<a href="' + val.url + '">';
					storiesGridItem += '<p class="story-abstract">' + val.abstract + '</p> </a>' + '</li>';
					$storiesGrid.append(storiesGridItem);
				});
			}).fail(function () {

				$animationSlider.animate({ height: '0px' }, 400, 'swing');

				//Delete loading gif and append div with error message if ajax request fails

				$storiesGrid.empty().append('<div class="error-message"><p>Something went wrong. Please try again later</p></div>');
			});
		} else {
			return false;
		}
	});
});