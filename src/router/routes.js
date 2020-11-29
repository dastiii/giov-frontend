import store from "../store";

const Home = () =>
  import(/* webpackChunkName: "routes/home" */ "../components/Home.vue");
const AboutUs = () =>
  import(
    /* webpackChunkName: "routes/aboutus" */ "../components/AboutUs.vue"
  );
const Location = () =>
  import(
    /* webpackChunkName: "routes/contact" */ "../components/Contact.vue"
  );
const Menu = () =>
  import(/* webpackChunkName: "routes/menu" */ "../components/Preise.vue");
const Ankauf = () =>
  import(
    /* webpackChunkName: "routes/acquisition" */ "../components/Ankauf.vue"
  );
const Preisliste = () =>
  import(
    /* webpackChunkName: "routes/prices" */ "../components/Preisliste.vue"
  );
const Order = () =>
  import(/* webpackChunkName: "routes/order" */ "../components/Order.vue");
const GioV = () =>
  import(
    /* webpackChunkName: "routes/contact/giov" */ "../components/Locations/GioV.vue"
  );
const WarehouseAcquisition = () =>
  import(
    /* webpackChunkName: "routes/contact/warehouse-acquisition" */ "../components/Locations/WarehouseAcquisition.vue"
  );
const WarehouseSale = () =>
  import(
    /* webpackChunkName: "routes/contact/warehouse-sale" */ "../components/Locations/WarehouseSale.vue"
  );
const Butcher = () =>
  import(
    /* webpackChunkName: "routes/contact/butcher" */ "../components/Locations/Butcher.vue"
  );
const Packaging = () =>
  import(
    /* webpackChunkName: "routes/contact/packaging" */ "../components/Locations/Packaging.vue"
  );
const Mill = () =>
  import(
    /* webpackChunkName: "routes/contact/mill" */ "../components/Locations/Mill.vue"
  );

const HotelHome = () =>
  import(
    /* webpackChunkName: "routes/hotel/home" */ "../components/Hotel/Home.vue"
  );
const HotelBenefits = () =>
  import(
    /* webpackChunkName: "routes/hotel/benefits" */ "../components/Hotel/Benefits.vue"
  );
const HotelMealplan = () =>
  import(
    /* webpackChunkName: "routes/hotel/mealplan" */ "../components/Hotel/Mealplan.vue"
  );
const MealplanWeek = () =>
  import(
    /* webpackChunkName: "routes/hotel/mealplan" */ "../components/Hotel/Mealplan/Week.vue"
  );

export default {
  linkActiveClass: "text-white bg-brand font-medium",
  routes: [
    {
      path: "/",
      component: Home,
      name: "home",
      beforeEnter: (to, from, next) => {
        store.dispatch("service/get");

        next();
      }
    },
    {
      path: "/order/:orderno",
      component: Order,
      name: "view-order",
      beforeEnter: (to, from, next) => {
        store.dispatch("service/get");

        next();
      }
    },
    {
      path: "/about-us",
      component: AboutUs,
      name: "about",
      beforeEnter: (to, from, next) => {
        store.dispatch("service/get");

        next();
      }
    },
    {
      path: "/contact",
      component: Location,
      beforeEnter: (to, from, next) => {
        store.dispatch("service/get");

        next();
      },
      children: [
        {
          path: "warehouse-acquisition",
          name: "location.warehouse-acquisition",
          component: WarehouseAcquisition,
          meta: { doNotScrollToTop: true }
        },
        {
          path: "warehouse-sale",
          name: "location.warehouse-sale",
          component: WarehouseSale,
          meta: { doNotScrollToTop: true }
        },
        {
          path: "butcher",
          name: "location.butcher",
          component: Butcher,
          meta: { doNotScrollToTop: true }
        },
        {
          path: "packaging",
          name: "location.packaging",
          component: Packaging,
          meta: { doNotScrollToTop: true }
        },
        {
          path: "mill",
          name: "location.mill",
          component: Mill,
          meta: { doNotScrollToTop: true }
        },
        {
          path: "",
          name: "location.giov",
          component: GioV,
          meta: { doNotScrollToTop: true }
        }
      ]
    },
    {
      path: "/menu",
      component: Menu,
      name: "menu",
      beforeEnter: (to, from, next) => {
        store.dispatch("service/get");

        next();
      }
    },
    {
      path: "/what-we-buy",
      component: Ankauf,
      name: "ankauf",
      beforeEnter: (to, from, next) => {
        store.dispatch("service/get");

        next();
      }
    },
    {
      path: "/menu/prices",
      component: Preisliste,
      name: "prices"
    },
    {
      path: "/hotel",
      component: HotelHome,
      name: "hotel.home",
      beforeEnter: (to, from, next) => {
        store.dispatch("rooms/get");

        next();
      }
    },
    {
      path: "/hotel/benefits",
      component: HotelBenefits,
      name: "hotel.benefits",
      beforeEnter: (to, from, next) => {
        store.dispatch("rooms/get");

        next();
      }
    },
    {
      path: "/hotel/mealplan",
      component: HotelMealplan,
      beforeEnter: (to, from, next) => {
        store.dispatch("rooms/get");

        next();
      },
      children: [
        {
          path: "/hotel/mealplan/:week",
          name: "hotel.mealplan.forWeek",
          props: true,
          component: MealplanWeek
        },
        {
          path: "",
          name: "hotel.mealplan",
          redirect: {
            name: "hotel.mealplan.forWeek",
            params: { week: "this-week" }
          }
        }
      ]
    },
    { path: "*", redirect: { name: "home" } }
  ],
  scrollBehavior(to, from) {
    if (from.meta.doNotScrollToTop) {
      return;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 500);
    });
  }
};
