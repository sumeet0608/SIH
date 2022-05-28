import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import  "./css/style2.css"
function AddMed() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [MED, setMED] = useState();
    const [MedName, setMedName] = useState();
    const [MedDes, setMedDes] = useState();
    const [MedStage, setMedStage] = useState();
    const [Quantity, setQuantity] = useState();
    const [PatName, setPatName] = useState();
    const [PatNo, setPatNo] = useState();
    const [PatEmail, setPatEmail] = useState();

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    };

    const loadBlockchaindata = async () => {
        setloader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplychain);
            var i;
            const patCtr = await supplychain.methods.patCtr().call();
            const med = {};
            const medStage = [];
            for (i = 0; i < patCtr; i++) {
                med[i] = await supplychain.methods.PAT(i + 1).call();
                
            }
            setMED(med);
            setloader(false);
        }
        else {
            window.alert('The smart contract is not deployed to current network')
        }
    }
    if (loader) {
        return (
            <div>
                <h1 className="wait">Loading...</h1>
            </div>
        )

    }
    const redirect_to_home = () => {
        history.push('/')
    }
    const handlerChangePatName = (event) => {
        setPatName(event.target.value);
    }
    const handlerChangePatNo = (event) => {
        setPatNo(event.target.value);
    }
    const handlerChangePatEmail = (event) => {
        setPatEmail(event.target.value);
    }
    const handlerChangeMedName = (event) => {
        setMedName(event.target.value);
    }
    const handlerChangeQuantity = (event) => {
        setQuantity(event.target.value);
    }
    const handlerSubmitPre = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.prescribe(PatName,PatNo,PatEmail,MedName,Quantity).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    return (
        <body style={{backgroundColor : "#b33415",height : 753}}>
        <div>
            <ul style={{marginBottom : 0,textAlign : 'right',paddingRight: 20}}>
            
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/Track'>HISTORY</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/addPrescribe'>PRESCRIBE</a></li>            
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/roles'>REGISTER</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/'>HOME</a></li>
           
            
            
            <button onClick={() => navigator.clipboard.writeText({currentaccount})} hidden>Copy</button>
            </ul>
            <br></br><br></br>
            <div style={{marginLeft : '3em'}}>
            <h2>Add Medicine Prescription:</h2>
            <br></br>
            <form onSubmit={handlerSubmitPre}>
                <input className="form-control-sm" type="text" onChange={handlerChangePatName} placeholder="Patient Name" required />
                <br></br>
                <input className="form-control-sm" type="text" onChange={handlerChangePatNo} placeholder="Patient PhoneNumber" required />
                
                <br></br>
                <input className="form-control-sm" type="text" onChange={handlerChangePatEmail} placeholder="Patient Email" required />
                
                <br></br>
                <input className="form-control-sm" type="text" onChange={handlerChangeMedName} placeholder="Medicine Name" required />
                <br></br>
                <input className="form-control-sm" type="text" onChange={handlerChangeQuantity} placeholder="Medicine Quantity" required />
                <br></br>
                <button style={{width :'10em',borderRadius : '2em',backgroundColor :'whitesmoke',color:'black'}}className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitPre}>Prescribe</button>
            </form>
            </div>
            <br />
            <div style={{marginLeft : '3em'}}>
            <h2>Prescribed Medicines:</h2>
            <br></br>
            <table style={{width : '60em'}}id='table1' className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">PatientID</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Patient PhNumber</th>
                        <th scope="col">Medicine Name</th>
                        <th scope="col">Medicine Quantity</th>
                        <th scope="col">DoctorID</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(MED).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{MED[key].id}</td>
                                <td>{MED[key].name}</td>
                                <td>{MED[key].phoneNo}</td>
                                <td>{MED[key].medName}</td>
                                <td>{MED[key].Quantity}</td>
                                <td>{MED[key].docID}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </div>
        </body>
    )
}

export default AddMed