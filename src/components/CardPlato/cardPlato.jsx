import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./cardPlato.sass";

const CardPlato = (props) => {
    CardPlato.propTypes = {
        id: Number,
        nombre: String,
        precio: Number,
        img: String,
        descripcion: String
    }
  return (
    <Card className="card-plato">
        <Card.Img variant="top" src={props.img} alt={props.nombre} />
        <Card.Body>
            <Card.Title>{props.nombre}</Card.Title>
            <Card.Text>
                Precio: {props.precio}€
            </Card.Text>
            <Card.Text>
                Descripción: {props.descripcion}
            </Card.Text>
            <Button variant="cuartet" href={`/plato/${props.id}`}>Detalles</Button>
        </Card.Body>
    </Card>
  );
};

export default CardPlato;
