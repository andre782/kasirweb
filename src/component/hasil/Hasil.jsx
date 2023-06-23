import React, { Component } from 'react';
import { Col, ListGroup, Row, Badge,  } from 'react-bootstrap';
import { formatNumber } from '../../utils/utils';
import TotalBayar from '../totalbayar/TotalBayar';
import  ModalKeranjangs  from "../modal/ModalKeranjang"
import axios from 'axios';
import { API_URL } from '../../utils/Constant';
import swal from 'sweetalert';
import "./hasil.scss"


export default class Hasil extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: '',
      totalHarga: 0,
    };
  }
  
  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      Keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };
  
  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah= () => {
    this.setState({
      jumlah: this.state.jumlah+1,
      totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah + 1),

    });
  };

  kurang= () => {
   if(this.state.jumlah !== 1) {
    this.setState({
      jumlah: this.state.jumlah-1,
      totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah - 1),

    });
   }
  }

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose();
  
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };
  
    axios
      .put(API_URL + 'keranjangs/'+this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getListKeranjang();
       swal({
          title: 'Update pesanan',
          text: 'Sukses Update pesanan' + data.product.nama,
          icon: 'success',
          button: false,
          timer: 1500,
        });
        this.getListKeranjang();
      })
      .catch((error) => {
        console.log('Error yaa ', error);
      });  
  };

  hapusPesanan = (id) => {
    
    this.handleClose();
    axios
      .delete(API_URL + 'keranjangs/'+id)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: 'Hapus pesanan',
          text: 'Sukses hapus pesanan' + this.state.keranjangDetail.product.nama,
          icon: 'error',
          button: false,
          timer: 1500,
        });
        this.getListKeranjang();
      })
      .catch((error) => {
        console.log('Error yaa ', error);
      });
  
    
  };





  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3}>
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />

        <div className='overflow-auto scroll'>
        {keranjangs.length !== 0 && (
          <ListGroup>
            {keranjangs.map((menuKeranjang) => (
              <ListGroup.Item key={menuKeranjang.product.nama} onClick={() => this.handleShow(menuKeranjang)}>
                <Row>
                  <Col xs={2}>
                  <h4>
                    <Badge pill variant="succes">
                        {menuKeranjang.jumlah}
                    </Badge>
                  </h4>
                  </Col>
                  <Col>
                  <h5>{menuKeranjang.product.nama}</h5>
                  <p>Rp. {formatNumber(menuKeranjang.product.harga)}</p>
                  </Col>
                  <Col>
                  <strong className="float-end">Rp. {formatNumber(menuKeranjang.total_harga)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

        <ModalKeranjangs handleClose={this.handleClose} {...this.state} 
            tambah={this.tambah} 
            kurang={this.kurang} 
            changeHandler={this.changeHandler}
            handleSubmit={this.handleSubmit}
            hapusPesanan={this.hapusPesanan}
            />
            
         </ListGroup>
        )} 
        </div>
          
        <TotalBayar keranjangs={keranjangs} {...this.props}/>
      </Col>
    );
  }
}
