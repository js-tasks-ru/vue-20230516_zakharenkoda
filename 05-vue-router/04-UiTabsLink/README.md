# UiTabsLink

👶🏻 _Несложная задача_\
💼 _Часть проекта_

<!--start_statement-->

Вкладки на странице митапов реализуются двумя компонентами: `UiTabs` и `UiTabsLink`.

`UiTabs` - компонент контейнер для вкладок с двумя слотами:

- `#tabs` - слот переключателя вкладок
- `#default` - слот содержимого

`UiTabsLink` - компонент одной вкладки, который требуется реализовать:

- Компонент рендерит ссылку `RouterLink` в стиле кнопки переключателя вкладки
- Единственный входной параметр `to` - параметр для `RouterLink`
- Слот по умолчанию компонента передаёт содержимое в `RouterLink`
- Ссылка должна быть выделена классом `tabs__tab_active`, если является ссылкой на текущую страницу

В [документации компонента `RouterLink`](https://router.vuejs.org/api/interfaces/RouterLinkProps.html) можно найти
инструмент, значительно упрощающий решение задачи.

<img src="https://i.imgur.com/iuZf3mT.png" alt="Example" style="max-width: 100%" />
<!--end_statement-->

---

### Инструкция

📝 Для решения задачи отредактируйте файл: `components/UiTabsLink.vue`.

🚀 Команда запуска для ручного тестирования: `npm run serve`;\
приложение будет доступно на [http://localhost:8080/05-vue-router/04-UiTabsLink/](http://localhost:8080/05-vue-router/04-UiTabsLink/).

✅ Доступно автоматическое тестирование: `npm test UiTabsLink`.
