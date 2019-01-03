const dbpool=require("../config/dbpoolconfig");
const userModel=require("../dao/zwDao");

const zwController={
    /*门店管理*/
    zwstores(req,resp){
        dbpool.connect("SELECT * FROM stores",[],(err,data)=>{
            // console.log(data);
            resp.send(data)
        })
    },
    /*删除*/
    deleteStore(req,resp) {
        let id = req.query.id;
        dbpool.connect("DELETE FROM stores WHERE id=?", [id], (err, data) => {
            resp.send(data)
        })
    },
    /*批量删除*/
    batchDelete(req,resp){
        let id = req.query.a;
        // console.log(id)
        dbpool.connect("DELETE FROM stores WHERE id IN (?)", [id], (err, data) => {
            resp.send(data)
        })
    },
    /*查看*/
    seeStore(req,resp){
        let id = req.query.id;
        dbpool.connect("SELECT * FROM stores WHERE id=?", [id], (err, data) => {
            resp.send(data)
        })
    },
    /*编辑查看*/
    editStore(req,resp){
        let id = req.query.id;
        dbpool.connect("SELECT * FROM stores WHERE id=?", [id], (err, data) => {
            resp.send(data)
        })
    },
    /*编辑修改*/
    rowAmend(req,resp){
        let id =req.query.M_id;
        let formName=req.query.formName;
        let formType=req.query.formType;
        let formAddress=req.query.formAddress;
        let formPhone=req.query.formPhone;
        let formSheng=req.query.formSheng;
        let formShi=req.query.formShi;
        let formQu=req.query.formQu;
        dbpool.connect("UPDATE stores SET biaoti=?,leixing=?,dizhi=?,dianhua=?,sheng=?,shi=?,qu=? WHERE id=?",[formName,formType,formAddress,formPhone,formSheng,formShi,formQu,id],(err,data)=>{
           // console.log(data);
            resp.send(data)
        })
    },
    /*查询*/
    searchStore(req,resp){
        let a=req.query.a;
        dbpool.connect("SELECT * FROM stores WHERE biaoti LIKE ?",["%"+a+"%"],(err,data)=>{
            resp.send(data);
        })
    },
    /*新增数据*/
    increaseStore(req,resp){
        let newName=req.query.newName;
        let newType=req.query.newType;
        let newAddress=req.query.newAddress;
        let newPhone=req.query.newPhone;
        let newSheng=req.query.newSheng;
        let newShi=req.query.newShi;
        let newQu=req.query.newQu;
        console.log(newType);
        dbpool.connect("INSERT  INTO `stores`(`id`,`biaoti`,`leixing`,`dizhi`,`dianhua`,`sheng`,`shi`,`qu`) VALUES (NULL,?,?,?,?,?,?,?)",[newName,newType,newAddress,newPhone,newSheng,newShi,newQu],(err,data)=>{
            resp.send(data);
        })
    },


    /*员工管理*/
    zwEmployees(req,resp){
        dbpool.connect("SELECT * FROM employees",[],(err,data)=>{
            // console.log(data);
            resp.send(data)
        })
    },
    deleteEmployees(req,resp){
        let id = req.query.id;
        dbpool.connect("DELETE FROM employees WHERE id=?", [id], (err, data) => {
            resp.send(data)
        })
    },
    batchDeleteEmployees(req,resp){
        let id = req.query.a;
        dbpool.connect("DELETE FROM employees WHERE id IN (?)", [id], (err, data) => {
            resp.send(data)
        })
    },
    editEmployees(req,resp){
        let id = req.query.id;
        dbpool.connect("SELECT * FROM employees WHERE id=?", [id], (err, data) => {
            resp.send(data)
        })
    },
    rowEmployees(req,resp){
        let id =req.query.M_id;
        let formName=req.query.formName;
        let formType=req.query.formType;
        let formAddress=req.query.formAddress;
        let formPhone=req.query.formPhone;
        let formSheng=req.query.formSheng;
        let formShi=req.query.formShi;
        let formQu=req.query.formQu;
        let formTime=req.query.formTime;
        dbpool.connect("UPDATE employees SET e_name=?,e_sex=?,e_phone=?,e_address=?,e_position=?,e_department=?,e_state=? ,e_time=? WHERE id=?",[formName,formType,formAddress,formPhone,formSheng,formShi,formQu,formTime,id],(err,data)=>{
            console.log(data);
            resp.send(data)
        })
    },
    searchEmployees(req,resp){
        let a=req.query.a;
        dbpool.connect("SELECT * FROM employees WHERE e_name LIKE ?",["%"+a+"%"],(err,data)=>{
            resp.send(data);
        })
    },
    increaseEmployees(req,resp){
        let newName=req.query.newName;
        let newType=req.query.newType;
        let newAddress=req.query.newAddress;
        let newPhone=req.query.newPhone;
        let newSheng=req.query.newSheng;
        let newShi=req.query.newShi;
        let newQu=req.query.newQu;
        let newTime=req.query.newTime;
        console.log(newTime);
        dbpool.connect("INSERT  INTO `employees`(`id`,`e_name`,`e_sex`,`e_phone`,`e_address`,`e_position`,`e_department`,`e_state`,`e_time`) VALUES (NULL,?,?,?,?,?,?,?,?)",[newName,newType,newAddress,newPhone,newSheng,newShi,newQu,newTime],(err,data)=>{
            resp.send(data);
        })
    }

};
module.exports=zwController;