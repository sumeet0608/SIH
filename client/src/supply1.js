import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import  "./css/style2.css"
function Supply() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [MED, setMED] = useState();
    const [MedStage, setMedStage] = useState();
    const [ID, setID] = useState();
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
    const handlerChangeID = (event) => {
        setID(event.target.value);
    }
    const handlerQuantity = (event) => {
        setQuantity(event.target.value);
    }
    const handlerSubmitRMSsupply = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.RMSsupply(ID,Quantity).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitManufacturing = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Manufacturing(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitDistribute = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Distribute(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitRetail = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Retail(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitSold = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.sold(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    return (
        <div>
            <ul style={{marginBottom : 0,textAlign : 'right',paddingRight: 60}}>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/supply1'>SUPPLY</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/track1'>TRACK</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/roles'>REGISTER</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/'>HOME</a></li>
            <li><span style={{color: 'whitesmoke',float : 'left',marginRight : 50}}><b>Current Account Address   : </b> {currentaccount}</span></li>
            </ul>
            <div style={{backgroundColor : '#b33415',height : 693}}>
             <br></br><br></br>   
            <h6 style={{fontSize : '3em',marginLeft : 520}}><b>Supply Chain Flow:</b></h6>
            <br></br>
            <p style={{fontSize : 'large',color : 'white',marginLeft : 550}}>Medicine Order -&gt; Raw Material Supplier -&gt;</p>
            <p style={{fontSize : 'large',color : 'white',marginLeft : 510}}> Manufacturer -&gt; Distributor -&gt; Retailer -&gt; Consumer</p>
            <br></br>
            <table id='table1' style={{overflowY :'auto',width : 1200,marginLeft : 100,borderRadius : 0,marginBottom : 0,borderRadius :'2em' }} className="table table-sm table-dark">
                <thead>
                    <tr>
                        <th scope="col">Medicine ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Current Processing Stage</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(MED).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{MED[key].id}</td>
                                <td>{MED[key].name}</td>
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
            <form style={{paddingLeft : 60}} onSubmit={handlerSubmitRMSsupply}>
                <br></br><br></br>
             
             <input style={{marginLeft : 40,width:'20em',height:'3em'}} className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
             <input style={{marginLeft : 40,width:'20em',height:'3em'}} className="form-control-sm" type="text" onChange={handlerQuantity} placeholder="Enter Quantity" required />
                <br></br>
                
            <button style={{marginLeft : 40,width:'10em',backgroundColor : 'whitesmoke',borderRadius : '2em',color:'black',fontSize : 'large'}} className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitRMSsupply}>Supply</button>
                
            </form>
            </div>
            
            
            
        </div>
        
    )
}

export default Supply
