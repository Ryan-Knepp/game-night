import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function WinnerPopup(props) {
  const { open, handleClose, winner } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title" disableTypography>
        <Typography
          copmonent="h2"
          variant="h2"
          align="center"
          style={{ fontSize: "1.75rem" }}
        >
          I think you should play
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography
          copmonent="h2"
          variant="h3"
          align="center"
          style={{ color: winner.color }}
        >
          {winner.title}!
        </Typography>
      </DialogContent>
      <DialogActions id="winner">
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WinnerPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  winner: PropTypes.object.isRequired
};

export default WinnerPopup;
