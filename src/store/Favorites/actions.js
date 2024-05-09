// Actiunea pentru adaugarea la favorite:
export function addToFavorites(news) {
    return {
      type: "ADD_TO_FAVORITES",
      payload: news,
    };
  }
  
  // Actiunea pentru stergerea de la favorite.
  export function removeFromFavorites(newsId) {
    return {
      type: "REMOVE_FROM_FAVORITES",
      payload: newsId,
    };
  }