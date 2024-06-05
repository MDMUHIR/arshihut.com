export const useCategoryStore = defineStore("category", () => {
  // const categories = reactive([]);

  // integreat category data

  const categoryData = reactive({
    name: "",
    description: "",
    image: null,
  });

  const previewImage = ref(null);
  const showAddForm = ref(false);

  const selectFile = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.value = e.target.result;
      };
      reader.readAsDataURL(file);

      categoryData.image = file;
    }
  };

  const addCategory = () => {
    const res = fetchUploadApi("api/admin/categories/add", categoryData);
    res.then((response) => {
      console.log(response.data);
      data.categories.push(response.data);
      showAddForm.value = false;
      categoryData.name = "";
      categoryData.description = "";
      categoryData.image = null;
      previewImage.value = null;
    });
  };
  const deleteCategory = (index, item) => {
    const res = fetchAuthorizedApi(
      "api/admin/categories/delete/" + item.id,
      {},
      "DELETE"
    );
    res.then((response) => {
      data.categories.splice(index, 1);
    });
  };

  const getCategories = () => {
    const res = fetchApiData("api/categories", {}, "GET");
    res.then((response) => {
      console.log(response.data);
      data.categories = response.data;
    });
  };

  return {
    categoryData,
    previewImage,
    showAddForm,
    selectFile,
    addCategory,
    deleteCategory,
    getCategories,
  };
});
