<template>
  <div>
    <location-image-wrapper alt="Standort der Packerei" url="img/location.packaging.jpg"></location-image-wrapper>

    <h2 class="pl-8 text-xl my-2">Unser Frischeversprechen</h2>
    <div class="pb-8 pl-8 pr-4">
      <p class="leading-loose font-light text-lg">
        In unserer Packerei verpacken wir deine landwirtschaftlichen Rohprodukte, um ihre Frische und Haltbarkeit für die Weiterverarbeitung zu unseren köstlichen Gerichten zu garantieren. Bei der Verpackung setzen wir, sofern möglich, auf Verpackungen aus nachwachsenden Rohstoffen oder setzen bei vielen Produkten auf ihre natürlich Verpackung - ihre Schale.
      </p>
      <p class="leading-loose font-light text-lg pt-4">
        Überzeuge dich von unserer Qualität und besuche uns in einem unserer Restaurants, wir freuen uns auf dich!
      </p>
    </div>

    <div class="py-4 px-8 flex flex-wrap md:flex-no-wrap text-gray-400 text-lg justify-around">
      <p>
        <font-awesome-icon class="text-white" :icon="['fad', 'home']"></font-awesome-icon>
        44 Carson Ave.,
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
    name: "Packaging",
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