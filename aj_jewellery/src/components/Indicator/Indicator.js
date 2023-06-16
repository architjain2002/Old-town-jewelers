import React from "react";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Button, Grid, Modal, Typography } from "@mui/material";
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

const formatDate = (i) => {
  // Create a new Date object
  var currentDate = new Date();

  // Subtract 5 days from the current date
  currentDate.setDate(currentDate.getDate() + i);

  // Get the year, month, and day
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1; // Add 1 because months are zero-based
  var day = currentDate.getDate();

  // Format the date as desired (e.g., "YYYY-MM-DD")
  var formattedDate =
    day.toString().padStart(2, "0")+
    "-" +
    month.toString().padStart(2, "0") +
    "-" +
    year;

  return formattedDate;
};

const Indicator = ({ closeIndicator }) => {
  const [open, setOpen] = useState(true);
  const [gold, setGold] = useState();
  const [silver, setSilver] = useState();
  const [flag, setFlag] = useState(1);

  let dates = [];
  for (let i = -7; i < 8; i++) {
    dates.push(formatDate(i));
  }
  dates[7]="Today";

  const forecastUtility = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "forecast");
    const json = await response.json();
    setGold(json["Gold"]);
    setSilver(json["Silver"]);
  };

  const setDatasets = () => {};
  const onclose = () => {
    setOpen(false);
    closeIndicator();
  };

  useEffect(() => {
    //call /forecast from python backend
    //set today's gold and silver price from localstorage
    forecastUtility();
  }, []);

  useEffect(() => {}, [flag]);

  const data = {
    //all 8 days -> including today

    labels: dates,
    datasets: [
      {
        label: "Gold Price",
        data:flag? gold:[],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Silver Price",
        data: flag?[]:silver,
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
          transform: "translate(-50%, -45%)",
          width: 1000,
          height: 550,
          bgcolor: "#dedede", //#EEFCF8",
          outline: "none",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Line data={data} options={options} width={"1000px"} height={"500px"}/>
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
          }}
        >
          <Button
            size="larger"
            onClick={()=>setFlag(!flag)}
          >{flag?"Gold":"Silver"} Price Prediction</Button>
        </Typography>
      </Grid>
    </Modal>
  );
};

export default Indicator;
