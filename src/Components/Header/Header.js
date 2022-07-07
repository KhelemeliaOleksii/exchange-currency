import { useState, useEffect } from 'react';
// import currencyExchangeApi from '../../APIs/currencyApi';
import { currencies } from '../../Currencies/currencies';
import Section from '../Section'
import styles from './Header.module.css'
export default function Header() {
    const [rates, setRates] = useState([]);
    useEffect(() => {
        const cortegeCurrency = [
            { 'label': 'USD', 'rate': 0.03384 },
            { 'label': 'GBP', 'rate': 0.028 },
            { 'label': 'EUR', 'rate': 0.03322 }
        ]
        setRates([...cortegeCurrency]);
        // const currenciesLabelMain = ['USD', 'GBP', 'EUR'];
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
    }, []);
    const converter = (rate, amount = 1) => {
        return (1 / rate).toFixed(2);
    }
    const defineCurrency = (label) => {
        return currencies.find(item => item.label === label);
    }
    return (
        <Section>
            <ul className={styles.list}>
                {rates.map(item => (
                    <li key={item.label} className={styles.item}>
                        <span className={styles.label}>{item.label}</span>
                        <span className={styles["img-wrapper"]}>
                            <img
                                src={`https://flagcdn.com/${defineCurrency(item.label).imgCode}.svg`}
                                width="30"
                                alt={item.label} />
                        </span>
                        <span className={styles.amount}>{converter(item.rate, 100)}</span>
                    </li>
                ))
                }
            </ul>
        </Section>
    )
}

