import React from "react";
import "./Skeleton.css";

function Skeleton() {
  return (
    <div className="innerBox">
      <div className="a1">
        <h2 className="title">Expense Tracker</h2>
      </div>
      <div className="a2">
        <div className="wallet">
          
          <div className="walletBal">addBal</div>
          <div className="walletBal">addExpense</div>
        </div>

        <div className="piechart">pieCHart</div>
      </div>
      <div className="a3">
      <div className="recent"><h2>Recent Transactions</h2></div>
      <div className="topexpense"><h2>Top Expenses</h2></div>
      </div>
    </div>
  );
}

export default Skeleton;
