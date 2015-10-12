/**
 * Created by wpguo on 10/12/2015.
 */

$(function() {
    function addEasing( easing ) {
        var box = $( "<span>" )
            .addClass( "box" )
            .attr("data-type", easing)
            .data( "easing", easing );
        var label = $( "<span>" )
            .addClass( "label" )
            .text( easing );
        $( "<div>")
            .append( box )
            .append( label )
            .appendTo( tracks );
    }

    var addForm = $( "#add-easing" ),
        addSelect = addForm.find( "select" ),
        tracks = $( "#tracks" ),
        startButton = $( "#start-race" );

    $.each( $.easing, function( name ) {
        $( "<option>" ).text( name ).appendTo( addSelect );
    });
    addSelect.change(function() {
        addEasing( this.value );
    });

    addForm.submit(function( event ) {
        event.preventDefault();
        addEasing( addSelect.val() );
    });

    tracks.on( "click", "div", function() {
        $( this ).remove();
    });

    startButton.click(function() {
        tracks.find( "span.box" ).each(function() {
            var car = $( this );
            car
                .stop( true, true )
                .css({
                    left: "5px"
                })
                .animate({
                    left: tracks.width() - car.width() - 50
                }, 2500, car.attr("data-type") )
                .delay( 300 )
                .animate({
                    left: "5px"
                }, 2500, car.attr("data-type") );
        });
    });
});