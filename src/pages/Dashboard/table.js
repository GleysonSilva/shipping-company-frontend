import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Modal from "./modal";
import ReactFileReader from "react-file-reader";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function SimpleTable() {
  const classes = useStyles();
  const [list, setlist] = React.useState([]);
  const [modal, setmodal] = React.useState(false);

  return (
    <>
      <TableContainer component={Paper}>
        <div className="col-12 d-flex justify-content-end p-2">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => setmodal(true)}
            className={classes.button}
            startIcon={<AddIcon />}
            style={{
              background: "#5c145c",
            }}
          >
            Adicionar
          </Button>{" "}
        </div>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={modal} close={() => setmodal(false)} />
    </>
  );
}

// class FileReader extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       csvfile: undefined,
//     };
//     this.updateData = this.updateData.bind(this);
//   }

//   handleChange = (event) => {
//     this.setState({
//       csvfile: event.target.files[0],
//     });
//   };

//   importCSV = () => {
//     const { csvfile } = this.state;
//     Papa.parse(csvfile, {
//       complete: this.updateData,
//       header: true,
//     });
//   };

//   updateData(result) {
//     var data = result.data;
//     console.log(data);
//   }

//   render() {
//     console.log(this.state.csvfile);
//     return (
//       <div className="App">
//         <h2>Import CSV File!</h2>
//         <input
//           className="csv-input"
//           type="file"
//           ref={(input) => {
//             this.filesInput = input;
//           }}
//           name="file"
//           placeholder={null}
//           onChange={this.handleChange}
//         />
//         <p />
//         <button onClick={this.importCSV}> Upload now!</button>
//       </div>
//     );
//   }
// }

// export default FileReader;
