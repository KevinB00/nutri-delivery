import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AdminPostList from '../../components/AdminPostList/adminPostList';
import AdminCommentList from '../../components/AdminCommentList/adminCommentList';
import AdminUserList from '../../components/AdminUserList/adminUserList';
import HeaderComponent from '../../components/Header/header';
import FooterComponent from '../../components/Footer/footer';
import './adminPage.sass';

const AdminPage = () => {
  return (
    <>
      <HeaderComponent />
      <Container className="admin-container">
        <h1 className="admin-header">Administración</h1>
        <Tabs defaultActiveKey="posts" id="admin-tabs" className="mb-3">
          <Tab eventKey="posts" title="Posts">
            <AdminPostList />
          </Tab>
          <Tab eventKey="comments" title="Comentarios">
            <AdminCommentList />
          </Tab>
          <Tab eventKey="users" title="Usuarios">
            <AdminUserList />
          </Tab>
        </Tabs>
      </Container>
      <FooterComponent />
    </>
  );
};

export default AdminPage;
