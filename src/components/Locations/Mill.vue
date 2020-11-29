<template>
  <div>
    <location-image-wrapper
      alt="Standort der Mühle"
      url="img/location.mill.jpg"
    ></location-image-wrapper>

    <h2 class="pl-8 text-xl my-2">Wer zuerst kommt, mahlt zuerst.</h2>
    <div class="pb-8 pl-8 pr-4">
      <p class="leading-loose font-light text-lg">
        Die Mühle ist das Rückgrat all’ unserer Rezepte, denn die Gewürze runden
        unsere Gerichte erst so richtig ab. Und sind wir mal ehrlich, auf
        Backwaren und einen leckeren, frischen Kaffee am Morgen, will doch auch
        niemand verzichten, oder? Unsere Mühlenprodukte machen dich fit für die
        fordernden Aufgaben deines Alltags und machen unsere Gerichte zu jener
        kulinarischen Erfahrung, die sie sind!
      </p>
      <p class="leading-loose font-light text-lg pt-4">
        Steig aus deinem Bett und hol’ dir jetzt dein Frühstück in unserem
        Restaurant.
      </p>
    </div>

    <div
      class="py-4 px-8 flex flex-wrap md:flex-no-wrap text-gray-400 text-lg justify-around"
    >
      <p>
        <font-awesome-icon
          class="text-white"
          :icon="['fad', 'home']"
        ></font-awesome-icon>
        38 Strawberry Ave., SA9001, Los Santos
      </p>
      <p class="font-serif">
        <font-awesome-icon
          class="text-white"
          :icon="['fad', 'phone']"
        ></font-awesome-icon>
        1822-76770759
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mill",
  components: {
    LocationImageWrapper: () =>
      import(
        /* webpackChunkName: "js/partials/location-image-wrapper" */ "./Partials/LocationImageWrapper.vue"
      )
  },
  beforeRouteLeave(to, from, next) {
    if (
      this.$screen.breakpoint === "xs" ||
      this.$screen.breakpoint === "sm" ||
      this.$screen.breakpoint === "md"
    ) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }, 1000);
    }

    next();
  }
};
</script>

<style scoped></style>
