import { useContext, useEffect, useState } from "react";
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SnackbarContext } from "src/providers/SnackbarProvider";
import { GameContext } from "src/providers/GameProvider";
import SocketService from "src/services/socketService";
import { AvatarTypeEnum } from "src/types/types";
import { isEmptyString } from "src/utils/typeguards";

type Data = {
	username: string,
	roomCode: string
}

const JoinRoom = () => {
	const { showSnackbar } = useContext(SnackbarContext);
	const { gameState, setGameState } = useContext(GameContext);

	const [ isUsernameTaken, toggleIsUsernameTaken ] = useState<boolean>(false);
	const [ isFormDataValid, toggleIsFormDataValid ] = useState<boolean>(false);
	const [ data, setData ] = useState<Data>(
		{
			username: "",
			roomCode: ""
		}
	);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);

	const validateFormData = () => {
		if (isEmptyString(data.username) || isEmptyString(data.roomCode)) {
			toggleIsFormDataValid(false);
		} else {
			toggleIsFormDataValid(true);
		}
	};

	const onSubmit = async () => {
		setIsLoading(true);

		await SocketService
			.joinRoom(data)
			.then(() => {
				setGameState({ ...gameState, hasJoined: true, roomCode: data.roomCode, username: data.username });
				showSnackbar("Dołączyłeś do gry!", "success");
				setIsLoading(false);
			})
			.catch((err) => {
				showSnackbar(err, "error");
				setIsLoading(false);
				console.log("Error: ", err);
			});
	};

	useEffect(() => {
		validateFormData();
	}, [ data ]);

	return (

		<Box>
			<Stack spacing={ 4 } sx={ {
				margin: "auto"
			} }>
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
						error={ isUsernameTaken }
						helperText={ isUsernameTaken ? "Ta nazwa użytkownika jest zajęta." : "" }
					/>
					<TextField
						id="room-code"
						label="Nazwa pokoju"
						variant="outlined"
						value={ data.roomCode }
						onChange={ (e) => setData(prevState => ({
							...prevState,
							roomCode: e.target.value
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

export default JoinRoom;