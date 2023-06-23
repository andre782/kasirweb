import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { formatNumber } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./modal.scss"


const ModalKeranjang = ({
    showModal, 
    handleClose, 
    keranjangDetail, 
    jumlah, 
    keterangan,
    tambah,
    kurang,
    changeHandler,
    handleSubmit,
    totalHarga,
    hapusPesanan
}) => {

    
  
    if(keranjangDetail) {
               return (
            <div>
                
                <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>
                            {keranjangDetail.product.nama} {" "}
                            <strong>
                                (Rp. {formatNumber(keranjangDetail.product.harga)})
                            </strong>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Total Harga :</Form.Label>
                            <p>
                                <strong>
                            (Rp. {formatNumber(totalHarga)})
                                </strong>
                            </p>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Jumlah :</Form.Label>
                            <br/>
                            <Button variant='primary' size='sm' className='jarak' onClick={ () => kurang()}>
                                <FontAwesomeIcon icon={faMinus} />
                         </Button>
                         <strong>{jumlah}</strong>
                         <Button variant='primary' size='sm' className='spasi' onClick={ () => tambah()}>
                                <FontAwesomeIcon icon={faPlus}/>
                         </Button>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Keterangan :</Form.Label>
                            <Form.Control as="textarea" 
                            rows={3} 
                            name="keterangan" 
                            placeholder="contoh : pedas, Nasi Banyakin"
                            value={keterangan}
                            onChange={(event) => changeHandler(event)}
                            />
                        </Form.Group>
                            <Button variant='primary' type='submit' >
                                Simpan
                            </Button>

                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
                           <FontAwesomeIcon icon={faTrash}/> Hapus pesanan
                          </Button>
                        </Modal.Footer>
                    </Modal>
        
            </div>
          )
  }else {
    return (
        <div>
            
            <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                       kosong
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>kosong</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                </Modal>
    
        </div>
      )
  }
}

export default ModalKeranjang