<script setup>
  const faqs = reactive([
    {
      id: 1,
      question: "How do I place an order?",
      answer:
        "Browse through our wide range of products, select the items you wish to purchase, and click 'Add to Cart.' Once you're ready, head to the cart and proceed with the checkout process.",
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment options including credit/debit cards, mobile wallets, and bank transfers.",
    },
    {
      id: 3,
      question: "Can I track my order?",
      answer:
        "Yes, you can track your order by logging into your account and checking the 'Order History' section. You will also receive updates via email and SMS.",
    },
    {
      id: 4,
      question: "How do I return or exchange an item?",
      answer:
        "If you're not satisfied with your purchase, you can initiate a return or exchange within 30 days. Please visit our Returns & Exchanges page for more details.",
    },
    {
      id: 5,
      question: "What if I receive a damaged or incorrect item?",
      answer:
        "We sincerely apologize for any inconvenience. Please contact our support team immediately, and we will arrange a replacement or refund.",
    },
  ]);

  const toggleFaqId = ref(null);
</script>

<template>
  <div class="main px-4 sm:px-5 py-4 sm:py-5 max-w-7xl mx-auto">
    <div
      class="mt-2 sm:mt-4 text-center bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg p-4 sm:p-8 shadow-sm"
    >
      <h1 class="text-2xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
        Help & Support
      </h1>
      <p
        class="welcome-text text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base"
      >
        Welcome to our Help & Support page! We're here to ensure your shopping
        experience is smooth, enjoyable, and hassle-free. Whether you're facing
        an issue with your order or need guidance on using our platform, we're
        here to assist.
      </p>
    </div>

    <!-- Contact Our Support Team -->
    <div class="mt-8 sm:mt-12">
      <h2
        class="text-xl md:text-3xl font-bold flex items-center justify-center mb-6 sm:mb-8"
      >
        Contact Our Support Team
        <IconsSupport24support class="ml-3 text-orange-500" />
      </h2>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        <div
          class="contact-card bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center border border-gray-100"
        >
          <img
            class="w-12 h-12 mb-4"
            src="https://api.iconify.design/noto:telephone.svg?color=%23ff7300"
            alt="telephone logo"
          />
          <h3 class="font-semibold text-gray-800 mb-2">Phone Support</h3>
          <p
            class="num text-lg text-orange-600 font-medium select-all hover:text-orange-700 transition-colors duration-200"
          >
            +880 123456789
          </p>
        </div>

        <div
          class="contact-card bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center border border-gray-100"
        >
          <img
            class="w-12 h-12 mb-4"
            src="https://api.iconify.design/majesticons:location-marker.svg?color=%23ff7300"
            alt="location logo"
          />
          <h3 class="font-semibold text-gray-800 mb-2">Our Locations</h3>
          <div class="text-center">
            <p
              class="text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              Dhaka, Bangladesh
            </p>
            <p
              class="text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              Chattogram, Bangladesh
            </p>
          </div>
        </div>

        <div
          class="contact-card bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center border border-gray-100"
        >
          <img
            class="w-12 h-12 mb-4"
            src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/gmail/default.svg"
            alt="gmail logo"
          />
          <h3 class="font-semibold text-gray-800 mb-2">Email Support</h3>
          <a
            href="mailto:support@yourecommercesite.com"
            class="text-gray-600 hover:text-orange-600 transition-colors duration-200"
            target="_blank"
          >
            support@yourecommercesite.com
          </a>
        </div>

        <div
          class="contact-card bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center border border-gray-100"
        >
          <img
            class="w-12 h-12 mb-4"
            src="https://api.iconify.design/logos:whatsapp-icon.svg"
            alt="whatsapp logo"
          />
          <h3 class="font-semibold text-gray-800 mb-2">WhatsApp Support</h3>
          <a
            href="https://wa.link/m875rv"
            class="text-gray-600 hover:text-green-600 transition-colors duration-200"
            target="_blank"
          >
            Chat with us
          </a>
        </div>
      </div>
    </div>

    <!-- FAQS -->
    <div class="FAQs mt-12 sm:mt-16 bg-white rounded-xl p-4 sm:p-8 shadow-md">
      <h2
        class="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6"
      >
        Frequently Asked Questions
      </h2>
      <p
        class="text-center mb-6 sm:mb-8 text-sm text-gray-600 bg-gradient-to-r from-orange-50 to-pink-50 p-3 sm:p-4 rounded-lg shadow-sm max-w-2xl mx-auto"
      >
        If you can't find the answer to your question in our FAQ section, don't
        hesitate to reach out to our dedicated support team. We're here to help!
      </p>
      <div class="max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <template v-for="faq in faqs" :key="faq.id">
          <div
            class="questions p-4 rounded-lg border border-gray-200 hover:border-orange-200 transition-all duration-200"
            :class="{ 'bg-orange-50': toggleFaqId === faq.id }"
          >
            <div
              @click="toggleFaqId = toggleFaqId === faq.id ? null : faq.id"
              class="flex items-center justify-between cursor-pointer"
            >
              <h3 class="text-lg font-medium text-gray-800">
                {{ faq.question }}
              </h3>
              <span
                class="transform transition-transform duration-200"
                :class="{ 'rotate-180': toggleFaqId === faq.id }"
              >
                ▼
              </span>
            </div>
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <p
                v-if="toggleFaqId === faq.id"
                class="mt-4 text-gray-600 leading-relaxed"
              >
                {{ faq.answer }}
              </p>
            </transition>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
