import React, { useState } from "react";

const QuantityInput = ({ onQuantityChange, itemName }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    let obj = {
      itemName: itemName,
      quantity: newQuantity,
    };
    onQuantityChange(obj); // Send new quantity to parent
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      let obj = {
        itemName: itemName,
        quantity: newQuantity,
      };
      onQuantityChange(obj); // Send new quantity to parent
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={handleDecrement} style={styles.button}>
        -
      </button>
      <input type="text" value={quantity} readOnly style={styles.input} />
      <button onClick={handleIncrement} style={styles.button}>
        +
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
  },
  input: {
    width: "40px",
    textAlign: "center",
    fontSize: "16px",
    margin: "0 10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px",
  },
};

export default QuantityInput;
