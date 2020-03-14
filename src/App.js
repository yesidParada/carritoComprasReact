import React,{ useState, useEffect } from 'react';
import TopMenu from './components/TopMenu';
import Products from './components/Products';
import useFetch from './hooks/useFetch';
import { ToastContainer, toast } from 'react-toastify';
import { urlApi, STORAGE_PRODUCT_CARD } from './utils/constant';

function App() {

  const products = useFetch(urlApi, null);
  const [productCar, setProductCar] = useState([]);

  useEffect(() => {
    getProductscard();
  }, [])

  const getProductscard = () => {
    const idsProducts = localStorage.getItem(STORAGE_PRODUCT_CARD);

    if (idsProducts) {
      const idsProductsSlipt = idsProducts.split(",");
      setProductCar(idsProductsSlipt);
    } else {
      setProductCar([]);
    }
  }

  const addProductCard = (id, name) => {
    const idsProduct = productCar;
    idsProduct.push(id);
    setProductCar(idsProduct);
    localStorage.setItem(STORAGE_PRODUCT_CARD, productCar);
    getProductscard();
    toast.success(`${name} añadido al carrito`);
  }

  return (
    <div className="App">
      <TopMenu
        productCar={productCar}
        getProductscard={getProductscard}
        products={products}  
      />
      <Products products={ products } addProductCard={addProductCard} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
