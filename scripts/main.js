$(function(){

	var $target = $('#target');
	var $contentContainer = $('.content');
	var $dashboard = $('.dashboard');

	$target.change(function() {
		$dashboard.animate({
			position: 'absolute',
			height: '20vh',
			top: 0,
			left: 0
		}, 1000, 'linear', function(){
			return false;
		});
	});
});