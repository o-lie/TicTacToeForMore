import { createContext, PropsWithChildren, useState } from "react";
import { SnackbarState } from "src/types/types";
import { Alert, AlertColor, Snackbar } from "@mui/material";

const initialState: SnackbarState = {
	isOpen: false,
	message: "",
	type: "info"
};

type SnackbarContextActions = {
	showSnackbar: (message: string, type: AlertColor) => void;
}

export const SnackbarContext = createContext({} as SnackbarContextActions);

const SnackbarProvider = ({ children }: PropsWithChildren) => {
	const [ snackbarState, setSnackbarState ] = useState<SnackbarState>(initialState);

	const showSnackbar = (message: string, type: AlertColor) => {
		setSnackbarState({
			message: message,
			type: type,
			isOpen: true
		});
	};

	return (
		<SnackbarContext.Provider value={ { showSnackbar } }>
			<Snackbar
				open={ snackbarState.isOpen }
				autoHideDuration={ 6000 }
				onClose={ () => setSnackbarState(prevState => {
					return {
						...prevState,
						isOpen: false
					};
				}) }
				message={ snackbarState.message }
			>
				<Alert
					onClose={ () => setSnackbarState(prevState => {
						return {
							...prevState,
							isOpen: false
						};
					}) }
					severity={ snackbarState.type }
				>
					{ snackbarState.message }
				</Alert>
			</Snackbar>
			{
				children
			}
		</SnackbarContext.Provider>
	);
};

export default SnackbarProvider;