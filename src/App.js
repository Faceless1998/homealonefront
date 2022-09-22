import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./components/admin";
import AddNewProduct from "./components/addNewProduct";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Admin} />
          <Route path="/addProduct" component={AddNewProduct} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
