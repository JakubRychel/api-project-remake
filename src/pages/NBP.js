import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import Subpage from './Subpage';

function Currency({ code }) {
  const [data, setData] = useState();

  const apiUrl = code => `https://cors-anywhere.herokuapp.com/http://api.nbp.pl/api/exchangerates/rates/a/${code}/last/7?format=json`;

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(apiUrl(code));
        const result = await response.json();
        setData(result.rates);
      }
      catch (error) {
        console.error('Error fetching currency data:', error);
      }
    }
    fetchCurrencyData();
  }, []);

  return (
    <div className="col-xs-12 col-lg-6">
      <div>
        <h4 className="my-3">Tabela kursu {code}</h4>
      </div>
      <div>
        <table className="data">
          <thead>
            <tr>
              <th>Data</th>
              <th>Kurs</th>
            </tr>
          </thead>
          <tbody>
            {
              data ? data.map(rate => (
                <tr>
                  <td>{rate.effectiveDate}</td>
                  <td>{rate.mid}</td>
                </tr>
              )) : <tr><td colspan="2">Ładowanie danych...</td></tr>
            }
          </tbody>
        </table>
      </div>
      <div>
        {
          data ? <Chart
            chartType="ColumnChart"
            width="100%"
            data={[
              ['day', code],
              ...data.map(rate => [rate.effectiveDate, rate.mid])
            ]}
          /> : <>Ładowanie danych...</>
        }

      </div>
    </div>
  );
}

function NBP() {
  return (
    <Subpage header="Kursy walut NBP">
      <Currency code="EUR" />
      <Currency code="USD" />
      <Currency code="GBP" />
      <Currency code="CHF" />
    </Subpage>
  );
}

export default NBP;