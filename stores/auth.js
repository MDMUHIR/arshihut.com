export const useAuthStore = defineStore(
  "auth",
  () => {
    // States
    const user = ref(null);
    const isAuthenticated = ref(false);
    const errors = ref(null);

    // Actions
    const login = (email, password) => {
      loading.value = true;
      fetchApiData("api/login", { email, password }, "POST").then((res) => {
        if (res.status) {
          errors.value = null;
          isAuthenticated.value = true;
          user.value = res.data;
          loading.value = false;
          if ("admin" == res.data.type) {
            navigateTo("/admin");
          } else {
            navigateTo("/");
          }
        } else {
          loading.value = false;
          console.log(res);
          errors.value = res.message;
        }
      });
    };
    const register = (name, email, password) => {
      loading.value = true;
      fetchApiData("api/register", { name, email, password }, "POST").then(
        (res) => {
          if (res.status) {
            errors.value = null;
            loading.value = false;
            navigateTo("/login");
          } else {
            loading.value = false;
            errors.value = res.errors;
            console.log(errors);
          }
        }
      );
    };
    const logout = () => {
      isAuthenticated.value = false;
      user.value = null;
      togDropdMenu();
      navigateTo("/login");
    };
    const getUserToken = () => {
      return user.value.accessToken;
    };

    return {
      user,
      isAuthenticated,
      errors,
      login,
      logout,
      register,
      getUserToken,
    };
  },
  {
    persist: true,
  }
);
