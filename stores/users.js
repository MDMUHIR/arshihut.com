export const useUserStore = defineStore("users", () => {
  // state/controller______________
  // -------------------------------
  const showUserAddForm = ref(false);
  const showUserUpdateForm = ref(false);
  const addUserForm = reactive({
    id: null,
    name: "",
    email: "",
    password: "",
    type: "customer",
  });

  // Searching states
  const searchInputText = ref("");

  // actions_______________________
  // --------------------------------->>>
  const fetchAllUsers = () => {
    const res = fetchAuthorizedApi("api/admin/users", {}, "GET");
    res.then((response) => {
      // console.log(response.data);
      data.allUsers = response.data;
    });
  };

  const addUser = () => {
    const res = fetchAuthorizedApi("api/admin/users/add", addUserForm, "POST");

    res.then((response) => {
      if (response) {
        data.allUsers.push(response.data);
        closeSubmition();
        notify("User added successfully", "success");
      } else {
        alert("Something wents wrong");
      }
    });
  };

  const deleteUser = (index, user) => {
    const res = fetchAuthorizedApi(
      `api/admin/users/delete/${user.id}`,
      {},
      "DELETE"
    );
    res.then((response) => {
      // console.log(response);
      data.allUsers.splice(index, 1);
      notify("user deleted successfully", "success");
    });
  };

  //
  const editSelection = (user) => {
    // console.log(product);
    showUserUpdateForm.value = true;
    addUserForm.id = user.id;
    addUserForm.name = user.name;
    addUserForm.email = user.email;
    addUserForm.password = user.password;
    addUserForm.type = user.type;
  };

  const updateUser = () => {
    const res = fetchUploadApi("api/admin/users/update", addUserForm);
    res.then((response) => {
      if (response.status) {
        for (let i = 0; i < data.allUsers.length; i++) {
          if (data.allUsers[i].id == addUserForm.id) {
            data.allUsers[i] = response.data;

            break;
          }
        }

        notify("User updated successfully", "success");
      }
      closeSubmition();
    });
  };

  const formSubmition = () => {
    if (showUserAddForm.value == true) {
      addUser();
    } else if (showUserUpdateForm.value == true) {
      updateUser();
    }
  };

  const closeSubmition = () => {
    showUserAddForm.value = false;
    showUserUpdateForm.value = false;
    addUserForm.id = null;
    addUserForm.name = "";
    addUserForm.email = "";
    addUserForm.password = "";
    addUserForm.type = "customer";
  };

  // To show admin's details first
  const sortedUsers = computed(() => {
    return data.allUsers.sort((a, b) => {
      if (a.type === "admin" && b.type !== "admin") {
        return -1;
      }
      if (a.type !== "admin" && b.type === "admin") {
        return 1;
      }
      return 0;
    });
  });

  const getFilteredUsers = () => {
    if (searchInputText.value) {
      return data.allUsers.filter((user) => {
        if (
          user.name.toLowerCase().includes(searchInputText.value.toLowerCase())
        ) {
          return user;
        }
      });
    } else {
      return data.allUsers;
    }
  };

  return {
    showUserAddForm,
    showUserUpdateForm,
    addUserForm,
    fetchAllUsers,
    addUser,
    closeSubmition,
    deleteUser,
    editSelection,
    formSubmition,
    sortedUsers,
    searchInputText,
    getFilteredUsers,
  };
});
