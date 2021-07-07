const apiKey = "917cef113b241cde7141b1d0182ae920";
const clearBtn = document.getElementById('clear');

function populateFavs() {
    var favArr = JSON.parse(localStorage.getItem("favourites"));
    for (i = 0; i < favArr.length; i++) {
        getMovieDetails(favArr[i]);
    }
}

function displayMovie(movObj) {
    var favLink = $('<a>')
    var favRow = $('<span>');
    var favText = $('<div>');
    favLink.attr('href', 'https://www.imdb.com/title/' + movObj.imdb);
    favLink.addClass('p-10 mb-2 border-2 border-black')
    favText.addClass('ml-10')
    favRow.addClass('flex')
    var movieImg = '<img class="md:object-scale-down h-48" id="theImg" src="https://image.tmdb.org/t/p/original/' + movObj.poster + '" />';
    favText.text(movObj.title);
    favRow.append(movieImg);
    favRow.append(favText);
    favLink.append(favRow);
    $('.favourites').append(favLink);
}

async function getMovieDetails(id) {
    var movObj;
    var apiUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apiKey;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                //console.log(data);
                var movieTitle = data.title;
                var imdbId = data.imdb_id;
                var posterUrl = data.poster_path;
                movObj = {
                    title: movieTitle,
                    imdb: imdbId,
                    poster: posterUrl
                };
                displayMovie(movObj);
            });
        }
        else {
            alert("Something went wrong");
        }
    });
}

function clearStorage(){
    //console.log("clk");
    localStorage.clear()
    $('.favourites').empty();
}

populateFavs();

clearBtn.addEventListener('click', clearStorage);