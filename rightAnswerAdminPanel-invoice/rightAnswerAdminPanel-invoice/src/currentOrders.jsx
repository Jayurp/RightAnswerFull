import React, { useEffect, useState } from "react";
import "./NewOrders.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function CurrentOrders() {
  const [newOrderData, setNewOrderData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [popUpArray, setPopUpArray] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [taxedRate, setTaxedRate] = useState([]);
  const [Index, setIndex] = useState();
  const [tableNumber, setTableNumber] = useState();
  var insideData = [];
  const [isChecked, setIsChecked] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (open == false) {
        setRefreshCount((count) => count + 1);
      }
    }, 20);
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleClickOpen = (index) => {
    setIndex(index);
    setTableNumber(newOrderData[index].table);
    let arr = [];
    for (let key in newOrderData[index].orderItems) {
      arr.push(newOrderData[index].orderItems[key]);
    }
    setPopUpArray(arr);
    setTaxedRate(
      newOrderData[index]["total_price"] +
        newOrderData[index]["total_price"] * 0.05
    );
    setOpen(true);
  };

  const acceptOrder = () => {
    newOrderData[Index].payment = isChecked;
    fetch("http://localhost:4000/doneOrder", {
      method: "POST",
      body: JSON.stringify(newOrderData[Index]),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error("Fetch error:", error);
      });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:4000/getCurrentOrders", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let arr = data[1];
        let temp = [];
        for (let key in data) {
          temp.push(data[key]);
        }
        setNewOrderData(temp);
        // var temp_order = [];
        // var temp_itemData = [];
        // var temp_totalAmount = [];
        // Object.keys(data).forEach((key) => {
        //   Object.keys(data[key]).forEach((key2) => {
        //     temp_order.push(data[key][key2]);
        //     Object.keys(data[key][key2]).forEach((key3) => {
        //       if (key3 == "orderItems") {
        //         temp_itemData.push(data[key][key2][key3]);
        //       }
        //     });
        //   });
        // });
        // setNewOrderData(temp_order);
        // setItemData(temp_itemData);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <>
      <div id="currentOrders">
        <h1>Current Orders</h1>
      </div>

      <div id="orderCards">
        {newOrderData.map((OrderData, index) => (
          <>
            <Card
              key={OrderData.orderItems}
              sx={{
                maxWidth: 350,
                minWidth: 350,
                marginTop: "10%",
                marginLeft: "-15%",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Table Number : {OrderData.table}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Total Quantity: {OrderData.total_quantity}
                  <br />
                  Total Price: ₹{OrderData.total_price}
                  <br />
                  Time: {OrderData.hour}:{OrderData.minute}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleClickOpen(index)}>
                  Show More
                </Button>
              </CardActions>
            </Card>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Table Number: {tableNumber}
              </DialogTitle>
              <DialogContent>
                <TableContainer>
                  <Table sx={{ minWidth: 500 }} aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Desc</TableCell>
                        <TableCell align="right">Qty.</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {popUpArray.map((PopUpArray) => (
                        <>
                          <TableRow key={PopUpArray.item}>
                            <TableCell>{PopUpArray.itemName}</TableCell>
                            <TableCell align="right">
                              {PopUpArray.quantity}
                            </TableCell>
                            <TableCell align="right">
                              ₹{PopUpArray.price}
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={3} />
                      </TableRow>
                      <TableRow>
                        <TableCell>Tax</TableCell>
                        <TableCell align="right">5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Total</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>₹{taxedRate}</b>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <br />
                <input
                  type="checkbox"
                  id="paymentCheckbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />{" "}
                Payment Done
              </DialogContent>
              <DialogActions>
                <Button onClick={acceptOrder} autoFocus>
                  Mark as Done
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ))}
      </div>
    </>
  );
}

export default CurrentOrders;
