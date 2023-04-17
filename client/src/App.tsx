import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "src/routes/Root";
import ErrorPage from "src/routes/ErrorPage";
import GamePage from "src/routes/GamePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />
	},
	{
		path: "/start",
		element: <div>Zagraj w grę!</div>,
	},
	{
		path: "/game",
		element: <GamePage />
	},
	{
		path: "/end",
		element: <div>Gra zakończona!</div>,
	},
]);

function App() {
	return (
		<RouterProvider router={ router } />
	);
}

export default App;
