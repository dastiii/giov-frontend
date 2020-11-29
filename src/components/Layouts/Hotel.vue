<template>
  <div class="page-background min-h-screen flex flex-col">
    <visible when-hidden="#site-header">
      <header
        class="bg-opacity-75 bg-gray-950 hidden lg:block z-20 shadow-md fixed top-0 left-0 w-full"
      >
        <div class="container mx-auto py-1">
          <div class="flex flex-col lg:flex-row">
            <h1 class="text-brand-hotel font-brand-hotel text-4xl">
              THE VICEROY
              <span class="hidden sm:inline text-xl text-white"
                >Hotels & Resorts</span
              >
            </h1>

            <nav
              class="flex-1 text-white flex items-center justify-end font-brand-hotel text-xl"
            >
              <router-link
                :to="{ name: 'hotel.home' }"
                class="px-2 py-1 hover:bg-brand-hotel hover:text-black"
                active-class="bg-brand-hotel text-black"
                exact
                >Home</router-link
              >
              <router-link
                :to="{ name: 'hotel.benefits' }"
                class="ml-4 px-2 py-1 hover:bg-brand-hotel hover:text-black font-brand-hotel"
                active-class="bg-brand-hotel text-black"
                >Deine&nbsp;Vorteile</router-link
              >
              <router-link
                :to="{ name: 'hotel.mealplan', params: { week: 'this-week' } }"
                class="ml-4 px-2 py-1 hover:bg-brand-hotel hover:text-black font-brand-hotel"
                active-class="bg-brand-hotel text-black"
                >Verpflegung</router-link
              >
              <router-link
                :to="{ name: 'home' }"
                class="ml-4 pl-2 pr-3 py-1 hover:bg-brand hover:text-white font-brand"
                exact
                >zum&nbsp;Restaurant</router-link
              >
            </nav>
          </div>
        </div>
      </header>
    </visible>

    <div
      v-if="hasRoomsAvailable && isVisible"
      class="w-full bg-brand-hotel py-2 px-2"
    >
      <div class="container mx-auto">
        <div class="flex flex-wrap sm:flex-nowrap justify-between text-center">
          <span
            class="w-full sm:w-auto font-brand-hotel text-lg text-center sm:text-left"
            >Gute Nachrichten: Wir haben noch freie Zimmer!</span
          >
          <a
            class="w-full sm:w-auto text-center sm:text-left"
            href="#"
            @click.prevent="$store.dispatch('rooms/close')"
            >Schließen</a
          >
        </div>
      </div>
    </div>

    <div
      v-if="hasRoomsAvailable === false && isVisible && !hasError"
      class="w-full bg-red-600 text-white py-2 px-2"
    >
      <div class="container mx-auto">
        <div class="flex flex-wrap sm:flex-nowrap justify-between text-center">
          <span
            class="w-full sm:w-auto font-brand-hotel text-lg text-center sm:text-left"
            >Aktuell sind wir leider ausgebucht. Schau doch einfach regelmäßig
            vorbei.</span
          >
          <a
            class="w-full sm:w-auto text-center sm:text-left"
            href="#"
            @click.prevent="$store.dispatch('rooms/close')"
            >Schließen</a
          >
        </div>
      </div>
    </div>

    <header :class="{ 'bg-gray-950 bg-opacity-80': isNavOpen }">
      <div class="pt-4">
        <div class="container mx-auto flex flex-wrap px-4 lg:px-0">
          <h1
            class="text-4xl font-brand-hotel text-brand-hotel flex-grow lg:flex-shrink"
          >
            THE VICEROY
            <span class="hidden sm:inline text-xl text-white"
              >Hotels & Resorts</span
            >
          </h1>

          <div class="block lg:hidden self-center">
            <button
              @click.prevent="$store.dispatch('layout/toggle')"
              class="flex items-center px-3 py-2 border rounded text-brand-hotel border-brand-hotel hover:text-white hover:border-white"
            >
              <svg
                class="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>

          <nav
            :class="{ block: isNavOpen, 'hidden lg:block': !isNavOpen }"
            class="w-full flex-grow lg:flex-1 text-white flex-col lg:flex-row lg:flex lg:items-center lg:justify-end font-brand-hotel text-xl"
          >
            <router-link
              id="site-header"
              :to="{ name: 'hotel.home' }"
              class="my-2 lg:my-0 block py-2 px-3 hover:bg-brand-hotel hover:text-black"
              active-class="bg-brand-hotel text-black"
              exact
              >Home</router-link
            >
            <router-link
              :to="{ name: 'hotel.benefits' }"
              class="my-2 lg:my-0 block py-2 px-3 lg:ml-2 hover:bg-brand-hotel hover:text-black font-brand-hotel"
              active-class="bg-brand-hotel text-black"
              >Deine&nbsp;Vorteile</router-link
            >
            <router-link
              :to="{ name: 'hotel.mealplan' }"
              class="my-2 lg:my-0 block py-2 px-3 lg:ml-2 hover:bg-brand-hotel hover:text-black font-brand-hotel"
              active-class="bg-brand-hotel text-black"
              >Verpflegung</router-link
            >
            <router-link
              :to="{ name: 'home' }"
              class="my-2 lg:my-0 block py-2 pl-3 pr-4 lg:ml-2 hover:bg-brand hover:text-white font-brand"
              exact
              >zum&nbsp;Restaurant</router-link
            >
          </nav>
        </div>
      </div>
    </header>

    <main class="flex-1 container mx-auto">
      <slot></slot>
    </main>

    <footer class="w-full py-4">
      <div class="container mx-auto">
        <div
          class="pt-2 pb-2 flex flex-wrap lg:flex-no-wrap justify-between items-center"
        >
          <div
            class="my-4 md:w-1/2 lg:w-1/3 md:my-0 text-center md:text-left order-3 md:order-1 w-full lg:w-auto"
          >
            <div class="lg:pl-2">
              <h5
                class="font-brand-hotel text-brand-hotel text-2xl inline-block relative"
              >
                THE VICEROY
                <span
                  class="text-brand text-lg font-brand absolute block top-0 -mt-3 right-0"
                >
                  Teil von GioV
                </span>
              </h5>
              <h5 class="text-white font-brand-hotel text-lg inline-block">
                Hotels & Resorts
              </h5>
              <address class="leading-loose text-white text-lg">
                Palomino Ave. 1b, SA9001, Los Santos
              </address>
            </div>
          </div>
          <div
            class="md:w-full lg:w-1/3 my-4 md:mt-8 md:mb-2 lg:my-0 self-center flex flex-col w-full order-2 md:order-3 lg:order-2 lg:w-auto"
          >
            <div class="flex-1 flex justify-center">
              <img
                class="h-16"
                src="../../assets/statevVerified.png"
                alt="StateV Verified"
              />
            </div>
          </div>
          <div
            class="md:w-1/2 lg:w-1/3 self-center text-center md:text-right w-full md:w-auto order-1 md:order-2 lg:order-3 my-4 md:my-0 md:mb-0"
          >
            <div class="lg:pr-2">
              <h4 class="font-serif text-3xl text-brand-hotel -mb-2">
                1822-11140009
              </h4>
              <h4 class="font-brand-hotel text-xl text-white">
                Kein Platz zum Schlafen?
              </h4>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Hotel",
  components: {
    Visible: () =>
      import(/* webpackChunkName: "modules/visible" */ "../Visible")
  },
  created() {
    document.title = "THE VICEROY Hotels & Resorts";
  },

  mounted() {
    this.$store.dispatch("rooms/get");
  },

  computed: {
    isNavOpen() {
      return this.$store.getters["layout/isNavOpen"];
    },

    hasRoomsAvailable() {
      return this.$store.getters["rooms/hasRoomsAvailable"];
    },

    hasError() {
      return this.$store.getters["rooms/getHasError"];
    },

    isLoading() {
      return this.$store.getters["rooms/getIsLoading"];
    },

    isVisible() {
      return this.$store.getters["rooms/isVisible"];
    }
  }
};
</script>

<style scoped>
.page-background {
  background-image: url("./../../assets/hotel_background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
}
</style>
