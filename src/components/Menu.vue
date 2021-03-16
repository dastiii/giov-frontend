<template>
  <content-container heading="Speisekarte">
    <div
      class="flex flex-wrap lg:flex-no-wrap w-full bg-gray-950 bg-opacity-80 rounded-none md:rounded-lg"
    >
      <div class="w-full lg:w-8/12 p-4">
        <p class="text-lg text-gray-100 py-4 px-4 font-sans leading-loose">
          Unten findest du eine Auswahl an Getränken und Speisen, die wir
          täglich frisch zubereiten und für dich und deinen Hunger in unserem
          Restaurant zum Verzehr bereithalten. Du hättest gerne etwas
          <b>spezielles</b> oder benötigst <b>große Mengen</b>? Dann kontaktiere
          uns zunächst und wir besprechen die Details!
        </p>

        <div v-if="isLoading" class="w-full text-center mt-16">
          <font-awesome-icon
            class="text-gray-100 text-3xl"
            :icon="['fal', 'spinner-third']"
            spin
          ></font-awesome-icon>
          <div class="font-brand text-gray-300 text-xl mt-4">
            Lade Speisekarte...
          </div>
        </div>

        <div v-if="!isLoading && hasError" class="w-full text-center mt-16">
          <font-awesome-icon
            class=" text-red-500 text-3xl"
            :icon="['fal', 'times-circle']"
          ></font-awesome-icon>
          <div class="font-brand text-red-500 text-xl mt-4">
            Speisekarte nicht verfügbar
          </div>
        </div>

        <div class="mt-8">
          <div v-if="items.length > 0">
            <transition-group name="list">
              <menu-item
                v-for="meal in meals"
                :meal="meal"
                :key="meal.id"
                @addToCart="addToCart"
              ></menu-item>
            </transition-group>
          </div>
        </div>
      </div>
      <div
        class="w-full lg:w-4/12 p-2 lg:p-4 bg-gray-900 md:rounded-r-lg bg-opacity-50 space-y-8"
      >
        <div class="space-y-4">
          <h3 class="pl-2 md:pl-0 text-white text-2xl font-brand mb-4">
            Auswahl verfeinern
          </h3>
          <div v-if="isLoading || hasError">
            <div v-if="isLoading && !hasError" class="flex items-center pl-6 space-x-4">
              <font-awesome-icon
                class="text-gray-100 text-xl"
                :icon="['fal', 'spinner-third']"
                spin
              ></font-awesome-icon>
              <div class="font-brand text-gray-300 text-xl">
                Lade Kategorien...
              </div>
            </div>
            <div v-else class="flex items-center pl-6 space-x-4">>
              <font-awesome-icon
                class="text-red-500 text-xl"
                :icon="['fal', 'times-circle']"
                spin
              ></font-awesome-icon>
              <div class="font-brand text-red-500 text-xl">
                Fehler beim Laden
              </div>
            </div>
          </div>
          <div v-else>
            <tag
              v-for="tag in availableTags"
              :name="tag"
              :key="tag"
              @added="addTag"
              @removed="removeTag"
            ></tag>
          </div>
        </div>
        <div class="sticky top-16 pt-2">
          <h3 class="pl-2 md:pl-0 text-white text-2xl font-brand mb-4">
            Deine Auswahl
          </h3>

          <div
            v-if="cart.length <= 0"
            class="md:rounded-lg bg-gray-900 p-4 text-gray-300"
          >
            Du hast noch keine Produkte ausgewählt
          </div>

          <div v-else>
            <transition-group tag="div" name="list">
              <cart-item
                v-for="item in cart"
                :meal="item.meal"
                :amount="item.amount"
                :key="item.meal.id"
                @removeFromCart="removeFromCart"
                @updateAmount="updateCartAmount"
              ></cart-item>
            </transition-group>
          </div>

          <div v-if="cart.length > 0">
            <div
              class="p-3 pr-4 pt-2 pb-0 text-right text-gray-100 font-medium border-t-4 border-brand border-double"
            >
              in bar zu entrichten:
              <span
                class="font-mono"
                v-text="$formatCurrency.format(totalCartAmount / 100)"
              ></span>
            </div>

            <div
              class="p-3 pr-4 pt-0 text-right text-gray-500"
              v-text="`Gewicht: ${totalCartWeight}kg`"
            ></div>
          </div>
          <div class="mt-8">
            <p class="text-gray-300 p-4 font-sans">
              Damit du auch genau weißt, wie viel Bargeld du mitbringen musst,
              kannst du hier eine Vorauswahl mit deinen gewünschten Mengen
              treffen und du bekommst Preis und Gewicht sofort ausgerechnet.
            </p>
            <p
              class="text-right font-brand text-2xl p-4 pl-8 text-brand font-medium italic"
            >
              So einfach war es noch nie!
            </p>
          </div>
        </div>
      </div>
    </div>
  </content-container>
