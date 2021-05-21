import React from 'react'
import { makeStyles, Grid, TextField} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';

const usestyles = makeStyles(theme => ({
  
    container: {
        
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: theme.spacing(20),
        Width: theme.spacing(100),
        maxHeight: '95vh',
        minHeight:'60vh',
        background: '#047572',
        borderRadius: '15%',
        boxShadow: `inset 9.91px 9.91px 10px #046865,
        inset -9.91px -9.91px 10px #04827f`,
    },
    gridItem: {
        
     
        margin:'auto 1rem',
        
        color:'#ffffff',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'space-around',
        alignItems: 'center',

        '& > *': {
            padding: '5px 0 5px 0',
            margin:'2px 0',
        },
        '& .MuiInputBase-input': {
            color:'#ffffff',
        },
    },
    icon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding:'0.5rem 0',
    }
    
   
}));


const CurrencyComponent = ({ countryList, currency1, currency2, amount, setAmount, answer, handleChange }) => {
    
    const itemFrom = countryList.find(item => item.currencyName === currency1) || '';
    const symbolFrom = itemFrom.currencySymbol || '';

    const itemTo = countryList.find(item => item.currencyName === currency2) || '';
    const symbolTo = itemTo.currencySymbol || '';

    const classes = usestyles();

    return (
                
        <Grid container className={classes.container} >
            <Grid item className={classes.gridItem} lg sm xs={12}>
                <h4>FROM</h4>
                
                <Autocomplete
                
                style={{ width: 200 }}
                options={countryList}
                onChange={(event,value)=>handleChange(event,'country1',value)}
                autoHighlight
                getOptionLabel={(option) => option.name}
                
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    variant="outlined"
                  
                />
                    
                )}
                />   
                <p>{`${currency1}  ${symbolFrom } ` || '' }</p>

                <TextField variant="outlined"
                    label="Amount"
                    style={{ width: 200 }}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </Grid>
            
            <Grid item lg sm xs={12} className={classes.icon}>
            <SwapHorizontalCircleIcon fontSize='large' color='action' />
            </Grid>


            <Grid item className={classes.gridItem} lg sm xs={12}>
            <h4>TO</h4>
            
                <Autocomplete
                
                style={{ width: 200 }}
                options={countryList}
                onChange={(e,value)=>handleChange(e,'country2',value)}
                autoHighlight
                getOptionLabel={(option) => option.name}
               
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    variant="outlined"
                    
                   
                />
                    
                )}
                /> 
                
                <p>{`${currency2}  ${symbolTo } ` || '' }</p>

                <TextField variant="outlined"
                     label="Amount"
                    disabled
                    style={{ width: 200 }}
                    value={isNaN(answer)?'':answer }
                />
            </Grid>
        </Grid>
        
    )
}

export default CurrencyComponent
