const dbpool=require("../config/dbpoolconfig");
const userModel=require("../dao/CHLuserDao");//连接dao

const stuController={
    // ===================================== 会员
    xianshi(req, resp) { //显示
        userModel.Daoxianshi([], function (result) {
            // console.log(result);
            resp.send(result)
        })
    },
    shanchu(req, resp) { //删除
        console.log(req.query);
        userModel.Daoshanchu([req.query.a], function (result) {
            console.log(result);
            resp.send(result)
        })
    },
    pishan(req, resp) { //批量删除
        userModel.Daopishan([req.query.a], function (result) {
            console.log(result);
            resp.send(result)
        })
    },
    chakan(req, resp) { //查看
        console.log(req.body.a);
        userModel.Daochakan([req.body.a], function (result) {
            console.log(result);
            resp.send(result)
        })
    },
    sou(req, resp) { //搜索
        console.log(req.body.a);

        userModel.Daosou(["%"+req.body.a+"%"], function (result) {
            console.log(result);
            resp.send(result)
        })
    },
    //====================================员工
    xianshi1(req, resp) { //显示
        userModel.Daoxianshi1([], function (result) {
            // console.log(result);
            resp.send(result)
        })
    },
    chakan1(req, resp) { //查看
        console.log(req.body.a);
        userModel.Daochakan1([req.body.a], function (result) {
            console.log(result);
            resp.send(result)
        })
    },
    sou1(req, resp) { //搜索
        console.log(req.body.a);

        userModel.Daosou1(["%"+req.body.a+"%"], function (result) {
            console.log(result);
            resp.send(result)
        })
    },
    shanchu1(req, resp) { //删除
        console.log(req.query);
        userModel.Daoshanchu1([req.query.a], function (result) {
            console.log(result);
            resp.send(result)
        })
    },
    pishan1(req, resp) { //批量删除
        userModel.Daopishan1([req.query.a], function (result) {
            console.log(result);
            resp.send(result)
        })
    },
};


module.exports=stuController;