const db=require("../config/dbpoolconfig");

const userModel={
    // =====================================4
    Daoxianshi(params,callback){  //显示
        db.connect("SELECT * FROM (USER a JOIN user_add b  ON a.user_id=b.user_add_id)",
            params,(err,data)=>{
                callback(data);
            })
    },
    Daoshanchu(params,callback){  //删除
        db.connect("DELETE FROM USER WHERE user_id=?",
            params,(err,data)=>{
                // console.log(data)
                callback(data);
            })
    },

    Daopishan(params,callback){  //批量删除
        console.log(params)
        console.log(typeof params)
        db.connect("DELETE FROM USER WHERE user_id IN (?)",
            params,(err,data)=>{
            // console.log(data)
                callback(data);
            })
    },
    Daochakan(params,callback){  //查看
        db.connect("SELECT * FROM (USER a JOIN user_add b  ON a.user_id=b.user_add_id) WHERE a.user_id =?",
            params,(err,data)=>{
                console.log(err)
                callback(data);
            })
    },
    Daosou(params,callback){  //搜索
        db.connect("SELECT * FROM (USER a JOIN user_add b  ON a.user_id=b.user_add_id) WHERE a.user_name LIKE ? ",
            params,(err,data)=>{

                callback(data);
            })
    },
    //===========================员工
    Daoxianshi1(params,callback){  //显示
        db.connect("SELECT DISTINCT *,cc.shijian AS xia,dd.shijian AS fa  FROM USER AS aa,user_add AS bb,dindan AS cc,wuliu AS dd WHERE aa.user_id=bb.user_id AND cc.din=dd.dindan_din AND aa.user_id=cc.user_id ",
            params,(err,data)=>{
                callback(data);
            })
    },
    Daochakan1(params,callback){  //查看
        db.connect("SELECT DISTINCT *,cc.shijian AS xia,dd.shijian AS fa, cc.name AS shangname,dd.name AS wuname  FROM USER AS aa,user_add AS bb,dindan AS cc,wuliu AS dd WHERE aa.user_id=bb.user_id AND cc.din=dd.dindan_din AND aa.user_id=cc.user_id AND din =?",
            params,(err,data)=>{
                console.log(data)
                callback(data);
            })
    },
    Daosou1(params,callback){  //搜索
            db.connect("SELECT DISTINCT *,cc.shijian AS xia,dd.shijian AS fa  FROM\n" +
                " USER AS aa,user_add AS bb,dindan AS cc,wuliu AS dd \n" +
                " WHERE aa.user_id=bb.user_id AND cc.din=dd.dindan_din AND aa.user_id=cc.user_id AND din LIKE  ? ",
                params,(err,data)=>{
                    callback(data);
                })
    },
    Daoshanchu1(params,callback){  //删除
        db.connect("DELETE FROM dindan WHERE din=?",
            params,(err,data)=>{
                db.connect("DELETE FROM wuliu WHERE dindan_din=?",
                    params,(err,data)=>{
                        callback(data);
                    })
            })
    },
    Daopishan1(params,callback){  //批量删除
        console.log(params)
        console.log(typeof params)
        db.connect("DELETE FROM dindan WHERE din IN (?)",
            params,(err,data)=>{
                db.connect("DELETE FROM wuliu WHERE dindan_din IN (?)",
                    params,(err,data)=>{
                        callback(data);
                    })
            })
    },
};
module.exports=userModel;