import React from "react";
import {
	AppBar,
	Button,
	Toolbar,
	Typography
} from "@material-ui/core";
import {
	ModalMenu
} from '../index';

export interface HeaderMenuProps {
	title: string,
	helpMessage: string[]
}
export const HeaderMenu: React.FunctionComponent<HeaderMenuProps> = (props) => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" className={props.title}>
					{props.title}
				</Typography>
				<ModalMenu
					triggerElement={<Button>Help</Button>}
					label={{
						title: "About this app",
						closeButton: "OK"
					}}
				>
					{props.helpMessage.join("\n")}
				</ModalMenu>
			</Toolbar>
		</AppBar>
	);
}