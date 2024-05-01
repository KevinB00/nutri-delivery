import Container from "react-bootstrap/Container";
import './error.sass';

const ErrorPage = () => {
    return (
        <Container className="text-center mt-5">
            <h1>Error <i className="bi bi-emoji-frown"></i></h1>
            <div className="d-flex justify-content-center mt-3">
                <i className="text-danger bi bi-bicycle display-1 bici" style={{fontSize: "300px"}}/>
            </div>
            <p className="lead mt-3 textErrorPage">¡Ups! Parece que algo ha salido mal!</p>
            <p className="textErrorPage">Página no encontrada</p>
        </Container> 

    )
}

export default ErrorPage