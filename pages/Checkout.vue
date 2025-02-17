<script setup>
// -------States------
const auth = useAuthStore();
const cart = useCartStore();
const order = useOrderStore();
const coupon = useCouponStore();

const countryCode = ref("+880");
const number = ref("");
const deliberyCost = ref(null);
const couponData = computed(() => coupon.couponData);

// _______Actions_______

const customerNumber = computed({
  get() {
    return countryCode.value + number.value;
  },
});
const checkout = reactive({
  name: auth.user.name,
  // get phone() {
  //   return countryCode.value + number.value;
  // },
  phone: customerNumber,
  email: auth.user.email,
  line1: "",
  line2: "",
  country: "Bangladesh",
  city: "Sylhet",
  coupon: "",
  notes: "This is order note",
  payment_method: "cod",
});

const selectedCountryIdx = ref(0);
const countries = reactive([
  {
    name: "Bangladesh",
    code: "+880",
    cities: [
      "Dhaka",
      "Chittagong",
      "Sylhet",
      "Rajshahi",
      "Khulna",
      "Barishal",
      "Mymensingh",
    ],
  },
  {
    name: "Nepal",
    code: "+977",
    cities: [
      "Kathmandu",
      "Pokhara",
      "Biratnagar",
      "Birgunj",
      "Dharan",
      "Bharatpur",
      "Janakpur",
    ],
  },
  {
    name: "India",
    code: "+91",
    cities: [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Hyderabad",
      "Ahmedabad",
      "Chennai",
      "Kolkata",
    ],
  },
  {
    name: "Pakistan",
    code: "+92",
    cities: [
      "Karachi",
      "Lahore",
      "Faisalabad",
      "Rawalpindi",
      "Multan",
      "Gujranwala",
      "Islamabad",
    ],
  },
  {
    name: "Sri Lanka",
    code: "+94",
    cities: [
      "Colombo",
      "Galle",
      "Kandy",
      "Jaffna",
      "Negombo",
      "Anuradhapura",
      "Polonnaruwa",
    ],
  },
  {
    name: "Bhutan",
    code: "+975",
    cities: [
      "Thimphu",
      "Phuntsholing",
      "Paro",
      "Punakha",
      "Wangdue Phodrang",
      "Jakar",
      "Mongar",
    ],
  },
]);

const renderCities = () => {
  selectedCountryIdx.value = countries.findIndex(
    (country) => country.name === checkout.country
  );

  if (selectedCountryIdx.value !== -1) {
    countryCode.value = countries[selectedCountryIdx.value].code;
  }
};

const createOrder = () => {
  if (
    checkout.name !== "" &&
    checkout.email !== "" &&
    checkout.line1 !== "" &&
    number.value !== ""
  ) {
    const status = order.placeOrder(checkout);
    if (status) {
      navigateTo("/orders");
      launchConfetti();
    } else {
      alert("Failed to place order");
    }
  } else {
    alert("Fields marked with a star are required");
  }
};

const deliveryCostDefine = computed(() => {
  if (checkout.country === "Bangladesh") {
    return 0.6;
  } else {
    return 10;
  }
});

const checkoutTotal = computed(() => {
  let total;

  if (couponData.value != null) {
    if (couponData.value.type === "percentage") {
      total =
        cart.totalPrice -
        (cart.totalPrice * couponData.value.discount) / 100 +
        deliveryCostDefine.value;
    } else {
      total =
        cart.totalPrice - couponData.value.discount + deliveryCostDefine.value;
    }
  } else {
    total = cart.totalPrice + deliveryCostDefine.value;
  }

  // Ensure the result has two decimal places
  return parseFloat(total.toFixed(2));
});
</script>

