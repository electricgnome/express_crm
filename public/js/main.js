var date1 = new Date();
// date1.setDate(date1.getDate()+1);

function materialize() {
    $('.modal').modal();
    $(".datepicker").datepicker({
        format: 'yyyy-mm-dd',
        yearRange: 90,
        minDate: date1
    });
    $("select").formSelect();
    $(".tabs").tabs({});

    $(".tooltipped").tooltip();
    $(".sidenav").sidenav();

    $('input.counter').characterCounter();

}


$(window).on("load", function () {

    materialize();
});

