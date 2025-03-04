export const showBottomMenu = ref(false);
export const showDdMenu = ref(false);
export const togDropdMenu = () => {
  showDdMenu.value = !showDdMenu.value;
};

export const currentRoute = ref(null);

export const loading = ref(false);

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import confetti from "canvas-confetti";

export const launchConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};
export const notify = (msg, type) => {
  toast(msg, {
    theme: "colored",
    type: type,
    autoClose: 2000,
    hideProgressBar: true,
    dangerouslyHTMLString: true,
    position: "bottom-right",
  });
};

export const truncatedHeadingText = (headingText) => {
  return headingText.length > 20
    ? headingText.substring(0, 20) + "..."
    : headingText;
};
