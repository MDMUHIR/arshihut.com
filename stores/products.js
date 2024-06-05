export const useProductStore = defineStore(
  "product",
  () => {
    const productData = reactive({
      name: "",
      description: "",
      image: "",
      price: null,
      stock: 1,
      product_id: null,
      category_id: 2,
    })
    const showAddForm = ref(false);
    const showUpdateForm = ref(false);
    const previewImage = ref(null);
    // Actions

    const addProduct = () => {
      const res = fetchUploadApi("api/admin/products/add", productData);
      res.then((response) => {
        console.log(response.data);
        data.products.push(response.data);
        showAddForm.value = false;
        clearSubmition();
      });
    };
    

    const getProducts = () => {
      const res = fetchApiData("api/products", {}, "GET");
      res.then((response) => {
        console.log(response);
        data.products = response.data;
      });
    };

    const selectFile = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImage.value = e.target.result;
        };
        reader.readAsDataURL(file);

        productData.image = file;
      }
    };

    const deleteProduct = (index, product) => {
      const res = fetchAuthorizedApi(
        `api/admin/products/delete/${product.id}`,
        {},
        "DELETE"
      );
      res.then((response) => {
        data.products.splice(index, 1);
      });
    };

    const editSelection = (product) => {
      console.log(product);
      showUpdateForm.value = true;
      productData.product_id = product.id;
      productData.name = product.name;
      productData.description = product.description;
      productData.image = product.image;
      productData.price = product.price;
      productData.stock = product.stock;
      productData.category_id = product.category_id;
      previewImage.value = apiBase + product.image;
    };

    const updateProduct = () => {
      console.log("Update");
      const res = fetchUploadApi("/api/admin/products/update", productData);
      res.then((response) => {
        if (response.status) {
          for (let i = 0; i < data.products.length; i++) {
            if (data.products[i].id == productData.product_id) {
              data.products[i] = response.data;

              break;
            }
          }
        }
        clearSubmition();
      });
    };

    const formSubmition = () => {
      if (showAddForm.value == true) {
        addProduct();
      } else if (showUpdateForm.value == true) {
        updateProduct();
      }
    };

    const clearSubmition = () => {
      productData.name = "";
      productData.description = "";
      productData.image = "";
      productData.price = 0;
      productData.stock = 1;
      productData.product_id = null;
      productData.category_id = 1;
      showAddForm.value = false;
      showUpdateForm.value = false;
      previewImage.value = null;
    };

    return {
      productData,
      showAddForm,
      showUpdateForm,
      previewImage,
      addProduct,
      getProducts,
      selectFile,
      deleteProduct,
      editSelection,
      updateProduct,
      formSubmition,
      clearSubmition,
    };
  }
  // {
  //   persist: true,
  // }
);
