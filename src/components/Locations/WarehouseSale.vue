<template>
  <div>
    <location-image-wrapper alt="Standort des Verkaufslagerhauses" url="img/location.warehouse-sale.jpg"></location-image-wrapper>

    <h2 class="pl-8 text-xl my-2">Gib' mir mehr!</h2>
    <div class="pb-8 pl-8 pr-4">
      <p class="leading-loose font-light text-lg">
        Unser &bdquo;Frischezentrum&rdquo; ist zentraler Umschlagsort für deine Großbestellung und liegt nur 50m entfernt von unserem Herzstück, dem GioV.
      </p>
      <p class="leading-loose font-light text-lg pt-4">
        Nach der frischen Zubereitung in unserem Restaurant, landen alle Bestellungen in unserer hochkomplexen Frischeanlage. Diese hält deine bestellten Gerichte warm und frisch und deine Getränke angenehm kühl oder heiß - niemand mag kalten Kaffee.
      </p>
      <p class="leading-loose font-light text-lg pt-4">
        Spar' dir das Kochen und bestell noch heute unser leckeres Essen direkt in deine Firma oder auf deine Party!
      </p>
    </div>

    <div class="py-4 px-8 flex flex-wrap md:flex-no-wrap text-gray-400 text-lg justify-around">
      <p>
        <font-awesome-icon class="text-white" :icon="['fad', 'home']"></font-awesome-icon>
        Magellan Ave./Sandcastle Way 2270,
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
    name: "WarehouseSale",
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