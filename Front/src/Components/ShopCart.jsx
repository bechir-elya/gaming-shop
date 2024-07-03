import { FaShoppingCart } from "react-icons/fa";
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, decrementQty, deleteProduct, shopCart } from "../features/shopSlice";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaTrashAlt } from "react-icons/fa";
import PayButton from "./PayButton";

function ShopCart() {

    const dispatch = useDispatch();
    const cart = useSelector(shopCart);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let totalOneProduct;
    let subTotal = 0;

    cart.map((item, index) => {
        totalOneProduct = item.price * item.quantity;
        return subTotal += totalOneProduct;
    });

    return (
        <>
            <FaShoppingCart onClick={handleShow} style={{ fontSize: '20px', cursor: "pointer", color: "white" }} />
            <Badge bg="danger">{cart.length}</Badge>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Your cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cart.length > 0 ? (
                        <>
                            {cart.map((item, index) => (
                                <div key={index} className="d-flex judstify-content-between align-items-center mb-4 product">
                                    <img src={`http://localhost:1530/uploads/${item.images[0]}`} alt={item.name} width={100} />
                                    <div>
                                        <p>{item.name}</p>
                                        <p><span>{item.quantity} x </span>{item.price}€</p>
                                        <p>{item.quantity * item.price}€</p>
                                    </div>
                                    <div className="trashNcount">
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="secondary" onClick={() => dispatch(decrementQty(item))}>-</Button>
                                            <Button className="bg-white" style={{color: 'black', border: 'none'}}>{item.quantity}</Button>
                                            <Button variant="secondary" onClick={() => dispatch(addToCart(item))}>+</Button>
                                        </ButtonGroup>
                                        <FaTrashAlt className="trash" onClick={() => dispatch(deleteProduct(item))}/>
                                    </div>
                                </div>
                            ))}

                            <div className="d-flex justify-content-between align-items-center">
                                <button className="clearCart" onClick={() => dispatch(clearCart())}>Clear cart</button>
                                <p>Total price:</p>
                                <p>{subTotal}€</p>
                            </div>

                            <PayButton cartItems={cart.cartItems} />
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default ShopCart