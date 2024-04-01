import React, { useState, createContext, useContext } from "react";
import "./Skeleton.css";
import ReactModal from "react-modal";
import AddBalance from "./AddBalance";
import AddExpense from "./AddExpense";
import Expenses_table from "./Expenses_table";
export const MyContext = createContext();
function Skeleton() {
  const [balance, setBalance] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expense, setExpense] = useState({
    id: 0,
    title: "",
    price: "",
    category: "",
    date: "",
  });
  const [id, setId] = useState(1);
  const [finalExpenses, setFinalExpenses] = useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); //table states
  const [currentItem, setCurrentItem] = useState({});//stores the  transaction when corresponding edit button is clicked

  const expenseValidator = (expenseItem)=>{ //verifying valid expense when adding and editing 
    if(expenseItem.title &&
      expenseItem.price &&
      !isNaN(Number(expenseItem.price)) &&
      Number(expenseItem.price) >= 0 &&
      expenseItem.category &&
      expenseItem.date &&
      new Date(expenseItem.date) <= new Date().setHours(23, 59, 59, 999) && //comparing date with current date with end of day time
      balance - Number(expense.price) >= 0 //so the user won't be able to add expense greater than balance
    )
    {
      return true;
    }

    return false;
  }
  //-----------------------------------------------ADD BALANCE------------------------------------
  const handleIncomeChange = (e) => {
    setIncomeAmount(e.target.value);
  };
  const handleIncomeModalClick = (event) => {
    event.preventDefault();
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };
  const handleAddBalanceSubmit = (event) => {
    event.preventDefault();
    if (!isNaN(Number(incomeAmount)) && Number(incomeAmount) >= 0) {
      // check if income provided is a number and is greater than or equal to 0
      setBalance(incomeAmount);
    }
    setIsModalOpen(false);
  };

  //-------------------------------------------------ADD expense-----------------------------------------------------

  const handleExpenseModalClick = () => {
    if (isExpenseModalOpen) {
      setIsExpenseModalOpen(false);
    } else {
      setIsExpenseModalOpen(true);
    }
  };
  const handleExpenseChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  const handleAddExpenseSubmit = (e) => {
    e.preventDefault();
    if (
     expenseValidator(expense)
    ) {
      setBalance((prevBalance) => prevBalance - Number(expense.price));
      const addId = { id: id };
      setExpense((prevExpense) => ({ ...prevExpense, ...addId }));
      setId((prevId) => prevId + 1);
      setFinalExpenses([expense, ...finalExpenses]);
    }
    setIsExpenseModalOpen(false);
  };

  //--------------------------------------------------EDIT expense-----------------------------------------------------

  const handleEditClick = (item) => {
    setCurrentItem(() => item);
    if (isEditModalOpen) {
      setIsEditModalOpen(false);
    } else {
      setIsEditModalOpen(true);
    }
  };

  const handleEditExpenseChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCurrentItem((prevExpense) => ({ ...prevExpense, [name]: value }));
  }
    

  const handleEditExpenseSubmit = (e) => {
    e.preventDefault();
    
    
    let previousPrice;
    const updatedExpenses = finalExpenses.map((item) => {
      //returns an array of object
      if (item.id === currentItem.id) {
        previousPrice = Number(item.price);
        return { ...item, ...currentItem };
      }
      return item;
    });

    if (
      expenseValidator(currentItem)
    ) {
      setBalance(
        (prevBalance) => (prevBalance + previousPrice) - Number(currentItem.price)
      );
      setFinalExpenses(()=>updatedExpenses);
    }

    setIsEditModalOpen(false);
    
  };

  //---------------------------------------------DELETE functionality------------------------------------------
  const handleDelete =(item)=>{
    setCurrentItem(()=>item);
    let previousPrice = Number(currentItem.price);
  const updatedExpenses = finalExpenses.filter((expItem) => (expItem.id !== item.id))

  if (
    expenseValidator(currentItem)
  ) {
    setBalance(
      (prevBalance) => (prevBalance + previousPrice) - Number(currentItem.price)
    );
    setFinalExpenses(()=>updatedExpenses);
  }


  }

  const contextValues = {
    isEditModalOpen,
    currentItem,
    finalExpenses,
    handleEditClick,
    handleEditExpenseSubmit,
    handleEditExpenseChange,
    handleDelete
  };

  

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
      maxHeight: "12%", // Set maximum height
      overflow: "auto", // Enable scrolling if content overflows
    },
  };

  return (
    <div className="innerBox">
      <div className="a1">
        <h2 className="title">Expense Tracker</h2>
      </div>
      <div className="a2">
        <div className="wallet">
          <AddBalance
            {...{
              balance,
              incomeAmount,
              isModalOpen,
              handleIncomeChange,
              handleIncomeModalClick,
              handleAddBalanceSubmit,
              customStyles,
            }}
          />
          {/* <div className="walletBal">
            Wallet Balance: {balance} <br />
            <button onClick={handleIncomeModalClick}>Add Income</button>
            <ReactModal isOpen={isModalOpen} style={customStyles}>
              <h2 style={{ marginTop: 0, marginBottom: "15px" }}>
                Add Balance
              </h2>
              <form onSubmit={handleAddBalanceSubmit}>
                <input
                  className="inputBalance"
                  type="text"
                  placeholder="Income Amount"
                  value={incomeAmount}
                  onChange={handleIncomeChange}
                />
                <button type="submit" className="addBalance">
                  Add Balance
                </button>
              </form>
              <button onClick={handleIncomeModalClick} className="cancel">
                Cancel
              </button>
            </ReactModal>
          </div> */}
          {/* ------------------------------------------------------------------ */}
          {/* <div className="walletBal">
            addExpense <br />
            <button onClick={handleExpenseModalClick}>Add Expense</button>
            <ReactModal isOpen={isExpenseModalOpen} style={customStyles}>
              <h2 style={{ marginTop: 0, marginBottom: "15px" }}>
                Add Expense
              </h2>
              <form onSubmit={handleAddExpenseSubmit}>
                <input
                  className="inputExpense"
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={expense.title}
                  onChange={handleExpenseChange}
                />
                <input
                  className="inputExpense"
                  name="price"
                  type="text"
                  placeholder="Price"
                  value={expense.price}
                  onChange={handleExpenseChange}
                />
                <select
                  name="category"
                  placeholder="category"
                  value={expense.category}
                  onChange={handleExpenseChange}
                >
                  <option value="" disabled selected hidden>
                    Select Category
                  </option>
                  <option value="food">Food</option>
                  <option value="travel">Travel</option>
                  <option value="entertainment">Entertainment</option>
                </select>
                <input
                  type="date"
                  name="date"
                  value={expense.date}
                  onChange={handleExpenseChange}
                />
                <button type="submit" className="addExpense">
                  Add Expense
                </button>
              </form>
              <button onClick={handleExpenseModalClick} className="cancel">
                Cancel
              </button>
            </ReactModal>
          </div> */}
          <AddExpense
            {...{
              handleExpenseModalClick,
              handleExpenseChange,
              handleAddExpenseSubmit,
              isExpenseModalOpen,
              expense,
              finalExpenses,
              customStyles,
            }}
          />
        </div>

        <div className="piechart">pieCHart</div>
      </div>
      <div className="a3">
        <div className="recent">
          <h2 className="title2">Recent Transactions</h2>
          <MyContext.Provider value={contextValues}>
            <Expenses_table {...{ finalExpenses }} />
          </MyContext.Provider>

          {/* <div className="tableDiv">
            <table>
              <tbody>
                <tr>
                  <div className="trow">
                    <div className="titleDate">
                       <p>Samosa</p>
                       <p>23rd March, 2024</p>
                    </div>

                    <div className="priceAndIcons">
                       
                       <h6>PRICE</h6>
                       <button>EDIT</button>
                       <button>DELETE</button>

                    </div>

                  </div>
                </tr>

                
              </tbody>
            </table>
          </div> */}
        </div>
        <div className="topexpense">
          <h2 className="title3">Top Expenses</h2>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
