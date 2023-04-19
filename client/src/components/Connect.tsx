import { useContext, useEffect, useState } from "react";
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SnackbarContext } from "src/providers/SnackbarProvider";
import { GameContext } from "src/providers/GameProvider";
import socketService from "src/services/socketService";
import { AvatarTypeEnum } from "src/types/types";

type Data = {
	serverAddress: string,
	username: string
}

const Connect = () => {
	const { showSnackbar } = useContext(SnackbarContext);
	const { gameState, setGameState } = useContext(GameContext);

	const [ isFormDataValid, toggleIsFormDataValid ] = useState<boolean>(false);
	const [ data, setData ] = useState<Data>(
		{
			serverAddress: "",
			username: ""
		}
	);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const connectSocket = async () => {

		const socket = await socketService
			.connect(data?.serverAddress)
			.then(() => {
				if (setGameState) {
					setGameState({ ...gameState, isConnected: true, username: data.username });
				}
				showSnackbar("Pomyślnie połączono z serwerem!", "success");
				setIsLoading(false);
			})
			.catch((err) => {
				showSnackbar("Coś poszło nie tak. Nie udało się nawiązać połączenia z serwerem.", "error");
				setIsLoading(false);
				console.log("Error: ", err);
			});

	};

	const validateFormData = () => {
		if (data.serverAddress === "" || data.username === "") {
			toggleIsFormDataValid(false);
		} else {
			toggleIsFormDataValid(true);
		}
	};

	const onSubmit = () => {
		setIsLoading(true);
		connectSocket();
	};

	useEffect(() => {
		validateFormData();
	}, [ data ]);

	useEffect(() => {
		if (setGameState) {
			setGameState({ ...gameState, isConnected: false });
		}

	}, [ socketService.socket?.connected ]);

	socketService?.socket?.on("getRooms", (data) => {
		console.log(data);
	});
	return (

		<Box>
			<Stack spacing={ 4 } sx={ {
				margin: "auto"
			} }>
				<Typography variant={ "h1" } align={ "center" }>TicTacToeForMore</Typography>
				<Stack gap={ 2 } direction={ "column" }>
					<TextField
						id="username"
						label="Nazwa użytkownika"
						variant="outlined"
						value={ data.username }
						onChange={ (e) => setData(prevState => ({
							...prevState,
							username: e.target.value
						})) }
					/>
					<TextField
						id="server-address"
						label="Adres IP serwera"
						variant="outlined"
						value={ data.serverAddress }
						onChange={ (e) => setData(prevState => ({
							...prevState,
							serverAddress: e.target.value
						})) }/>
					<FormControl>
						<FormLabel id="user-shape">Kształt</FormLabel>
						<RadioGroup
							aria-labelledby="user-shape"
							defaultValue="apple"
							name="radio-buttons-group"
						>
							<FormControlLabel value={ AvatarTypeEnum.APPLE } control={ <Radio/> } label="Jabłko"/>
							<FormControlLabel value="lemon" control={ <Radio/> } label="Cytryna"/>
							<FormControlLabel value="pepper" control={ <Radio/> } label="Papryka"/>
						</RadioGroup>
					</FormControl>
					<LoadingButton
						loading={ isLoading }
						variant="contained"
						onClick={ onSubmit }
						disabled={ !isFormDataValid }

					>
						Dołącz do gry
					</LoadingButton>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Connect;