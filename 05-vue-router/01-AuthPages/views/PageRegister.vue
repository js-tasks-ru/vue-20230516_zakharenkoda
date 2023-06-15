<template>
  <div class="page-auth">
    <UiContainer>
      <h2 class="title page-auth__title">Регистрация</h2>
      <form class="form" @submit.prevent="handleSubmit">
        <UiFormGroup label="Email">
          <div class="input-group">
            <input name="email" type="email" class="form-control" />
          </div>
        </UiFormGroup>
        <UiFormGroup label="Имя">
          <div class="input-group">
            <input name="fullname" type="text" class="form-control" />
          </div>
        </UiFormGroup>
        <UiFormGroup label="Пароль">
          <div class="input-group">
            <input name="password" type="password" class="form-control" />
          </div>
        </UiFormGroup>
        <UiFormGroup label="Повтор пароля">
          <div class="input-group">
            <input type="password" class="form-control" />
          </div>
        </UiFormGroup>
        <UiFormGroup>
          <label class="checkbox">
            <input type="checkbox" class="checkbox__input" />
            <span class="checkbox__box"></span>
            Я согласен с условиями
          </label>
        </UiFormGroup>
        <div class="form__buttons">
          <button type="submit" class="button button_primary">Зарегистрироваться</button>
        </div>
        <div class="form__append">Уже есть аккаунт? <a href="/login" class="link">Войдите</a></div>
      </form>
    </UiContainer>
  </div>
</template>

<script>
import UiFormGroup from '../components/UiFormGroup.vue';
import UiContainer from '../components/UiContainer.vue';

export default {
  name: 'PageRegister',

  components: {
    UiFormGroup,
    UiContainer,
  },

  methods: {
    handleSubmit() {
      // Требуется обработать сабмит формы
    },
  },
};
</script>

<style></style>
