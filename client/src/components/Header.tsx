import Logo from "src/components/Logo";
import { ReactComponent as UserIcon } from "src/assets/images/user-icon.svg";
import { ReactComponent as RoomIcon } from "src/assets/images/room-icon.svg";
import { useContext } from "react";
import { GameContext } from "src/providers/GameProvider";

const Header = () => {
	const { gameState, setGameState } = useContext(GameContext);

	return (
		<div className="header">
			<Logo styles={ { width: "150px", height: "100%" } }/>
			{
				(gameState.roomCode !== "" && gameState.username !== "")
				&&
                <div className="header__info">
                    <div className="header__info-box">
                        <UserIcon/>
                        <div className="header__text-wrapper">
                            <span className="header__text-label">Nazwa użytkownika</span>
                            <span className="header__text">{ gameState.username }</span>
                        </div>
                    </div>
                    <div className="header__info-box">
                        <RoomIcon/>
                        <div className="header__text-wrapper">
                            <span className="header__text-label">Nazwa pokoju</span>
                            <span className="header__text">{ gameState.roomCode }</span>
                        </div>
                    </div>
                </div>
			}

		</div>
	);
};

export default Header;