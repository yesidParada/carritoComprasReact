import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Loading from '../Loading';
import Product from '../Product';
import './Products.scss';

export default function Products(props) {

  const { 
    products: { loading, result},
    addProductCard
  } = props;

  console.log(result)

  return (
    <Container>
      <Row>
        { loading || !result
          ? (<Loading />)
          : result.map((product, index) => (<Product key={index} product={product} addProductCard={addProductCard} />))}
      </Row>
    </Container>
  );
}