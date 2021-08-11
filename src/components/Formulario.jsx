import React from "react";
import styled from "@emotion/styled";
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from "../helpers";
import PropTypes from "prop-types";

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  padding: 1rem;
  width: 100%;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  color: white;
  transition: all 0.3s ease-in-out;
  margin-top: 2rem;

  &:hover {
    background-color: #26c6da;
    cursor: pointer;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ({ setResumen, setCargando }) => {
  const [datos, setDatos] = React.useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = React.useState(false);

  const { marca, year, plan } = datos;

  const cotizarSeguro = (e) => {
    e.preventDefault();

    if (!marca.trim() || !year.trim() || !plan.trim()) {
      setError(true);
      return;
    }

    setError(false);

    let resultado = 2000;

    const diferencia = obtenerDiferenciaYear(year);

    resultado -= (diferencia * 3 * resultado) / 100;

    resultado = calcularMarca(marca) * resultado;

    const incrementoPlan = obtenerPlan(plan);

    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    setCargando(true);

    setTimeout(() => {
      setResumen({
        cotizacion: Number(resultado),
        datos: datos,
      });
      setCargando(false);
    }, 3000);
  };

  return (
    <form onSubmit={(e) => cotizarSeguro(e)}>
      {error ? <Error>Todos los campos son obligatorios</Error> : null}
      <Campo>
        <Label htmlFor="">Marca</Label>
        <Select
          name="marca"
          value={marca}
          onChange={(e) =>
            setDatos({ ...datos, [e.target.name]: e.target.value })
          }
        >
          <option value="">-- Seleccione --</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>
      <Campo>
        <Label htmlFor="">Año</Label>
        <Select
          name="year"
          value={year}
          onChange={(e) =>
            setDatos({ ...datos, [e.target.name]: e.target.value })
          }
        >
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>
      <Campo>
        <Label htmlFor="">Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={(e) =>
            setDatos({ ...datos, [e.target.name]: e.target.value })
          }
        />{" "}
        Basico
        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={(e) =>
            setDatos({ ...datos, [e.target.name]: e.target.value })
          }
        />{" "}
        Completo
      </Campo>
      <Boton type="submit">Cotizar</Boton>
    </form>
  );
};

Formulario.propTypes = {
  setResumen: PropTypes.func.isRequired,
  setCargando: PropTypes.func.isRequired,
};

export default Formulario;
