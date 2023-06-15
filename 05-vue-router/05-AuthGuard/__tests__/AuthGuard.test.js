import { mount } from '@vue/test-utils';
const { router } = require(global.getSolutionPath('router/index.js'));
const { login, logout } = require(global.getSolutionPath('services/authService.js'));
const App = require(global.getSolutionPath('App')).default;

describe('vue-router/AuthGuard', () => {
  let wrapper;

  beforeEach(async () => {
    await router.push('/');
    wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
  });

  it('Роутер должен разрешать открывать главную страницу / гостю', async () => {
    logout();
    await router.push('/');
    expect(router.currentRoute.value.path).toBe('/');
  });

  it('Роутер должен разрешать открывать главную страницу / авторизованному пользователю', async () => {
    login();
    await router.push('/');
    expect(router.currentRoute.value.path).toBe('/');
  });

  it('Роутер должен разрешать открывать страницу авторизации /login гостю', async () => {
    logout();
    await router.push('/login');
    expect(router.currentRoute.value.path).toBe('/login');
  });

  it('Роутер должен перенаправлять авторизованного пользователя со страницы авторизации /login на главную страницу /', async () => {
    login();
    await router.push('/login');
    expect(router.currentRoute.value.path).toBe('/');
  });

  it('Роутер должен разрешать открывать страницу создания митапа /meetups/create авторизованному пользователю', async () => {
    login();
    await router.push('/meetups/create');
    expect(router.currentRoute.value.path).toBe('/meetups/create');
  });

  it('Роутер должен перенаправлять гостя со страницы создания митапа /meetups/create на страницу авторизации /login с query параметром from', async () => {
    logout();
    await router.push('/meetups/create');
    expect(router.currentRoute.value.path).toBe('/login');
    expect(router.currentRoute.value.query.from).toBe('/meetups/create');
  });

  it('Роутер должен перенаправлять гостя со страницы редактирования митапа /meetups/1/edit на страницу авторизации /login с query параметром from', async () => {
    logout();
    await router.push('/meetups/1/edit');
    expect(router.currentRoute.value.path).toBe('/login');
    expect(router.currentRoute.value.query.from).toBe('/meetups/1/edit');
  });
});
