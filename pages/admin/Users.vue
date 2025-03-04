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
  <div class="main py-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-screen">
    <div class="top-bar flex flex-col md:flex-row justify-between gap-4 p-4">
      <button
        v-if="!userStore.showUserAddForm && !userStore.showUserUpdateForm"
        @click="userStore.showUserAddForm = true"
        class="px-6 py-3 rounded-lg text-lg font-semibold text-white bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        Add New User
      </button>
      <form
        @submit.prevent="userStore.getFilteredUsers()"
        class="search-bar bg-white flex items-center rounded-lg overflow-hidden p-2 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-cyan-600 w-full md:w-auto"
      >
        <input
          v-model="userStore.searchInputText"
          type="text"
          class="px-4 w-full rounded outline-none text-base"
          placeholder="Search users..."
        />
        <button class="border-l-2 px-4 py-2 hover:bg-cyan-50 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-cyan-600"
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
      </form>
    </div>

    <!-- add form -->
    <div
      v-if="userStore.showUserAddForm || userStore.showUserUpdateForm"
      class="bg-stone-500/75 rounded-lg border shadow-2xl m-3 h-5/6 fixed top-20 left-0 right-0 z-40 overflow-hidden block"
    >
      <form @submit.prevent="userStore.formSubmition()">
        <div class="md:px-20">
          <div class="bg-white rounded-md p-6 max-w-2xl mx-auto">
            <h1
              v-if="userStore.showUserAddForm"
              class="text-center text-2xl font-bold text-gray-500 mb-10"
            >
              Add User
            </h1>
            <h1
              v-else
              class="text-center text-2xl font-bold text-gray-500 mb-10"
            >
              Update User
            </h1>
            <div class="space-y-4">
              <div>
                <label for="code" class="text-lx font-serif">User name:</label>
                <input
                  v-model="userStore.addUserForm.name"
                  type="text"
                  placeholder="User's name"
                  id="code"
                  class="w-full outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <label for="code" class="text-lx font-serif">User email:</label>
                <input
                  v-model="userStore.addUserForm.email"
                  type="email"
                  placeholder="User's email"
                  id="code"
                  class="w-full outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <label for="code" class="text-lx font-serif"
                  >User Password:</label
                >
                <input
                  v-model="userStore.addUserForm.password"
                  type="text"
                  placeholder="userStore Code"
                  id="code"
                  class="w-full outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900"
                  >User Type</label
                >
                <select
                  v-model="userStore.addUserForm.type"
                  class="p-2 border-2 rounded"
                >
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
              </div>

              <div class="btn flex justify-between">
                <button
                  @click="userStore.cancelSubmition()"
                  class="mx-auto block rounded-md text-lg text-red-600 font-bold border px-4 hover:bg-neutral-200 duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 duration-150"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- showing users -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-4 rounded-lg mb-10 px-4"
    >
      <template
        v-for="(item, index) in userStore.getFilteredUsers()"
        :key="index"
      >
        <div
          class="justify-between items-center rounded-lg pl-5 pb-3 sm:flex sm:justify-start border bg-gradient-to-tr from-black/40 to-red-500/40 relative shadow-black/40 shadow-lg"
        >
          <p class="text-xl font-semibold mr-2 dark:text-[#e5e5e5]">
            {{ index + 1 }}
          </p>

          <div class="sm:ml-4 w-full items-center mt-1">
            <div
              class="mt-5 sm:mt-0 border-l pl-2 pb-2 bg-white rounded shadow-sm"
            >
              <div
                class="px-3 py-1 rounded-full text-xs font-medium text-white text-center absolute top-2 right-2"
                :class="item.type == 'admin' ? 'bg-red-500' : 'bg-purple-500'"
              >
                {{ item.type }}
              </div>
              <h2 class="text-xl font-bold text-gray-900">{{ item.name }}</h2>
              <p class="mt-1 text-sm text-gray-700">{{ item.email }}</p>
            </div>

            <!-- Bottom part -->
            <div
              class="bottom-part w-full flex items-center justify-around space-x-4 pt-2"
            >
              <!-- The edit button is disabled due to (backend) internal server error -->

              <button
                @click="userStore.editSelection(item)"
                class="cursor-pointer duration-150 bg-white hover:bg-red-300 font-semibold px-2 rounded"
              >
                Edit
              </button>
              <!-- delete button -->
              <button
                @click="userStore.deleteUser(index, item)"
                class="cursor-pointer duration-150 bg-red-500 hover:bg-red-300 font-semibold px-2 rounded text-white hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
