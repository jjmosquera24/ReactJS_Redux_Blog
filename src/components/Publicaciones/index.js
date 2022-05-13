import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../general/Spinner";
import Fatal from "../general/Fatal";
import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const { getAll: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;

class Publicaciones extends Component {
  async componentDidMount() {
    /*const {
      usuariosTraerTodos,
      publicacionesTraerPorUsuario,
      match: { params: {key}}
    } = this.props;*/

    if (!this.props.usuariosReducer.usuarios.length) {
      await this.props.usuariosTraerTodos();
    }
    if (this.props.usuariosReducer.error) {
      return;
    }
    if (
      !(
        "publicaciones_key" in
        this.props.usuariosReducer.usuarios[this.props.params.key]
      )
    ) {
      this.props.publicacionesTraerPorUsuario(this.props.params.key);
    }
  }

  ponerUsuario = () => {
    /*const {
      usuariosReducer,
      match: {
        params: { key },
      },
    } = this.props;*/

    if (this.props.usuariosReducer.error) {
      return <Fatal mensaje={this.props.usuariosReducer.error} />;
    }

    if (
      !this.props.usuariosReducer.usuarios.length ||
      this.props.usuariosReducer.cargando
    ) {
      return <Spinner />;
    }
    const nombre =
      this.props.usuariosReducer.usuarios[this.props.params.key].name;

    return <h1>Publicaciones de {nombre}</h1>;
  };

  ponerPublicaciones = () => {
    if (!this.props.usuariosReducer.usuarios.length) return;
    if (this.props.usuariosReducer.error) return;
    if (this.props.publicacionesReducer.cargando) {
      return <Spinner />;
    }
    if (this.props.publicacionesReducer.error) {
      return <Fatal mensaje={this.props.publicacionesReducer.error} />;
    }
    if (!this.props.publicacionesReducer.publicaciones.length) return;
    if (
      !(
        "publicaciones_key" in
        this.props.usuariosReducer.usuarios[this.props.params.key]
      )
    )
      return;

    const { publicaciones_key } =
      this.props.usuariosReducer.usuarios[this.props.params.key];
    return this.props.publicacionesReducer.publicaciones[publicaciones_key].map(
      (publicacion) => (
        <div
          className="pub_title"
          key={publicacion.id}
          onClick={() => alert(publicacion.id)}
        >
          <h2>{publicacion.title}</h2>
          <h3>{publicacion.body}</h3>
        </div>
      )
    );
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.ponerUsuario()}
        {this.ponerPublicaciones()}
      </div>
    );
  }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return {
    usuariosReducer,
    publicacionesReducer,
  };
};

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerPorUsuario,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Publicaciones));
