export const useCouponStore = defineStore("coupon", () => {
  // state/controller
  const showCouAddform = ref(false);
  const showCouUpdateform = ref(false);
  const couponForm = reactive({
    id: null,
    code: "",
    type: "fixed",
    discount: "",
  });
  const couponData = ref(null);
  // Actions/-----------/
  const fetchCoupons = () => {
    const res = fetchAuthorizedApi("api/admin/coupon", {}, "GET");
    res.then((response) => {
      if (response.status) {
        data.coupons = response.data;
      } else {
        notify("Failed to fetch coupons", "error");
      }
    });
  };
  const addCoupons = () => {
    if (!couponForm.code || !couponForm.discount) {
      notify("Please fill all required fields", "error");
      return;
    }
    const res = fetchAuthorizedApi("api/admin/coupon/add", couponForm, "POST");
    res.then((response) => {
      if (response.status) {
        data.coupons.push(response.data);
        notify("Coupon added successfully", "success");
        closeSubmition();
      } else {
        notify("Failed to add coupon", "error");
      }
    });
  };
  const deleteCoupon = (index, id) => {
    const res = fetchAuthorizedApi(
      `api/admin/coupon/delete/${id}`,
      {},
      "DELETE"
    );
    res.then((response) => {
      if (response.status) {
        data.coupons.splice(index, 1);
        notify("Coupon deleted successfully", "success");
      } else {
        notify("Failed to delete coupon", "error");
      }
    });
  };

  const updateCoupon = () => {
    if (!couponForm.code || !couponForm.discount) {
      notify("Please fill all required fields", "error");
      return;
    }
    const res = fetchAuthorizedApi(
      "api/admin/coupon/update",
      couponForm,
      "POST"
    );
    res.then((response) => {
      if (response.status) {
        const index = data.coupons.findIndex(
          (coupon) => coupon.id === couponForm.id
        );
        if (index !== -1) {
          data.coupons[index] = response.data;
          notify("Coupon updated successfully", "success");
        }
        closeSubmition();
      } else {
        notify("Failed to update coupon", "error");
      }
    });
  };
  const formSubmit = () => {
    if (showCouAddform.value) {
      addCoupons();
    } else if (showCouUpdateform.value) {
      updateCoupon();
    }
  };
  const editSelection = (coupon) => {
    showCouUpdateform.value = true;
    couponForm.id = coupon.id;
    couponForm.code = coupon.code;
    couponForm.type = coupon.type;
    couponForm.discount = coupon.discount;
  };
  const closeSubmition = () => {
    showCouAddform.value = false;
    showCouUpdateform.value = false;
    couponForm.code = "";
    couponForm.type = "fixed";
    couponForm.discount = "";
  };

  // for Users
  const applyCoupon = (checkout) => {
    const res = fetchAuthorizedApi(
      "api/verify-coupon",
      { code: checkout.coupon },
      "POST"
    );
    res.then((response) => {
      if (response.status) {
        notify("Coupon applied successfully", "success");
        couponData.value = response.data;
      } else {
        notify("Invalid coupon code", "error");
      }
    });
  };
  return {
    showCouAddform,
    showCouUpdateform,
    couponForm,
    couponData,
    fetchCoupons,
    addCoupons,
    deleteCoupon,
    updateCoupon,
    formSubmit,
    editSelection,
    closeSubmition,
    applyCoupon,
  };
});
