const Home = () =>
  import(/* webpackChunkName: "routes/home" */ "../components/Home.vue");
const AboutUs = () =>
  import(/* webpackChunkName: "routes/aboutus" */ "../components/AboutUs.vue");
const Location = () =>
  import(/* webpackChunkName: "routes/contact" */ "../components/Contact.vue");
const Menu = () =>
  import(/* webpackChunkName: "routes/menu" */ "../components/Menu.vue");
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

export default {
  linkActiveClass: "text-white bg-brand font-medium",
  routes: [
    {
      path: "/",
      component: Home,
      name: "home",
    },
    {
      path: "/order/:orderno",
      component: Order,
      name: "view-order",
    },
    {
      path: "/about-us",
      component: AboutUs,
      name: "about",
    },
    {
      path: "/contact",
      component: Location,
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
    },
    {
      path: "/what-we-buy",
      component: Ankauf,
      name: "ankauf",
    },
    {
      path: "/menu/prices",
      component: Preisliste,
      name: "prices"
    },
    { path: "*", redirect: { name: "home" } }
  ],
  scrollBehavior(to, from) {
    if (from.meta.doNotScrollToTop) {
      return;
    }

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 500);
    });
  }
};
