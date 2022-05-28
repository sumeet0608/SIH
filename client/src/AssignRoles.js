import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import { useHistory } from "react-router-dom"
import  "./css/style2.css"

function AssignRoles() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])
    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [Doctorname, setDoctorname] = useState();
    const [MANname, setMANname] = useState();
    const [DISname, setDISname] = useState();
    const [RETname, setRETname] = useState();
    const [Doctorplace, setDoctorplace] = useState();
    const [MANplace, setMANplace] = useState();
    const [DISplace, setDISplace] = useState();
    const [RETplace, setRETplace] = useState();
    const [Doctoraddress, setDoctoraddress] = useState();
    const [MANaddress, setMANaddress] = useState();
    const [DISaddress, setDISaddress] = useState();
    const [RETaddress, setRETaddress] = useState();
    const [RMS, setRMS] = useState();
    const [MAN, setMAN] = useState();
    const [DIS, setDIS] = useState();
    const [RET, setRET] = useState();

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
            // const rmsCtr = await supplychain.methods.rmsCtr().call();
            // const rms = {};
            // for (i = 0; i < rmsCtr; i++) {
            //     rms[i] = await supplychain.methods.RMS(i + 1).call();
            // }
            // setRMS(rms);
            const manCtr = await supplychain.methods.manCtr().call();
            const man = {};
            for (i = 0; i < manCtr; i++) {
                man[i] = await supplychain.methods.MAN(i + 1).call();
            }
            setMAN(man);
            const disCtr = await supplychain.methods.disCtr().call();
            const dis = {};
            for (i = 0; i < disCtr; i++) {
                dis[i] = await supplychain.methods.DIS(i + 1).call();
            }
            setDIS(dis);
            const retCtr = await supplychain.methods.retCtr().call();
            const ret = {};
            for (i = 0; i < retCtr; i++) {
                ret[i] = await supplychain.methods.RET(i + 1).call();
            }
            setRET(ret);
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
    const handlerChangeAddressRMS = (event) => {
        setDoctoraddress(event.target.value);
    }
    const handlerChangePlaceDoctor = (event) => {
        setDoctorplace(event.target.value);
    }
    const handlerChangeNameDoctor= (event) => {
        setDoctorname(event.target.value);
    }
    const handlerChangeAddressMAN = (event) => {
        setMANaddress(event.target.value);
    }
    const handlerChangePlaceMAN = (event) => {
        setMANplace(event.target.value);
    }
    const handlerChangeNameMAN = (event) => {
        setMANname(event.target.value);
    }
    const handlerChangeAddressDIS = (event) => {
        setDISaddress(event.target.value);
    }
    const handlerChangePlaceDIS = (event) => {
        setDISplace(event.target.value);
    }
    const handlerChangeNameDIS = (event) => {
        setDISname(event.target.value);
    }
    const handlerChangeAddressRET = (event) => {
        setRETaddress(event.target.value);
    }
    const handlerChangePlaceRET = (event) => {
        setRETplace(event.target.value);
    }
    const handlerChangeNameRET = (event) => {
        setRETname(event.target.value);
    }
    const handlerSubmitDoctor = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addDoctor(Doctoraddress, Doctorname).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitMAN = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addManufacturer(MANaddress, MANname, MANplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitDIS = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addDistributor(DISaddress, DISname, DISplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitRET = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addRetailer(RETaddress, RETname, RETplace).send({ from: currentaccount });
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
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/Track'>HISTORY</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/addPrescribe'>PRESCRIBE</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/roles'>REGISTER</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/'>HOME</a></li>
            <li><span style={{color: 'whitesmoke',float : 'left',marginRight : 50}}><b>Current Account Address   : </b> {currentaccount}</span></li>
            </ul>
            
            <div style={{backgroundColor: "#b33415"}}>
            
            </div>
            <div className='body'>
            <div className='main'>
            <div className='login'>
            <form style={{paddingLeft : 60}} onSubmit={handlerSubmitDoctor}>
                <br></br><br></br><br></br><br></br><br></br><br></br>
             <label style={{marginLeft:-5,fontSize : 60,color : 'black'}}>Register</label>
                <input className="form-control-sm" type="text" onChange={handlerChangeAddressRMS} placeholder="Ethereum Address" required />
                <br></br>
                <input className="form-control-sm" type="text" onChange={handlerChangeNameDoctor} placeholder="Doctor Name" required />
                <br></br>
                {/* <input className="form-control-sm" type="text" onChange={handlerChangePlaceDoctor} placeholder="Based In" required />
                <br></br> */}
                <button style={{color :'black',marginLeft : 20}}className="btn btn-outline-success btn-sm"  onSubmit={handlerSubmitDoctor} >Register</button>
                
            </form>
            </div>
            </div>
            </div>
            <br></br><br></br><br></br>
            {/* <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Place</th>
                        <th scope="col">Ethereum Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(RMS).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{RMS[key].id}</td>
                                <td>{RMS[key].name}</td>
                                <td>{RMS[key].place}</td>
                                <td>{RMS[key].addr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}
            
        </div>
    )
}

export default AssignRoles
