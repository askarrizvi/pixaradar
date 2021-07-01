const apiKey = "4cf2360";
var containerEl = document.querySelector(".container");

function getMovie() {
    //var validMovie = false;
    var genreArray = [];

    var randNum = Math.floor((Math.random() * 846565)) + 1;
    console.log(randNum);

    var apiUrl = "https://api.themoviedb.org/3/movie/" + randNum + "?api_key=917cef113b241cde7141b1d0182ae920";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                for (i = 0; i<data.genres.length; i++){
                    genreArray.push(data.genres[i].name);
                }
                console.log(genreArray);
                if (data.adult == true) {
                    console.log("Adult movie");
                    getMovie();
                }
                else if(genreArray.includes("Drama")){
                    console.log(data);
                }
                else {
                    getMovie();
                }
            });
        } else {
            getMovie();
        }
    });
}

getMovie();