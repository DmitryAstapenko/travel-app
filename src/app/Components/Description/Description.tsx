/* eslint-disable no-console */
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Description.scss";

interface CountryDesc {
  name: string;
  flag: string;
  imageUrl: string;
  capital: string;
  description: string;
}

const Description: React.FC = () => {
  const [countryDesc, setCountryDesc] = useState<CountryDesc>();

  useEffect(() => {
    const getCountries = async () => {
      const res = await axios.get(
        "https://rnovikov-travel-app-backend.herokuapp.com/countries"
      );
      const {
        flag,
        imageUrl,
        localizations: { capital, name, description },
      } = res.data[0];
      // взял первую для примера
      setCountryDesc({
        name,
        flag,
        imageUrl,
        capital,
        description,
      });
    };

    getCountries();
  }, []);

  return countryDesc ? (
    <div className="desc">
      <img
        className="desc__img"
        src={countryDesc?.imageUrl}
        alt={countryDesc?.name}
      />
      <div className="desc__country">
        <img
          className="desc__flag"
          src={countryDesc?.flag}
          alt={countryDesc?.name}
        />
        <h1 className="desc__name">{countryDesc?.name}</h1>
      </div>
      <h2 className="desc__capital">{`Capital: ${countryDesc?.capital}`}</h2>
      <p className="desc__info">{countryDesc?.description}</p>
    </div>
  ) : null;
};

export default Description;
