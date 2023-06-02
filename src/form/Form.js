import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Loader from "../loader/Loader";
import  {fetchNbpData, exchangeRates} from "../services/dataFetch";

function Form() {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [labelDisplay, setLabelDisplay] = useState("none");
  const [inputValue, setInputValue] = useState(0);
  const [selectValue, setSelectValue] = useState(0);
  const [result, setResult] = useState("Kwota");

  useEffect(() => {
    const fetchData = () => {
      fetchNbpData()
        .then((data) => {
          setFetchedData(data[0].rates);
          setIsLoading(false);
        })
        .catch((error) => {
          alert(error.message);
          setIsLoading(false);
        });
    };
    fetchData();
  }, []);

  const handleExchange = () => {
    if (inputValue === 0 || exchangeRates[selectValue] === undefined) {
      setLabelDisplay("block");
    } else {
      setLabelDisplay("none");
      setResult(`${(inputValue * exchangeRates[selectValue]).toFixed(2)} zł`);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={styles.content}>
      <div className={styles.form}>
        <label
          id="errorLabel"
          className={styles.errorLabel}
          htmlFor="amount"
          style={{ display: labelDisplay }}
        >
          Wprowadź poprawną kwotę i wybierz walutę
        </label>
        <input
          type="number"
          id="amount"
          className={styles.amount}
          name="amount"
          placeholder="Wpisz kwotę"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <select
          id="currency"
          className={styles.selectCurr}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          <option>Wybierz walutę</option>
          {fetchedData.map((element) => (
            <option key={element.code} value={element.code}>
              {element.currency}
            </option>
          ))}
        </select>
        <button id="convert" className={styles.button} onClick={handleExchange}>
          Przelicz
        </button>
        <h4>Na złotówki (PLN)</h4>
        <div className={styles.result}>
          <p id="result" className={styles.result}>
            {result}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Form;
