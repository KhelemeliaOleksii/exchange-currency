import {
    IoMdArrowDropup,
    IoMdSearch,
    IoMdArrowDropdown
} from 'react-icons/io'
import { useCallback, useState } from "react";
import CurrencyDataList from "../CurrencyDataList/CurrencyDataList";
import { useEffect } from "react";
import styles from './CurrencyTypeInput.module.css';
import PropTypes from 'prop-types';

export default function CurrencyTypeInput(props) {
    const {
        currencyLabel,
        currencyList,
        onChangeCurrency,
        order,
    } = props;
    const [currency, setCurrency] = useState(currencyLabel);
    const [isChangeCurrency, setIsChangeCurrency] = useState(false);


    useEffect(() => {
        const initialCurrency = currencyList.find(item => item.label === currencyLabel);
        setCurrency(initialCurrency);
    }, [currencyLabel, currencyList]);

    const handlerOnClickDropDown = () => {
        setIsChangeCurrency(true);
    }
    const handlerOnClickDropUp = () => {
        setIsChangeCurrency(false);
    }
    const handlerChooseItem = (id) => {
        const currencyById = currencyList.find((item) => item.id === Number(id));
        setCurrency(currencyById);
        setIsChangeCurrency(false);
        onChangeCurrency(currencyById.label, order);
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

CurrencyTypeInput.propTypes = {
    currencyLabel: PropTypes.string.isRequired,
    currencyList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            imgCode: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })).isRequired,
    onChangeCurrency: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
}
