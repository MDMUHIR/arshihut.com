export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    navigateTo("/login");
  } else if (to.meta.type !== auth.user.type) {
    return navigateTo("/");
  } else {
    return;
  }
});
