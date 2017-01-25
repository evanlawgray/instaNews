$(function(){

	var $target = $('#target');
	//var $contentContainer = $('.content');
	var $dashboard = $('.dashboard');
	var $logoContainer = $('.times-logo-container');

	$target.change(function() {
		$dashboard.animate({position: 'absolute', height: '15vh',top: 0,left: 0}, 200, 'linear');
		$logoContainer.animate({width:'70px'}, 200, 'linear');
		});
	/*});*/
});