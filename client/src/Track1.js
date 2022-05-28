import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import  "./css/style2.css"
function Track() {
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
    const [RMS, setRMS] = useState();
    const [MAN, setMAN] = useState();
    const [DIS, setDIS] = useState();
    const [RET, setRET] = useState();
    const [TrackTillSold, showTrackTillSold] = useState(false);
    const [TrackTillRetail, showTrackTillRetail] = useState(false);
    const [TrackTillDistribution, showTrackTillDistribution] = useState(false);
    const [TrackTillManufacture, showTrackTillManufacture] = useState(false);
    const [TrackTillRMS, showTrackTillRMS] = useState(false);
    const [TrackTillOrdered, showTrackTillOrdered] = useState(false);

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
                med[i + 1] = await supplychain.methods.MedicineStock(i + 1).call();
                medStage[i + 1] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
            const rmsCtr = await supplychain.methods.rmsCtr().call();
            const rms = {};
            for (i = 0; i < rmsCtr; i++) {
                rms[i + 1] = await supplychain.methods.RMS(i + 1).call();
            }
            setRMS(rms);
            const manCtr = await supplychain.methods.manCtr().call();
            const man = {};
            for (i = 0; i < manCtr; i++) {
                man[i + 1] = await supplychain.methods.MAN(i + 1).call();
            }
            setMAN(man);
            const disCtr = await supplychain.methods.disCtr().call();
            const dis = {};
            for (i = 0; i < disCtr; i++) {
                dis[i + 1] = await supplychain.methods.DIS(i + 1).call();
            }
            setDIS(dis);
            const retCtr = await supplychain.methods.retCtr().call();
            const ret = {};
            for (i = 0; i < retCtr; i++) {
                ret[i + 1] = await supplychain.methods.RET(i + 1).call();
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
    if (TrackTillSold) {
        return (
            <body style={{backgroundColor : '#b33415',height : 860,width:'100%',margin : 0}}>
                <ul style={{marginBottom : 0,textAlign : 'right',paddingRight: 60,width:'100%'}}>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/supply1'>SUPPLY</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/track1'>TRACK</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/roles'>REGISTER</a></li>
            
            <li><span style={{color: 'whitesmoke',float : 'left',marginRight : 50}}><b>Current Account Address   : </b> {currentaccount}</span></li>
            </ul>
            <br></br><br></br>
            
            <div style={{backgroundColor : '#b33415',height : 753}} className="container-xl">
                <article className="col-4">
                <h2 style={{color:'whitesmoke'}}><b><u>Medicine:</u></b></h2>
                    <br></br>
                    <table id='table1' style={{overflowY :'auto',width : 1200,borderRadius : 0,marginBottom : 0,borderRadius :'2em' }} className="table table-sm table-dark">
                <thead>
                    <tr>
                        <th scope="col">Medicine ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Current Processing Stage</th>
                    </tr>
                </thead>
                <tbody>
                    
                        
                            <tr>
                                <td>{MED[ID].id}</td>
                                <td>{MED[ID].name}</td>
                                <td>{MED[ID].description}</td>
                                <td>
                                {MedStage[ID]}
                                </td>
                            </tr>
                        
                    
                </tbody>
            </table>
                </article>
                <hr />
                <br />
                <section className="row">

                    <article className="col-3">
                    <div style={{color:'#f0c287'}}>
                        <h4 style={{color : 'whitesmoke'}}><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </div>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                    <div style={{color:'#f0c287'}}>
                        <h4 style={{color : 'whitesmoke'}}><u>Manufactured by:</u></h4>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                    </div>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                    <div style={{color:'#f0c287'}}>
                        <h4 style={{color : 'whitesmoke'}}><u>Distributed by:</u></h4>
                        <p><b>Distributor ID: </b>{DIS[MED[ID].DISid].id}</p>
                        <p><b>Name:</b> {DIS[MED[ID].DISid].name}</p>
                        <p><b>Place: </b>{DIS[MED[ID].DISid].place}</p>
                    </div>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                    <div style={{color:'#f0c287'}}>
                        <h4 style={{color : 'whitesmoke'}}><u>Retailed by:</u></h4>
                        <p><b>Retailer ID: </b>{RET[MED[ID].RETid].id}</p>
                        <p><b>Name:</b> {RET[MED[ID].RETid].name}</p>
                        <p><b>Place: </b>{RET[MED[ID].RETid].place}</p>
                    </div>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4 style={{color : 'whitesmoke'}}><u>Sold</u></h4>
                    </article>
                </section>
                <button style={{marginLeft : '5em',width:'50em',backgroundColor : 'whitesmoke',borderRadius : '2em',color:'black',fontSize : 'large'}}onClick={() => {
                    showTrackTillSold(false);
                }} className="btn btn-outline-success btn-sm">Track Another Item</button>
                
            </div >
            </body>
        )
    }
    if (TrackTillRetail) {
        return (
            <body style={{backgroundColor : '#b33415',height : 860,width:'100%',margin : 0}}>
                <ul style={{marginBottom : 0,textAlign : 'right',paddingRight: 60,width:'100%'}}>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/supply1'>SUPPLY</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/track1'>TRACK</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/roles'>REGISTER</a></li>
            
            <li><span style={{color: 'whitesmoke',float : 'left',marginRight : 50}}><b>Current Account Address   : </b> {currentaccount}</span></li>
            </ul>
            <br></br><br></br>
            <div style={{backgroundColor : '#b33415'}}className="container-xl">
                <article className="col-4">
                <h2 style={{color:'whitesmoke'}}><b><u>Medicine:</u></b></h2>
                    <br></br>
                    <table id='table1' style={{overflowY :'auto',width : 1200,borderRadius : 0,marginBottom : 0,borderRadius :'2em' }} className="table table-sm table-dark">
                <thead>
                    <tr>
                        <th scope="col">Medicine ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Current Processing Stage</th>
                    </tr>
                </thead>
                <tbody>
                    
                        
                            <tr>
                                <td>{MED[ID].id}</td>
                                <td>{MED[ID].name}</td>
                                <td>{MED[ID].description}</td>
                                <td>
                                {MedStage[ID]}
                                </td>
                            </tr>
                        
                    
                </tbody>
            </table>
                </article>
                <hr />
                <br />
                <section className="row">

                    <article className="col-3">
                    <div style={{color:'#f0c287'}}>
                        <h4 style={{color : 'whitesmoke'}}><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </div>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                    <div style={{color:'#f0c287'}}>
                        <h4 style={{color : 'whitesmoke'}}><u>Manufactured by:</u></h4>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                    </div>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                    <div style={{color:'#f0c287'}}>
                        <h4 style={{color : 'whitesmoke'}}><u>Distributed by:</u></h4>
                        <p><b>Distributor ID: </b>{DIS[MED[ID].DISid].id}</p>
                        <p><b>Name:</b> {DIS[MED[ID].DISid].name}</p>
                        <p><b>Place: </b>{DIS[MED[ID].DISid].place}</p>
                    </div>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4 style={{color : 'whitesmoke'}}><u>Retailed by:</u></h4>
                        <div style={{color:'#f0c287'}}>
                        <p><b>Retailer ID: </b>{RET[MED[ID].RETid].id}</p>
                        <p><b>Name:</b> {RET[MED[ID].RETid].name}</p>
                        <p><b>Place: </b>{RET[MED[ID].RETid].place}</p>
                    </div>
                    </article>
                </section>
                <button style={{marginLeft : '5em',width:'50em',backgroundColor : 'whitesmoke',borderRadius : '2em',color:'black',fontSize : 'large'}} onClick={() => {
                    showTrackTillRetail(false);
                }} className="btn btn-outline-success btn-sm">Track Another Item</button>
                
            </div >
            </body>
        )
    }
    if (TrackTillDistribution) {
        return (
            <body style={{backgroundColor : '#b33415',height : 860,width:'100%',margin : 0}}>
                <ul style={{marginBottom : 0,textAlign : 'right',paddingRight: 60,width:'100%'}}>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/supply1'>SUPPLY</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/track1'>TRACK</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/roles'>REGISTER</a></li>
            
            <li><span style={{color: 'whitesmoke',float : 'left',marginRight : 50}}><b>Current Account Address   : </b> {currentaccount}</span></li>
            </ul>
            <br></br><br></br>
            <div style={{backgroundColor : '#b33415',height : 753}}className="container-xl">
                <article className="col-4">
                <h2 style={{color:'whitesmoke'}}><b><u>Medicine:</u></b></h2>
                    <br></br>
                    <table id='table1' style={{overflowY :'auto',width : 1200,borderRadius : 0,marginBottom : 0,borderRadius :'2em' }} className="table table-sm table-dark">
                <thead>
                    <tr>
                        <th scope="col">Medicine ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Current Processing Stage</th>
                    </tr>
                </thead>
                <tbody>
                    
                        
                            <tr>
                                <td>{MED[ID].id}</td>
                                <td>{MED[ID].name}</td>
                                <td>{MED[ID].description}</td>
                                <td>
                                {MedStage[ID]}
                                </td>
                            </tr>
                        
                    
                </tbody>
            </table>
                </article>
                <hr />
                <br />
                <section className="row">

                    <article className="col-3">
                    <div style={{color:'#f0c287'}}>
                        <h4 style={{color : 'whitesmoke'}}><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </div>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4 style={{color : 'whitesmoke'}}><u>Manufactured by:</u></h4>
                        <div style={{color:'#f0c287'}}>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                        </div>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4 style={{color : 'whitesmoke'}}><u>Distributed by:</u></h4>
                        <div style={{color:'#f0c287'}}>
                        <p><b>Distributor ID: </b>{DIS[MED[ID].DISid].id}</p>
                        <p><b>Name:</b> {DIS[MED[ID].DISid].name}</p>
                        <p><b>Place: </b>{DIS[MED[ID].DISid].place}</p>
                        </div>
                    </article>
                </section>
                <button style={{marginLeft : '5em',width:'50em',backgroundColor : 'whitesmoke',borderRadius : '2em',color:'black',fontSize : 'large'}} onClick={() => {
                    showTrackTillDistribution(false);
                }} className="btn btn-outline-success btn-sm">Track Another Item</button>
                
            </div >
            </body>
        )
    }
    if (TrackTillManufacture) {
        return (
            <body style={{backgroundColor : '#b33415',height : 860,width:'100%',margin : 0}}>
                <ul style={{marginBottom : 0,textAlign : 'right',paddingRight: 60,width:'100%'}}>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/supply1'>SUPPLY</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/track1'>TRACK</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/roles'>REGISTER</a></li>
            
            <li><span style={{color: 'whitesmoke',float : 'left',marginRight : 50}}><b>Current Account Address   : </b> {currentaccount}</span></li>
            </ul>
            <br></br><br></br>
            <div style={{backgroundColor : '#b33415',height : 753}}className="container-xl">
               
                <article className="col-4">
                <h2 style={{color:'whitesmoke'}}><b><u>Medicine:</u></b></h2>
                    <br></br>
                    <table id='table1' style={{overflowY :'auto',width : 1200,borderRadius : 0,marginBottom : 0,borderRadius :'2em' }} className="table table-sm table-dark">
                <thead>
                    <tr>
                        <th scope="col">Medicine ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Current Processing Stage</th>
                    </tr>
                </thead>
                <tbody>
                    
                        
                            <tr>
                                <td>{MED[ID].id}</td>
                                <td>{MED[ID].name}</td>
                                <td>{MED[ID].description}</td>
                                <td>
                                {MedStage[ID]}
                                </td>
                            </tr>
                        
                    
                </tbody>
            </table>
                </article>
                <hr />
                <br />
                <section className="row">

                    <article className="col-3">
                        <h4 style={{color : 'whitesmoke'}}><u>Raw Materials Supplied by:</u></h4>
                        <div style={{color:'#f0c287'}}>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                        </div>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4 style={{color : 'whitesmoke'}}><u>Manufactured by:</u></h4>
                        <div style={{color:'#f0c287'}}>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                        </div>
                    </article>
                </section>
                <button style={{marginLeft : '5em',width:'50em',backgroundColor : 'whitesmoke',borderRadius : '2em',color:'black',fontSize : 'large'}} onClick={() => {
                    showTrackTillManufacture(false);
                }} className="btn btn-outline-success btn-sm">Track Another Item</button>
                
            </div >
            </body>
        )
    }
    if (TrackTillRMS) {
        return (
            <body style={{backgroundColor : '#b33415',height : 860,width:'100%',margin : 0}}>
                <ul style={{marginBottom : 0,textAlign : 'right',paddingRight: 60,width:'100%'}}>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/supply1'>SUPPLY</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/track1'>TRACK</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/roles'>REGISTER</a></li>
            
            <li><span style={{color: 'whitesmoke',float : 'left',marginRight : 50}}><b>Current Account Address   : </b> {currentaccount}</span></li>
            </ul>
            <br></br><br></br>
            <div className="container-xl">
                
                <article className="col-4">
                    <h2 style={{color:'whitesmoke'}}><b><u>Medicine:</u></b></h2>
                    <br></br>
                    <table id='table1' style={{overflowY :'auto',width : 1200,borderRadius : 0,marginBottom : 0,borderRadius :'2em' }} className="table table-sm table-dark">
                <thead>
                    <tr>
                        <th scope="col">Medicine ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Current Processing Stage</th>
                    </tr>
                </thead>
                <tbody>
                    
                        
                            <tr>
                                <td>{MED[ID].id}</td>
                                <td>{MED[ID].name}</td>
                                <td>{MED[ID].description}</td>
                                <td>
                                {MedStage[ID]}
                                </td>
                            </tr>
                        
                    
                </tbody>
            </table>
                    
                </article>
                
                <br />
                <section className="row">

                    <article className="col-3">
                        <h4 style={{color : 'whitesmoke'}}><u>Raw Materials Supplied by:</u></h4>
                        <div style={{color:'#f0c287'}}>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                        </div>
                    </article>
                </section>
                <button style={{marginLeft : '5em',width:'50em',backgroundColor : 'whitesmoke',borderRadius : '2em',color:'black',fontSize : 'large'}}onClick={() => {
                    showTrackTillRMS(false);
                }} className="btn btn-outline-success btn-sm">Track Another Item</button>
                
            </div >
            </body>
        )
    }
    if (TrackTillOrdered) {
        return (
            <body style={{backgroundColor : '#b33415',height : 860,width:'100%',margin : 0}}>
                <ul style={{marginBottom : 0,textAlign : 'right',paddingRight: 60,width:'100%'}}>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/supply1'>SUPPLY</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/track1'>TRACK</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/roles'>REGISTER</a></li>
            
            <li><span style={{color: 'whitesmoke',float : 'left',marginRight : 50}}><b>Current Account Address   : </b> {currentaccount}</span></li>
            </ul>
            <br></br><br></br>
            <div className="container-xl">
                <article className="col-4">
                <table id='table1' style={{overflowY :'auto',width : 1200,borderRadius : 0,marginBottom : 0,borderRadius :'2em' }} className="table table-sm table-dark">
                <thead>
                    <tr>
                        <th scope="col">Medicine ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Current Processing Stage</th>
                    </tr>
                </thead>
                <tbody>
                    
                        
                            <tr>
                                <td>{MED[ID].id}</td>
                                <td>{MED[ID].name}</td>
                                <td>{MED[ID].description}</td>
                                <td>
                                {MedStage[ID]}
                                </td>
                            </tr>
                        
                    
                </tbody>
            </table>
                    <h5>Medicine Not Yet Processed...</h5>
                    <button style={{marginLeft : '5em',width:'50em',backgroundColor : 'whitesmoke',borderRadius : '2em',color:'black',fontSize : 'large'}}onClick={() => {
                        showTrackTillOrdered(false);
                    }} className="btn btn-outline-success btn-sm">Track Another Item</button>
                    
                </article>
                {/* <section className="row">
                    
                    <article className="col-3">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                </section> */}
            </div >
            </body>
        )
    }
    const handlerChangeID = (event) => {
        setID(event.target.value);
    }
    const redirect_to_home = () => {
        history.push('/')
    }
    const handlerSubmit = async (event) => {
        event.preventDefault();
        var ctr = await SupplyChain.methods.medicineCtr().call();
        if (!((ID > 0) && (ID <= ctr)))
            alert("Invalid Medicine ID!!!");
        else {
            // eslint-disable-next-line
            if (MED[ID].stage == 5)
                showTrackTillSold(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 4)
                showTrackTillRetail(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 3)
                showTrackTillDistribution(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 2)
                showTrackTillManufacture(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 1)
                showTrackTillRMS(true);
            else
                showTrackTillOrdered(true);

        }
    }

    return (
        <div style={{backgroundColor : '#b33415',height : 753}}>
            
            <ul style={{marginBottom : 0,textAlign : 'right',paddingRight: 60}}>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/supply1'>SUPPLY</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/track1'>TRACK</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/roles'>REGISTER</a></li>
            <li><a style={{textDecoration : 'none',color : 'white'}} href='/'>HOME</a></li>
            <li><span style={{color: 'whitesmoke',float : 'left',marginRight : 50}}><b>Current Account Address   : </b> {currentaccount}</span></li>
            </ul>
            <br></br><br></br><br></br>
            <h1 style={{marginLeft :'2.8em'}}>TRACKING :</h1>
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
            <br></br><br></br>
            <h5 style={{color:'whitesmoke',marginLeft:'5em'}}>Enter Medicine ID to Track it</h5>
            <br></br>
            <form onSubmit={handlerSubmit}>
                <input  style={{marginLeft : '7em',width:'20em',height:'3em'}} className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                <br></br><br></br>
                <button style={{marginLeft : '5em',width:'10em',backgroundColor : 'whitesmoke',borderRadius : '2em',color:'black',fontSize : 'large'}}className="btn btn-outline-success btn-sm" onSubmit={handlerSubmit}>Track</button>
            </form>
        </div>
    )
}

export default Track
