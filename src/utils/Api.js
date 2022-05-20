import { API_URL, ACCESS_KEY } from "../utils/constants";

class API {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  _makeRequest(promise) {
    return promise
      .then((res) => {
        if (res.ok) {
          const answ = res.json();
          return answ;
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((obj) => {
        return obj;
      });
  }

  getUser() {
    return this.get(this._url + "users/me");
  }

  getCards() {
    return this.get(this._url + "cards");
  }

  get(url) {
    const promise = fetch(url, {
      method: "GET",
      headers: this._headers,
    });

    return this._makeRequest(promise);
  }

  patchAvatar(body) {
    return this.patch(this._url + "users/me/avatar", body);
  }

  patchProfile(body) {
    return this.patch(this._url + "users/me", body);
  }

  patch(url, body) {
    const promise = fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(body),
    });

    return this._makeRequest(promise);
  }

  postCard(body) {
    const url = this._url + "cards";
    const promise = fetch(url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(body),
    });

    return this._makeRequest(promise);
  }

  deleteCard(id) {
    const url = this._url + "cards/" + id;
    const promise = fetch(url, {
      method: "DELETE",
      headers: this._headers,
    });

    return this._makeRequest(promise);
  }

  like(id) {
    const url = this._url + "cards/" + id + "/likes";
    const promise = fetch(url, {
      method: "PUT",
      headers: this._headers,
    });

    return this._makeRequest(promise);
  }

  dislike(id) {
    const url = this._url + "/cards/" + id + "/likes";
    const promise = fetch(url, {
      method: "DELETE",
      headers: this._headers,
    });

    return this._makeRequest(promise);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.dislike(id);
    } else {
      return this.like(id);
    }
  }
}

const api = new API(API_URL, {
  Accept: "Application/json",
  "Content-Type": "Application/json",
  authorization: ACCESS_KEY,
});

export default api;