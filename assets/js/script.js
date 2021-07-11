/*
Main script file that will be displayed when index.html loads.
This file checks the time and modifies the page content based
on current time of day. It also checks the user's response and
displays modals conatining the results when the user clicks the
randomize button. 
*/
//Initialize variables and constants
const apiKey = "917cef113b241cde7141b1d0182ae920";
const DateTime = luxon.DateTime;
var now = DateTime.now();
var containerEl = document.querySelector(".container");
var buttonEl = document.getElementById("#save-answers");
var userGenre = [];
var mood;
var foundMovie = false;
var lastMovieId;

//Check the genre boxes based on the time of day
//Use the current hour to compare and populate
//the userGenre array
function selectBoxes(){
    if (now.hour>=6&&now.hour<=11){
        $('.genretext').append("Good morning!");
        $('#action').attr('checked','checked');
        $('#adventure').attr('checked','checked');
        $('#family').attr('checked','checked');
        userGenre = ["Action","Adventure","Family"];
    }
    else if (now.hour>=12&&now.hour<=17){
        $('.genretext').append("Good afternoon!");
        $('#comedy').attr('checked','checked');
        $('#action').attr('checked','checked');
        $('#adventure').attr('checked','checked');
        $('#family').attr('checked','checked');
        $('#fantasy').attr('checked','checked');
        userGenre = ["Action","Adventure","Family","Comedy","Fantasy"];
    } 
    else if (now.hour>=18||now.hour<=5){
        $('.genretext').append("Good evening!");
        $('#action').attr('checked','checked');
        $('#adventure').attr('checked','checked');
        $('#fantasy').attr('checked','checked');
        $('#thriller').attr('checked','checked');
        $('#horror').attr('checked','checked');
        $('#romance').attr('checked','checked');
        $('#history').attr('checked','checked');
        $('#drama').attr('checked','checked');
        userGenre = ["Action","Adventure","Fantasy","Thriller","Horror","Romance","History","Drama"];
    } 
}

//Main function to get the movie results
function getMovie() {
    var genreArray = [];
    var randNum;
    var randNumApi = "https://www.random.org/integers/?num=1&min=2&max=846565&col=1&base=10&format=plain&rnd=new";

    //First call the random.org API to get a true random number
    fetch(randNumApi).then(function (randNumResponse) {
        return randNumResponse.json();
    }).then(function (randNumData) {
        //Store the random number in a variable
        randNum = randNumData;
        var apiUrl = "https://api.themoviedb.org/3/movie/" + randNum + "?api_key=" + apiKey;
        //Fetch the tmdb API using the random number as the movie ID
        return fetch(apiUrl).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    //Store the genres from the tmdb api
                    for (i = 0; i < data.genres.length; i++) {
                        genreArray.push(data.genres[i].name);
                    }
                    //If the movie is an adult movie, re-run the function to get a new movie
                    if (data.adult == true) {
                        getMovie();
                    }
                    //For each movie genre, check if that genre matches one of the user selected genres
                    //If the genres match, populate the results page and display the result modal
                    //Set foundMovie boolean to true and store the movie ID(for favouriting purposes)
                    //Make the movie title a link which will bring the user to the IMDB page of the movie
                    for (i = 0; i < userGenre.length; i++) {
                        if (genreArray.includes(userGenre[i]) && (!foundMovie)) {
                            foundMovie = true;
                            var movieTitle = data.title;
                            var imdbId = data.imdb_id;
                            var poster = data.poster_path;
                            $(".movie-link").append('<a href="https://www.imdb.com/title/' + imdbId + '">' + movieTitle + '</a>');
                            $(".poster-container").append('<img class="md:object-scale-down h-48" id="theImg" src="https://image.tmdb.org/t/p/original/' + poster + '" />');
                            modalState();
                            lastMovieId = randNum;                            
                            break;
                        }
                    }
                    //If the foundMovie boolean is false, re-run the function to get a new movie
                    if (!foundMovie) {
                        getMovie();
                    }

                });
                //If the response is not ok(movie ID is not valid), re-run the function to get a new random ID and movie
            } else {
                getMovie();
            }
        });
    });
}

