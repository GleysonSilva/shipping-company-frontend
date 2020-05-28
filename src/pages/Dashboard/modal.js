import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

export default function AlertDialog({ open, close }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Adicionar Mercadoria"}
        </DialogTitle>
        <DialogContent>
          {/* name: "",
        dimensions: "",
        Weight: "",
        value: "", */}
          <div className="col-12">
            <div className="col-12">
              {" "}
              <TextField
                id="standard-basic"
                label="Nome"
                fullWidth
                // value={data.logradouro}
              />
            </div>
            <div className="col-12 mt-2 d-flex p-0">
              <div className="col-4">
                <TextField
                  id="standard-basic"
                  label="Peso"
                  fullWidth
                  // value={data.logradouro}
                />
              </div>
              <div className="col-4">
                <TextField
                  id="standard-basic"
                  label="Dimensão"
                  fullWidth
                  // value={data.logradouro}
                />
              </div>
              <div className="col-4">
                <TextField
                  id="standard-basic"
                  label="valor"
                  fullWidth
                  // value={data.logradouro}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Disagree
          </Button>
          <Button onClick={close} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
