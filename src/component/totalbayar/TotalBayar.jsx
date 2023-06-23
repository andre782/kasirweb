import React from 'react';
import { Row, Col, Button } from "react-bootstrap";
import { formatNumber } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../../utils/Constant';
import { useNavigate } from 'react-router-dom';

const TotalBayar = (props) => {
  const navigate = useNavigate();

  const submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: props.keranjangs
    }

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      navigate("/sukses");
    }).catch((error) => {
      console.error("Failed to submit total bayar:", error);
    });
  }

  const totalBayar = props.keranjangs.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);

  return (
    <>
    {/* website */}
    <div className="fixed-bottom d-none d-md-block" >
      <Row>
        <Col md={{ span: 3, offset: 9 }} className='px-4'>
          <h4>
            Total Harga: {" "}
            <strong style={{ position: 'absolute', top: '0', right: '0', marginRight: '20px' }}>
              Rp. {formatNumber(totalBayar)}
            </strong>
          </h4>
          <Button
            variant='primary'
            block
            style={{ width: '100%' }}
            className='mb-2 mt-3 mr-2 size="lg'
            onClick={() => submitTotalBayar(totalBayar)}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
          </Button>
        </Col>
      </Row>
    </div>


{/* mobile */}
    <div className="d-sm-block d-md-none">
      <Row>
        <Col md={{ span: 3, offset: 9 }} className='px-4'>
          <h4>
            Total Harga: {" "}
            <strong className='float-right mr-2'>
              <span style={{ float: 'right' }}>
                Rp. {formatNumber(totalBayar)}
              </span>
            </strong>
          </h4>
          <Button
            variant='primary'
            block
            style={{ width: '100%' }}
            className='mb-2 mt-3 mr-2 size="lg'
            onClick={() => submitTotalBayar(totalBayar)}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
          </Button>
        </Col>
      </Row>
    </div>

    </>
  );
}

export default TotalBayar;
