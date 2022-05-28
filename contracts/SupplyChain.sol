pragma solidity >=0.4.22 <0.9.0;

contract SupplyChain {
    //Smart Contract owner will be the person who deploys the contract only he can authorize various roles like retailer, Manufacturer,etc
    address public Owner;

    //note this constructor will be called when smart contract will be deployed on blockchain
    

    //Roles (flow of pharma supply chain)
    // RawMaterialSupplier; //This is where Manufacturer will get raw materials to make medicines
    // Manufacturer;  //Various WHO guidelines should be followed by this person
    // Distributor; //This guy distributes the medicines to retailers
    // Retailer; //Normal customer buys from the retailer

    //modifier to make sure only the owner is using the function
    modifier onlyByOwner() {
        
        _;
    }

    //stages of a medicine in pharma supply chain
    enum STAGE {
        Init,
        Manufacture,
        Distribution,
        Retail,
        PartiallySold,
        sold
    }
    //using this we are going to track every single medicine the owner orders

    //Medicine count
    uint256 public medicineCtr = 4;
    //Raw material supplier count
    //uint256 public rmsCtr = 0;
    //Manufacturer count
    uint256 public manCtr = 0;
    //distributor count
    uint256 public disCtr = 0;
    //retailer count
    uint256 public retCtr = 0;
    uint256 public docCtr = 0;
    uint256 public patCtr = 0;
    uint256 public solCtr = 0;
    uint256 public parCtr = 0;
    //To store information about the medicine
    struct medicine {
        uint256 id; //unique medicine id
        string name; //name of the medicine        
        //uint256 RMSid; //id of the Raw Material supplier for this particular medicine
        uint256 MANid; //id of the Manufacturer for this particular medicine
        uint256 DISid; //id of the distributor for this particular medicine
        uint256 RETid; //id of the retailer for this particular medicine
        uint256 ManQuantity;
        uint256 DisQuantity;
        uint256 RetQuantity;
        uint256 PatQuantity;
        STAGE stage; //current medicine stage
    }

    //To store all the medicines on the blockchain
    mapping(uint256 => medicine) public MedicineStock;
    constructor() public{
        MedicineStock[1] = medicine(1,"crocin",0,0,0,0,0,0,0,STAGE.Init);
    MedicineStock[2] = medicine(2,"dolo",0,0,0,0,0,0,0,STAGE.Init);
    MedicineStock[3] = medicine(3,"calpol",0,0,0,0,0,0,0,STAGE.Init);
    MedicineStock[4] = medicine(4,"montefex",0,0,0,0,0,0,0,STAGE.Init);
    }
    
    //To show status to client applications
    function showStage(uint256 _medicineID)
        public
        view
        returns (string memory)
    {
        require(medicineCtr > 0);
        if (MedicineStock[_medicineID].stage == STAGE.Init)
            return "Medicine Ordered";
        //else if (MedicineStock[_medicineID].stage == STAGE.RawMaterialSupply)
           // return "Raw Material Supply Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.Manufacture)
            return "Manufacturing Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.Distribution)
            return "Distribution Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.Retail)
            return "Retail Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.PartiallySold)
            return "Partially Sold";
        else if (MedicineStock[_medicineID].stage == STAGE.sold)
            return "Medicine Sold";
    }

    //To store information about raw material supplier
    //struct rawMaterialSupplier {
    //     address addr;
    //     uint256 id; //supplier id
    //     string name; //Name of the raw material supplier
    //     string place; //Place the raw material supplier is based in
    //     uint256 Quantity;
    // }

    //To store all the raw material suppliers on the blockchain
    //mapping(uint256 => rawMaterialSupplier) public RMS;

    //To store information about manufacturer
    struct manufacturer {
        address addr;
        uint256 id; //manufacturer id
        string name; //Name of the manufacturer
        string place; //Place the manufacturer is based in
        uint256 Quantity;
    }

    //To store all the manufacturers on the blockchain
    mapping(uint256 => manufacturer) public MAN;

    //To store information about distributor
    struct distributor {
        address addr;
        uint256 id; //distributor id
        string name; //Name of the distributor
        string place; //Place the distributor is based in
        uint256 Quantity;
    }

    //To store all the distributors on the blockchain
    mapping(uint256 => distributor) public DIS;

    //To store information about retailer
    struct retailer {
        address addr;
        uint256 id; //retailer id
        string name; //Name of the retailer
        string place; //Place the retailer is based in
        uint256 Quantity;
    }

    //To store all the retailers on the blockchain
    mapping(uint256 => retailer) public RET;

    //patient
    struct patient {        
        uint256 id; //patient id
        string name; //Name of the patient
        string phoneNo;
        string email;
        uint256 docID;
        string medName;
        uint256 Quantity;        
    }
    mapping(uint256 => patient) public PAT;
    
    //Doctor
    struct doctor {
        address addr;
        uint256 id; //doctor id
        string name; //Name of the doctor                
    }
    
    mapping(uint256 => doctor) public DOC;
    
    struct soldMed {
        uint256 Retid; 
        uint256 DocId;
        uint256 PatId;
        uint256 MedId;
        uint256 Quantity;              
    }
    
    mapping(uint256 => soldMed) public SOL;
    struct parPat {
        uint256 Retid; 
        uint256 DocId;
        uint256 PatId;
        uint256 MedId;
        uint256 balQ;
        uint256 presQ;
        }
    
    mapping(uint256 => parPat) public PAR;
    function addDoctor(
        address _address,
        string memory _name
    ) public onlyByOwner() {
        docCtr++;
        DOC[docCtr]=doctor(_address,docCtr,_name);
    }

    //To add manufacturer. Only contract owner can add a new manufacturer
    function addManufacturer(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        manCtr++;
        MAN[manCtr] = manufacturer(_address, manCtr, _name, _place,0);
    }

    //To add distributor. Only contract owner can add a new distributor
    function addDistributor(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        disCtr++;
        DIS[disCtr] = distributor(_address, disCtr, _name, _place,0);
    }

    //To add retailer. Only contract owner can add a new retailer
    function addRetailer(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        retCtr++;
        RET[retCtr] = retailer(_address, retCtr, _name, _place,0);
    }

    

    //To manufacture medicine
    function Manufacturing(uint256 _medicineID,uint256 _quantity) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findMAN(msg.sender);
        require(_id > 0);
        require(_quantity>0);
        require(MedicineStock[_medicineID].stage == STAGE.Init);
        MedicineStock[_medicineID].MANid = _id;
        MedicineStock[_medicineID].ManQuantity = _quantity;
        MAN[_id].Quantity+=_quantity;
        MedicineStock[_medicineID].stage = STAGE.Manufacture;
    }

    //To check if Manufacturer is available in the blockchain
    function findMAN(address _address) private view returns (uint256) {
        require(manCtr > 0);
        for (uint256 i = 1; i <= manCtr; i++) {
            if (MAN[i].addr == _address) return MAN[i].id;
        }
        return 0;
    }

    //To supply medicines from Manufacturer to distributor
    function Distribute(uint256 _medicineID,uint256 _quantity) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findDIS(msg.sender);
        require(_id > 0);
        require(_quantity>0);

        MedicineStock[_medicineID].DisQuantity = _quantity;
        if( MedicineStock[_medicineID].DisQuantity< MedicineStock[_medicineID].ManQuantity){
            //error
        }
        require(MedicineStock[_medicineID].stage == STAGE.Manufacture);
        MedicineStock[_medicineID].DISid = _id;
        DIS[_id].Quantity+=_quantity;
        MedicineStock[_medicineID].stage = STAGE.Distribution;
    }

    //To check if distributor is available in the blockchain
    function findDIS(address _address) private view returns (uint256) {
        require(disCtr > 0);
        for (uint256 i = 1; i <= disCtr; i++) {
            if (DIS[i].addr == _address) return DIS[i].id;
        }
        return 0;
    }

    //To supply medicines from distributor to retailer
    function Retail(uint256 _medicineID) public {
        
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findRET(msg.sender);
        require(_id > 0);
        uint256 _quantity=MedicineStock[_id].RetQuantity;
        require(_quantity>0);
        
        MedicineStock[_medicineID].RetQuantity = _quantity;
        //DIS[MED[ID].DISid].id
        uint256 distId=MedicineStock[_medicineID].DISid;
        //uint256 distQuant=DIS[disId].Quantity;
        if(DIS[distId].Quantity- _quantity>0) {DIS[distId].Quantity=DIS[distId].Quantity- _quantity;
        MedicineStock[_medicineID].DisQuantity-=_quantity;}

        //else 
        

        require(MedicineStock[_medicineID].stage == STAGE.Distribution);
        MedicineStock[_medicineID].RETid = _id;
        RET[_id].Quantity+=_quantity;
        MedicineStock[_medicineID].stage = STAGE.Retail;
    }

    //To check if retailer is available in the blockchain
    function findRET(address _address) private view returns (uint256) {
        require(retCtr > 0);
        for (uint256 i = 1; i <= retCtr; i++) {
            if (RET[i].addr == _address) return RET[i].id;
        }
        return 0;
    }
    

    //To sell medicines from retailer to consumer
    function sold(string memory _patName,string memory _patEmail) public {
        uint256 _RetId = findRET(msg.sender);
        require(_RetId > 0);                
        uint256 _patId=findPat(_patName,_patEmail);
        require(_patId > 0);
        uint256 _docID=PAT[_patId].docID;
        string memory _medName=PAT[_patId].medName;
        uint256 _medId = findMed(_medName);
        require(MedicineStock[_medId].stage==STAGE.Retail||MedicineStock[_medId].stage==STAGE.PartiallySold);
        uint256 _patQuan = PAT[_patId].Quantity;
        uint256 _retQuan = RET[_RetId].Quantity;
        MedicineStock[_medId].PatQuantity = _patQuan;
        //require(_id == MedicineStock[_medId].RETid); //Only correct retailer can mark medicine as sold
        if(MedicineStock[_medId].stage == STAGE.Retail)
        {

        if(_patQuan <= _retQuan){
            MedicineStock[_medId].RetQuantity-=_patQuan;
            MedicineStock[_medId].stage = STAGE.sold;
            MedicineStock[_medId].PatQuantity = 0;
            solCtr++;
        
            SOL[solCtr]=soldMed(_RetId,_docID,_patId,_medId,_patQuan);  

        }
        else{
            uint256 bal=_patQuan-_retQuan;
            MedicineStock[_medId].stage = STAGE.PartiallySold;
            parCtr++;
        
            PAR[parCtr]=parPat(_RetId,_docID,_patId,_medId,bal,_patQuan);  
        }
        }
        else if(MedicineStock[_medId].stage == STAGE.PartiallySold)
        {
            if(_patQuan <= _retQuan){
            MedicineStock[_medId].RetQuantity-=_patQuan;
            MedicineStock[_medId].stage = STAGE.sold;
            MedicineStock[_medId].PatQuantity = 0;
            solCtr++;
        
            SOL[solCtr]=soldMed(_RetId,_docID,_patId,_medId,_patQuan);  

        }
        else{
            uint256 bal=_patQuan-_retQuan;
            MedicineStock[_medId].stage = STAGE.PartiallySold;
            parCtr++;
        
            PAR[parCtr]=parPat(_RetId,_docID,_patId,_medId,bal,_patQuan);  
        }
        }
    }
    function findPat(string memory _name,string memory _email) private view returns (uint256) {
        require(patCtr > 0);
        for (uint256 i = 1; i <= patCtr; i++) {
            string memory _patName=PAT[i].name;
            string memory _patEmail=PAT[i].email;
            if (keccak256(abi.encode(_patName)) == keccak256(abi.encode(_name))&&keccak256(abi.encode(_patEmail)) == keccak256(abi.encode(_email))) 
                return PAT[i].id;
        }
        return 0;
    }

    function prescribe(string memory _patName,string memory _patPhNo,string memory _email,string memory _medName,uint256 _quantity) public{        
        uint256 _docId = findDoc(msg.sender);
        require(_docId>0);
        require(_quantity>0);        
        uint256 _medId=findMed(_medName);
        require(_medId>0);
        patCtr++;
        PAT[patCtr] = patient(patCtr, _patName, _patPhNo,_email,_docId,_medName,_quantity);
        MedicineStock[_medId].PatQuantity=_quantity;
    }
    function findDoc(address _address) private view returns (uint256) {
        require(docCtr > 0);
        for (uint256 i = 1; i <= docCtr; i++) {
            if (DOC[i].addr == _address) return DOC[i].id;
        }
        return 0;
    }
    function findMed(string memory _name) private view returns (uint256) {
        require(medicineCtr > 0);
        string memory _medName;
        for (uint256 i = 1; i <= medicineCtr; i++) {
            _medName=MedicineStock[i].name;
            if (keccak256(abi.encode(_medName)) == keccak256(abi.encode(_name))) return MedicineStock[i].id;
        }
        return 0;
    }

    // To add new medicines to the stock
    function addMedicine(uint256 _medId,uint256 _quantity)
        public
        onlyByOwner()        
    {
        //js changes
        require((manCtr > 0) && (disCtr > 0) && (retCtr > 0));                
        MedicineStock[_medId].RetQuantity=_quantity;
    }
}