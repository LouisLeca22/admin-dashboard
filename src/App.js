import Home from "./pages/home/Home";
import { Suspense } from "react";
import List from "./pages/list/List";
import Single from "./pages/single/Single"
import New from "./pages/new/New"
import { productInputs, userInputs } from "./formSource";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import "./style/dark.scss"
import { useContext } from "react";
import { DarkModeContext } from "./context/darkContext";

function App() {
  const {darkMode} = useContext(DarkModeContext)

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
          </Route>
          <Route path="users">
            <Route index element={<List type="users" />} />
            <Route path=":id" element={<Single />} />
            <Route path="new" element={<New  inputs={userInputs} type="users"/>} />
          </Route>
          <Route path="products">
            <Route index element={<List type="products" />} />
            <Route path=":id" element={<Single />} />
            <Route path="new" element={<New  inputs={productInputs} type="products"/>} />
          </Route>
          <Route path="orders">
            <Route index element={<List type="orders" />} />
          </Route>
          <Route path="deliveries">
            <Route index element={<List type="deliveries" />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
