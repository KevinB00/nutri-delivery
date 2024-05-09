import './comentario.sass'
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';


const Comentario = (props) => {
    Comentario.propTypes = {
        comentario: PropTypes.string.isRequired,
        nombreUsuario: PropTypes.string.isRequired,
        fechaComentario: PropTypes.string.isRequired,
      };
    return (
        <Card className="mt-3 mb-3 card-comentario">
            <Card.Body>
                <Card.Text>{props.comentario}</Card.Text>
                <Card.Text><i className='bi bi-person'></i> {props.nombreUsuario}</Card.Text>
                <Card.Text><i className="bi bi-calendar"></i> Fecha del comentario: {props.fechaComentario}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Comentario;
