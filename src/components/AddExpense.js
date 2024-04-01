import React from "react";
import "./Skeleton.css";
import ReactModal from "react-modal";
function AddExpense(props) {

  const customStyles = {
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "start",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "2px solid #ccc",
      borderRadius: "8px",
      padding: "20px", // Add some padding for spacing
      backgroundColor: "#efefef",
      opacity: "85%",
      minWidth: "208px",
      maxWidth: "25%", // Set maximum width
      maxHeight: "25%", // Set maximum height
      overflow: "auto", // Enable scrolling if content overflows
    },
  };

  return (
    <div className="walletBal">
            addExpense <br />
            <button onClick={props.handleExpenseModalClick}>Add Expense</button>
            <ReactModal isOpen={props.isExpenseModalOpen} style={customStyles}>
              <h2 style={{ marginTop: 0, marginBottom: "15px" }}>
                Add Expense
              </h2>
              <form onSubmit={props.handleAddExpenseSubmit}>
                <div className="formElementContainer">
                 
                <input
                  className="inputExpense"
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={props.expense.title}
                  onChange={props.handleExpenseChange}
                />
                <input
                  className="inputExpense"
                  name="price"
                  type="text"
                  placeholder="Price"
                  value={props.expense.price}
                  onChange={props.handleExpenseChange}
                />
                <select
                 className="inputCategory gridItem"
                  name="category"
                  placeholder="category"
                  value={props.expense.category}
                  onChange={props.handleExpenseChange}
                >
                  <option value="" disabled selected hidden>
                    Select Category
                  </option>
                  <option value="food">Food</option>
                  <option value="travel">Travel</option>
                  <option value="entertainment">Entertainment</option>
                </select>
                <input
                className="inputDate "
                  type="date"
                  name="date"
                  value={props.expense.date}
                  onChange={props.handleExpenseChange}
                />
                <button type="submit" className="addExpense">
                  Add Expense
                </button>
                <button onClick={props.handleExpenseModalClick} className="cancel">
                Cancel
              </button>

                </div>
                
              </form>
              
            </ReactModal>
          </div>
        
  )
}

export default AddExpense