<template>
  <div class="w-full pt-16 md:pt-32">
    <div
      class="md:ml-16 inline-block bg-gray-950 py-4 px-8 rounded-lg bg-opacity-80"
    >
      <h2 class="text-5xl text-white font-brand-hotel text-center lg:text-left">
        Das erste &bdquo;<strong class="text-brand-hotel">All-Inclusive</strong
        >&rdquo; Hotel der Insel
      </h2>
      <h3
        class="text-5xl text-white font-brand-hotel text-center lg:text-left md:ml-8"
      >
        für nur <strong class="text-brand-hotel">$30</strong> pro Stunde
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotelHome",

  created() {
    this.$store.dispatch("layout/changeLayout", "hotel");
  }
};
</script>

<style scoped></style>
