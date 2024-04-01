import { useContext } from "react";
import React from "react";
import ReactModal from "react-modal";
import { MyContext } from "./Skeleton";

function EditExpense() {
  const {
    isEditModalOpen,
    currentItem,
    handleEditClick,
    handleEditExpenseSubmit,
    handleEditExpenseChange,
  } = useContext(MyContext);

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
    <ReactModal isOpen={isEditModalOpen} style={customStyles}>
      <h2 style={{ marginTop: 0, marginBottom: "15px" }}>Edit Expense</h2>
      <form onSubmit={handleEditExpenseSubmit}>
        <div className="formElementContainer">
          <input
            className="inputExpense"
            name="title"
            type="text"
            placeholder="Title"
            value={currentItem.title}
            onChange={handleEditExpenseChange}
          />
          <input
            className="inputExpense"
            name="price"
            type="text"
            placeholder="Price"
            value={currentItem.price}
            onChange={handleEditExpenseChange}
          />
          <select
            className="inputCategory gridItem"
            name="category"
            placeholder="category"
            value={currentItem.category}
            onChange={handleEditExpenseChange}
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
            value={currentItem.date}
            onChange={handleEditExpenseChange}
          />
          <button type="submit" className="addExpense">
            Edit Expense
          </button>
          <button onClick={handleEditClick} className="cancel">
            Cancel
          </button>
        </div>
      </form>
    </ReactModal>
  );
}

export default EditExpense;
