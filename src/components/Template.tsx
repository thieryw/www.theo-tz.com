import { makeStyles } from "theme";


export function Template() {

	const { classes} = useStyles();

	return <div className={classes.root}>

	</div>
}

const useStyles = makeStyles()(() => {
	return ({
		"root": {}

	})
});