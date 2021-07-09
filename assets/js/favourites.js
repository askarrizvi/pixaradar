const apiKey = "917cef113b241cde7141b1d0182ae920";

function populateFavs() {
    var favArr = JSON.parse(localStorage.getItem("favourites"));
    if (favArr) {
        for (i = 0; i < favArr.length; i++) {
            getMovieDetails(favArr[i]);
        }
    }
}

function displayMovie(movObj) {
    var favLink = $('<a>')
    var favRow = $('<span>');
    var favText = $('<div>');
    var delCon = $('<div>');
    delCon.addClass('delete-container m-auto');
    delCon.append('<button id="delete" class="py-2 px-2 bg-black hover:bg-gray-700 border-gray-500 text-blue-50 hover:text-white rounded-md block">Delete</button>');
    favLink.attr('href', 'https://www.imdb.com/title/' + movObj.imdb);
    favLink.addClass('flex p-5 mb-2');
    favText.addClass('ml-10 mt-20 text-2xl');
    favRow.addClass('flex m-3 h-auto align-middle border-2 border-black');
    favRow.attr('id', movObj.id);
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
                    id: id,
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

function clearStorage() {
    localStorage.clear()
    $('.favourites').empty();
}

populateFavs();

//clearBtn.addEventListener('click', clearStorage);
$(".fav-container").on('click', '#clear', clearStorage);
$(".fav-container").on('click', '#delete', function () {
    var thisId = $(this).parent().parent().attr('id');
    $(this).parent().parent().remove();
    var favArr = JSON.parse(localStorage.getItem("favourites"));
    var updatedFav = [];
    for (i=0; i<favArr.length; i++){
        if (favArr[i] !== parseInt(thisId)){
            updatedFav.push(favArr[i]);
        }
    }
    localStorage.setItem("favourites", JSON.stringify(updatedFav));
});
