<template>
  <div>
    <location-image-wrapper alt="Standort der Metzgerei" url="img/location.butcher.jpg"></location-image-wrapper>

    <h2 class="pl-8 text-xl my-2">&bdquo;Fleisch ist mein Gemüse&rdquo;</h2>
    <div class="pb-8 pl-8 pr-4">
      <p class="leading-loose font-light text-lg">
        Unser geschultes Personal verarbeitet nur hochwertigstes Rohfleisch zu Fleischwaren aller Art, die hauptsächlich in unseren eigenen Restaurants verwendet werden. Bei der Herstellung achten wir strengstens auf unsere selbstauferlegten, hohen Hygienestandards, denn nur das beste Fleisch wird am Ende auch in unseren leckeren Gerichten verarbeitet. Garantiert.
      </p>
      <p class="leading-loose font-light text-lg pt-4">
        Steig auf deinen Drahtesel und überzeuge dich noch heute von unseren köstlichen Gerichten. Bis bald!
      </p>
    </div>

    <div class="py-4 px-8 flex flex-wrap md:flex-no-wrap text-gray-400 text-lg justify-around">
      <p>
        <font-awesome-icon class="text-white" :icon="['fad', 'home']"></font-awesome-icon>
        179 Little Seoul Mile,
        SA9001,
        Los Santos
      </p>
      <p class="font-serif">
        <font-awesome-icon class="text-white" :icon="['fad', 'phone']"></font-awesome-icon>
        1822-44200081
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Butcher",
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