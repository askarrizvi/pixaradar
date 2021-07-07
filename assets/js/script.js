const apiKey = "4cf2360";
var containerEl = document.querySelector(".container");
var buttonEl = document.getElementById("#save-answers");
var userGenre = [];
var mood;
var foundMovie = false;

function getMovie() {
    //var validMovie = false;
    /* var loading = $('div');
     loading.addClass("loading-text");
     loading.text = "Loading";
    // $(".loading-con").append(loading);*/


    var genreArray = [];
    var randNum;

    //var randNum = Math.floor((Math.random() * 846565)) + 1;


    randNumApi = "https://www.random.org/integers/?num=1&min=2&max=846565&col=1&base=10&format=plain&rnd=new";

    fetch(randNumApi).then(function (randNumResponse) {
        return randNumResponse.json();
    }).then(function (randNumData) {
        randNum = randNumData;
        console.log(randNum);
        var apiUrl = "https://api.themoviedb.org/3/movie/" + randNum + "?api_key=917cef113b241cde7141b1d0182ae920";
        return fetch(apiUrl).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    for (i = 0; i < data.genres.length; i++) {
                        genreArray.push(data.genres[i].name);
                    }
                    console.log("GA: " + genreArray);
                    console.log(foundMovie);
                    if (data.adult == true) {
                        console.log("Adult movie");
                        getMovie();
                    }
                    for (i = 0; i < userGenre.length; i++) {
                        console.log("UGi: " + userGenre[i]);
                        if (genreArray.includes(userGenre[i]) && (!foundMovie)) {
                            console.log(data);
                            foundMovie = true;
                            var movieTitle = data.title;
                            var imdbId = data.imdb_id;
                            var poster = data.poster_path;
                            console.log(poster);
                            //$(".loading-text").hide();
                            $(".movie-link").append('<a href="https://www.imdb.com/title/' + imdbId + '">' + movieTitle + '</a>');
                            $(".poster-container").append('<img class="md:object-scale-down h-48" id="theImg" src="https://image.tmdb.org/t/p/original/' + poster + '" />');
                            modalState();
                            break;
                        }
                    }
                    if (!foundMovie) {
                        console.log("here");
                        getMovie();
                    }

                });
            } else {
                getMovie();
            }
        });
    });


}

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

$("#save-answers").on('click', '#card_open', function () {
    userGenre = [];
    foundMovie = false;
    userGenre.push($('input[name=genre]:checked').val());
    mood = $('input[name=radio-group]:checked').val();
    //userGenre.push(getMoodGenre(mood));
    if (!userGenre.includes(getMoodGenre(mood))) {
        userGenre.push(getMoodGenre(mood));
    }
    console.log("UG: " + userGenre);
    //debugger
    getMovie();
});

//Modal
const card_open = document.getElementById('card_open')
const card_close = document.getElementById('card_close')
const card_panel = document.getElementById('card_panel')
const load_panel = document.getElementById('load_panel')

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

function modalState() {
    if (card_panel.classList.contains('hidden')) {
        console.log("opening modal");
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

card_open.addEventListener('click', loadingModal);
card_close.addEventListener('click', modalState);

