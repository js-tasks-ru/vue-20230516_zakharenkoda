<template>
  <UiContainer class="sample">
    <UiFormGroup>
      <div class="input-group">
        <input class="form-control" placeholder="No label" />
      </div>
    </UiFormGroup>

    <hr />

    <UiFormGroup label="Label Text">
      <div class="input-group">
        <input class="form-control" placeholder="With label" />
      </div>
    </UiFormGroup>

    <hr />

    <div>
      <UiFormGroup inline>
        <div class="input-group">
          <input class="form-control" placeholder="Inline" />
        </div>
      </UiFormGroup>

      <UiFormGroup inline>
        <div class="input-group">
          <input class="form-control" placeholder="Inline" />
        </div>
      </UiFormGroup>
    </div>
  </UiContainer>
</template>

<script>
import UiFormGroup from './components/UiFormGroup.vue';
import UiContainer from './components/UiContainer.vue';

export default {
  name: 'App',

  components: { UiContainer, UiFormGroup },
};
</script>

<style scoped>
hr {
  margin: 1rem auto;
}
</style>
