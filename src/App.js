import React, { useEffect, useState } from "react";
import CurrencyComponent from "./CurrencyComponent";


function App() {

  const APIKEY = '5c8927db915535a5ef94';

  const [currency1, setCurrency1] = useState('');
  const [currency2, setCurrency2] = useState('');
  const [query, setQuery] = useState({ from: '', to: '' });
  const [countryList, setCountryList] = useState([]);
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState('');
  const [answer, setAnswer] = useState(0);

  
  

  useEffect(() => {
    const getCountries = async() => {
      const countryResponse = await fetch(`https://free.currconv.com/api/v7/countries?apiKey=${APIKEY}`);
      const countries = await countryResponse.json();
      const countryArray = Object.values(countries.results);
      
      
      if (countryResponse.ok)
        setCountryList(countryArray);
      else
        console.log('error');
    }
    getCountries();
  }, [])

  useEffect(() => {
    const getResponse = async () => {
      let queryString = `${query.from}_${query.to}`;
      const response = await fetch(`https://free.currconv.com/api/v7/convert?q=${queryString}&compact=ultra&apiKey=${APIKEY}`);
      const responseJson = await response.json();
      if (response.ok)
        setValue(Object.values(responseJson)[0]);
      else
        console.log('error');
    }

    if(query.from!=='' && query.to!=='')
      getResponse();
  }, [query]);
  
  useEffect(() => {
    let result = parseFloat(value) * parseFloat(amount);
    result = result.toFixed(2) || 0;
    setAnswer(result);
  },[amount,value,answer]);

  const handleChange = (e,fieldName,value) => {
    
    if (fieldName === 'country1') {
      if (value === null) {
        
        setCurrency1('');
        setAmount('');
      }
      else {
        
        let currencyName = countryList.find((item) => item.name === value.name) || '';
        setCurrency1(currencyName.currencyName);
        
        setQuery({ ...query, from: currencyName['currencyId'] });
      }
      
    }
    
    else if (fieldName === 'country2') {
      if (value === null) {
        
        setCurrency2('');
        setAmount('');
      }
      else {
        
        let currencyName = countryList.find((item) => item.name === value.name) || '';
        setCurrency2(currencyName.currencyName);
      
        setQuery({ ...query, to: currencyName['currencyId'] });
      }
    }
   
}

  

  return (
    <React.Fragment>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', color: '#FF9966' }}>
        Currency Converter
      </h1>
      <CurrencyComponent
        countryList={countryList}
        currency1={currency1}
        currency2={currency2}
        handleChange={handleChange}
        
        amount={amount}
        setAmount={setAmount}
        answer={answer}
      />

    </React.Fragment>
 
  );
}

export default App;
