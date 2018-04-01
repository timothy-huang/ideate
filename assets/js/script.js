$(document).ready(function() {

    var notes = 0;
    var canvas1 = document.getElementById("notes-canvas");
    var notesContainer = $(".notes-container");
    canvas1.width = notesContainer.innerWidth();
    canvas1.height = 1000;
    var c1 = canvas1.getContext('2d');

    var x = 40;
    var y = 20;
    var rectWidth = 150;
    var rectHeight = 150;

    $(".circle").click(function() {
        $(".circle").removeClass("selected");
        $(this).addClass("selected");
    });

    $("#create-button").click(function() {
        if ($(".circle").hasClass("selected")) {
            notes += 1;

            var color = $(".selected").css("background-color");
            c1.fillStyle = "" + color;
            c1.fillRect(x, y, rectWidth, rectHeight);

            var userNote = $("#note-text").val();
            $("#note-text").val("");
            var userNoteX = x + 5;
            var userNoteY = y + 20;
            c1.fillStyle = "#000000";
            c1.font = '16px sans-serif';
            wrapText(c1, userNote, userNoteX, userNoteY, 150, 18);

            if (notes % 2 == 0) {
                x = 40;
                y += 170;
            } else {
                x += 170;
            }
        }
    });

    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            c1.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
    }
});
