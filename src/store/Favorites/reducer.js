// Initializam state-ul cu un array gol
export const initialState = {
    news: [],
  };

  export function favoritesReducer(state, action) {
    switch (action.type) {
      case "ADD_TO_FAVORITES": {
        // Caut sa vad daca stirea este deja daugata la fav
        const isInList = state.news.find((singleNews) => {
          return singleNews.id === action.payload.id;
        });
        // Daca gasesc stirea in lista, returnez state ul asa cum este
        if (isInList) {
          return state;
        } else {
          // Daca produsul nu este in state, il adaugam la inceputul liste de produse.
          const newState = {
            news: [action.payload, ...state.news],
          };
          return newState;
        }
      }
      case "REMOVE_FROM_FAVORITES": {
        // Filtram produsele din state, elimnandu-l pe cel care are id-ul venit din payload.
        const filteredNews = state.news.filter((singleNews) => {
          return singleNews.id !== action.payload;
        });
        const newState = {
          news: filteredNews,
        };
        return newState;
      }
      // Nu uitam sa returnam state-ul pe cazul default.
      default: {
        return state;
      }
    }
  }