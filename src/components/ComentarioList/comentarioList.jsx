import Comentario from "../Comentario/comentario";
import PropTypes from "prop-types";


const ComentarioList = ({ comentarios }) => {
    ComentarioList.propTypes = {
        comentarios: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            comentario: PropTypes.string.isRequired,
            nombreUsuario: PropTypes.string.isRequired,
            fechaComentario: PropTypes.string.isRequired,
          })
        ).isRequired,
      };
  return (
    <div>
      {comentarios.length > 0 ? (
        comentarios.map((comentario) => (
          <Comentario
            key={comentario.id}
            comentario={comentario.comentario}
            nombreUsuario={comentario.nombreUsuario}
            fechaComentario={comentario.fechaComentario}
          />
        ))
      ) : (
        <p>No hay comentarios.</p>
      )}
    </div>
  );
};

export default ComentarioList;