<template>
  <div class="h-full min-h-screen  pb-2">
    <div class="page-hero flex justify-center items-center">
      <h1
        class="text-xl text-center font-bold px-5 py-1 pt-5 bg-orange-400 rounded-b-3xl shadow-lg"
      >
        Checkout Page
      </h1>
    </div>

    <div class="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0 mb-20 mt-2">
      <div class="rounded-lg md:w-2/3">
        <form class="space-y-4 md:space-y-6">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Name<span class="text-red-500 font-extrabold">*</span></label
            >
            <input
              v-model="checkout.name"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:shadow-2xl w-full p-2.5"
              placeholder="Name"
              required=""
            />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Email<span class="text-red-500 font-extrabold">*</span></label
            >
            <input
              v-model="checkout.email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:shadow-2xl w-full p-2.5"
              placeholder="Email"
              required=""
            />
          </div>
          <div class="country flex flex-col md:flex-row justify-between">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Country</label
              >
              <select
                v-model="checkout.country"
                @change="renderCities()"
                class="p-2 rounded focus:outline-none focus:shadow-2xl"
              >
                <option
                  v-for="(country, index) in countries"
                  :key="index"
                  :value="country.name"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >City</label
              >
              <select
                v-model="checkout.city"
                class="p-2 rounded focus:outline-none focus:shadow-2xl"
              >
                <option
                  v-for="(city, index) in countries[selectedCountryIdx].cities"
                  :key="index"
                  :value="city"
                >
                  {{ city }}
                </option>
              </select>
            </div>
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Address 1<span class="text-red-500 font-extrabold"
                >*</span
              ></label
            >
            <input
              v-model="checkout.line1"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:shadow-2xl w-full p-2.5"
              placeholder="Address 1"
              required
            />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Address 2</label
            >
            <input
              v-model="checkout.line2"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:shadow-2xl block w-full p-2.5"
              placeholder="Address 2"
              required=""
            />
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Phone<span class="text-red-500 font-extrabold">*</span></label
            >
            <div class="flex">
              <div
                class="bg-gray-50 border border-r-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg rounded-r-none p-2.5 w-12 text-end pr-1 select-none"
              >
                {{ countryCode }}
              </div>
              <input
                type="number"
                v-model="number"
                class="no-spinner bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg rounded-l-none focus:outline-none focus:shadow-2xl p-2.5"
                placeholder="number"
                required=""
              />
            </div>
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Note</label
            >
            <input
              v-model="checkout.notes"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:shadow-2xl w-full p-2.5"
              placeholder="Notes"
              required
            />
          </div>
          <div class="sm:flex justify-between">
            <div class="payment-method">
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Payment Method</label
              >
              <select
                v-model="checkout.payment_method"
                class="p-2 rounded focus:outline-none focus:shadow-2xl"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="paypal">Paypal</option>
              </select>
            </div>
            <!-- Coupon input -->
            <div class="mt-5 sm:mt-0">
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Apply Coupon</label
              >
              <input
                v-model="checkout.coupon"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:outline-none focus:shadow-2xl p-2.5"
                placeholder="Enter Coupon"
              />

              <button
                type="button"
                @click="coupon.applyCoupon(checkout)"
                class="p-2 bg-red-500 rounded-r text-white"
              >
                Apply
              </button>
            </div>

            <!-- <p v-if="coupon.couponData != null">{{ checkoutTotal }}</p> -->
          </div>
        </form>
      </div>

      <!--======  total Summary ======-->
      <div class="right-part md:w-1/3 md:min-h-full mt-6 md:mt-0">
        <div class="rounded-lg border bg-white p-6 shadow-md sticky top-52">
          <div class="mb-2 flex justify-between">
            <p class="text-gray-700">Subtotal</p>
            <p class="text-gray-700">{{ cart.totalPrice }}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-700">Shipping</p>
            <p class="text-gray-700">
              <span class="mr-2 text-red-600">+</span> {{ deliveryCostDefine }}
            </p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-700">Discount</p>
            <p class="text-gray-700">
              <span class="mr-2 text-teal-600">-</span>
              <span v-if="couponData"
                >{{ couponData.discount }}
                <span v-show="(couponData.type = 'percentage')">%</span></span
              >
            </p>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between">
            <p class="text-lg font-bold">Total</p>
            <div class="block">
              <p class="mb-1 text-lg font-bold">
                $<span>{{ checkoutTotal }}</span> USD
              </p>
              <p class="text-xs text-gray-700 float-end">including VAT</p>
            </div>
          </div>

          <button
            @click="createOrder()"
            class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
