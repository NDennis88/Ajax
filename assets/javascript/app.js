var topics = ["Samurai Champloo", "Hellsing", "Dragon Ball Z", "Cowboy Bebop", "Pokemon", "Death Note", "Fullmetal Alchemist", "Attack on Titan"];

var app = $('#shows-view');
var still ='';
var animate = '';

function displayShowInfo(){
    
    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=hfNh9whIKx4fTE5OL2FkZcXuS20N3iP7&limit=10";
    
    $.ajax ({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        
        console.log(response);
        
        // Creates a div to hold the TV show //
        
        
        var i=0;
        
        var results= response.data;
        app.empty();
        
        for(i=0; i<results.length; i++) {
            var $div = $('<div>');
            var $rating = results[i].rating;
            var rating = $('<p>').text('Rating: ' + $rating);
            $div.prepend(rating);
            
            still = results[i].images.fixed_height_still.url;
            animate = results[i].images.fixed_height.url;
            // console.log("still", still)
            // console.log("animate",animate)
            
            // console.log(rating);
            
            var $img = $('<img>');
            $img.attr('data-still', still);
            $img.attr('data-animate', animate);
            $img.attr('src', still);
            $img.attr('data-type', 'still');
            
            $div.append($img);
            
            $('#shows-view').append($div);
            
            $img.on('click', function() {
                var state = $(this).attr('data-state');
                if (state === 'still') {
                    // var dataAnimate = $(this).attr('src', );
                    // console.log($(this).attr('data-animate'));
                    $(this).attr('src', $(this).attr('data-animate'));    
                    $(this).attr('data-state', 'animate');
                } else {
                    // var dataStill = $(this).attr('src', still);
                    // console.log($img.attr('data-still'));
                    $(this).attr('src', $(this).attr('data-still'));    
                    $(this).attr('data-state', 'still');
                }
            })   
        }
    });
}


function renderButtons(){
    $("#buttons-view").empty();
    
    for(var i =0; i < topics.length; i++){
        var a = $("<button>");
        a.addClass("show");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
        $('#tv-input').val('');
    }
    
}

$("#add-show").on("click", function(event) {
    app.empty();
    event.preventDefault();
    var tv = $("#tv-input").val().trim();
    topics.push(tv);
    renderButtons();
});

$(document).on("click", ".show", displayShowInfo);

renderButtons();