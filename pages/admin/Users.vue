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
  <div class="main">
    <!-- top -->
    <div class="top-bar flex flex-col md:flex-row justify-between p-4">
      <button
        v-if="!userStore.showUserAddForm && !userStore.showUserUpdateForm"
        @click="userStore.showUserAddForm = true"
        type="submit"
        class="px-6 py-2 rounded-md text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 duration-150"
      >
        Add New
      </button>
      <form
        @submit.prevent="userStore.getFilteredUsers()"
        class="search-bar bg-white flex items-center rounded-lg overflow-hidden p-1 text-black border-2 border-purple-600"
      >
        <input
          v-model="userStore.searchInputText"
          type="text "
          class="px-2 w-full rounded outline-none text-sm"
          placeholder="Search for user"
        />
        <button class="border-l-2 px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 50 50"
          >
            <path
              d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"
            ></path>
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
