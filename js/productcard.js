//jQuery(document).ready(function($){
//	$('.buy').on('click', function(e){
//		e.preventDefault();
//
//		$('body').toggleClass('expanded');
//	})
//});
//
//jQuery(document).ready(function($){
//	$('.love').on('click', function(e){
//		e.preventDefault();
//
//		$('.body').toggleClass('expanded');
//	})
//})


$('document').ready(function() {
    $("#shoppingcart div.list").mCustomScrollbar({
        theme: "inset-3-dark",
        scrollButtons: {
            enable: true
        }
    });
    
    var empty = $("ul li.empty");
    
    $('.btn-add').on('click', function(e){
        e.preventDefault();
        var affection = $('#shoppingcart ul');
        var name = $(this).siblings('h3').text();
        var price = parseInt($(this).siblings('.price').text());
    })
})