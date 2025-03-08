<script setup>
  definePageMeta({
    layout: "adminlayout",
  });

  const userStore = useUserStore();

  onBeforeMount(() => {
    userStore.fetchAllUsers();
  });
</script>

<template>
  <div
    class="main py-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-screen"
  >
    <!-- <pre>{{ data.allUsers }}</pre> -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Top Bar Section -->
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-4 mb-8"
      >
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
          User Management
        </h1>
        <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <button
            v-if="!userStore.showUserAddForm && !userStore.showUserUpdateForm"
            @click="userStore.showUserAddForm = true"
            class="px-6 py-3 rounded-lg text-lg font-semibold text-white bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Add New User
          </button>
          <form
            @submit.prevent="userStore.getFilteredUsers()"
            class="search-bar flex-1 md:flex-initial"
          >
            <div class="relative">
              <input
                v-model="userStore.searchInputText"
                type="text"
                class="w-full pl-4 pr-12 py-3 rounded-lg border-2 border-cyan-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 bg-white dark:bg-gray-800 dark:text-white"
                placeholder="Search users..."
              />
              <button
                class="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-cyan-600 hover:text-cyan-700 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- User Form Modal -->
      <div
        v-if="userStore.showUserAddForm || userStore.showUserUpdateForm"
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100"
        >
          <form
            @submit.prevent="userStore.formSubmition()"
            class="p-6 space-y-6"
          >
            <h2
              class="text-2xl font-bold text-gray-900 dark:text-white text-center"
            >
              {{ userStore.showUserAddForm ? "Add New User" : "Update User" }}
            </h2>

            <div class="space-y-4">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >User Name</label
                >
                <input
                  v-model="userStore.addUserForm.name"
                  type="text"
                  id="name"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                  placeholder="Enter user's name"
                />
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Email Address</label
                >
                <input
                  v-model="userStore.addUserForm.email"
                  type="email"
                  id="email"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                  placeholder="Enter user's email"
                />
              </div>

              <div>
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Password</label
                >
                <input
                  v-model="userStore.addUserForm.password"
                  type="password"
                  id="password"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label
                  for="type"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >User Type</label
                >
                <select
                  v-model="userStore.addUserForm.type"
                  id="type"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                >
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
            </div>

            <div
              class="flex justify-end space-x-4 pt-4 border-t dark:border-gray-700"
            >
              <button
                type="button"
                @click="userStore.closeSubmition()"
                class="px-6 py-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {{ userStore.showUserAddForm ? "Add User" : "Update User" }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- User Cards Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <template
          v-for="(item, index) in userStore.getFilteredUsers()"
          :key="index"
        >
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <div class="p-6 relative">
              <div
                class="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white"
                :class="item.type === 'admin' ? 'bg-red-500' : 'bg-purple-500'"
              >
                {{ item.type }}
              </div>

              <div class="mt-4">
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white truncate"
                >
                  {{ item.name }}
                </h3>
                <p
                  class="mt-2 text-sm text-gray-600 dark:text-gray-400 truncate"
                >
                  {{ item.email }}
                </p>
                <div class="mt-2 space-y-1">
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Created:
                    {{ new Date(item.created_at).toLocaleDateString() }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    Updated:
                    {{ new Date(item.updated_at).toLocaleDateString() }}
                  </p>
                </div>
              </div>

              <div class="mt-6 flex justify-between items-center">
                <button
                  @click="userStore.editSelection(item)"
                  class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                    />
                  </svg>
                  Edit
                </button>
                <button
                  @click="userStore.deleteUser(index, item)"
                  class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
