import React from "react";
import "./Skeleton.css";
import ReactModal from "react-modal";
function AddBalance(props) {
  return (
    <div className="walletBal">
      Wallet Balance: {props.balance}
      <button onClick={props.handleIncomeModalClick}>Add Income</button>
      <ReactModal isOpen={props.isModalOpen} style={props.customStyles}>
        <div className="modaltitle">
          <h2 style={{ marginTop: 0, marginBottom: "15px" }}>Add Balance</h2>
        </div>

        <div className="modalcontent">
          <form onSubmit={props.handleAddBalanceSubmit}>
            <input
              className="inputBalance"
              type="text"
              placeholder="Income Amount"
              value={props.incomeAmount !== 0 ? props.incomeAmount : ""}
              onChange={props.handleIncomeChange}
            />
            <button type="submit" className="addBalance">
              Add Balance
            </button>
          </form>
          <button onClick={props.handleIncomeModalClick} className="cancel">
            Cancel
          </button>
        </div>
      </ReactModal>
    </div>
  );
}

export default AddBalance;
