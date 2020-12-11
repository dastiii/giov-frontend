<template>
  <div>
    <location-image-wrapper
      alt="Standort des Ankauflagerhauses"
      url="img/location.warehouse-acquisition.jpg"
    ></location-image-wrapper>

    <h2 class="pl-8 text-xl my-2">Wir brauchen Nachschub.</h2>
    <div class="pb-8 pl-8 pr-4">
      <p class="leading-loose font-light text-lg">
        Du möchtest deine frische Ware bei uns verkaufen?
      </p>
      <p class="leading-loose font-light text-lg pt-4">
        Nichts einfacher als das! Kontaktiere uns einfach unter der unten
        stehenden Telefonnummer, wir kommen vorbei und kaufen dir deine Ware zu
        besten Konditionen ab. Direkt auf unserer Website unter dem Punkt
        “Ankauf” findest du all unsere aktuellen Ankaufspreise und kannst
        schauen, ob wir deine Ware auch gerade entgegennehmen können.
      </p>
      <p class="leading-loose font-light text-lg pt-4">
        Sattel dein Pferd und komm doch noch heute vorbei.
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
        8 South Rockford Drive, SA9001, Los Santos
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
import LocationImageWrapper from "@/components/Locations/Partials/LocationImageWrapper";

export default {
  name: "WarehouseAcquisition",
  components: {
    LocationImageWrapper
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
