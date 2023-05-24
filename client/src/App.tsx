import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "src/routes/Root";
import ErrorPage from "src/routes/ErrorPage";
import { useState } from "react";
import { GameState } from "src/types/types";
import { GameContext } from "./providers/GameProvider";
import SnackbarProvider from "./providers/SnackbarProvider";
import { createTheme, ThemeProvider } from "@mui/material";
import { initialGameState } from "src/utils/constants";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root/>,
		errorElement: <ErrorPage/>
	}
]);

function App() {
	const [ gameState, setGameState ] = useState<GameState>(initialGameState);

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
