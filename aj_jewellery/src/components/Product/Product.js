import React from "react";
import { useEffect , useState } from "react";
import {
  Stack,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Modal,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import makeToast from "../../Toaster/Toaster";


const Product= ({card,closeProduct}) => {
  const navigate=useNavigate();
  // const [user,setUser]=useState();
  const [open, setOpen] = useState(true);

  //call use effect and get the value, it is added or not
  const [cart,setCart]=useState(0);



  const addToCart = async()=>{
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+"user/addToCart", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
          userId:localStorage.getItem("userId"),
          productId:card._id
      }),
    });

    const json = await response.json();
    makeToast("info","Added To Cart!!");
    setCart(1);
  }
  
  const removeFromCart=async()=>{
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+"user/removeFromCart", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId:localStorage.getItem("userId"),
        productId:card._id
      }),
    });

    const json = await response.json();
    makeToast("warning","Removed from Cart")
    setCart(0);
  }
  const getInitialProductDetail=async()=>{
    const userId=localStorage.getItem("userId");
    if(userId===""){
      setCart(2);
      return;
    }

    const response = await fetch(process.env.REACT_APP_BACKEND_URL+`user/cartItems/${userId}/${card._id}`);
    const json = await response.json();
    if(json.message.length>0){
      setCart(1);
    }
    else{
      setCart(0);
    }
  }

  
  const onclose = () => {
    setOpen(false);
    closeProduct();
  };

  const onclickButton = async () => {
      if(cart===0){
        addToCart();
      }
      else{
        removeFromCart();
      }
  };



  useEffect(()=>{
    getInitialProductDetail();
  },[])

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
          bgcolor: "background.paper",
          outline: "none",
        }}
      >
        <Stack direction="row" sx={{ width: "100%", height: "100%" }}>
          <Grid
            alingitems="center"
            justifyContent="center"
            sx={{
              width: "55%",
              backgroundImage: `url(${card.productPhoto})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
          <Stack
            direction="column"
            alingitems="center"
            justifyContent="center"
            sx={{ width: "45%", backgroundColor: "#533d58" }}
          >
            <Grid>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  fontSize: "2rem",
                  letterSpacing: ".1rem",
                  color: "#ddcda6",
                  textDecoration: "none",
                  textAlign: "center",
                  fontFamily: "Silkscreen,cursive",
                  lineHeight: "3",
                }}
              >
                {card.productName}
              </Typography>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mb: 5,
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  letterSpacing: ".1rem",
                  color: "#ddcda6",
                  textDecoration: "none",
                  textAlign: "center",
                  fontFamily: "Silkscreen,cursive",
                }}
              >
                {card.productType}
              </Typography>
            </Grid>
            <Grid>
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
                {/* <TextField
                  variant="standard"
                  size="medium"
                  label="Quantity"
                  color="primary"
                  type="number"
                  defaultValue="1"
                  inputProps={{ min: 0, max: card.productQuantity }}
                  sx={{
                    mb: 3,
                    textAlign: "center",
                    width:0.8,
                    height:100,
                  }}
                  id="quantity"
                /> */}
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={cart===2}
                  onClick={() => onclickButton()}
                  size="large"
                  fullWidth
                >
                  {cart===2?"Sign In First":cart===0?"Add To Cart":"Remove From Cart"}
                </Button>
              </Typography>
            </Grid>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mt: 5,
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: ".1rem",
                color: "#ddcda6",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Check Out More - 
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
                }}
              >
                Go Back
              </Link>
            </Typography>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mt: 5,
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: ".1rem",
                color: "#ddcda6",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Go to Home Page!
              <Link
                component="button"
                variant="body2"
                underline="hover"
                onClick={() => navigate('/')}
                sx={{
                  fontWeight: 800,
                  fontSize: "1rem",
                  letterSpacing: ".1rem",
                  fontFamily: "poppins",
                }}
              >
                Home Page
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Modal>
  );
};

export default Product;