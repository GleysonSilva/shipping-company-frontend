import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ViaCep from "react-via-cep";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#fff",
      color: "#000",
    },
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    color: "#000",
  },
  button: {
    margin: theme.spacing(1),
  },
  textTitulo: {
    fontWeight: "800",
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const [state, setstate] = React.useState({ cepDest: "", cepOrig: "" });
  const [view, setview] = React.useState(0);
  const handleSetIndex = (params) => {
    console.log("p", params);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {view === 0 ? "Gerar Novo Pedido" : "Lista de Pedidos Gerado"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {["Gerar Pedidos", "Lista de Pedidos"].map((text, index) => (
            <ListItem button key={text} onClick={() => setview(index)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <span style={{ color: "red" }}>tttt</span>
      <main className={classes.content}>
        {view == 0 ? (
          <>
            <div className={classes.toolbar} />
            <Paper elevation={3} className="p-3 m-0">
              <Typography
                variant="h6"
                gutterBottom
                className={classes.textTitulo}
              >
                Origem <ArrowForwardIcon />
              </Typography>
              <ViaCep cep={state.cepOrig} lazy>
                {({ data, loading, error, fetch }) => {
                  console.log("data", data);
                  if (loading) {
                    return <p>loading...</p>;
                  }
                  if (data) {
                    return (
                      <div className="col-12 d-flex">
                        <div className="col-2">
                          <TextField
                            id="standard-basic"
                            label="localidade"
                            value={data.localidade}
                          />
                        </div>
                        <div className="col-2">
                          {" "}
                          <TextField
                            id="standard-basic"
                            label="logradouro"
                            value={data.logradouro}
                          />
                        </div>
                        <div className="col-2">
                          {" "}
                          <TextField
                            id="standard-basic"
                            label="numero"
                            // value={data.logradouro}
                          />
                        </div>
                        <div className="col-2">
                          <TextField
                            id="standard-basic"
                            label="uf"
                            value={data.uf}
                          />
                        </div>
                        <div className="col-2">
                          <TextField
                            fullWidth
                            id="standard-basic"
                            label="ibge"
                            value={data.ibge}
                          />
                        </div>
                        <div className="col-2">
                          <TextField
                            fullWidth
                            id="standard-basic"
                            label="pais"
                            value={"brasil"}
                          />
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className="col-12 d-flex">
                      <div>
                        <TextField
                          id="standard-basic"
                          label="Cep"
                          value={state.cepOrig}
                          onChange={(e) =>
                            setstate({
                              ...state,
                              cepOrig: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mt-2">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.button}
                          startIcon={<SearchIcon />}
                          onClick={fetch}
                        >
                          Pesquisar
                        </Button>
                      </div>
                    </div>
                  );
                }}
              </ViaCep>
            </Paper>
            <Paper elevation={3} className="p-3 mt-2 m-0">
              <Typography
                variant="h6"
                gutterBottom
                className={classes.textTitulo}
              >
                Destino
                <ArrowBackIcon />
              </Typography>
              <ViaCep cep={state.cepDest} lazy>
                {({ data, loading, error, fetch }) => {
                  console.log("data", data);
                  if (loading) {
                    return <p>loading...</p>;
                  }
                  if (data) {
                    return (
                      <div className="col-12 d-flex">
                        <div className="col-2">
                          <TextField
                            id="standard-basic"
                            label="localidade"
                            value={data.localidade}
                          />
                        </div>
                        <div className="col-2">
                          {" "}
                          <TextField
                            id="standard-basic"
                            label="logradouro"
                            value={data.logradouro}
                          />
                        </div>
                        <div className="col-2">
                          {" "}
                          <TextField
                            id="standard-basic"
                            label="numero"
                            // value={data.logradouro}
                          />
                        </div>
                        <div className="col-2">
                          <TextField
                            id="standard-basic"
                            label="uf"
                            value={data.uf}
                          />
                        </div>
                        <div className="col-2">
                          <TextField
                            fullWidth
                            id="standard-basic"
                            label="ibge"
                            value={data.ibge}
                          />
                        </div>
                        <div className="col-2">
                          <TextField
                            fullWidth
                            id="standard-basic"
                            label="pais"
                            value={"brasil"}
                          />
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className="col-12 d-flex">
                      <div>
                        <TextField
                          id="standard-basic"
                          label="Cep"
                          value={state.cepDest}
                          onChange={(e) =>
                            setstate({
                              ...state,
                              cepDest: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mt-2">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={classes.button}
                          startIcon={<SearchIcon />}
                          onClick={fetch}
                        >
                          Pesquisar
                        </Button>
                      </div>
                    </div>
                  );
                }}
              </ViaCep>
            </Paper>
            <div className="col-12 d-flex justify-content-end">
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Salvar
              </Button>
            </div>
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
