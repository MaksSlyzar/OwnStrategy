const PRODUCTION = false;

window.onresize = () => {
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
}

$(function(){
    console.log('Hi')
    //$("#chat").load("../components/chat.html"); 
    $("#background").load("../components/background.html");
    $("#game").load("../components/game.html");
    $("#chat").load("../components/chat.html");
    $("#playersList").load("../components/playersList.html"); 
    $("#connectForm").load("../components/connectForm.html");
    

    $("#game").fadeOut();
    $("#chat").fadeOut();
});
