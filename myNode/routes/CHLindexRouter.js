const express=require("express");
const studentController=require("../controller/CHLstudentController"); //调用userController

// 获取路由对象
const router=express.Router();//调用express对象提供的路由方法获取路由对象

// =====================4================
//显示  会员
router.get("/xianshi.do",studentController.xianshi);
//删除
router.get("/shanchu.do",studentController.shanchu);
//批量删除
router.get("/pishan.do",studentController.pishan);
//查看
router.post("/chakan.do",studentController.chakan);
//搜索
router.post("/sou.do",studentController.sou);

//显示  员工
router.get("/xianshi1.do",studentController.xianshi1);
//查看
router.post("/chakan1.do",studentController.chakan1);
//搜索
router.post("/sou1.do",studentController.sou1);
//删除
router.get("/shanchu1.do",studentController.shanchu1);
//批量删除
router.get("/pishan1.do",studentController.pishan1);




module.exports=router;

