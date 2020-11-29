<template>
  <div class="mt-8 md:mt-20">
    <h3 class="text-white text-3xl font-brand -mb-1 pl-4">So findest du uns</h3>

    <div
      class="flex flex-wrap lg:flex-no-wrap bg-gray-950 bg-opacity-80 rounded-none md:rounded-lg"
    >
      <div
        class="w-full order-last lg:order-none lg:w-4/12 xl:w-3/12 py-4 bg-gray-900 bg-opacity-25 rounded-l-none md:rounded-l-lg"
      >
        <router-link
          :to="{ name: 'location.giov' }"
          class="arrow"
          active-class="active"
          :event="navEvent"
          exact
          replace
        >
          <font-awesome-icon
            class="mr-2"
            :icon="['fad', 'utensils']"
            fixed-width
          ></font-awesome-icon>
          <span>Restaurant &bdquo;GioV&rdquo;</span>
        </router-link>
        <router-link
          :to="{ name: 'location.warehouse-acquisition' }"
          class="arrow"
          active-class="active"
          :event="navEvent"
          replace
        >
          <font-awesome-icon
            class="mr-2"
            :icon="['fad', 'boxes']"
            fixed-width
          ></font-awesome-icon>
          <span>Lagerhaus &bdquo;Ankauf&rdquo;</span>
        </router-link>
        <router-link
          :to="{ name: 'location.warehouse-sale' }"
          class="arrow"
          active-class="active"
          :event="navEvent"
          replace
        >
          <font-awesome-icon
            class="mr-2"
            :icon="['fad', 'boxes']"
            fixed-width
          ></font-awesome-icon>
          <span>Lagerhaus &bdquo;Verkauf&rdquo;</span>
        </router-link>
        <router-link
          :to="{ name: 'location.butcher' }"
          class="arrow"
          active-class="active"
          :event="navEvent"
          replace
        >
          <font-awesome-icon
            class="mr-2"
            :icon="['fad', 'meat']"
            fixed-width
          ></font-awesome-icon>
          <span>Metzgerei</span>
        </router-link>
        <router-link
          :to="{ name: 'location.mill' }"
          class="arrow"
          active-class="active"
          :event="navEvent"
          replace
        >
          <font-awesome-icon
            class="mr-2"
            :icon="['fad', 'wind-turbine']"
            fixed-width
          ></font-awesome-icon>
          <span>Mühle</span>
        </router-link>
        <router-link
          :to="{ name: 'location.packaging' }"
          class="arrow"
          active-class="active"
          :event="navEvent"
          replace
        >
          <font-awesome-icon
            class="mr-2"
            :icon="['fad', 'box-open']"
            fixed-width
          ></font-awesome-icon>
          <span>Packerei</span>
        </router-link>
      </div>
      <div
        class="w-full order-first lg:order-none lg:w-8/12 xl:w-9/12 text-white"
      >
        <transition name="fade-in-left" mode="out-in" appear>
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("layout/changeLayout", "restaurant");
  },
  computed: {
    navEvent() {
      if (
        this.$screen.breakpoint === "xs" ||
        this.$screen.breakpoint === "sm" ||
        this.$screen.breakpoint === "md"
      ) {
        return "click";
      }

      return "mouseenter";
    }
  }
};
</script>

<style lang="scss" scoped>
.arrow {
  @apply relative z-10 my-2 text-left text-xl text-white font-light block w-full py-4 px-6 font-brand border-l-8 border-transparent;

  @screen lg {
    @apply cursor-default;
  }

  &:hover,
  &.active {
    @apply font-normal bg-gray-900 border-brand;
  }
}

@screen lg {
  .arrow:hover:after,
  .arrow:hover:before,
  .arrow.active:after,
  .arrow.active:before {
    content: "";
    position: absolute;
    width: 20px;
    height: 50%;
    left: 100%;
    @apply z-10;
  }
  .arrow:hover:after,
  .arrow.active:after {
    bottom: 0;
    background: linear-gradient(
      to right bottom,
      theme("colors.gray.900") 50%,
      transparent 50%
    );
  }
  .arrow:hover:before,
  .arrow.active:before {
    top: 0;
    background: linear-gradient(
      to right top,
      theme("colors.gray.900") 50%,
      transparent 50%
    );
  }
}
</style>
