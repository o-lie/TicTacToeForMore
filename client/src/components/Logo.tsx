import LogoSrc from "src/assets/images/logo.png";

type Props = {
	styles?: React.CSSProperties
}
const Logo = (props: Props) => {
	return (
		<img src={ LogoSrc } style={ props.styles }/>
	);
};

export default Logo;