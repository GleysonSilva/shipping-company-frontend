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
import Tables from "./table";
import ReactFileReader from "react-file-reader";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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
  const [view, setview] = React.useState(0);
  const [state, setstate] = React.useState({
    cepDest: "",
    cepOrig: "",
    excel: "",
  });
  const [excel, setexcel] = React.useState({ cols: "", rows: "" });
  const [arrayPackage, setarrayPackage] = React.useState([]);
  const [json, setjson] = React.useState([
    {
      user: 0,
      origin: {
        street: "",
        number: 0,
        complement: "",
        neighborhood: "",
        locality: "",
        uf: "",
        zip_code: "",
      },
      destiny: {
        street: "",
        number: 0,
        complement: "",
        neighborhood: "",
        locality: "",
        uf: "",
        zip_code: "",
      },
      order_pickup_date: "",
      delivery_date: "",
      package: [
        {
          products: [0],
          height: 0.0,
          width: 0.0,
          length: 0.0,
          weight: 0.0,
          quantity_of_packages: 0,
          value: 0.0,
        },
      ],
    },
  ]);

  const handleFiles = (files) => {
    console.log(files);
    fileHandler(files);
  };

  const fileHandler = (files) => {
    let fileObj = files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        handleFormJson(resp.rows);
        setexcel({
          cols: resp.cols,
          rows: resp.rows,
        });
      }
    });
  };
  const handleFormJson = (params) => {
    console.log("p", params);
    let origin = {
      complement: params[2][3],
      locality: params[2][5],
      neighborhood: params[2][4],
      number: params[2][1],
      street: params[2][0],
      uf: params[2][6],
      zip_code: params[2][7],
    };
    let destiny = {
      complement: params[6][3],
      locality: params[6][5],
      neighborhood: params[6][4],
      number: params[6][1],
      street: params[6][0],
      uf: params[6][6],
      zip_code: params[6][7],
    };

    let order_pickup_date = params[9][0];
    let delivery_date = params[12][0];

    var array = [];
    params.forEach((element, index) => {
      if (index >= 16 && params.length - 1) {
        array.push({
          products: element[0],
          height: element[1],
          width: element[2],
          length: element[3],
          weight: element[4],
          quantity_of_packages: element[5],
          value: element[6],
        });
      }
    });

    console.log([
      {
        origin,
        destiny,
        delivery_date,
        order_pickup_date,
        arrayPackage: array,
      },
    ]);
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
        {view === 0 ? (
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
                          style={{
                            background: "#5c145c",
                          }}
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
                          style={{
                            background: "#5c145c",
                          }}
                        >
                          Pesquisar
                        </Button>
                      </div>
                    </div>
                  );
                }}
              </ViaCep>
            </Paper>
            <div className="col-12 m-0 mt-2 p-0">{/* <Tables /> */}</div>

            <div className="col-12 d-flex justify-content-end">
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
                style={{
                  background: "#5c145c",
                }}
              >
                Salvar
              </Button>
            </div>
          </>
        ) : (
          ""
        )}
        {view === 1 && (
          <>
            <div className={classes.toolbar} />

            <div className={"col-12 d-flex justify-content-center p-5"}>
              <ReactFileReader handleFiles={handleFiles} fileTypes={".xlsx"}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<CloudUploadIcon />}
                  style={{
                    background: "#5c145c",
                  }}
                >
                  Carregar Arquivo
                </Button>
                {/* <button className="btn">Upload</button> */}
              </ReactFileReader>
            </div>
            <dic className="col-12 d-flex justify-content-center mt-2">
              {excel.rows && (
                <OutTable
                  data={excel.rows}
                  columns={excel.cols}
                  tableClassName="ExcelTable2010"
                  tableHeaderRowClass="heading"
                />
              )}
            </dic>
          </>
        )}
      </main>
    </div>
  );
}
