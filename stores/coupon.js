export const useCouponStore = defineStore("coupon", () => {
  // state/controller
  const showCouAddform = ref(false);
  const showCouUpdateform = ref(false);
  const couponForm = reactive({
    code: "",
    type: "fixed",
    discount: "",
  });

  const couponData = ref(null);

  // Actions/-----------/

  const fetchCoupons = () => {
    const res = fetchAuthorizedApi("api/admin/coupon", {}, "GET");
    res.then((response) => {
      data.coupons = response.data;
    });
  };

  const addCoupons = () => {
    const res = fetchAuthorizedApi("api/admin/coupon/add", couponForm, "POST");

    res.then((response) => {
      if (response.status) {
        data.coupons.push(response.data);
        couponForm.code = "";
        couponForm.type = "fixed";
        couponForm.discount = "";
        showCouAddform.value = false;
      } else {
        alert("Something wents wrong");
      }
    });
  };
  const deleteCoupons = (index, item) => {
    const res = fetchAuthorizedApi(
      `api/admin/coupon/delete/${item.id}`,
      {},
      "DELETE"
    );

    res.then((response) => {
      data.coupons.splice(index, 1);
    });
  };

  const updateCoupon = (couponForm) => {
    const res = fetchUploadApi("api/admin/coupon/update", couponForm);
  };
  const formSubmit = () => {
    if (showCouAddform.value == true) {
      addCoupons();
    } else if (showCouUpdateform.value == true) {
      updateCoupon();
    }
  };

  const editSelection = (item) => {
    showCouUpdateform.value = true;

    couponForm.code = item.code;
    couponForm.type = item.type;
    couponForm.discount = item.discount;
  };

  const cancelSubmition = () => {
    showCouAddform.value = false;
    showCouUpdateform.value = false;

    couponForm.code = "";
    couponForm.type = "fixed";
    couponForm.discount = "";
  };

  // ______Customer's logics______

  // apply-coupon function for customer
  const applyCoupon = (data) => {
    const res = fetchAuthorizedApi(
      `api/verify-coupon`,
      { code: data.coupon },
      "POST"
    );
    res.then((response) => {
      if (response.status) {
        couponData.value = response.data;
      } else {
        alert("Invalid coupon");
        couponData.value = null;
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
    deleteCoupons,
    updateCoupon,
    formSubmit,
    editSelection,
    cancelSubmition,
    applyCoupon,
  };
});
