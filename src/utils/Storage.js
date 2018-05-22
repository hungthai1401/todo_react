export default class {
  static save(key, value) {
    return localStorage.setItem(key, value);
  }

  static get(key) {
    return localStorage.getItem(key);
  }

  static destroy() {
    return localStorage.clear()
  }
}