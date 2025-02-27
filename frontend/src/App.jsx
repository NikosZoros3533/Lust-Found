import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage"
import ConnectionPage from "./pages/ConnectionPage"
import CreateConnectionPage from "./pages/CreateConnectionPage"
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/list" element={<ListPage/>} />
        <Route path="/list/:id" element={<ConnectionPage/>} />
        <Route path="/new" element={<CreateConnectionPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
