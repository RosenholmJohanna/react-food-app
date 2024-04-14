import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchDish from "./Components/searchDish";
import MealDetails from "./Components/MealDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchDish />}></Route>
        <Route path="meal-details/:idMeal" element={<MealDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;