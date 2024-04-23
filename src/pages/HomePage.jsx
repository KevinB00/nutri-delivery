import Navbar from 'react-bootstrap/Navbar';

export default function HomePage() {
    return (
        <>
            <Navbar bg='primary'>
                <Navbar.Brand href="#home">NutriDelivery</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}