import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Razorpay from "../Razorpay/Razorpay";
import { useNavigate } from "react-router-dom";

export default function AlertDialog({ product, price, close, quantity }) {
  const [open, setOpen] = React.useState(true);
  const navigate=useNavigate();

  const handleClose = () => {
    setOpen(false);
    close();
  };

  const confirmOrder = () => {
    Razorpay(product, price, quantity,navigate);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirm Placing the Order"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`You've order ${product.productName} a ${product.productMetal} product of weight ${product.productWeight}g, billing to Rs. ${price}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel Order</Button>
        <Button onClick={confirmOrder} autoFocus>
          Confirm Order!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
