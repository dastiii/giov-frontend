<template>
  <div class="page-background min-h-screen flex flex-col">
    <visible when-hidden="#site-header">
      <header
        class="bg-opacity-75 bg-gray-950 hidden lg:block z-20 shadow-md fixed top-0 left-0 w-full"
      >
        <div class="container mx-auto py-1">
          <div class="flex flex-col lg:flex-row">
            <h1 class="text-brand font-brand text-4xl">
              GioV
              <span class="text-lg font-brand text-white"
                >Dein Lieblingsrestaurant.</span
              >
            </h1>

            <nav
              class="flex-1 text-white flex items-center justify-end font-brand text-xl space-x-2"
            >
              <router-link
                :to="{ name: 'home' }"
                class="pl-2 pr-3 py-1 hover:bg-brand"
                exact
                >Home</router-link
              >
              <router-link
                :to="{ name: 'about' }"
                class="pl-2 pr-3 py-1 hover:bg-brand whitespace-no-wrap"
                >Über uns</router-link
              >
              <router-link
                :to="{ name: 'menu' }"
                class="pl-2 pr-3 py-1 hover:bg-brand"
                >Preise</router-link
              >
              <router-link
                :to="{ name: 'ankauf' }"
                class="pl-2 pr-3 py-1 hover:bg-brand flex group"
                :class="{ 'pr-2': isAnkaufActive }"
              >
                <span>Ankauf</span>
                <span
                  class="text-xs self-start group-hover:text-white pl-3"
                  :class="{ 'hidden': !isAnkaufActive, 'text-white': $route.name === 'ankauf', 'text-green-500': $route.name !== 'ankauf' }"
                >
                  <font-awesome-icon
                    :icon="['fad', 'circle']"
                    class="animate__animated animate__heartBeat animate__infinite"
                  ></font-awesome-icon>
                </span>
              </router-link>
              <router-link
                :to="{ name: 'location.giov' }"
                class="pl-2 pr-3 py-1 hover:bg-brand"
                >Kontakt</router-link
              >
            </nav>
          </div>
        </div>
      </header>
    </visible>

    <header :class="{ 'bg-gray-950 bg-opacity-85': isNavOpen }">
      <div class="pt-4">
        <div class="container mx-auto flex flex-wrap px-4 lg:px-0">
          <h1 class="text-4xl font-brand text-brand flex-grow lg:flex-shrink">
            GioV
            <span class="text-xl font-brand text-white"
              >Dein Lieblingsrestaurant.</span
            >
          </h1>

          <div class="block lg:hidden self-center">
            <button
              @click.prevent="$store.dispatch('layout/toggle')"
              class="flex items-center px-3 py-2 border rounded text-brand border-brand hover:text-white hover:border-white"
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
            class="w-full flex-grow lg:flex-1 text-white flex-col lg:flex-row lg:flex lg:items-center lg:justify-end font-brand text-xl space-x-2"
          >
            <router-link
              id="site-header"
              :to="{ name: 'home' }"
              class="my-2 lg:my-0 block py-2 pl-3 pr-4 hover:bg-brand"
              exact
              >Home</router-link
            >
            <router-link
              :to="{ name: 'about' }"
              class="my-2 lg:my-0 block py-2 pl-3 pr-4 hover:bg-brand whitespace-nowrap"
              >Über uns</router-link
            >
            <router-link
              :to="{ name: 'menu' }"
              class="my-2 lg:my-0 block py-2 pl-3 pr-4 hover:bg-brand"
              >Preise</router-link
            >
            <router-link
              :to="{ name: 'ankauf' }"
              class="my-2 lg:my-0 py-2 pl-3 pr-4 hover:bg-brand flex group"
              :class="{ 'pr-2': isAnkaufActive }"
            >
              <span>Ankauf</span>
              <span
                class="text-xs pl-3 group-hover:text-white"
                :class="{ 'hidden': !isAnkaufActive, 'text-white': $route.name === 'ankauf', 'text-green-500': $route.name !== 'ankauf' }"
              >
                <font-awesome-icon
                  :icon="['fad', 'circle']"
                  class="animate__animated animate__heartBeat animate__infinite"
                ></font-awesome-icon>
              </span>
            </router-link>
            <router-link
              :to="{ name: 'location.giov' }"
              class="my-2 lg:my-0 block py-2 pl-3 pr-4 hover:bg-brand"
              >Kontakt</router-link
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
            class="my-4 md:w-1/2 lg:w-1/3 md:my-0 text-center md:text-left order-3 md:order-1 w-full"
          >
            <div class="lg:pl-2">
              <h5 class="font-brand text-brand text-3xl">
                GioV
                <span class="text-gray-100 text-xl font-brand"
                  >Dein Lieblingsrestaurant</span
                >
              </h5>
              <address class="leading-loose text-gray-100 text-lg">
                83 Bay City Ave., SA9001, Los Santos
              </address>
            </div>
          </div>
          <div
            class="md:w-full lg:w-1/3 my-4 md:mt-8 md:mb-2 lg:my-0 self-center flex flex-col w-full order-2 md:order-3 lg:order-2"
          >
            <div class="flex-1 flex justify-center">
              <img
                class="h-16"
                src="./../../assets/statevVerified.png"
                alt="StateV Verified"
              />
            </div>
          </div>
          <div
            class="md:w-1/2 lg:w-1/3 self-center text-center md:text-right w-full order-1 md:order-2 lg:order-3 my-4 md:my-0 md:mb-0"
          >
            <div class="lg:pr-2">
              <h4 class="text-3xl text-brand font-serif -mb-2">
                1822-76770759
              </h4>
              <h4 class="font-brand text-2xl text-gray-100">
                Nummer gegen Hunger
              </h4>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Visible from "@/components/Visible";

export default {
  name: "Restaurant",
  components: {
    Visible
  },

  mounted() {
    this.$store.dispatch("service/get");
  },

  computed: {
    isAnkaufActive() {
      return this.$store.getters["service/isAnkaufActive"];
    },

    isNavOpen() {
      return this.$store.getters["layout/isNavOpen"];
    }
  }
};
</script>

<style scoped></style>
