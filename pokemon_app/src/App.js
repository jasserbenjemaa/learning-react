import "./App.css";
import PokemonCollection from "./components/PokemonCollection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokemonPage from "./PokemonPage";
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <PokemonCollection /> /*,errorElement:<ErrorPage/>*/,
    },
    {
      path: "/:pokemonName",
      element: <PokemonPage />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
