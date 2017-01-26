$(function(){

	var $target = $('#target');
	var $storiesGrid = $('.stories-grid');
	var $dashboard = $('.dashboard');
	var $logoContainer = $('.times-logo-container');
	var $logo = $( '.times-logo' );

	$target.change(function() {
		var $section = $( "select option:selected" ).val();

		$logoContainer.animate({height: '25vh'}, 200, 'linear');
		$dashboard.animate({position: 'absolute', height: 'auto','max-width': '700px', top: 0,left: 0}, 200, 'linear');
		//$logo.animate({width:'25%', height: '25%'}, 200, 'linear');
		$storiesGrid.empty().animate({height: '75vh', display: 'block'});
		});
});