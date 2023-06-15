import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { createMemoryHistory, createRouter, RouterLink } from 'vue-router';
const UiTabsLink = require(global.getSolutionPath('components/UiTabsLink.vue')).default;

const App = defineComponent({
  components: { UiTabsLink },
  template: `<div>
    <UiTabsLink ref="linkA" to="/a">Page A</UiTabsLink>
    <UiTabsLink ref="linkB" :to="{ name: 'b' }">Page B</UiTabsLink>
  </div>`,
});

describe('vue-router/UiTabsLink', () => {
  let router;

  beforeEach(async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/',
          name: 'index',
          component: defineComponent({ template: `<div>Index</div>` }),
        },
        {
          path: '/a',
          name: 'a',
          component: defineComponent({ template: `<div>A</div>` }),
        },
        {
          path: '/b',
          name: 'b',
          component: defineComponent({ template: `<div>B</div>` }),
        },
      ],
    });
  });

  it('UiTabsLink должен рендерить RouterLink', () => {
    const wrapper = mount(UiTabsLink, {
      props: {
        to: '/',
      },
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.findComponent(RouterLink).exists()).toBeTruthy();
  });

  it('UiTabsLink должен рендерить RouterLink с параметром to типа String', async () => {
    const to = { name: 'a' };
    const wrapper = mount(UiTabsLink, {
      props: {
        to,
        aba: 'AAAAA',
      },
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.getComponent(RouterLink).props('to')).toEqual(to);
  });

  it('UiTabsLink должен рендерить RouterLink с параметром to типа Object', async () => {
    const to = '/a';
    const wrapper = mount(UiTabsLink, {
      props: {
        to,
      },
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.getComponent(RouterLink).props('to')).toEqual(to);
  });

  it('UiTabsLink должен рендерить RouterLink со своим содержимым', async () => {
    const DEFAULT_SLOT = '<span>TEST</span>';
    const wrapper = mount(UiTabsLink, {
      props: {
        to: '/',
      },
      slots: {
        default: DEFAULT_SLOT,
      },
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.findComponent(RouterLink).html()).toContain(DEFAULT_SLOT);
  });

  it('UiTabsLink должен иметь класс tabs__tab_active, если является ссылкой на текущую страницу', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    const linkA = wrapper.getComponent({ ref: 'linkA' });
    const linkB = wrapper.getComponent({ ref: 'linkB' });
    await router.push('/a');
    expect(linkA.classes('tabs__tab_active')).toBeTruthy();
    expect(linkB.classes('tabs__tab_active')).toBeFalsy();
    await router.push('/b');
    expect(linkA.classes('tabs__tab_active')).toBeFalsy();
    expect(linkB.classes('tabs__tab_active')).toBeTruthy();
  });
});
