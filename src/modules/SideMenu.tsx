import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
	Link,
	Drawer,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
} from '@material-ui/core';
import {
	ChevronLeft,
	SvgIconComponent
} from '@material-ui/icons';

const drawerWidth = 240;

export interface SideMenuItem {
	href: string
	name: string
	icon: SvgIconComponent
	text: string
}
export interface SideMenuProps {
	width?: number
	items: SideMenuItem[]
	state: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}
export const SideMenu: React.FunctionComponent<SideMenuProps> = (props) => {
	const classes = makeStyles((theme) => ({
		drawer: {
			width: props.width || drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: props.width || drawerWidth,
		},
		drawerHeader: {
			display: 'flex',
			alignItems: 'center',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
			justifyContent: 'flex-end',
		},
	}))();
	React.useEffect(() => {
		props.state[1](props.state[0]);
	}, [props.state[0]]);

	return (
		<Drawer
			className={classes.drawer}
			variant='persistent'
			anchor='left'
			open={props.state[0]}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className={classes.drawerHeader}>
				<IconButton onClick={() => props.state[1](false)}>
					<ChevronLeft />
				</IconButton>
			</div>
			<Divider />
			<List>
				{
					props.items.map(item => {
						return (
							<Link href={item.href}>
								<ListItem button key={item.name}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText>{item.text}</ListItemText>
								</ListItem>
							</Link>
						)
					})
				}
			</List>
		</Drawer>
	);
}