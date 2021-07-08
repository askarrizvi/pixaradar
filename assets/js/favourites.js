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
    var delCon = $('<div>');
    delCon.addClass('delete-container mt-20')
    delCon.append('<button id="clear" class="py-2 px-2 bg-red-400 hover:bg-red-300 border-gray-500 text-blue-50 hover:text-white rounded-md block">Delete</button>')
    favLink.attr('href', 'https://www.imdb.com/title/' + movObj.imdb);
    favLink.addClass('flex p-10 mb-2')
    favText.addClass('ml-10 mt-20 text-2xl')
    favRow.addClass('grid grid-rows-1 border-2 border-black')
    var movieImg = '<img class="md:object-scale-down h-48" id="theImg" src="https://image.tmdb.org/t/p/original/' + movObj.poster + '" />';
    favText.text(movObj.title);
    favRow.append(favText);
    favLink.append(movieImg);
    favLink.append(favText);
    favRow.append(favLink);
    favRow.append(delCon);
    $('.favourites').append(favRow);
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
