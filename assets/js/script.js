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
                    console.log("GA: "+genreArray);
                    console.log(foundMovie);
                    if (data.adult == true) {
                        console.log("Adult movie");
                        getMovie();
                    } 
                        for (i = 0; i < userGenre.length; i++) {
                            console.log("UGi: "+userGenre[i]);
                            if (genreArray.includes(userGenre[i])&&(!foundMovie)) {
                                console.log(data);
                                foundMovie = true;
                                var poster = data.poster_path;
                                console.log(poster);
                                //$(".loading-text").hide();
                                $(".modal-content").append('<img id="theImg" src="https://image.tmdb.org/t/p/original/'+poster+'" />');
                                break;
                            }
                        }
                        if (!foundMovie){
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
    console.log("UG: "+userGenre);
    //debugger
    getMovie();
});

