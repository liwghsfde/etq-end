const mysql=require("mysql");
const path=require("path");

// const database=require("../config/dbconfig");//连接封装
const db=require("../config/dbpoolconfig");//调用连接池

const userModel=require("../dao/userDao");//连接dao

const userController= {
    getUser: function (request, response) {
        // console.log("进入控制层")
        // console.log(request.query.username);
        // console.log(request.query.pwd);
        response.send("controller收到任务，处理完毕")
    },
    //批删
    pishan(req, resp) { //批量删除
        userModel.Daopishan([req.query.a], function (result) {
            console.log(result);
            resp.send(result)
        })
    },


    //添加
    addUser2(req, resp) {
        let title = req.body.title;
        let content = req.body.content;
        let message_date=req.body.message_date;

        userModel.DaoaddUser([title, content,message_date], function (result) {
            // console.log(result);
            resp.send(result)
        })
    },
    //搜索
    seachUser(req, resp) {
      let i=req.body.search;
      userModel.DaoseachUser(["%"+i+"%"], function (result) {
          resp.send(result)
      })
    },

    //页面加载
    getAllUser(req, resp) {
        userModel.DaogetAllUser([], function (result) {
            resp.send(result)
        })
    },
    //删除
    delectUser(req,resp){
        userModel.Daodelete([req.body.i], function (result) {
            resp.send(result)
        })
    },
    //编辑
    compile(req, resp) {
        // console.log(req.body.i);
        userModel.Daocompile([req.body.i], function (result) {
            // console.log(result);
            resp.send(result)
        })
    },
    //修改
    amend(req, resp) {
        // console.log(req.body.r);
        // let r=req.query.r;
        // let r=req.body.r;
        let message_id=req.body.message_id;
        let title=req.body.title;
        let content=req.body.content;
        userModel.Daoamend([title,content,message_id], function (result) {
            resp.send(result)
        })
    }


};
module.exports=userController;