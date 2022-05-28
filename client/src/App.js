import './App.css';
import AssignRoles from './AssignRoles';
import AssignRoles1 from './AssignRoles1';
import AssignRoles2 from './AssignRoles2';
import AssignRoles3 from './AssignRoles3';
import Home from './Home';
import AddMed from './AddMed';
import AddPrescribe from './AddPrescibe';
import Supply from './Supply'
import supply1 from './supply1'
import supply2 from './supply2'
import supply3 from './supply3'
import supply4 from './supply4'
import supply5 from './supply5'
import Track from './Track'
import Track1 from './Track1'
import Track2 from './Track2'
import Track3 from './Track3'
import Track4 from './Track4'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/roles" component={AssignRoles}/>
          <Route path="/roles1" component={AssignRoles1}/>
          <Route path="/roles2" component={AssignRoles2} />
          <Route path="/roles3" component={AssignRoles3}/>
          <Route path="/addmed" component={AddMed} />
          <Route path="/addPrescribe" component={AddPrescribe} />
          
          <Route path="/supply2" component={supply2} />
          <Route path="/supply3" component={supply3} />
          <Route path="/supply4" component={supply4} />
          <Route path="/supply5" component={supply5} />
          <Route path="/track" component={Track} />
          <Route path="/track1" component={Track1} />
          <Route path="/track2" component={Track2} />
          <Route path="/track3" component={Track3} />
          <Route path="/track4" component={Track4} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
