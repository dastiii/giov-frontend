<template>
  <div>
    <location-image-wrapper alt="Standort des Restaurants GioV" url="img/location.giov.jpg"></location-image-wrapper>

    <h2 class="pl-8 text-xl my-2">Unser Herzstück</h2>
    <div class="pb-8 pl-8 pr-4">
      <p class="leading-loose font-light text-lg">
        Gelegen in der Westside, oberhalb des traumhaften Del Perro Beach, ist der Strand oder der Pier nur einen Katzensprung entfernt.
        Ein 24/7, ein Bekleidungsgeschäft sowie die örtliche Zulassungsstelle sind in der unmittelbaren Umgebung.
        Solltest du einmal ohne Bargeld vor unserer Theke stehen ist dies ebenfalls kein Problem, denn gegenüber unseres Restaurants befinden sich zwei Geldautomaten der MAZE Bank.
        Wenn du uns nicht gerade zu Fuß auf deinem abendlichen Spaziergang besuchen kommst, stehen dir Parkplätze direkt an der Haupstraße zur Verfügung.
        Wir freuen uns, dich bei deinem Lieblingsrestaurant begrüßen zu dürfen.
      </p>
    </div>

    <div class="py-4 px-8 flex flex-wrap md:flex-no-wrap text-gray-400 text-lg justify-around">
      <p>
        <font-awesome-icon class="text-white" :icon="['fad', 'home']"></font-awesome-icon>
        83 Bay City Ave.,
        SA9001,
        Los Santos
      </p>
      <p class="font-serif">
        <font-awesome-icon class="text-white" :icon="['fad', 'phone']"></font-awesome-icon>
        1822-76770759
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GioV",
    components: {
      LocationImageWrapper: () => import(/* webpackChunkName: "js/partials/location-image-wrapper" */'./Partials/LocationImageWrapper.vue'),
    },
    beforeRouteLeave(to, from, next) {
      if (this.$screen.breakpoint === 'xs' || this.$screen.breakpoint === 'sm' || this.$screen.breakpoint === 'md') {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }, 1000);
      }

      next();
    }
  }
</script>

<style scoped>

</style>