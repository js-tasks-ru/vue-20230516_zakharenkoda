<template>
  <div>
    PageLogin - только для гостей.
    <template v-if="$route.query.from">query.from === {{ $route.query.from }}</template>
  </div>
</template>

<script>
export default {
  name: 'PageLogin',
};
</script>

<style scoped></style>
