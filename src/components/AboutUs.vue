<template>
  <content-container heading="Über uns">
    <div
      class="px-4 pt-4 pb-8 bg-gray-950 bg-opacity-80 rounded-none md:rounded-lg"
    >
      <div class="w-full">
        <div class="px-4">
          <p class="text-gray-100 py-4 font-sans text-lg leading-loose">
            Der Grundstein unserer Erfolgsgeschichte wurde maßgeblich im Juli
            2019 durch Peter Flowers und Dylan Duncan gelegt. Seit der Gründung
            konnten wir immer weiter wachsen, wodurch wir mittlerweile die
            gesamte Lieferkette für unser Restaurant abbilden und dadurch
            <b>beste Preise</b> und <b>Qualität</b> garantieren können.
          </p>
          <p class="text-gray-100 py-4 font-sans text-lg leading-loose">
            Kurz gesagt: Wir, das Team von <b>GioV</b>, sind dein zuverlässiger
            Partner, wenn es um gutes Essen geht.
          </p>
          <p class="text-gray-100 py-4 font-sans text-lg leading-loose mb-12">
            Dabei reichen unsere Leistungen auch über den normalen
            Restaurantbetrieb hinaus. Du planst eine Feier, Hochzeit oder
            ähnliches? Kein Problem, bei uns bekommst du ein für deine
            Bedürfnisse abgestimmtes Angebot. Gerne bieten wir dir für dein
            Event nicht nur hervorragendes Essen und leckere Getränke, sondern
            auch ein umfangreiches Catering an.
          </p>

          <div class="w-full flex flex-wrap justify-around">
            <vue-load-image class="h-48 md:h-64">
              <img
                alt="Menschen vor dem Restaurant"
                slot="image"
                style="transform:rotate(-5deg)"
                class="mx-auto h-48 md:h-64"
                src="../assets/treffpunkt.jpg"
              />
              <div class="h-full flex flex-col justify-around" slot="preloader">
                <font-awesome-icon
                  class="text-4xl text-gray-400"
                  :icon="['fal', 'spinner-third']"
                  spin
                ></font-awesome-icon>
              </div>
              <div class="h-full flex flex-col justify-around text-gray-300 font-brand text-xl" slot="error">
                Bild nicht gefunden
              </div>
            </vue-load-image>
            <vue-load-image class="h-48 md:h-64">
              <img
                alt="Menschen vor dem Restaurant"
                slot="image"
                style="transform:rotate(10deg)"
                class="mx-auto h-48 md:h-64"
                src="../assets/treffpunkt2.jpg"
              />
              <div class="h-full flex flex-col justify-around" slot="preloader">
                <font-awesome-icon
                  class="text-4xl text-gray-400"
                  :icon="['fal', 'spinner-third']"
                  spin
                ></font-awesome-icon>
              </div>
              <div class="h-full flex flex-col justify-around text-gray-300 font-brand text-xl" slot="error">
                Bild nicht gefunden
              </div>
            </vue-load-image>
          </div>

          <p class="text-center text-brand text-2xl font-brand">
            GioV
          </p>
          <p class="text-white text-xl text-center font-brand leading-loose">
            Deine erste Wahl, wenn es um gutes Essen geht.
          </p>
          <p class="text-white text-xl text-center font-brand leading-loose">
            Dein Treffpunkt für gute Laune.
          </p>
          <p class="text-white text-xl text-center font-brand leading-loose">
            Dein Lieblingsrestaurant.
          </p>
        </div>
      </div>
    </div>
  </content-container>
</template>

<script>
import ContentContainer from "@/components/Common/ContentContainer";
import VueLoadImage from "vue-load-image";

export default {
  components: {
    VueLoadImage,
    ContentContainer
  }
};
</script>
