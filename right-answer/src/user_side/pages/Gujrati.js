import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button, // Import Button from @mui/material
} from "@mui/material";
import { useParams } from 'react-router-dom';
import QuantityInput from "./QuantityInput";

const Gujrati = () => {

  const currentDate = new Date();
  const date = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const curretnSecond = currentDate.getSeconds();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const { id } = useParams();

  const [cartItems, setCartItems] = useState({});

  const createCart = async () => {
    fetch('http://localhost:4000/newOrder', {
      method: 'POST',
      body: JSON.stringify({
        "table":id,
        "year":currentYear.toString(),
        "month":(currentMonth+1).toString(),
        "date":date.toString(),
        "hour":currentHour.toString(),
        "minute":currentMinute.toString(),
        "second":curretnSecond.toString(),
        "total_price":countTotal(),
        "total_quantity":countQuantity(),
        "read":false,
        "approved":false,
        // "orderItems":{
        //   itemName:{
        //     "item":itemName,
        //     "quantity":1,
        //     "price":itemPrice
        //   }
        //   }
        "orderItems": cartItems
        }),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
          })
          .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
          })
          .then(data => {  

          })
          .catch(error => {
          console.error('Fetch error:', error);
          });
  }

  const countTotal = () => {
    let total = 0;
    for(let key in cartItems)
    {
      total += cartItems[key].price * cartItems[key].quantity;
    }
    return total;
  }

  const countQuantity = () => {
    let quantity = 0;
    for(let key in cartItems)
    {
      quantity += cartItems[key].quantity;
    }
    return quantity;
  }

  const handleOrderClick = (itemName, itemPrice) => {
    let obj = cartItems;
    if(obj[itemName])
    {
      obj[itemName].quantity = obj[itemName].quantity + 1;
    }
    else
    {
      obj[itemName] = {
        "itemName": itemName,
        "quantity": 1,
        "price": itemPrice
      }
    }

    setCartItems(obj);
    console.log(obj)
  };

      const [MenuList , setMenuData] = useState([]);

      useEffect(() => {
        fetch('http://localhost:4000/getMenu', {
        method: 'POST',
        body: JSON.stringify({
            "branch_name": "vadodara"
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
            })
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then(data => {  
              var temp_cat = [];
              var temp_menuData = [];
              Object.keys(data).forEach(key => {
                temp_cat.push(key);
                var temp_items = [];
                Object.keys(data[key]).forEach(keys => {
                  temp_items.push(keys);
                  temp_menuData.push(data[key][keys]);
                });
              });   
              setMenuData(temp_menuData);
            })
            .catch(error => {
            console.error('Fetch error:', error);
            });
      });

      const handleQuantityChange = (newQuantity) => {
        if(newQuantity.quantity > 0)
          cartItems[newQuantity.itemName].quantity = newQuantity.quantity;
        else
          {
            let obj = cartItems;
            delete obj[newQuantity.itemName];
            setCartItems(obj);
          }
        console.log(cartItems);
      };


  return (
    <Layout>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {MenuList.map((menuItem) => (
          <Card key={menuItem.name} sx={{ maxWidth: "300px",display: "flex", m: 2 }}>
            <CardActionArea>
              <CardMedia
                sx={{ minHeight: "400px", maxHeight:"400px", maxWidth:"250px" }}
                component={"img"}
                image={menuItem.image_link}
                alt={menuItem.name}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom component={"div"}>
                  {menuItem.name}
                </Typography>
                <Typography variant="h6" gutterBottom component={"div"}>
                  {menuItem.price} Rs
                </Typography>
                <Typography variant="body2">{menuItem.description}</Typography>
                {!cartItems[menuItem.name] && <Button onClick={() => handleOrderClick(menuItem.name, menuItem.price)} variant="contained" color="primary">
                  Order Now
                </Button>}
                {cartItems[menuItem.name] && <QuantityInput onQuantityChange={handleQuantityChange} itemName={menuItem.name}/>}
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <button onClick={createCart}>Send Order</button>
    </Layout>
  );
};

export default Gujrati;
