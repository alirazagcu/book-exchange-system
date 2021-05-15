import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

export default function CustomDatePicker({
    setBooksData,
    booksData
}) {
    const [inputValueState, setInputValueState] = React.useState({
        inputValues:{
            startDate : "",
            endDate : "",
            searchBySearch : ""
        }
    })
    const [buttonState, setButtonState] = React.useState(false)
    const [resetFlag, setResetFlag] = React.useState(false)

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const {inputValues}   = inputValueState;
        setInputValueState({
            inputValues: {
                ...inputValues,
                [name]: value,
            }
        })
      }
    const submitHandler = () =>{
        const {startDate, endDate, searchBySearch}   = inputValueState.inputValues;
        if(
            startDate === "" || endDate === ""
            || startDate > endDate
        ){
        }
        else if( searchBySearch === ""){
            const filteredBooks = booksData.filter(book => book.updated_date.slice(0, book.updated_date.indexOf("T")) >= startDate && book.updated_date.slice(0, book.updated_date.indexOf("T")) <= endDate )
            setBooksData(filteredBooks.length !== 0 ? filteredBooks: [])
            setButtonState(true)
        }
        else{
            const filteredBooks = booksData.filter(book => book.updated_date.slice(0, book.updated_date.indexOf("T")) >= startDate && book.updated_date.slice(0, book.updated_date.indexOf("T")) <= endDate && book.status === searchBySearch )
            setBooksData(filteredBooks.length !== 0 ? filteredBooks: [])
            setButtonState(true)
        }
    }

    const ResetHandler = () =>{
        setBooksData(booksData)
        setInputValueState({inputValues:{
            startDate : "",
            endDate : "",
            searchBySearch : ""
        }})
        setButtonState(false)
    }
    const classes = useStyles();

  return (
      <div style={{marginTop: "20px"}}>
        <div className={classes.root}>
        <Grid container spacing={4} >
            <Grid item xs>
                <label>Start Date:</label><br/>
                <input value={inputValueState.inputValues.startDate} name = "startDate" type="date" onChange={handleChange}/>
            </Grid>
            <Grid item xs>
                <label>End Date:</label><br/>
                <input value={inputValueState.inputValues.endDate}  name="endDate" type="date" onChange={handleChange}/>
            </Grid>
            <Grid item xs style={{marginTop: "13px"}}>
                <Button variant="contained" style={{backgroundColor: "white"}} >
                    <select 
                        name="searchBySearch" 
                        id="select" 
                        value={inputValueState.inputValues.searchBySearch} 
                        onChange={handleChange}
                        >
                        <option >Search By Status</option>
                        <option value="sold">Sold</option>
                        <option value="booked">Booked</option>
                        <option value="new">New</option>
                    </select>
                </Button>   
            </Grid>
            <Grid item xs style={{marginTop: "13px"}} >
                <Button size="small" variant="contained" style={{backgroundColor: "white"}} onClick={()=>{
                    submitHandler()
                    }}>
                   Search
                </Button>
            </Grid>
            <Grid item xs style={{marginTop: "13px"}} >
                <Button size="small" variant="contained" style={{backgroundColor: "white"}} disabled={!buttonState} onClick  ={ResetHandler}>
                    Reset
                </Button>
            </Grid>
        </Grid>
        </div>
    </div>
  );
}
