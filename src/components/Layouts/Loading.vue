<template>
  <div>
    <div class="min-h-screen flex flex-col justify-around">
      <div class="text-center">
        <font-awesome-icon
          :icon="['fad', 'spinner-third']"
          class="text-5xl text-white"
          spin
        ></font-awesome-icon>
      </div>
    </div>
    <div class="hidden">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style scoped></style>
