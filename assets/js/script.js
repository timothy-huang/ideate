
var notes = 0;

$(document).ready(function() {

    $(".circle").click(function() {
        $(".circle").removeClass("selected");
        $(this).addClass("selected");
    });

    $("#create-button").click(function() {
        addNote();
    });

    var zoom = 1.0;

    $('.zoom-out').click(function() {
        if (zoom > 0.25) {
            zoom = zoom / 2;
        }
        $(".whiteboard-container").animate({ 'zoom': zoom}, 400); //animation speed 400=0.4s !
    });

    $('.zoom-in').click(function() {
        if (zoom < 2) {
            zoom = zoom * 2;
        }
        $(".whiteboard-container").animate({ 'zoom': zoom}, 400); //animation speed 400=0.4s !
    });
});

function drag_start(event) {
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData("text/plain",
    (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ','
    + (parseInt(style.getPropertyValue("top"),10) - event.clientY) + ',' + event.target.id);
}

function drag_over(event) {
    event.preventDefault();
    return false;
}

function drop(event) {
    if (event.target.className == "whiteboard-container") {
        var offset = event.dataTransfer.getData("text/plain").split(',');
        $("#" + offset[2]).css({position: 'absolute'});
        event.target.appendChild(document.getElementById(offset[2]));
        var dm = document.getElementById(offset[2]);
        dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
        dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
        event.preventDefault();
        notes -= 1;
    }
    return false;
}

function clickPress(event) {
    if (event.keyCode == 13) {
        addNote();
    }
}

function addNote() {
    if ($(".circle").hasClass("selected")) {
        notes += 1;

        var color = $(".selected").css("background-color");
        var userNote = $("#note-text").val();
        $("#note-text").val("");

        var noteId = "note" + notes;
        $(".notes-container").append("<div id='" + noteId + "' "
            + "draggable='true' ondragstart='drag_start(event)' class='note' style='padding: 10px; background:"
            + color + "'> " + userNote + " </div>");

        var dm = document.getElementById(noteId);
        dm.addEventListener('dragstart', drag_start , false);
        $("whiteboard-container").addEventListener('dragover' , drag_over, false);
        $("whiteboard-container").addEventListener('drop', drop, false);
    }
}
