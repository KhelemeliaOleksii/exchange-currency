import { useState } from "react";
import CurrencyTypeInput from "../CurrencyTypeInput";
import styles from './CurrencyInput.module.css';
import PropTypes from 'prop-types';

export default function CurrencyInput(props) {
    const { onChangeCurrency,
        onChangeAmount,
        currencyLabel,
        currencyAmount,
        currencyList,
        order } = props

    const [currency, setCurrency] = useState('UAH');
    const [lastCurrencies, setLastCurrencies] = useState(['USD', 'EUR', 'PLN']);
    const [amount, setAmount] = useState(currencyAmount);

    const onClickLatests = ({ target }) => {
        const value = target.dataset.name;
        const reduced = lastCurrencies.filter(item => item !== value);

        if (reduced.length === 0) return;

        setLastCurrencies([value, ...reduced]);

        setCurrency(value);
        // console.log("value", value, "order", order);
        onChangeCurrency(value, order);
    }
    const handlerOnChange = ({ target: { value } }) => {
        setAmount(value);
        onChangeAmount(value, order);
    }
    return (
        <div className={styles.wrapper}>
            <CurrencyTypeInput currencyLabel={currency} />
            <input
                className={styles['input-value']}
                type='number'
                value={amount}
                onChange={handlerOnChange} />
            <ul className={styles['currency-list--latests']}>
                {
                    lastCurrencies.map(item => (
                        <li key={item} data-name={item} onClick={onClickLatests}>
                            {item}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

CurrencyInput.propTypes = {
    onChangeCurrency: PropTypes.func.isRequired,
    onChangeAmount: PropTypes.func.isRequired,
    currencyLabel: PropTypes.string.isRequired,
    currencyAmount: PropTypes.number.isRequired,
    currencyList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            imgCode: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })).isRequired,
    order: PropTypes.string.isRequired,
}