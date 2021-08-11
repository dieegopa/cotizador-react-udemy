import React from "react";
import styled from "@emotion/styled";
import { primeraMayuscula } from "../helpers";
import PropTypes from "prop-types";

const ContenedorResumen = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838f;
  color: white;
  margin-top: 1rem;
`;

const Resumen = ({ datos }) => {
  const { marca, year, plan } = datos;

  if (!marca || !year || !plan) return null;

  return (
    <ContenedorResumen>
      <h2>Resumen Cotizacion</h2>
      <ul>
        <li>Marca: {primeraMayuscula(marca)}</li>
        <li>Plan: {primeraMayuscula(plan)}</li>
        <li>Año del coche: {year}</li>
      </ul>
    </ContenedorResumen>
  );
};

Resumen.propTypes = {
  datos : PropTypes.object.isRequired
}

export default Resumen;
