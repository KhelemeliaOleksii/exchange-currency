import { useEffect } from "react";
import { useState } from "react"
import { currencies } from "../../Currencies/currencies"
import styles from './CurrencyDataList.module.css'
import PropTypes from 'prop-types'

export default function CurrencyDataList({ handlerOnClick, handleOnClose, autofocus = false }) {
    const [filter, setFilter] = useState('');
    const [currencyList, setCurrencyList] = useState([...currencies]);

    useEffect(() => {
        const handlerOnEscapeClick = ({ code }) => {
            if (code === 'Escape') {
                handleOnClose();
            }
        }
        window.addEventListener('keydown', handlerOnEscapeClick);
        return () => {
            window.removeEventListener('keydown', handlerOnEscapeClick);
        }
    }, [handleOnClose])

    useEffect(() => {
        setCurrencyList(currencies.filter(item => item.label.toLowerCase().includes(filter.toLocaleLowerCase())));
    }, [filter])

    const handlerOnChange = ({ target: { value } }) => {
        setFilter(value);
    }

    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                name="currency"
                value={filter}
                onChange={handlerOnChange}
                autoFocus={autofocus}
                className={styles['input-filter']}
            />
            {

            }
            <ul className={styles['input-list']}>
                {
                    currencyList.map(item => (
                        <li key={item.id}
                            onClick={() => handlerOnClick(item.id)}
                            className={styles["input-option"]}
                        >
                            <div className={styles['flag-wrapper']}>
                                <img
                                    src={`https://flagcdn.com/${item.imgCode}.svg`}
                                    width="30"
                                    alt="European Union" />
                            </div>
                            <div className={styles["label"]}>{item.label}</div>
                            <div className={styles["name"]}>{item.name}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

CurrencyDataList.propTypes = {
    handlerOnClick: PropTypes.func.isRequired,
    handleOnClose: PropTypes.func.isRequired,
    autofocus: PropTypes.bool
}
