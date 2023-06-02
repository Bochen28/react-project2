import axios from "axios";

const nbpLink = "https://api.nbp.pl/api/exchangerates/tables/a/";
const exchangeRates = {};

const fetchNbpData = () => {
  return axios
    .get(nbpLink)
    .then((response) => {
      if (
        Array.isArray(response.data) &&
        response.data.length > 0 &&
        response.data[0].rates
      ) {
        response.data[0].rates.forEach((element) => {
          exchangeRates[element.code] = element.mid;
        });
        return response.data;
      } else {
        throw Error("Nie można pobrać danych z serwera");
      }
    })
    .catch((error) => {
      console.error(error);
      throw Error("Nie można połączyć się z serwerem");
    });
};

export { fetchNbpData, exchangeRates };