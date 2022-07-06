import { currencies } from "../../Currencies/currencies"
import {
    IoMdArrowDropup,
    IoMdSearch,
    IoMdArrowDropdown
} from 'react-icons/io'
import { useCallback, useState } from "react";
import CurrencyDataList from "../CurrencyDataList/CurrencyDataList";
import { useEffect } from "react";
import styles from './CurrencyTypeInput.module.css'
export default function CurrencyTypeInput({ handlerOnCurrencyInput, currencyLabel = 'UAH' }) {

    const [currency, setCurrency] = useState(currencyLabel);
    const [isChangeCurrency, setIsChangeCurrency] = useState(false);


    useEffect(() => {
        const initialCurrency = currencies.find(item => item.label === currencyLabel);
        setCurrency(initialCurrency);
    }, [currencyLabel]);

    const handlerOnClickDropDown = () => {
        setIsChangeCurrency(true);
    }
    const handlerOnClickDropUp = () => {
        setIsChangeCurrency(false);
    }
    const handlerChooseItem = (id) => {
        setCurrency(currencies.find((item) => item.id === Number(id)));
        setIsChangeCurrency(false);
    }
    const handleOnCloseList = useCallback(() => {
        setIsChangeCurrency(false);
    }, [setIsChangeCurrency])
    return (
        <div className={styles.wrapper}>
            {isChangeCurrency ? (
                <>
                    <IoMdSearch />
                    <CurrencyDataList handlerOnClick={handlerChooseItem} handleOnClose={handleOnCloseList} autofocus />
                    <button className='drop-down__button' type="button" onClick={handlerOnClickDropUp}>
                        <IoMdArrowDropup />
                    </button>
                </>
            ) : (
                <>
                    <div className="flag">
                        <img
                            src={`https://flagcdn.com/${currency.imgCode}.svg`}
                            width="30"
                            alt={currency.name} />
                    </div>
                    <div className="currency-label">{currency.label}</div>
                    <div className="currency-name">{currency.name}</div>
                    <div className="controls">
                        <button className='drop-down__button' type="button" onClick={handlerOnClickDropDown}>
                            <IoMdArrowDropdown />
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}