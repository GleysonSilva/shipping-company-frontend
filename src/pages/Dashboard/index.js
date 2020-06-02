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
import { GootaGO } from "./goota_go_fast.xlsx";
import { Logo } from "./logo.png";
import { Link } from "react-router-dom";
import firebaseDb from "../../firebase";
import BarChartIcon from "@material-ui/icons/BarChart";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import api from "../../services/api";
import TableChart from "@material-ui/icons/TableChart";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";

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
  textLogin: {
    fontWeight: "700",
    alignItems: "end",
    color: "#bdbdbd",
    fontSize: "18px",
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
    console.log("teste", params);
    let origin = {
      street: params[3][0],
      number: params[3][1],
      complement: params[3][2],
      locality: params[3][4],
      neighborhood: params[3][3],
      uf: params[3][5],
      zip_code: params[3][6],
    };
    let destiny = {
      street: params[7][0],
      number: params[7][1],
      complement: params[7][2],
      locality: params[7][4],
      neighborhood: params[7][3],
      uf: params[7][5],
      zip_code: params[7][6],
    };

    let order_pickup_date = `${String(params[10][0]).substr(0, 2)}/${String(
      params[10][0]
    ).substr(-6, 2)}/${String(params[10][0]).substr(-4)} 00:00`;
    let delivery_date = `${String(params[13][0]).substr(0, 2)}/${String(
      params[13][0]
    ).substr(-6, 2)}/${String(params[13][0]).substr(-4)} 00:00`;

    var array = [];
    params.forEach((element, index) => {
      if (index >= 17 && params.length - 1) {
        array.push({
          products: [element[0]],
          height: element[1],
          width: element[2],
          length: element[3],
          weight: element[4],
          quantity_of_packages: element[5],
          value: element[6],
        });
      }
    });

    setjson({
      user: 1,
      origin,
      destiny,
      delivery_date,
      order_pickup_date,
      arrayPackage: array,
    });
  };

  const saveInt = () => {
    api
      .post("/create_delivery_order/", json)
      .then((res) => {
        console.log("res", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
    //   const headers = {
    //     "Content-Type": "application/json",
    //     Authorization: "JWT fefege...",
    //   };

    //   api
    //     .post("create_delivery_order/", json, {
    //       headers: headers,
    //     })
    //     .then((res) => {
    //       console.log("res", res);
    //     })
    //     .catch((error) => {
    //       console.log("error", error);
    //     });
  };

  // const [json, setJson] = useState(initialState)

  const addOrEdit = () => {
    let formData = {
      fullname: "Gleyson Silva",
      emnail: "gleeysonEmilio@",
    };

    // firebaseDb.child("contacts").push(formData, (err) => {
    //   if (err) {
    //     console.log("err", err);
    //   }
    // });
  };
  React.useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        // console.log("snap", snapshot.val());
      }
    });
  }, []);

  const handleaddOrEdit = () => {
    // firebaseDb.child("contacts/-M8fcv106Acux0AczReDo").get(console.log());
    firebaseDb
      .collection("contacts")
      .where("emnail", "==", "gleeysonEmilioo")
      .get()
      .then(function (querySnapshot) {
        console.log("-->", querySnapshot);
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {view == 0 && "Gerar Novo Pedido"}
            {view == 1 && "Integração"}
            {view == 2 && "Excel"}
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
        <div className={`d-flex align-items-center ${classes.toolbar}`}>
          <div
            className={`col-12 d-flex justify-content-center ${classes.textLogin}`}
          >
            <Typography variant="h6" gutterBottom className={classes.textLogin}>
              GOOTA GO FAST
            </Typography>
            <div className="d-flex align-items-center">
              <BarChartIcon
                className="ml-2"
                style={{ webkitTransform: "rotate(-90deg)" }}
                fontSize="medium"
              />
              <LocalShippingIcon fontSize="medium" />
            </div>
          </div>
        </div>
        <Divider />
        <List>
          {["Gerar Pedidos", "Integração", "Excel"].map((text, index) => (
            <ListItem button key={text} onClick={() => setview(index)}>
              <ListItemIcon>
                {index == 0 && <MailIcon />}
                {index == 1 && <InboxIcon />}
                {index == 2 && <TableChart />}
                {/* {index % 2 === 0 ? <MailIcon /> : <InboxIcon />} */}
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
            {!excel.rows && (
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
            )}

            {excel.rows && (
              <div className="col-12 d-flex justify-content-center mt-2">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<DynamicFeedIcon />}
                  style={{
                    background: "#5c145c",
                  }}
                  onClick={saveInt}
                >
                  Integrar Ao Sistema{" "}
                </Button>
              </div>
            )}
            <div className="col-12 d-flex justify-content-center mt-2">
              {excel.rows && (
                <>
                  <OutTable
                    data={excel.rows}
                    columns={excel.cols}
                    tableClassName="ExcelTable2010"
                    tableHeaderRowClass="heading"
                  />
                </>
              )}
              {/* <div>
                <a href={GootaGO} download>
                  Download Planilhar Pra Integração
                </a>
                <a href={Logo}>Download</a>
                <Link to="./logo.png" target="_blank" download>
                  Download
                </Link>
                
                <a
                href="./logo.png"
                target="_blank"
                  rel="noopener noreferrer"
                  download
                  >
                  <Button>
                    <i className="fas fa-download" />
                    Download File
                    </Button>
                    </a>
                    <button onClick={addOrEdit}>:Teste FireBase</button>
                  </div> */}
              {/* <button onClick={addOrEdit}>Teste Edit</button> */}
            </div>
          </>
        )}
        {view === 2 && (
          <div>
            <div className={classes.toolbar} />
            <div className="col-12">
              Para Acessar a Planilhar Pra Integração
              <a
                href="https://onedrive.live.com/view.aspx?resid=1D82275F9FC36221!170614&ithint=file%2cxlsx&authkey=!AKJKb9C_g83q950"
                target="_blank"
              >
                {" "}
                Click Aqui!
              </a>
            </div>
            <div className="col-12 justify-content-center">
              <div className="col-12 mt-3">
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.textTitulo}
                >
                  Exemplo de Preechimento
                </Typography>
              </div>
              <div className="col-12">
                <iframe
                  width="1000"
                  height="800"
                  frameborder="0"
                  scrolling="no"
                  src="https://onedrive.live.com/embed?resid=1D82275F9FC36221%21170614&authkey=%21AHy0vNcYLmgRtIw&em=2&wdAllowInteractivity=False&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&waccluster=BR2"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
// https://pt.wix.com/crieseusite6/pt-logo-maker?utm_source=google&utm_medium=cpc&utm_campaign=yt_ads_br_logo_df_pt^top-web-serv&experiment_id=youtube.com^creative1^%2Finternet%20%26%20telecom%2Fweb%20services^&gclid=EAIaIQobChMIwJiZtsTe6QIVcy25Bh31sQ-oEAEYASAAEgL_RfD_BwE
