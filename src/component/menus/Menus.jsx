import React from 'react';
import "./menus.scss";
import { Card, Col } from "react-bootstrap";
import { formatNumber }  from "../../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    
    <Col md={4} xs={6} className='mb-4'>
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <Card  className='card' style={{ width: '18rem' }} onClick={() => masukKeranjang(menu)}>
        <Card.Img variant="top" src={"images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar }/>
        <Card.Body>
          <Card.Title>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
          <Card.Text>
            Rp.{formatNumber(menu.harga)}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    </Col>
  );
};

export default Menus;
