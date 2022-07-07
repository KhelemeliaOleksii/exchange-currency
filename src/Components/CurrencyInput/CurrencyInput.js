import { useState } from "react";
import CurrencyTypeInput from "../CurrencyTypeInput";
import styles from './CurrencyInput.module.css';
import PropTypes from 'prop-types';

export default function CurrencyInput(props) {
    const {
        onChangeCurrency,
        onChangeAmount,
        currencyLabel,
        currencyAmount,
        currencyList,
        order,
    } = props

    const [lastCurrencies, setLastCurrencies] = useState(['USD', 'EUR', 'PLN']);

    const configureLasts = (value, order) => {
        const current = lastCurrencies.find(item => item === value);
        if (!!current) {
            const reduced = lastCurrencies.filter(item => item !== value);

            if (reduced.length === 0) return;

            setLastCurrencies([value, ...reduced]);
        } else {
            const copy = [...lastCurrencies];
            copy.pop();
            setLastCurrencies([value, ...copy]);
        }
        onChangeCurrency(value, order);
    }
    const onClickLasts = ({ target }) => {
        const value = target.dataset.name;
        configureLasts(value, order);
    }
    const handlerOnChange = ({ target: { value } }) => {
        onChangeAmount(Number(value), order);
    }
    return (
        <div className={styles.wrapper}>
            <CurrencyTypeInput
                currencyLabel={currencyLabel}
                currencyList={currencyList}
                onChangeCurrency={configureLasts}
                order={order}
            />

            <input
                className={styles['input-value']}
                type='number'
                value={currencyAmount}
                onChange={handlerOnChange} />

            <ul className={styles['currency-list--latests']}>
                {
                    lastCurrencies.map(item => (
                        <li key={item} data-name={item} onClick={onClickLasts}>
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