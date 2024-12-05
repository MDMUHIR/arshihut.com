export const useAuthStore = defineStore(
  "auth",
  () => {
    // States
    const user = ref(null);
    const isAuthenticated = ref(false);
    const errors = ref(null);

    const isAdmin = ref(false);
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
            isAdmin.value = true;
            navigateTo("/admin");
            launchConfetti();
          } else {
            isAdmin.value = false;
            navigateTo("/");
            launchConfetti();
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
      if (!user.value) {
        // Check if user.value is null or undefined
        console.log("Unauthorized user");
        return null; // Explicitly return null or handle the error
      }

      return user.value.accessToken; // Return the token if the user is authenticated
    };

    return {
      user,
      isAuthenticated,
      errors,
      isAdmin,
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
