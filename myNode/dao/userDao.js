const db=require("../config/dbpoolconfig");

const userModel={
    //添加
    DaoaddUser(params,callback){
        db.connect("insert into message values (?,null,?,?)",
            params,(err,data)=>{
                callback(data);
            })
    },
    //搜索
    //查标题的

    DaoseachUser(params,callback){
        db.connect("select * from message where title like ?",
        params,(err,data)=>{
            callback(data);
        })
    },
//获取页面
    DaogetAllUser(params,callback){
        db.connect("select * from message",
            params,(err,data)=>{
                callback(data);
                // console.log(data)
            })
    },
//批量删除
    Daopishan(params,callback){  //批量删除
        db.connect("DELETE FROM message WHERE message_id IN (?)",
            params,(err,data)=>{
                // console.log(data)
                callback(data);
            })
    },


    //删除
    Daodelete(params,callback){
        db.connect("delete from message where message_id=?",
            params,(err,data)=>{
                callback(data);
            });
    },
    //编辑
    Daocompile(params,callback){
        db.connect("select title,content from message where message_id=?",
            params,(err,data)=>{
                callback(data);
            });
    },
    //保存
    Daoamend(params,callback){
        db.connect("UPDATE message SET title=?,content=? WHERE message_id=?",
            params,(err,data)=>{
                callback(data);
            });
    },

};
module.exports=userModel;