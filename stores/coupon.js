export const useCouponStore = defineStore("coupon", () => {
  // Actions/-----------/
  const fetchCoupons = () => {
    const res = fetchAuthorizedApi("api/admin/coupon", {}, "GET");
    res.then((response) => {
      data.coupons = response.data;
      
    });
  };
  fetchCoupons();

  const addCoupons = (couponData) => {
    const res = fetchAuthorizedApi("api/admin/coupon/add", couponData, "POST");

    res.then((response) => {
      if (response.status) {
        data.coupons.push(response.data);
        couponData.code = "";
        couponData.type = "fixed";
        couponData.discount = "";
      }
    });
  };

  return { fetchCoupons, addCoupons };
});
