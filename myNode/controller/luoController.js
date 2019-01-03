const luoModel=require("../dao/luoDao");
var formidable = require('formidable');
let path = require("path");//路径用的
let fs = require("fs");//重命名
let sd = require("silly-datetime");//取时间
const luoController={
  name(req,resp){
    let name=req.body.name;
    console.log(name);
    luoModel.Name(name)
      .then((data)=>{
        resp.send(data);
      })
  },
  loading(req,resp){
    // console.log('页面加载获取数据');
    luoModel.Loading('')
      .then((data)=>{
        resp.send(data);
      })

  },
  img(req,resp){
    let goodsName=req.body.goodsName;
    luoModel.Img(goodsName)
      .then(data=>{
        resp.send(data);
      })
  },
  checkImg(req,resp){
    let color=req.body.color;
    let name=req.body.name;
    luoModel.CheckImg([name,color])
      .then(data=>{
        resp.send(data);
      })
  },
  chima(req,resp){
    let name=req.body.name;
    luoModel.Chima(name)
      .then(data=>{
        resp.send(data);
      })
  },
  add(req,resp){
      console.log('add1');
    luoModel.Add(req.body)
      .then(data=>{
        resp.send(data);
      })
  },
  add2(req,resp){
      console.log('add2');
    luoModel.Add2(req.body)
      .then(data=>{
        resp.send(data);
      })
  },
  upload(req,resp){//上传
    console.log('aaa');
    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/images/newcollection";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
      let ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
      let ran = parseInt(Math.random() * 89999 + 10000);
      let extname = path.extname(files.file.name);
      let oldpath=files.file.path;//老名字
      let newpath ='public/images/newcollection/' + ttt + ran + extname;//新名字
      fs.rename(oldpath, newpath,function(err){//重命名
        if(err) {
          console.log(err);
        }
      });
     luoModel.Upload([newpath.slice(7),fields.name,fields.color])
       .then(data=>{
         resp.send(data);
       })
    });
  },
  delete(req,resp){
    let name=req.body.name;
    // resp.send('aa');
    luoModel.Delete(name)
      .then(data=>{
        resp.send(data);
      })
  },
  deletes(req,resp){//删除
    luoModel.Deletes([req.query.c])
      .then(data=>{

        resp.send(data);
      })
  },
  change(req,resp){
    console.log(req.body);
    luoModel.Change(req.body)
      .then(data=>{
        console.log(data);
        resp.send(data);
      })

  }

};
module.exports=luoController;
