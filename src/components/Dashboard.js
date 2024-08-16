import React from "react";
import Card from "./Card";
import Chart from "./Chart";

const Dashboard = () => {
  return (
    <div className=" ml-cl7 mr-cr1 pt-10">
      <Card/>
      <div className="py-4">
      <Chart/>
      </div>
    </div>
  );
};

export default Dashboard;
