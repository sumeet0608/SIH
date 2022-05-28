import React from 'react'
import { useHistory } from "react-router-dom"

function Home() {
    const history = useHistory()
    const redirect_to_roles = () => {
        history.push('/roles')
    }
    const redirect_to_roles1 = () => {
        history.push('/roles1')
    }
    const redirect_to_roles2 = () => {
        history.push('/roles2')
    }
    const redirect_to_roles3 = () => {
        history.push('/roles3')
    }
    const redirect_to_addmed = () => {
        history.push('/addmed')
    }
    const redirect_to_supply = () => {
        history.push('/supply')
    }
    const redirect_to_track = () => {
        history.push('/track')
    }
    
    return (
        <body style={{backgroundColor : "#b33415" ,height : 843}}>
        <div style={{paddingTop :'8em',marginLeft : '30em'}}>
            <h1 style={{marginLeft : '8em'}}>TRACKER</h1>
            <br></br><br></br>
            <div >
            
            <button style={{borderRadius : '2em',backgroundColor : 'whitesmoke',color : 'black',fontSize : 'large'}} onClick={redirect_to_roles1} className="btn btn-outline-primary btn-sm">Manufacturer</button>
            <br /><br></br>
            <button style={{borderRadius : '2em',backgroundColor : 'whitesmoke',color : 'black',fontSize : 'large'}} onClick={redirect_to_roles2} className="btn btn-outline-primary btn-sm">Distributor</button>
            <br /><br></br>
            <button style={{borderRadius : '2em',backgroundColor : 'whitesmoke',color : 'black',fontSize : 'large'}} onClick={redirect_to_roles3} className="btn btn-outline-primary btn-sm">Retailer</button>
            <br /><br></br>
            <button style={{borderRadius : '2em',backgroundColor : 'whitesmoke',color : 'black',fontSize : 'large'}} onClick={redirect_to_roles} className="btn btn-outline-primary btn-sm">Doctor</button>
            <br /><br></br>
            </div>
        </div>
        </body>
    )
}

export default Home