
import { useDispatch } from "react-redux";
import {logout} from '../features/userSlice'
import Button from 'react-bootstrap/Button'


const Logout = () => {
    const dispatch = useDispatch();
    
const handlelogout=(e) =>{
    
    e.preventDefault();
    
    dispatch(logout());
};
    return (
        <div>
            
            <Button variant="success"  style={{marginTop:'1rem'} } onClick={(e) => handlelogout(e)}>Sign out</Button>
            
        </div>
    )
}

export default Logout
