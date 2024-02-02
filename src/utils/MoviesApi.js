class MoviesApi {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _checkResponse (res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  getAllMovies () {
    return fetch(this._baseUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }

}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  // baseUrl: 'http://localhost:4000',
  // headers: {
  //   authorization: '8fe60504-aa52-4743-868a-71782c18b288',
  //   'Content-Type': 'application/json'
  // }
});

export default moviesApi;
