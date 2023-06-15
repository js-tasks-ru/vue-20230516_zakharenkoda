/**
 * Модуль - заглушка для тестирования гарда авторизации
 */

let isLoggedIn = false;

/**
 * Авторизован ли текущий пользователь
 * @return {boolean}
 */
export function isAuthenticated() {
  return isLoggedIn;
}

export function login() {
  isLoggedIn = true;
}

export function logout() {
  isLoggedIn = false;
}
