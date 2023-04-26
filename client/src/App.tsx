import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "src/routes/Root";
import ErrorPage from "src/routes/ErrorPage";
import GamePage from "src/routes/GamePage";
import { useState } from "react";
import { GameState } from "src/types/types";
import { GameContext } from "./providers/GameProvider";
import SnackbarProvider from "./providers/SnackbarProvider";
import { createTheme, ThemeProvider } from "@mui/material";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root/>,
		errorElement: <ErrorPage/>
	},
	{
		path: "/start",
		element: <div>Zagraj w grę!</div>
	},
	{
		path: "/game",
		element: <GamePage/>
	},
	{
		path: "/end",
		element: <div>Gra zakończona!</div>
	}
]);

function App() {
	const [ gameState, setGameState ] = useState<GameState>({
		allPlayers: [],
		isConnected: false,
		isStarted: false,
		hasJoined: false,
		username: "",
		roomCode: null,
		clientCount: 0
	});

	const theme = createTheme({
		palette: {
			primary: {
				main: "#a677dd"
			},
			secondary: {
				main: "#77DDDA"
			}
		},
		typography: {
			fontFamily: "Poppins"
		}
	});

	return (
		<ThemeProvider theme={ theme }>
			<GameContext.Provider value={ { gameState, setGameState } }>
				<SnackbarProvider>
					<RouterProvider router={ router }/>
				</SnackbarProvider>
			</GameContext.Provider>
		</ThemeProvider>
	);
}

export default App;
