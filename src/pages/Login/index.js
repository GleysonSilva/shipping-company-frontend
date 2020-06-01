import React from "react";
import api from "../../services/api";
import Paper from "@material-ui/core/Paper";
import "./style.css";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BarChartIcon from "@material-ui/icons/BarChart";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // flexWrap: "wrap",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing("auto"),
      height: theme.spacing(20),
    },
  },
  textLogin: {
    fontWeight: "700",
    fontSize: "xx-large",
    alignItems: "baseline",
    color: "#bdbdbd",
  },
  rot: { webkitTransform: "rotate(-90deg)" },
}));

export default function Login({ history }) {
  const [email, setEmail] = React.useState("");
  const classes = useStyles();

  async function handleSubmit(event) {
    history.push("/dashboard");
    // event.preventDefault();
    const response = await api.post("/login", { email });
    console.log(response);

    // const { _id } = response.data;
    // localStorage.setItem("user", _id);
  }
  return (
    <div className={`col-12 img ${classes.root}`}>
      <div className="col-3 justify-content-center login-modal">
        <Paper elevation={3} className="mt-5">
          <div className="col-12 p-5 ">
            <div>
              <div
                className={`col-12 d-flex justify-content-center ${classes.textLogin}`}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.textLogin}
                >
                  GOOTA GO FAST
                </Typography>
                <div className="d-flex align-items-center">
                  <BarChartIcon
                    className="ml-2"
                    style={{ webkitTransform: "rotate(-90deg)" }}
                  />
                  <LocalShippingIcon fontSize="large" />
                </div>
              </div>
              <TextField id="standard-basic" label="Login" fullWidth />
            </div>
            <div className="d-flex justify-content-center p-4">
              <Button
                variant="outlined"
                size="small"
                className={classes.margin}
                onClick={handleSubmit}
                style={{
                  color: "#5c145c",
                }}
              >
                Entrar
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}

{
  /* <form onSubmit={handleSubmit}>
    <label htmlFor="email">Login</label>
    <input
      type="email"
      id="email"
      placeholder="Seu melhor email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
    <button className="btn" onClick={() => history.push("/dashboard")}>
      Entrar{" "}
    </button>
  </form> */
}