//Depending on the user's mood, select a genre
function getMoodGenre(mood) {
    if (mood == 'happy') {
        return "Comedy";
    }
    else if (mood == 'ok') {
        return "Action";

    }
    else if (mood == 'mad') {
        return "Horror";
    }
    else if (mood == 'sad') {
        return "Drama";
    }
}

//Add the genre to the userGenre array if it doesn't already exist in there
function addUserGenre(genre){
    if (!userGenre.includes(genre)) {
        userGenre.push(genre);
    }
}

//If the randomize button is clicked, set foundMovie to false and get the user selected mood
//And get the movie
$("#save-answers").on('click', '#card_open', function () {
    foundMovie = false;
    mood = $('input[name=radio-group]:checked').val();
        addUserGenre(getMoodGenre(mood));
    getMovie();
});

//Add the movie result to favourites in local storage(if the user clicks the favourite button)
//Display a modal to show the user if it is saved or not
function addToFav() {
    var favArr = JSON.parse(localStorage.getItem("favourites"));
    if (!favArr) {
        favArr = [];
    }
    if (!favArr.includes(lastMovieId)) {
        favArr.unshift(lastMovieId);
        localStorage.setItem("favourites", JSON.stringify(favArr));
        alertModal("Saved!");
    }
    else {
        alertModal("Movie is already in your favourites!");
    }
}

//Modal
const card_open = document.getElementById('card_open')
const card_close = document.getElementById('card_close')
const card_panel = document.getElementById('card_panel')
const load_panel = document.getElementById('load_panel')
const fav_icon = document.getElementById('fav-icon');
const alert_panel = document.getElementById('alert_panel')
const alert_close = document.getElementById('alert-close');

function loadingModal() {
    if (load_panel.classList.contains('hidden')) {
        // Show modal
        load_panel.classList.remove('hidden')
        load_panel.classList.add('block')

        // Delete button
        card_open.classList.add('hidden')
        card_open.classList.remove('block')

        // Start animation open
        card_panel.classList.add('card_open')
    }
}

function alertModal(alertText) {
    if (alert_panel.classList.contains('hidden')) {
        $('.alert-text').empty();
        $('.alert-text').append(alertText);

        // Delete modal
        card_panel.classList.add('hidden')
        card_panel.classList.remove('block')

        // Show button
        card_open.classList.remove('hidden')
        card_open.classList.add('block')

        // Remove animation open
        card_panel.classList.remove('card_open')


        //$('')
        // Show modal
        alert_panel.classList.remove('hidden')
        alert_panel.classList.add('block')

        // Start animation open
        alert_panel.classList.add('card_open')
    }
    else {
        // Delete modal
        alert_panel.classList.add('hidden')
        alert_panel.classList.remove('block')

        // Remove animation open
        alert_panel.classList.remove('card_open')
        $(".movie-link").empty();
        $(".poster-container").empty();
    }
}


function modalState() {
    if (card_panel.classList.contains('hidden')) {
        // Show modal
        card_panel.classList.remove('hidden')
        card_panel.classList.add('block')

        // Delete button
        card_open.classList.add('hidden')
        card_open.classList.remove('block')

        // Start animation open
        card_panel.classList.add('card_open')
        //Hide Loading
        load_panel.classList.add('hidden')
        load_panel.classList.remove('block')
    } else {
        // Delete modal
        card_panel.classList.add('hidden')
        card_panel.classList.remove('block')

        // Show button
        card_open.classList.remove('hidden')
        card_open.classList.add('block')

        // Remove animation open
        card_panel.classList.remove('card_open')
        $(".movie-link").empty();
        $(".poster-container").empty();
    }
}

//Eventlisters to listen for button clicks
card_open.addEventListener('click', loadingModal);
card_close.addEventListener('click', modalState);
fav_icon.addEventListener('click', addToFav);

//Jquery eventlisteners to listen for clicks
$(".alert-container").on('click', '#alert-close', alertModal);
//If a genre checkbox is clicked, check to see if the box is checked or unchecked
//If it's checked, add the genre to the userGenre array
//If it's unchecked, remove the genre from the userGenre array
$(".form-container").on('click', '.genre-cb', function(){
    if($(this).prop("checked")){
        addUserGenre($(this).attr('value'));
    }
    else{
        var removeInd = userGenre.indexOf($(this).attr('value'));
        userGenre.splice(removeInd, 1);
    }
});

//Check the boxes based on time of day when the page loads
selectBoxes();