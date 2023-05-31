import React, { useEffect } from "react";
import initializeForm from "../data/currencyExchange";
import styles from "./Form.module.css";

function Form() {
  useEffect(() => {
    initializeForm();
  }, []);

  return (
    <div className={styles.form}>
      <label id="amountLabel" for="amount">
        Wprowadź poprawną kwotę
      </label>
      <br />
      <input
        type="number"
        id="amount"
        name="amount"
        placeholder="Wpisz kwotę"
      />
      <select id="currency"></select>
      <button id="convert">Przelicz</button>
      <h4>Na złotówki (PLN)</h4>
      <div className={styles.result}>
        <p id="result">Kwota</p>
      </div>
    </div>
  );
}

export default Form;
