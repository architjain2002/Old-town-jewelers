import React from "react";
import { useEffect, useState } from "react";
import {
  Stack,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import makeToast from "../../Toaster/Toaster";

const CreateModal = ({ closeProduct,onCreate}) => {
  const navigate = useNavigate();
  // const [user,setUser]=useState();
  const [open, setOpen] = useState(true);

  const onclose = () => {
    setOpen(false);
    closeProduct();
  };

  const createProduct= async ()=>{
    const productName=document.getElementById("name");
    const productQuantity=document.getElementById("quantity");
    const productWeight=document.getElementById("weight");
    const productMetal=document.getElementById("metal");
    const productType=document.getElementById("type");
    const productPurety=document.getElementById("purety");
    const productPhoto=document.getElementById("photo");
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+"admin/addProduct", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
          productName:productName.value ,
          productQuantity:productQuantity.value,
          productWeight:productWeight.value,
          productMetal:productMetal.value,
          productType:productType.value,
          productPurety:productPurety.value,
          productPhoto:productPhoto.value
      }),
    });

    const json=await response.json();
    onCreate();
    onclose();
    makeToast("info","Created Successfully");
  }

  return (
    <Modal open={open} onClose={onclose}>
      <Grid
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 600,
          bgcolor: "#EEFCF8",
          outline: "none",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "cursive",
            color: "#035E7B",
            marginBottom:"2rem"
          }}
        >
          Add New Product
        </Typography>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // border:"2px solid black"
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              width: "100%",
              fontWeight: 800,
              fontSize: 25,
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            <TextField
              variant="standard"
              size="medium"
              label="Name"
              color="primary"
              type="text"
              sx={{
                mb: 1,
                textAlign: "center",
                width: 0.8,
              }}
              id="name"
            />
          </Typography>
          <Typography
            variant="h6"
            noWrap
            sx={{
              width: "100%",
              fontWeight: 800,
              fontSize: 25,
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            <TextField
              variant="standard"
              size="medium"
              label="Quantity"
              color="primary"
              type="number"
              sx={{
                mb: 1,
                textAlign: "center",
                width: 0.8,
              }}
              id="quantity"
            />
          </Typography>
          <Typography
            variant="h6"
            noWrap
            sx={{
              width: "100%",
              fontWeight: 800,
              fontSize: 25,
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            <TextField
              variant="standard"
              size="medium"
              label="Weight"
              color="primary"
              type="number"
              sx={{
                mb: 1,
                textAlign: "center",
                width: 0.8,
              }}
              id="weight"
            />
          </Typography>
          <Typography
            variant="h6"
            noWrap
            sx={{
              width: "100%",
              fontWeight: 800,
              fontSize: 25,
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            <TextField
              variant="standard"
              size="medium"
              label="Metal"
              color="primary"
              type="text"
              sx={{
                mb: 1,
                textAlign: "center",
                width: 0.8,
              }}
              id="metal"
            />
          </Typography>
          <Typography
            variant="h6"
            noWrap
            sx={{
              width: "100%",
              fontWeight: 800,
              fontSize: 25,
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            <TextField
              variant="standard"
              size="medium"
              label="Type"
              color="primary"
              type="text"
              sx={{
                mb: 1,
                textAlign: "center",
                width: 0.8,
              }}
              id="type"
            />
          </Typography>
          <Typography
            variant="h6"
            noWrap
            sx={{
              width: "100%",
              fontWeight: 800,
              fontSize: 25,
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            <TextField
              variant="standard"
              size="medium"
              label="Purety"
              color="primary"
              type="number"
              sx={{
                mb: 1,
                textAlign: "center",
                width: 0.8,
              }}
              id="purety"
            />
          </Typography>
          <Typography
            variant="h6"
            noWrap
            sx={{
              width: "100%",
              fontWeight: 800,
              fontSize: 25,
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            <TextField
              variant="standard"
              size="medium"
              label="Picture Link"
              color="primary"
              type="text"
              sx={{
                textAlign: "center",
                width: 0.8,
                height: 60,
              }}
              id="photo"
            />
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => createProduct()}
            size="large"
          >
            Add Product
          </Button>
        </Grid>

        
          <Link
            component="button"
            variant="body2"
            underline="hover"
            onClick={() => onclose()}
            sx={{
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: ".1rem",
              fontFamily: "poppins",
              marginLeft:"15rem",
              marginTop:"2rem"
            }}
          >
            Go Back
          </Link>
        
      </Grid>
    </Modal>
  );
};

export default CreateModal;
