const express=require("express");

// 获取路由对象
const router=express.Router();//调用express对象提供的路由方法获取路由对象
const luoController=require("../controller/luoController");



router.get("/product.do",luoController.loading);//页面加载
router.post("/name.do",luoController.name);//页面加载
router.post("/img.do",luoController.img);
router.post("/checkImg.do",luoController.checkImg);//图片路径获取
router.post("/chima.do",luoController.chima);//尺码获取
router.post("/add.do",luoController.add);//查询商品id
router.post("/add2.do",luoController.add2);//添加商品id进入表
router.post("/upload.do",luoController.upload);//图片上传
router.post("/delete.do",luoController.delete);//删除数据
router.get("/deletes.do",luoController.deletes);//批量删除数据
router.post("/change.do",luoController.change);//批量删除数据



/*如果是jsonP的请求*/





module.exports=router;

