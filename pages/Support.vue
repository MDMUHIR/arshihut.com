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
  <div class="main min-h-svh py-10">
    <div class="p-10 dark:text-[#e5e5e5] text-right">
      <h1 class="text-3xl dark:text-[#e5e5e5]">Help & Support</h1>
      <p class="welcome-text p-2 mt-2">
        Welcome to our Help & Support page! We're here to ensure your shopping
        experience is smooth, enjoyable, and hassle-free. Whether you're facing
        an issue with your order or need guidance on using our platform, we’re
        here to assist.
      </p>
    </div>

    <!-- Contact Our Support Team -->
    <div class="px-10 dark:text-[#e5e5e5] mt-10">
      <h1 class="text-3xl flex items-center dark:text-[#e5e5e5]">
        Contact Our Support Team <IconsSupport24support class="ml-3" />
      </h1>

      <ul class="contacts p-2 mt-4 flex flex-col gap-y-5 w-full justify-center">
        <li class="p2 flex items-center">
          <IconsSupportTelephone />
          <p class="num text-xl font-bold ms-2 select-all">+880 123456789</p>
        </li>
        <li class="p2 flex items-center">
          <a
            class="flex items-center"
            href="mailto:mdmuhir04@gmail.com"
            target="blank"
            ><img
              src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/gmail/default.svg"
              width="40"
              height="30"
              alt="gmail logo"
            />
            <p class="num text-xl font-bold ms-2 hover:text-red-500">
              support@yourecommercesite.com
            </p></a
          >
        </li>

        <li class="p2 flex items-center">
          <a
            class="flex items-center"
            href="https://wa.link/m875rv"
            target="blank"
          >
            <img
              align="top"
              src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/whatsapp/default.svg"
              width="40"
              height="30"
              alt="whatsapp logo"
            />
            <p class="num text-xl font-bold ms-2 hover:text-red-500">
              Open in Whatsapp
            </p></a
          >
        </li>
        <!-- <li class="p2">
          Live Chat: Click the chat icon at the bottom right corner of this page
          for instant assistance.
        </li> -->
      </ul>

      <p class="note p-2 mt-2 text-xs italic text-right">
        If you can't find the answer to your question in our FAQ section, don’t
        hesitate to reach out to our dedicated support team. We’re here to help!
      </p>
    </div>

    <!-- FAQS -->
    <div class="FAQs p-10 mt-10 dark:text-[#e5e5e5] text-center">
      <h1 class="text-3xl dark:text-[#e5e5e5]">
        Frequently Asked Questions (FAQ)
      </h1>
      <div class="Ques-list">
        <template v-for="faq in faqs" :key="faq.id">
          <div class="questions my-5">
            <div class="top-part flex">
              <p class="num text-xl mr-2">{{ faq.id }}.</p>
              <h3 @click="toggleFaqId = faq.id" class="text-xl cursor-pointer">
                {{ faq.question }}
              </h3>
            </div>
            <p
              v-if="toggleFaqId == faq.id"
              class="ans ms-6 p-2 border rounded dark:bg-[#363535]"
            >
              {{ faq.answer }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.note {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.10em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em; /* Adjust as needed */
  animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;

  color: white;
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}
</style>
