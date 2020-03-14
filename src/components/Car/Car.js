/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { ReactComponent as CarEmpty } from '../../assets/svg/cart-empty.svg';
import { ReactComponent as CarFull } from '../../assets/svg/cart-full.svg';
import { ReactComponent as CarClose } from '../../assets/svg/close.svg';
import { ReactComponent as CarDelete } from '../../assets/svg/garbage.svg';
import { STORAGE_PRODUCT_CARD, BASE_PATH } from '../../utils/constant';
import { countDuplicatesItemArray, removeArrayDuplicates, removeItemArray } from '../../utils/arrayFunction';
import './Car.scss';

export default function Car(props) {
  const [carOpen, setCarOpen] = useState(false);
  const widthCarContent = carOpen ? 400 : 0;
  const { productCar, getProductscard, products } = props;
  const [singelProductsCar, setSingelProductsCar] = useState([]);
  const [carTotalPrice, setCarTotalPrice] = useState(0);

  useEffect(() => {
    const allProductsId = removeArrayDuplicates(productCar);
    setSingelProductsCar(allProductsId);
  }, [productCar])

  useEffect(() => {
    const productData = [];
    let totalPrice = 0;

    const allProductsId = removeArrayDuplicates(productCar);

    allProductsId.forEach((productId) =>{
      const quantity = countDuplicatesItemArray(productId, productCar);
      const productValue = {
        id: productId,
        quantity: quantity
      };
      productData.push(productValue);
    });

    if (!products.loading && products.result) {
      products.result.forEach((product) =>{
        productData.forEach((item) =>{
          if(product.id == item.id){
            const totalValue = product.price * item.quantity;
            totalPrice = totalPrice + totalValue;
          }
        });
      });
    }
    setCarTotalPrice(totalPrice);
  }, [productCar, products]);

  const openCar = () => {
    setCarOpen(true);
    document.body.style.overflow = "hidden";
  }

  const closeCar = () => {
    setCarOpen(false);
    document.body.style.overflow = "scroll";
  }

  const emptyCar = () => {
    localStorage.removeItem(STORAGE_PRODUCT_CARD);
    getProductscard();
    closeCar();
  }

  const incrementQuantity = (id) => {
    const arrayItemsCar = productCar;
    arrayItemsCar.push(id);
    localStorage.setItem(STORAGE_PRODUCT_CARD, arrayItemsCar);
    getProductscard();
  }

  const decrementQuantity = (id) => {
    const arrayItemsCar = productCar;
    const result = removeItemArray(arrayItemsCar, id.toString());
    localStorage.setItem(STORAGE_PRODUCT_CARD, result);
    getProductscard();
  }

  return (
    <>
      <Button variant="link" className="car">
        {productCar.length > 0 
        ? (
          <CarFull onClick={openCar} />  
        ) 
        : (
          <CarEmpty onClick={openCar} />
        )}
      </Button>
      <div className="car-content" style= {{ width: widthCarContent }}>
        <CarContentHeader closeCar={closeCar} emptyCar={emptyCar} />
        <div className="car-content_Products">
          {singelProductsCar.map((idProductsCar, index) =>(
            <CarContentProducts
              key={index}
              products={products}
              idsProductsCar={productCar}
              idProductCar={idProductsCar}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />
          ))}
        </div>
        <CarContentFooter carTotalPrice={carTotalPrice} />
      </div>
    </>
  )
};

function CarContentHeader (props) {
  const {closeCar, emptyCar } = props;
  return (
    <div className="car-content_header">
      <div>
        <CarClose onClick={closeCar} />
        <h2>Carrito</h2>
      </div>
      <Button variant="link" onClick={emptyCar}>
        Vaciar
        <CarDelete />
      </Button>
    </div>
  )
}

function CarContentProducts (props) {
  const {
    products:{loading, result},
    idsProductsCar,
    idProductCar,
    incrementQuantity,
    decrementQuantity
  } = props;

  if (!loading && result) {
    return result.map((product, index) => {
      if (idProductCar == product.id) {
        const quantity = countDuplicatesItemArray(product.id, idsProductsCar);
        return(
          <RenderProduct
            key={index}
            product={product}
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        )
      }
    })
  }
  return ('hello null');
}

function RenderProduct(props) {
  const {
    product,
    quantity,
    incrementQuantity,
    decrementQuantity
  } = props;
  return(
    <div className="car-content_Product">
      <img src={`${BASE_PATH}${product.image}`} alt={product.name} />
      <div className="car-content_Product-info">
        <div>
          <h3>{product.name.substr(0, 20)}...</h3>
          <p>{product.price.toFixed(2)} $ / unidad</p>
        </div>
        <div>
          <p>Cantidad: {quantity}</p>
          <button onClick={() => incrementQuantity(product.id)}>+</button>
          <button onClick={() => decrementQuantity(product.id)}>-</button>
        </div>
      </div>
    </div>
  );
}

function CarContentFooter(props) {
  const {carTotalPrice} = props;
  
  return (
    <div className="car-content_Footer">
      <div>
        <p>Total Compra:</p>
        <p>{carTotalPrice.toFixed(2)} $</p>
      </div>
      <Button>Finalizar Compra</Button>
    </div>
  );
}