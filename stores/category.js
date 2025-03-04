export const useCategoryStore = defineStore("category", () => {
  // const categories = reactive([]);

  const loadingCategory = ref(false);

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

  const addCategory = async () => {
    loadingCategory.value = true;
    try {
      const response = await fetchUploadApi(
        "api/admin/categories/add",
        categoryData
      );
      data.categories.push(response.data);
      showAddForm.value = false;
      categoryData.name = "";
      categoryData.description = "";
      categoryData.image = null;
      previewImage.value = null;
    } catch (error) {
      console.error("Failed to add category:", error);
    } finally {
      loadingCategory.value = false;
    }
  };
  const deleteCategory = async (index, item) => {
    loadingCategory.value = true;
    try {
      await fetchAuthorizedApi(
        "api/admin/categories/delete/" + item.id,
        {},
        "DELETE"
      );
      data.categories.splice(index, 1);
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      loadingCategory.value = false;
    }
  };

  const getCategories = async () => {
    loadingCategory.value = true;
    try {
      const response = await fetchApiData("api/categories", {}, "GET");
      data.categories = response.data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      loadingCategory.value = false;
    }
  };

  return {
    loadingCategory,
    categoryData,
    previewImage,
    showAddForm,
    selectFile,
    addCategory,
    deleteCategory,
    getCategories,
  };
});
