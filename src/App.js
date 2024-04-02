import "./App.css";
import Skeleton from "./components/Skeleton";
import Modal from "react-modal";
Modal.setAppElement('#root');
function App() {
  return (
    <div id="root" className="App">
      <Skeleton />
    </div>
  );
}

export default App;
