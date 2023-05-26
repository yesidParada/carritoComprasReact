import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Car from '../Car';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg'
import './TopMenu.scss';

export default function TopMenu(props) {
  const { productCar, getProductscard, products } = props;
  return (
    <Navbar bg="dark" variant="dark" className="TopMenu">
      <Container>
        <BrandNav/>
        <MenuNav />
        <Car
          productCar={productCar}
          getProductscard={getProductscard}
          products={products}
        />
      </Container>
    </Navbar>
  );
}

function BrandNav() {
  return (
    <Navbar.Brand>
      <Logo/>
      <h2>Casa de los helados</h2>
    </Navbar.Brand>
  );
}

function MenuNav() {
  return (
    <Nav className="mr-auto">
      <Nav.Link href="#">Aperitivos</Nav.Link>
      <Nav.Link href="#">Helados</Nav.Link>
      <Nav.Link href="#">Mascotas</Nav.Link>
    </Nav>
  );
}