import React from "react";
import { useEffect, useState } from "react";
import {
  Grid,
  Modal,
} from "@mui/material";
import Calculator from "./Calculator";

const CalculatorModal = ({closeCal}) => {

  const [open, setOpen] = useState(true);

  const onclose = () => {
    setOpen(false);
    closeCal();
  };

  return (
    <Modal open={open} onClose={onclose}>
      <Grid
        sx={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 500,
          bgcolor: "#EEFCF8",
          outline: "none",
          borderRadius:"10px"
        }}
      >
        <Calculator/> 
      </Grid>
    </Modal>
  );
};

export default CalculatorModal;
