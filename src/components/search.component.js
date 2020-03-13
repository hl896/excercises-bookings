import React, {useState, useEffect, TableRow} from "react";
import Recipe from  "./recipe.component";
import '../App.css';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';
import { Component } from "react";

const useStyles = makeStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#106ba3',
      },
    },
  });
  

// Inspired by blueprintjs
function StyledRadio(props) {
    const classes = useStyles();
  
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }

const APP_ID = "69c97021";
const APP_KEY = "aeb10d6b6fa84e615dc7361c08b1836f";

class Search  extends Component {
    constructor(props){
        super(props);
        this.state = {
            recipes:[],
            search: 'chicken',
            query: '',
            users: '',
            value: 'female',
            user: []
        }
        this.getSearch = this.getSearch.bind();
        this.updateSearch = this.updateSearch.bind();
        this.handleChange = this.handleChange.bind();
        this.getRecipes = this.getRecipes.bind();
        
    }
    
    componentDidMount(){
        axios.get('http://localhost:63448/users/')
            .then(response => {
                this.setState( {user:response.data } );
                console.log('user:' + this.state.user[0].username);
                console.log('response.data:' +response.data[0].username);
            })
            .catch((error) => {
            console.log(error);
        });
        console.log("users:"+ this.state.user);
        const query = this.state.search;
        this.getRecipes(query);
    }

    
        
    
    
  
    updateSearch = e => {
      this.setState({ search: e.target.value});
      console.log('search:' + this.state.search);
    }
  
    getSearch =  e => {
        e.preventDefault();
        var query = this.state.search;
        console.log('query:'+query);

        this.getRecipes(query);
            
    }
    
    getRecipes = (query) => {
        axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        .then(response =>{
            this.setState({recipes: response.data.hits})
        })
        .catch((error) => {
            console.log(error);
        })
        console.log('recipe:' + this.state.recipes);
        
    }

    handleChange = event => {
        this.setState({value:event.target.value});
        console.log('click:'+ event.target.value);
    };

    
    
    render(){
        return (
            <div className="APP">
                <form className="search-form" onSubmit={this.getSearch} >
                <input 
                    className="search-bar" 
                    type="text" 
                    value={this.state.search}
                    onChange={this.updateSearch} 
                />
                <button className="search-button" type="submit" >
                    Search
                </button>
                </form>
                <div>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">All Users</FormLabel>
                        <RadioGroup defaultValue="female" aria-label="gender" name="customized-radios" value={this.state.value} onChange={this.handleChange}>
                            {this.state.user.map(usr =>(
                                <FormControlLabel 
                                value={usr.username}
                                control={<StyledRadio />} 
                                label= {usr.username}
                                />
                            ))}
                            
                        </RadioGroup>
                    </FormControl>
                    <div className="foodGrid" >
                        {this.state.recipes.map(recipe  => (
                        <Recipe 
                            key = {recipe.recipe.uri} 
                            title={recipe.recipe.label} 
                            calories={recipe.recipe.calories} 
                            image={recipe.recipe.image} 
                        />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
  }
export default Search;