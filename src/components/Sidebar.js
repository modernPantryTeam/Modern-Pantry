import 'bootstrap/dist/css/bootstrap.min.css';  
import { Button, Container, Offcanvas } from 'react-bootstrap';  
import {useState} from 'react'  
import MenuIcon from '@mui/icons-material/Menu';
import ButtonCustom from './ButtonCustom'

function Sidebar() {  
  const [show, setShow] = useState(false);  
  const closeSidebar = () => setShow(false);  
  const showSidebar = () => setShow(true);  
  return (  
    <>  
    <Container className='p-4'>  
      <Button variant="primary" onClick={showSidebar}>  
        Menu
      </Button>  
      <ButtonCustom icon={<MenuIcon />} />
      <Offcanvas show={show} onHide={closeSidebar}>  
        <Offcanvas.Header closeButton>  
          <Offcanvas.Title>Menu</Offcanvas.Title>  
        </Offcanvas.Header>  
        <Offcanvas.Body>  
          Options 
        </Offcanvas.Body>  
      </Offcanvas>  
      </Container>  
    </>  
  );  
}  
export default Sidebar;  