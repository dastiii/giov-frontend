import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUtensils,
  faBoxes,
  faSmileWink,
  faCircle,
  faInfoSquare,
  faCheckCircle,
  faSpinnerThird,
  faTimesCircle,
  faMeat,
  faPhone,
  faHome,
  faTruckLoading,
  faSearch,
  faBoxCheck,
  faFileContract,
  faHatChef,
  faBoxOpen,
  faWindTurbine,
  faPlay,
  faTags,
  faExclamationTriangle,
  faCartPlus,
  faTimes,
  faPencil,
  faSave,
  faPlus
} from "@fortawesome/pro-light-svg-icons";

import { faCircle as fadCircle } from "@fortawesome/pro-duotone-svg-icons";

import Vue from "vue";

library.add(
  faBoxes,
  faSmileWink,
  faCircle,
  faCheckCircle,
  faInfoSquare,
  faSpinnerThird,
  faTimesCircle,
  faMeat,
  faPhone,
  faHome,
  faTruckLoading,
  faSearch,
  faBoxCheck,
  faFileContract,
  faHatChef,
  faBoxOpen,
  faWindTurbine,
  faPlay,
  faUtensils,
  faTags,
  faExclamationTriangle,
  faCartPlus,
  faTimes,
  faPencil,
  faSave,
  fadCircle,
  faPlus,
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

export default library;
