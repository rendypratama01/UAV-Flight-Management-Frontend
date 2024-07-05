import React from "react";
import Card from "./Card";
import Chart from "./Chart";

const Dashboard = () => {
  return (
    <div className="absolute ml-cl7 mr-cr1 mt-ct1">
      <Card/>
      <div className="py-4">
      <Chart/>
      </div>
    </div>
  );
};

export default Dashboard;
