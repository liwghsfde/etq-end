//1.连接数据库
const dbpool=require("../config/dbpoolconfig");
const userModel={
    DaoaddUser(params,callback){
        dbpool.connect("insert into t_user values (null,?,?)",
            params,(err,data)=>{
            callback(data);
            })
    }
};
module.exports=userModel;