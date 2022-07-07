import CurrencyInput from "../CurrencyInput/CurrencyInput";
import { IoMdSwap } from "react-icons/io";
import Section from "../Section";
import styles from './ExchangeCurrencyForm.module.css';
import { useState } from "react";
import { useEffect } from "react";
import { currencies } from "../../Currencies/currencies";
import { useCallback } from "react";

function calcEndingAmount(initialAmount, rate = 0.1) {
    return initialAmount * rate;
}

export default function ExchangeCurrencyForm() {
    const [rates, setRates] = useState([]);
    const [currencyFirst, setCurrencyFirst] = useState('USD');
    const [amountFirst, setAmountFirst] = useState(1);
    const [currencySecond, setCurrencySecond] = useState('UAH');
    const [amountSecond, setAmountSecond] = useState(1);

    useEffect(() => {
        const cortegeCurrency = [
            { 'label': 'USD', 'rate': 0.03384 },
            { 'label': 'GBP', 'rate': 0.028 },
            { 'label': 'EUR', 'rate': 0.03 },
            { 'label': 'PLN', 'rate': 0.015 },
            { 'label': 'UAH', 'rate': 1 },
            { 'label': 'CZK', 'rate': 0.02 }

        ]
        setRates([...cortegeCurrency]);
        // const currencyAvailable = [];
        // currencies.map(({ label }) => currencyAvailable.push(label));
        // currencyExchangeApi.baseRequest('UAH', currenciesLabelMain)
        //     .then(({ rates }) => {
        //         const cortegeCurrency = [{label:'UAH', rate:1}];
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

    function getRate(label) {
        return rates.find((item) => item.label === label).rate
    }
    function calcCurrencyAmount(amount, firstLabel, secondLabel) {
        const rateSecond = getRate(secondLabel);
        const rateFirst = getRate(firstLabel);
        return Number((amount * rateSecond / rateFirst).toFixed(2));
    }

    const handlerOnChangeCurrency = (currency, order) => {
        let amountNext = 1;
        switch (order) {
            case 'first':
                setCurrencyFirst(currency);
                amountNext = calcCurrencyAmount(amountFirst, currency, currencySecond);
                setAmountSecond(amountNext);
                // console.log("handlerOnChangeCurrency", "amountNext", amountNext, "order", order);
                break;
            case 'second':
                setCurrencySecond(currency);
                amountNext = calcCurrencyAmount(amountSecond, currency, currencyFirst);
                setAmountFirst(amountNext);
                // console.log("handlerOnChangeCurrency", "amountNext", amountNext, "order", order);
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
                amountNext = calcCurrencyAmount(amount, currencyFirst, currencySecond);
                setAmountSecond(amountNext);
                break;
            case 'second':
                setAmountSecond(amount);
                amountNext = calcCurrencyAmount(amount, currencySecond, currencyFirst);
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
                    initial={'UAH'}
                />
                <IoMdSwap size={30} />
                <CurrencyInput
                    onChangeCurrency={handlerOnChangeCurrency}
                    onChangeAmount={handlerOnChangeAmount}
                    currencyLabel={currencySecond}
                    currencyAmount={amountSecond}
                    currencyList={currencies}
                    order={'second'}
                    initial={'USD'}
                />
            </form>
        </Section>
    )
}
