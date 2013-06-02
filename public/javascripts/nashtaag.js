$(function(){
    $("#menu li").each(function(){
        if($(this).children("a").attr("href") == window.location.pathname)
            $(this).addClass("active");
        else
            $(this).removeClass("active");
    });
});