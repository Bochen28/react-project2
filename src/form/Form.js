import React, { useEffect } from "react";
import initializeForm from "../data/currencyExchange";
import styles from "./Form.module.css";

function Form() {
  useEffect(() => {
    initializeForm();
  }, []);

  return (
    <div className={styles.content}>
    <div className={styles.form}>
      <label id="amountLabel" className={styles.amountLabel} for="amount">
        Wprowadź poprawną kwotę
      </label>
      <br />
      <input
        type="number"
        id="amount"
        className={styles.amount}
        name="amount"
        placeholder="Wpisz kwotę"
      />
      <select id="currency" className={styles.selectCurr}></select>
      <button id="convert" className={styles.button}>Przelicz</button>
      <h4>Na złotówki (PLN)</h4>
      <div className={styles.result}>
        <p id="result" className={styles.result}>Kwota</p>
      </div>
    </div>
    </div>
  );
}

export default Form;
