/*
Favourites script file that will populate the favourites page when
the user clicks on it. The favourite movie IDs are loaded from localstorage.
*/
//Declare the api key constant
const apiKey = "917cef113b241cde7141b1d0182ae920";

//Get the favourite movie IDs from localstorage and call
//getMovieDetais function to start populating the page with each
//movie
function populateFavs() {
    var favArr = JSON.parse(localStorage.getItem("favourites"));
    if (favArr) {
        for (i = 0; i < favArr.length; i++) {
            getMovieDetails(favArr[i]);
        }
    }
}

//Change the page based on the movie object, display the movie poster and 
//title, as well as a delete button.
//Make the poster and movie title a link to the IMDB page
//Append the favourite span with the movie ID
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

//Get the movie details based on the movie ID
//Use the movie ID to fetch a response from the tmdb API
//Store all of the relevant information in an object called movObj
//And use that object to populate the page by calling displayMovie()
async function getMovieDetails(id) {
    var movObj;
    var apiUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apiKey;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
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

//Clear the local storage(if the clear button is pressed)
function clearStorage() {
    localStorage.clear()
    $('.favourites').empty();
}

//Populate the favourites page when the page loads
populateFavs();

//If the clear button is pressed, call clearStorage
$(".fav-container").on('click', '#clear', clearStorage);

//If the delete button is pressed, get the id of the movie
//from the parent of the delete button and remove that id 
//from the favourite array and push the updated array into local storage
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
