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
            const medCtr = await supplychain.methods.medicineCtr().call();
            const med = {};
            const medStage = [];
            for (i = 0; i < medCtr; i++) {
                med[i] = await supplychain.methods.MedicineStock(i + 1).call();
                medStage[i] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
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
    const handlerChangeNameMED = (event) => {
        setMedName(event.target.value);
    }
    const handlerChangeDesMED = (event) => {
        setMedDes(event.target.value);
    }
    const handlerChangeQuantity = (event) => {
        setQuantity(event.target.value);
    }
    const handlerSubmitMED = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addMedicine(MedName,Quantity).send({ from: currentaccount });
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
            
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/supply4'>SUPPLY</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/track4'>TRACK</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/AddMed'>ORDER</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/supply5'>SELL</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/roles3'>REGISTER</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/'>HOME</a></li>
            
           
            
            
            <button onClick={() => navigator.clipboard.writeText({currentaccount})} hidden>Copy</button>
            </ul>
            <br></br><br></br>
            <div style={{marginLeft : '3em'}}>
            <h2>Add Medicine Order:</h2>
            <br></br>
            <form onSubmit={handlerSubmitMED}>
                <input className="form-control-sm" type="text" onChange={handlerChangeNameMED} placeholder="Medicine ID" required />
                <br></br>
                <input className="form-control-sm" type="text" onChange={handlerChangeQuantity} placeholder="Medicine Quantity" required />
                <br></br>
                <button style={{width :'10em',borderRadius : '2em',backgroundColor :'whitesmoke',color:'black'}}className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitMED}>Order</button>
            </form>
            </div>
            <br />
            <div style={{marginLeft : '3em'}}>
            <h2>Ordered Medicines:</h2>
            <br></br>
            <table style={{width : '60em'}}id='table1' className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Description</th>
                        <th scope="col">Current Stage</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(MED).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{MED[key].id}</td>
                                <td>{MED[key].name}</td>
                                <td>{MED[key].Quantity}</td>
                                <td>{MED[key].description}</td>
                                <td>
                                    {
                                        MedStage[key]
                                    }
                                </td>
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