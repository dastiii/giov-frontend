<template>
  <div class="mt-8 md:mt-20">
    <div class="flex flex-wrap md:flex-no-wrap justify-between items-end">
      <h3 class="text-white text-3xl font-brand -mb-1 pl-4">Speisekarte</h3>
      <div class="w-full md:w-auto flex items-stretch">
        <div
        class="py-4 bg-brand bg-opacity-75 px-4 rounded-none md:rounded-tl"
        >
          <font-awesome-icon
            class="text-white text-lg"
            :icon="['fal', 'search']"
          ></font-awesome-icon>
        </div>
        <input
          class="flex-1 w-64 border-gray-900 md:flex-auto focus:ring-0 focus:border-brand outline-none bg-gray-900 bg-opacity-75 rounded-none md:rounded-tr py-2 px-4 text-gray-100"
          v-model="filter"
          type="text"
          placeholder="Suchen..."
        />
      </div>
    </div>

    <div
      class="flex flex-wrap lg:flex-no-wrap w-full bg-gray-950 bg-opacity-80 rounded-none md:rounded-lg md:rounded-tr-none"
    >
      <div class="w-full lg:w-8/12 p-4">
        <p class="text-lg text-gray-100 py-4 px-4 font-sans leading-loose">
          Unten findest du alle Getränke und Speisen, die wir sowohl täglich, als auch auf Bestellung, frisch für dich
          zubereiten. <strong>Du benötigst große Mengen und willst sparen?</strong> Gerne bieten wir dir bei unseren
          Bestsellern <strong>attraktive Staffelpreise</strong> an. Kontaktiere uns einfach per Telefon oder schicke uns
          deine Bestellung einfach direkt per SMS - wir melden uns schnellstmöglich bei dir um eine Lieferung zu
          vereinbaren.
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
            class="text-red-500 text-3xl"
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
              class="p-3 pr-2 pt-2 pb-0 text-right text-gray-100 font-medium border-t-4 border-brand border-double"
            >
              in bar zu entrichten:
              <span
                class="font-mono"
                v-text="$formatCurrency.format(totalCartAmount / 100)"
              ></span>
            </div>

            <div
              class="p-3 pr-2 pt-0 text-right text-gray-500"
              v-text="`Gewicht: ${totalCartWeight}kg`"
            ></div>
          </div>

          <div class="mt-4">
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

          <div class="mt-8">
            <h3 class="font-brand text-2xl text-white font-medium">
              Bestellung per SMS
            </h3>
            <div class="text-gray-300 p-4 font-sans">
              <p>Tätige deine Bestellung ganz bequem in 3 Schritten per SMS:</p>
              <ol class="list-decimal mt-3 pl-8 space-y-1">
                <li>Wähle Gerichte und Getränke in deiner gewünschten Menge aus.</li>
                <li>
                  <a v-clipboard="() => orderText" class="text-brand font-bold cursor-pointer hover:text-brand hover:underline">Klicke hier</a>, um deine Auswahl zu kopieren.
                </li>
                <li>Schicke uns deine Bestellung unter Angabe deines Namens per SMS an die <span class="text-brand font-bold">1822-76770759</span>.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from "@/components/Tag";
import { map, union, flatten, sumBy } from "lodash";
import MenuItem from "@/components/MenuItem";
import CartItem from "@/components/CartItem";

export default {
  components: {
    CartItem,
    MenuItem,
    Tag,
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
      filter: "",
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
        amount,
        price: meal.price,
      });
    },

    removeFromCart(meal) {
      let index = this._findIndex(meal);

      if (index < 0) {
        return;
      }

      this.cart.splice(index, 1);
    },

    updateCartAmount(meal, newAmount, calculatedPrice) {
      let index = this._findIndex(meal);

      if (index < 0) {
        return;
      }

      if (newAmount === 0) {
        this.cart.splice(index, 1);

        return;
      }

      this.cart.splice(index, 1, { meal, amount: newAmount, price: calculatedPrice });
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

    orderText() {
      let text = "Meine Bestellung\n---------------------------------------------------------------------------------------------\n";
      this.cart.forEach(cartItem => {
        text += `${cartItem.amount}x ${cartItem.meal.product.name} à ${this.$formatCurrency.format(cartItem.price / 100)} (${this.$formatCurrency.format(cartItem.price * cartItem.amount / 100)})\n`;
      });
      text += `---------------------------------------------------------------------------------------------\n`
      text += "Gesamtpreis: "
          + this.$formatCurrency.format(this.totalCartAmount / 100)
          + "\n";
      text += `---------------------------------------------------------------------------------------------\n`

      return text;
    },

    meals() {
      let items = this.items;

      if (this.filter !== "") {
        items = items.filter(item => {
          return item.product.name.match(new RegExp(this.filter, "i"));
        });
      }

      if (this.activeTags.length > 0) {
        items = items.filter(item => {
          return this.activeTags.every(tag => item.product.tags.includes(tag));
        });
      }

      return items;
    },

    totalCartAmount() {
      return sumBy(this.cart, cartItem => cartItem.amount * cartItem.price);
    },

    totalCartWeight() {
      return this.$formatWeight.format(
          sumBy(this.cart, cartItem => cartItem.amount * cartItem.meal.product.weight)
      );
    },

    availableTags() {
      return union(flatten(map(this.items, "product.tags")));
    }
  }
};
</script>

<style lang="scss">
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
