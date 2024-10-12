import React from 'react';

const CartModal = ({ cartItems, onClose, sendOrder }) => {
  const cartItemsArray = Object.values(cartItems); // Convert the object into an array

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h2>Your Cart</h2>
        {cartItemsArray && cartItemsArray.length > 0 ? (
          <ul style={styles.cartList}>
            {cartItemsArray.map((item, index) => (
              <li key={index} style={styles.cartItem}>
                <div style={styles.itemName}>{item.itemName}</div>
                <div style={styles.itemQuantity}>Quantity: {item.quantity}</div>
                <div style={styles.itemPrice}>Price: ${item.price}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty</p>
        )}
        <button style={styles.closeButton} onClick={onClose}>
          Close
        </button>
        <button style={styles.closeButton} onClick={() => { sendOrder() ;onClose();}}>
          Order
        </button>
      </div>
    </div>
  );
};

// Inline styles (you can replace these with CSS classes)
const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    textAlign: 'center',
  },
  cartList: {
    listStyle: 'none',
    padding: 0,
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontStyle: 'italic',
  },
  itemPrice: {
    color: 'green',
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: "1rem"
  },
};

export default CartModal;