</template>

<script>
import ContentContainer from "@/components/Common/ContentContainer";
import Tag from "@/components/Tag";
import { map, union, flatten } from "lodash";
import MenuItem from "@/components/MenuItem";
import CartItem from "@/components/CartItem";

export default {
  components: {
    CartItem,
    MenuItem,
    Tag,
    ContentContainer
  },

  created() {
    this.loadItems();
  },
  props: {
    threshold: {
      type: Number,
      default: 100
    }
  },

  data() {
    return {
      items: [],
      isLoading: true,
      hasError: false,
      cart: [],
      activeTags: [],
    };
  },

  methods: {
    loadItems() {
      this.$http
        .get("menu")
        .then(res => {
          this.items = res.data;

          this.hasError = false;
          this.isLoading = false;
        })
        .catch(() => {
          this.hasError = true;
          this.isLoading = false;
        });
    },

    addToCart(meal, amount) {
      let index = this._findIndex(meal);

      if (index >= 0) {
        const newAmount = this.cart[index].amount + amount;

        this.cart.splice(index, 1, { meal, amount: newAmount });

        return;
      }

      this.cart.push({
        meal,
        amount
      });
    },

    removeFromCart(meal) {
      let index = this._findIndex(meal);

      if (index < 0) {
        return;
      }

      this.cart.splice(index, 1);
    },

    updateCartAmount(meal, newAmount) {
      let index = this._findIndex(meal);

      if (index < 0) {
        return;
      }

      if (newAmount === 0) {
        this.cart.splice(index, 1);

        return;
      }

      this.cart.splice(index, 1, { meal, amount: newAmount });
    },

    addTag(tag) {
      if (this.activeTags.includes(tag)) return;
      this.activeTags.push(tag);
    },
    removeTag(tag) {
      let index = this.activeTags.findIndex(
          activeTag => tag === activeTag
      );
      this.activeTags.splice(index, 1);
    },

    _findIndex(meal) {
      return this.cart.findIndex(
          cartItem => cartItem.meal.id === meal.id
      );
    },
  },

  computed: {
    cartEmpty() {
      return this.cart.length <= 0;
    },

    meals() {
      let items = this.items;

      if (this.activeTags.length > 0) {
        items = items.filter(item => {
          return this.activeTags.every(tag => item.product.tags.includes(tag));
        });
      }

      return items;
    },

    totalCartAmount() {
      let totalAmount = 0;

      this.cart.forEach(item => {
        if (!item.amount || item.amount <= 0) {
          return false;
        }

        totalAmount +=
          item.amount *
          (item.meal.featured ? item.meal.sale_price : item.meal.price);
      });

      return totalAmount;
    },

    totalCartWeight() {
      let totalWeight = 0;

      this.cart.forEach(item => {
        if (!item.amount || item.amount <= 0) {
          return false;
        }

        totalWeight += item.amount * item.meal.product.weight;
      });

      return this.$formatWeight.format(totalWeight);
    },

    availableTags() {
      return union(flatten(map(this.items, "product.tags")));
    }
  }
};
</script>

<style lang="scss">
/*.list-enter-active,*/
/*.list-leave-active {*/
/*  transition: all 0.3s;*/
/*}*/
/*.list-enter, .list-leave-to !* .list-leave-active below version 2.1.8 *! {*/
/*  opacity: 0;*/
/*}*/
/*.list-move {*/
/*  transition: transform 0.3s;*/
/*}*/

.list {
  &-move {
     transition: opacity .5s linear, transform .5s ease-in-out;
   }

  &-leave-active {
     transition: opacity .4s linear, transform .4s cubic-bezier(.5,0,.7,.4); //cubic-bezier(.7,0,.7,1);
     transition-delay: calc( 0.1s * (var(--total) - var(--i)) );
   }

  &-enter-active {
     transition: opacity .5s linear, transform .5s cubic-bezier(.2,.5,.1,1);
     transition-delay: calc( 0.1s * var(--i) );
   }

  &-enter,
  &-leave-to {
     opacity: 0;
   }

  &-enter { transform: translateX(-1em); }
  &-leave-to { transform: translateX(1em); }
}
</style>
