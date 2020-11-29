<template>
  <vue-load-image class="border-b-8 border-brand mb-6">
    <div
      slot="preloader"
      style="height: 400px;"
      class="w-full bg-gray-900 bg-opacity-50 flex flex-col text-center justify-around"
    >
      <font-awesome-icon
        class="mx-auto text-4xl text-gray-400"
        :icon="['fad', 'spinner-third']"
        spin
      ></font-awesome-icon>
    </div>
    <div
      slot="error"
      style="height: 400px;"
      class="w-full bg-gray-900 bg-opacity-50 flex flex-col text-center justify-around"
    >
      <font-awesome-icon
        class="mx-auto text-4xl text-gray-400"
        :icon="['fad', 'empty-set']"
      ></font-awesome-icon>
    </div>
    <img
      slot="image"
      style="height: 400px;"
      class="w-full object-cover rounded-tr-none md:rounded-tr-lg"
      :src="`${publicPath}${url}`"
      :alt="alt"
    />
  </vue-load-image>
</template>

<script>
export default {
  name: "LocationImageWrapper",
  props: {
    url: {
      required: true,
      type: String
    },
    alt: {
      required: true,
      type: String
    }
  },
  components: {
    VueLoadImage: () =>
      import(/* webpackChunkName: "modules/vue-load-image" */ "vue-load-image")
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }
};
</script>

<style scoped></style>
