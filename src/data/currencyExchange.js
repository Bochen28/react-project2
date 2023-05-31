import axios from "axios";

const initializeForm = () => {
  const nbpLink = "https://api.nbp.pl/api/exchangerates/tables/a/";
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
        if (
          Array.isArray(response.data) &&
          response.data.length > 0 &&
          response.data[0].rates
        ) {
          nbpData = response.data[0].rates;
        } else {
          alert("Wystąpił problem po stronie serwera");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createCurrencyOptions = async () => {
    await fetchNbpData();

    if (nbpData && Array.isArray(nbpData)) {
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
    } else {
      alert("Wystąpił problem po stronie serwera");
    }

    loader.style.display = "none";
  };

  const convertToPln = () => {
    if (amount.value <= 0) {
      amountLabel.style.display = "inline";
    } else {
      amountLabel.style.display = "none";
      const exchangeCode = selectField.value;
      resultText.textContent =
        (amount.value * exchangeRates[exchangeCode]).toFixed(2) + " zł";
    }
  };

  convertButton.addEventListener("click", convertToPln);
  createCurrencyOptions();
};

export default initializeForm;
