import React from 'react';
import { useTheme } from "@material-ui/core/styles";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide
} from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { TransitionProps } from '@material-ui/core/transitions';


export interface ModalMenuProps {
	label: {
		title: string
		closeButton: string
	}
	fullScreen?: boolean
	scroll?: "paper" | "body"
	triggerElement?: React.ReactElement
	transition?: boolean
}
export const ModalMenu: React.FunctionComponent<ModalMenuProps> = (props) => {
	// モーダルの開閉の状態管理
	const [open, setOpen] = React.useState(false);
	// レスポンシブフルスクリーンを設定
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	// トランジションを設定
	const Transition = React.forwardRef((props: TransitionProps & { children?: React.ReactElement<any, any> }, ref: React.Ref<unknown>) => {
		return <Slide direction="up" ref={ref} {...props} />;
	});
	// モーダルの開閉関数
	const handleClick = {
		open: () => setOpen(true),
		close: () => setOpen(false)
	};

	return (
		<React.Fragment>
			<div onClick={handleClick.open}>
				{props.triggerElement}
			</div>
			<Dialog
				fullScreen={props.fullScreen && fullScreen}
				scroll={props.scroll}
				TransitionComponent={(props.transition === true) ? Transition : undefined}
				open={open}
				onClose={handleClick.close}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{props.label.title}
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						id='scroll-dialog-description'
						tabIndex={-1}
					>
						{props.children}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClick.close} color="primary" autoFocus>
						{props.label.closeButton}
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}