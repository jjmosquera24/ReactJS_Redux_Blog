import axios from "axios";
import { ERROR, GET_ALL, LOADING } from "../types/usuariosTypes";

export const getAll = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({
      type: GET_ALL,
      payload: respuesta.data,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    dispatch({
      type: ERROR,
      payload: "Información de usuario no disponible.",
    });
  }
};
