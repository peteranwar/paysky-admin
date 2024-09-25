import HttpHelpers from './helpers';

const ProductsApi = {
  getProducts: params => {
    return HttpHelpers.unAuthenticatedAxios
      .get(params.category ? `products/category/${params.category}` : 'products', { params })
      .then(response => response.data);
  },
  getProductById: (id) => {
    return HttpHelpers.unAuthenticatedAxios
      .get(`products/${id}`)
      .then(response => response.data);
  },
  getCategories: () => {
    return HttpHelpers.unAuthenticatedAxios
      .get('products/categories')
      .then(response => response.data);
  },
  updateProduct: (id, data) => {
    return HttpHelpers.unAuthenticatedAxios
      .put(`products/${id}`, data)
      .then(response => response.data);
  },
  deleteProduct: (id) => {
    return HttpHelpers.unAuthenticatedAxios
      .delete(`products/${id}`)
      .then(response => response.data);
  },
  addProduct: (data) => {
    return HttpHelpers.unAuthenticatedAxios
      .post(`products`, data)
      .then(response => response.data);
  },
};

export default ProductsApi;
