const express=require("express");
const logger=require("morgan");
const favicon=require("serve-favicon");
const bodyParser = require("body-parser");
const route=require("./routes/zwRouter");
const route1=require("./routes/CHLindexRouter");
const route2=require("./routes/indexRouter");
const route3=require("./routes/dataRouter");
const route4=require("./routes/luoindexRouter");

const app=express();//执行express的全局函数，返回一个express的服务器对象


app.use(logger("dev"));//调用日志模块，（开发）模式

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("*",(req,resp,next)=>{
    resp.header("Access-Control-Allow-Origin","*");//允许所有来源访问
    resp.header("Access-Control-Allow-Headers","X-Requested-With");//响应头设置
    resp.header("Access-Control-Allow-Method","POST,GET,PUT,DELETE,OPTIONS");//允许的响应形式
    resp.header("Content-Type","application/json;charset=utf-8");//针对post请求
    next();
});
app.use(route);
app.use(route1);
app.use(route2);
app.use(route3);
app.use(route4);


app.use(express.static(__dirname+"/public"));//__dirname指向当前文件根目录
app.use(express.static(__dirname+"/public/html"));
app.use(favicon(__dirname+"/public/images/favicon.ico"));
app.set("port",8888);//设置端口
app.listen(8888,()=>{
    console.log("服务器已启动"+app.get("port"));
});