

function materialize() {
    $('.modal').modal();
    $(".datepicker").datepicker({
        yearRange: 90
    });
    $("select").formSelect();
    $(".tabs").tabs({});

    $(".tooltipped").tooltip();
    $(".sidenav").sidenav();

    $('input.counter').characterCounter();

}


$(window).on("load", function () {

    console.log("YAY!!")
    materialize();
});

