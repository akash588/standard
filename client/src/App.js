import {
  BrowserRouter as Router,
  Switch,
  Route
  
} from "react-router-dom";

// import { useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';



import Adminpanel from './adminpanel';
import Fileupload from './components/fileuploadgmail'
// import Login from './components/login'
import Login from './components/logindummy'
import Register from './components/register'
import Yahoo from './yahoo'
import Protected from "./components/Protected";


function App() {
  // const user = useSelector(Selectuser);
  return (
    <Router>

    <div className="App">

      
      
<Route path ="/"  exact component={Adminpanel} />
<Route path ="/gmail">   <Protected Cmp={Adminpanel} /> </Route>
{/* <Route path ="/login" component={Login} /> */}
  {/* <Route path ="/login" component={Login} /> */}
  {/* <Route path ="/upload" component={Fileupload} /> */}
  
{/* <Route path ="/register" component={Register} />
<Route path ="/yahoo">  <Protected Cmp={Yahoo} /> </Route> */}



  
      
       {/* {user ? <Adminpanel />  :<Login />}  */}
    
     </div>
    </Router> 
  );
}

export default App;
