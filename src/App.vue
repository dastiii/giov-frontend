<template>
  <restaurant>
    <transition name="fade-in-left" mode="out-in" appear>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </restaurant>
</template>

<script>
import Restaurant from "@/components/Layouts/Restaurant";

export default {
  name: "App",
  components: { Restaurant }
};
</script>

<style lang="scss">
.pulse {
  display: block;
  border-radius: 50%;
  background: theme('colors.brand');
  cursor: pointer;
  box-shadow: 0 0 0 rgba(73, 145, 81, 0.7);
  animation: pulse 2s infinite;
  font-size: 8px;
}
.pulse:hover {
  animation: none;
}

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(73, 145, 81, 0.8);
  }
  70% {
    -webkit-box-shadow: 0 0 0 10px rgba(73, 145, 81, 0.4);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(73, 145, 81, 0);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(73, 145, 81, 0.8);
    box-shadow: 0 0 0 0 rgba(73, 145, 81, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 10px rgba(73, 145, 81, 0.4);
    box-shadow: 0 0 0 10px rgba(73, 145, 81, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(73, 145, 81, 0);
    box-shadow: 0 0 0 0 rgba(73, 145, 81, 0);
  }
}
</style>
