import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Loader from "../loader/Loader";
import { fetchNbpData, exchangeRates } from "../services/dataFetch";

function Form() {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowError, setShouldShowError] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(0);
  const [result, setResult] = useState("Kwota");

  useEffect(() => {
    fetchNbpData()
      .then((data) => {
        setFetchedData(data[0].rates);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const handleExchange = () => {
    if (amount <= 0 || exchangeRates[currency] === undefined) {
      setShouldShowError(true);
    } else {
      setShouldShowError(false);
      setResult(`${(amount * exchangeRates[currency]).toFixed(2)} zł`);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.content}>
      <div className={styles.form}>
        {shouldShowError && (
          <div>
            <p className={styles.errorMessage}>
              Wprowadź poprawną kwotę i wybierz walutę
            </p>
          </div>
        )}
        <input
          type="number"
          id="amount"
          className={styles.amount}
          name="amount"
          placeholder="Wpisz kwotę"
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          id="currency"
          className={styles.selectCurr}
          onChange={(e) => setCurrency(e.target.value)}
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
