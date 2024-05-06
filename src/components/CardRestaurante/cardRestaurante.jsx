import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./cardRestaurante.sass";

const CardRestaurante = (props) => {
  CardRestaurante.propTypes = {
    id: Number,
    nombre: String,
    direccion: String,
    horarioApertura: String,
    horarioCierre: String,
  };
  return (
    <Card className="mt-3 mb-3 card-restaurante">
      <Card.Body>
        <Card.Title>{props.nombre}</Card.Title>
        <Card.Text>
          Dirección: {props.direccion}
        </Card.Text>
        <Card.Text>
          Horario de apertura: {props.horarioApertura}
        </Card.Text>
        <Card.Text>
          Horario de cierre: {props.horarioCierre}
        </Card.Text>
        <Button variant="cuartet" href={`/restaurante/${props.id}/platos`}>Ver platos</Button>
      </Card.Body>
    </Card>
  )
};
export default CardRestaurante;
