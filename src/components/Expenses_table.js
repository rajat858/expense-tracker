import React from "react";
import { useState, useEffect, useContext } from "react";
import "./Skeleton.css";
import { MyContext } from "./Skeleton";
import EditExpense from "./EditExpense";
function Expenses_table(props) {
  const {  handleEditClick , handleDelete } = useContext(MyContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(props.finalExpenses.length / itemsPerPage);
  useEffect(() => {
    // Reset current page when data changes
    setCurrentPage(1);
  }, [props.finalExpenses]);


  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // console.log("inside table");
  const paginatedExpenses = props.finalExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // console.log('paginatedEXP',paginatedExpenses);
  return (
    <div className="tableDiv">
      <table>
        <tbody>
          {paginatedExpenses.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <div className="trow">
                    <div className="titleDate">
                      <p>{item.title}</p>
                      <p>{item.date}</p>
                    </div>

                    <div className="priceAndIcons">
                      <h6>{item.price}</h6>
                      <button onClick={() => handleEditClick(item)}>
                        EDIT
                      </button>
                      <EditExpense />
                      <button onClick={() => handleDelete(item)}>DELETE</button>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          {"<"}
        </button>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === totalPages || paginatedExpenses.length === 0
          }
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Expenses_table;
