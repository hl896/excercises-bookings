import React, {useState, useEffect, TableRowColumn} from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

const Recipe = ({title, calories, image}) => {
    const cash = "cash";
    const debit = "debit";
    const classes = useStyles();
    const [method, setMethod] = useState('');
    const handleChange = event => {
        setMethod(event.target.value);
        
        console.log("method: " + event.target.value)
    };
    
    
    return(

            <div className="recipeItem">
                <h6>{title}</h6>
                <p><strong>calories(KJ):</strong>{calories}</p>
                <img src={image}  alt=""/>
                <br />
                <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>
                <Select native defaultValue="" input={<Input id="grouped-native-select" />}  onChange={handleChange} value={method} >
                    <optgroup> 
                    <option value="none" >Selection</option>
                    <option value={cash}>Cash</option>
                    <option value={debit}>Debit</option>
                    </optgroup>
                </Select>
                </FormControl>
            </div>
    );
};

export default Recipe;