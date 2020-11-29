<template>
  <div class="mt-8 md:mt-20">
    <h3
      class="text-white text-3xl font-brand-hotel -mb-1 pl-4 text-brand-hotel"
    >
      Verpflegung <span class="font-brand text-brand">by GioV</span>
    </h3>

    <div class="bg-gray-950 bg-opacity-80 py-4 px-8 rounded-lg">
      <div class="flex flex-wrap mt-4">
        <div class="w-full md:w-1/3 text-center md:text-left">
          <router-link
            :to="{
              name: 'hotel.mealplan.forWeek',
              params: { week: 'last-week' }
            }"
            href="#"
            class="block text-white text-xl font-brand-hotel border-b-4 border-gray-900 hover:border-brand-hotel hover:text-brand-hotel py-3 px-4"
            active-class="border-brand-hotel text-brand-hotel"
            >Vergangene Woche</router-link
          >
        </div>
        <div class="w-full md:w-1/3 text-center">
          <router-link
            :to="{
              name: 'hotel.mealplan.forWeek',
              params: { week: 'this-week' }
            }"
            href="#"
            class="block text-white text-xl font-brand-hotel border-b-4 border-gray-900 hover:border-brand-hotel hover:text-brand-hotel py-3 px-4"
            active-class="border-brand-hotel text-brand-hotel"
            >Diese Woche</router-link
          >
        </div>
        <div class="w-full md:w-1/3 text-center md:text-right">
          <router-link
            :to="{
              name: 'hotel.mealplan.forWeek',
              params: { week: 'next-week' }
            }"
            href="#"
            class="block text-white text-xl font-brand-hotel border-b-4 border-gray-900 hover:border-brand-hotel hover:text-brand-hotel py-3 px-4"
            active-class="border-brand-hotel text-brand-hotel"
            >Nächste Woche</router-link
          >
        </div>
      </div>
      <h2
        class="text-white text-xs md:text-base py-4 text-center text-gray-500"
      >
        Die Abholung ist aus logistischen Gründen täglich nur zwischen
        <strong class="text-brand-hotel">19 und 22 Uhr</strong> möglich.
        <br />Es kann leider kein Ersatz geliefert werden, falls du die Abholung
        nicht rechtzeitig bewerkstelligen kannst. <br />Solltest du erst nach
        <strong class="text-brand-hotel">18 Uhr</strong> eingezogen sein,
        erhältest du deine erste Verpflegung
        <strong class="text-brand-hotel">am Folgetag</strong>. <br />Bei Auszug
        aus unserem Hotel erlischt dein Anrecht auf die Verpflegung sofort
        ersatzlos. <br />Die Ausgabe erfolgt ausschließlich am
        <router-link
          :to="{ name: 'location.giov' }"
          class="text-brand font-brand text-sm md:text-lg hover:underline"
          active-class=""
          >GioV Restaurant</router-link
        >.
      </h2>
    </div>

    <transition name="fade-in-left" mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("layout/changeLayout", "hotel");
  }
};
</script>

<style scoped></style>
