const express=require("express");
const userController=require("../controller/userController"); //调用userController


// 获取路由对象
const router=express.Router();//调用express对象提供的路由方法获取路由对象


router.get("/sql.do",userController.getAllUser);
router.post("/delect.do",userController.delectUser);


router.post("/search.do",userController.seachUser);
//新增
router.post("/reg.do",userController.addUser2);

//编辑
router.post("/compile.do",userController.compile);
router.post("/amend.do",userController.amend);
//批量删除
router.get("/pishan.do",userController.pishan);



module.exports=router;

