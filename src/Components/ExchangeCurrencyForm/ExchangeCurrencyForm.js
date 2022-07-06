import CurrencyInput from "../CurrencyInput/CurrencyInput";
import { IoMdSwap } from "react-icons/io";
import Section from "../Section";
import styles from './ExchangeCurrencyForm.module.css';
import { useState } from "react";
import { useEffect } from "react";
import { currencies } from "../../Currencies/currencies";

function calcEndingAmount(initialAmount, rate = 0.1) {
    return initialAmount * rate;
}

export default function ExchangeCurrencyForm() {
    const [rates, setRates] = useState([]);
    const [currencyFirst, setCurrencyFirst] = useState('UAH');
    const [amountFirst, setAmountFirst] = useState(1);
    const [currencySecond, setCurrencySecond] = useState('USD');
    const [amountSecond, setAmountSecond] = useState(1);
    useEffect(() => {
        const cortegeCurrency = [
            { 'label': 'USD', 'rate': 0.03384 },
            { 'label': 'GBP', 'rate': 0.028 },
            { 'label': 'EUR', 'rate': 0.03322 },
            { 'label': 'PLN', 'rate': 0.03384 },
            { 'label': 'UAH', 'rate': 0.028 },
            { 'label': 'CZK', 'rate': 0.03322 }

        ]
        setRates([...cortegeCurrency]);
        // const currencyAvailable = [];
        // currencies.map(({ label }) => currencyAvailable.push(label));
        // currencyExchangeApi.baseRequest('UAH', currenciesLabelMain)
        //     .then(({ rates }) => {
        //         const cortegeCurrency = [];
        //         for (const prop in rates) {
        //             cortegeCurrency.push({
        //                 'label': [prop],     
        //                 'rate' : rates[prop],
        //             })
        //         }
        //         console.log(tmpArray);
        //         setRates([...cortegeCurrency]);
        //     })
        //     .catch((error) => console.log(error));

    }, [])
    const getRate = (label) => {
        return rates.find((item) => item.label === label).rate
    }
    const calcCurrencyAmount = (amount) => {
        const rateSecond = getRate(currencySecond);
        const rateFirst = getRate(currencyFirst);
        // console.log("amount", amount, "rateSecond", rateSecond, "rateFirst", rateFirst);
        return Number((amount * rateSecond / rateFirst).toFixed(2));
    }

    const handlerOnChangeCurrency = (currency, order) => {
        let amountNext = 1;
        switch (order) {
            case 'first':
                setCurrencyFirst(currency);
                amountNext = calcCurrencyAmount(amountFirst);
                setAmountSecond(amountNext);
                break;
            case 'second':
                setCurrencySecond(currency);
                amountNext = calcEndingAmount(amountSecond);
                setAmountFirst(amountNext);
                break;
            default:
                return;
        }
    }
    const handlerOnChangeAmount = (amount, order) => {
        let amountNext = 1;
        switch (order) {
            case 'first':
                setAmountFirst(amount);
                amountNext = calcEndingAmount(amount);
                setAmountSecond(amountNext);
                break;
            case 'second':
                setAmountSecond(amount);
                amountNext = calcEndingAmount(amount);
                setAmountFirst(amountNext);
                break;
            default:
                return;
        }
    }
    return (
        <Section>
            <form className={styles.form}>
                <CurrencyInput
                    onChangeCurrency={handlerOnChangeCurrency}
                    onChangeAmount={handlerOnChangeAmount}
                    currencyLabel={currencyFirst}
                    currencyAmount={amountFirst}
                    currencyList={currencies}
                    order={'first'}
                />
                <IoMdSwap size={30} />
                <CurrencyInput
                    onChangeCurrency={handlerOnChangeCurrency}
                    onChangeAmount={handlerOnChangeAmount}
                    currencyLabel={currencySecond}
                    currencyAmount={amountSecond}
                    currencyList={currencies}
                    order={'second'}
                />
            </form>
        </Section>
    )
}
