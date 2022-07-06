import { useEffect } from "react";
import { useState } from "react"
import { currencies } from "../../Currencies/currencies"

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
        <>
            <input
                type="text"
                name="currency"
                value={filter}
                onChange={handlerOnChange}
                autoFocus={autofocus}
            />
            {

            }
            <ul>
                {
                    currencyList.map(item => (
                        <li key={item.id}
                            onClick={() => handlerOnClick(item.id)}
                        >
                            <div className="flag">
                                <img
                                    src={`https://flagcdn.com/${item.imgCode}.svg`}
                                    width="30"
                                    alt="European Union" />
                            </div>
                            <div className="currency-label">{item.label}</div>
                            <div className="currency-label">{item.name}</div>

                        </li>
                    ))
                }
            </ul>
        </>
    )
}