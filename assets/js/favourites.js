function populateFavs(){
    var favArr = JSON.parse(localStorage.getItem("favourites"));
    for(i=0; i<favArr.length; i++){
        var favText = $('<div>');
        favText.text(favArr[i]);
        $('.favourites').append(favText);
    }
}

populateFavs();