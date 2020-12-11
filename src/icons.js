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
  faPlay
} from "@fortawesome/pro-duotone-svg-icons";
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
  faUtensils
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

export default library;
