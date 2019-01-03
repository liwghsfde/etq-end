const express=require("express");
const zwController=require("../controller/zwController");
const router=express.Router();//调用express对象提供的路由方法获取路由对象


/*门店管理*/
router.get("/zwstores.do",zwController.zwstores);/*获取数据*/
router.get("/deleteStore.do",zwController.deleteStore);/*删除单个数据*/
router.get("/batchDelete.do",zwController.batchDelete);/*批量删除数据*/
router.get("/seeStore.do",zwController.seeStore);/*查看单个数据*/
router.get("/editStore.do",zwController.editStore);/*编辑数据获取固定值*/
router.get("/rowAmend.do",zwController.rowAmend);/*编辑数据获取固定值*/
router.get("/searchStore.do",zwController.searchStore);/*搜索*/
router.get("/increaseStore.do",zwController.increaseStore);/*新增数据*/

/*员工管理*/
router.get("/zwEmployees.do",zwController.zwEmployees);/*获取数据*/
router.get("/deleteEmployees.do",zwController.deleteEmployees);/*删除单个数据*/
router.get("/batchDeleteEmployees.do",zwController.batchDeleteEmployees);/*删除多个数据*/
router.get("/editEmployees.do",zwController.editEmployees);/*编辑获取数据显示*/
router.get("/rowEmployees.do",zwController.rowEmployees);/*编辑获取数据显示*/
router.get("/searchEmployees.do",zwController.searchEmployees);/*编辑获取数据显示*/
router.get("/increaseEmployees.do",zwController.increaseEmployees);/*编辑获取数据显示*/


module.exports=router;

