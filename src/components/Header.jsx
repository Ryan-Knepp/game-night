import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import "../styles/Header.css";

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.primary.main
  },
  header: {
    maxWidth: 800,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 1}px`,
    color: theme.palette.common.white
  },
  content: {
    margin: "auto"
  }
});

function Header(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <div className={classes.header} id="header">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="inherit"
          className={`headerTitle ${classes.content}`}
          gutterBottom
        >
          Game Night
        </Typography>
        <Typography
          copmonent="h2"
          variant="h6"
          align="center"
          color="inherit"
          className={`headerSubtitle ${classes.content}`}
          paragraph
        >
          Not sure what game to play? This will help you decide.
        </Typography>
      </div>
    </div>
  );
}

export default withStyles(styles)(Header);
