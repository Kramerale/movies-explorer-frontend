class MainApi {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _checkResponse (res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.resolve(res.json().then(data => Promise.reject(data)));
    };
  }

  //регистрация нового пользователя
  register (name, email, password) {
    return fetch(this._baseUrl + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
    .then(this._checkResponse);
  }

  //залогиниться
  login (email, password) {
    return fetch(this._baseUrl + '/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse);
  }

  //получить токен
  getToken (jwt) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    })
    .then(this._checkResponse);
  }

  //получить данные пользователя (GET)
  getUserInfo () {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }

  //изменить данные пользователя (PATCH)
  editUserInfo (name, email) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email})
    })
    .then(this._checkResponse);
  }

  //получить сохраненные фильмы пользователя (GET)
  getUserMovies () {
    return fetch(this._baseUrl + '/movies', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }

  //создать фильм (POST)
  createMovie (data) {
    return fetch(this._baseUrl + '/movies', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  //удалить фильм (DELETE)
  deleteUserMovie (movieId) {
    return fetch(this._baseUrl + '/movies/' + movieId, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }

}

const mainApi = new MainApi({
  baseUrl: 'https://api.kramerale.diploma.nomoredomainsmonster.ru',
  // baseUrl: 'http://localhost:3000',
  // headers: {
  //   authorization: '8fe60504-aa52-4743-868a-71782c18b288',
  //   'Content-Type': 'application/json'
  // }
});

export default mainApi;
