import axios from "axios";

const initializeForm = () => {
  const nbpLink = "http://api.nbp.pl/api/exchangerates/tables/a/";
  const loader = document.querySelector("#loader");
  const selectField = document.querySelector("#currency");
  const convertButton = document.querySelector("#convert");
  const amount = document.querySelector("#amount");
  const amountLabel = document.querySelector("#amountLabel");
  const resultText = document.querySelector("#result");

  let nbpData;
  const exchangeRates = {};

  const fetchNbpData = async () => {
    await axios
      .get(nbpLink)
      .then((response) => {
        nbpData = response.data[0].rates;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createCurrencyOptions = async () => {
    await fetchNbpData();
    nbpData.forEach((element) => {
      const newOption = document.createElement("option");
      const code = element.code;
      const currencyToCapitalize = element.currency;
      const currency =
        currencyToCapitalize.charAt(0).toUpperCase() +
        currencyToCapitalize.slice(1);
      exchangeRates[code] = element.mid;
      newOption.textContent = currency;
      newOption.value = element.code;
      selectField.appendChild(newOption);
    });

    loader.style.display = "none";
  };

  const convertToPln = () => {
    if (amount.value === "") {
      amountLabel.style.display = "inline";
    } else {
      amountLabel.style.display = "none";
      const exchangeCode = selectField.value;
      resultText.textContent =
        (amount.value * exchangeRates[exchangeCode]).toFixed(2) + "zł";
    }
  };

  const clearValues = () => {
    amount.value = "";
    resultText.textContent = "Kwota";
  };

  convertButton.addEventListener("click", convertToPln);
  selectField.addEventListener("change", clearValues);
  createCurrencyOptions();
};

export default initializeForm;
