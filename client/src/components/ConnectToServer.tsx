import { useContext, useEffect, useState } from "react";
import { Box, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SnackbarContext } from "src/providers/SnackbarProvider";
import { GameContext } from "src/providers/GameProvider";
import socketService from "src/services/socketService";
import { isEmptyString } from "src/utils/typeguards";

const ConnectToServer = () => {
	const { showSnackbar } = useContext(SnackbarContext);
	const { gameState, setGameState } = useContext(GameContext);

	const [ isFormDataValid, toggleIsFormDataValid ] = useState<boolean>(false);
	const [ serverUrl, setServerUrl ] = useState<string>("localhost:3001");
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const connectSocket = async () => {

		await socketService
			.connect(serverUrl)
			.then(() => {
				setGameState({ ...gameState, isConnected: true });
				showSnackbar("Połączyłeś się z serwerem!", "success");
				setIsLoading(false);
			})
			.catch((err) => {
				showSnackbar("Coś poszło nie tak. Nie udało się nawiązać połączenia z serwerem.", "error");
				setIsLoading(false);
				console.log("Error: ", err);
			});
	};
	const validateFormData = () => {
		isEmptyString(serverUrl) ? toggleIsFormDataValid(false) : toggleIsFormDataValid(true);
	};

	const onSubmit = () => {
		setIsLoading(true);
		connectSocket();
	};

	useEffect(() => {
		validateFormData();
	}, [ serverUrl ]);

	return (
		<Box>
			<Stack spacing={ 4 } sx={ {
				margin: "auto"
			} }>
				<Stack gap={ 2 } direction={ "column" }>
					<TextField
						id="server-address"
						label="Adres IP serwera"
						variant="outlined"
						value={ serverUrl }
						onChange={ (e) => setServerUrl(e.target.value) }/>
					<LoadingButton
						loading={ isLoading }
						variant="contained"
						onClick={ onSubmit }
						disabled={ !isFormDataValid }

					>
						Połącz
					</LoadingButton>
				</Stack>
			</Stack>
		</Box>
	);
};

export default ConnectToServer;