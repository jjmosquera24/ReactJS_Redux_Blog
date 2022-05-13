import { GET_BY_USER, LOADING, ERROR } from "../types/publicacionesTypes";
import axios from "axios";
import * as usuariosTypes from "../types/usuariosTypes";

const { GET_ALL: USUARIOS_TRAER_TODOS } = usuariosTypes;

/*
export const getAll = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    const respuesta = await axios.get(
      "http://jsonplaceholder.typicode.com/posts"
    );
    dispatch({
      type: GET_BY_USER,
      payload: respuesta.data,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    dispatch({
      type: ERROR,
      payload: "Algo salió mal, intente más tarde.",
    });
  }
};*/

export const traerPorUsuario = (key) => async (dispatch, getState) => {
  dispatch({
    type: LOADING,
  });

  const { usuarios } = getState().usuariosReducer;
  const { publicaciones } = getState().publicacionesReducer;
  const usuario_id = usuarios[key].id;
  try {
    const respuesta = await axios.get(
      `http://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`
    );
    const publicaciones_actualizadas = [...publicaciones, respuesta.data];
    dispatch({
      type: GET_BY_USER,
      payload: publicaciones_actualizadas,
    });

    const publicaciones_key = publicaciones_actualizadas.length - 1;
    const usuarios_actualizados = [...usuarios];
    usuarios_actualizados[key] = {
      ...usuarios[key],
      publicaciones_key,
    };

    dispatch({
      type: USUARIOS_TRAER_TODOS,
      payload: usuarios_actualizados,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "Publicaciones no disponibles.",
    });
  }
};
