import React from "react";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Grid, Modal, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const Indicator = ({ closeIndicator }) => {
  const [open, setOpen] = useState(true);

  const onclose = () => {
    setOpen(false);
    closeIndicator();
  };

  useEffect(() => {
    //call /forecast from python backend
    //set today's gold and silver price from localstorage
  }, []);

  const data = {
    //all 8 days -> including today

    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Gold Price",
        data: [50000, 51000, 52000, 53000, 54000, 49000],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Silver Price",
        data: [53000, 54000, 51000, 52000, 55000, 53000],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      x: {
        // type: "category",
        // beginAtZero: true,
      },
      y: {},
    },
  };

  return (
    <Modal open={open} onClose={onclose}>
      <Grid
        sx={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 450,
          bgcolor: "#dedede", //#EEFCF8",
          outline: "none",
          borderRadius: "10px",
          padding: "20px",
        }}>
        <Line data={data} options={options} />
        {/* give label as metal prediction */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
            fontFamily: "cursive",
            color: "#035E7B",
            padding: "1rem",
          }}>
          Metal Price Prediction
        </Typography>
      </Grid>
    </Modal>
  );
};

export default Indicator;
