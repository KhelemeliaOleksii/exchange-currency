import axios from "axios";

axios.defaults.baseURL = 'https://api.apilayer.com/fixer';


const baseRequest = async (baseCurrency, currencies) => {
    const [first, second, third] = [...currencies];
    var myHeaders = new Headers();
    myHeaders.append("apikey", "RSFUQcnlokFm8U0DTD8P4oxbaLc5SjH1");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    const response = await fetch(`https://api.apilayer.com/fixer/latest?symbols=${first}%2C%20${second}%2C%20${third}&base=${baseCurrency}`, requestOptions);
    const result = response.json();
    return result;
}



const currencyExchangeApi = {
    baseRequest,
}

export default currencyExchangeApi;