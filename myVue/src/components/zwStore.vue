<template>
  <div>
    <div class="pageText">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>门店管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <hr>
    <div class="pageUpload">
      <input id="searchStore" placeholder="请输入关键字"/>
      <el-button type="primary" icon="el-icon-search" @click="searchStore">搜索</el-button>
      <el-button type="primary" icon="el-icon-upload" @click="newStore">新增</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
    </div>
    <hr>
    <!--数据列表-->
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      highlight-current-row
      style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="biaoti"
        label="门店名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="leixing"
        label="类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="dizhi"
        label="详情地址"
        width="350">
      </el-table-column>
      <el-table-column
        prop="dianhua"
        label="联系方式"
        width="200">
      </el-table-column>
      <el-table-column
        prop="sheng"
        label="所在省"
        width="120">
      </el-table-column>
      <el-table-column
        prop="shi"
        label="所在市"
        width="120">
      </el-table-column>
      <el-table-column
        prop="qu"
        label="所在区"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <el-button icon="el-icon-edit" circle  @click="editStore(scope.$index, scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看" placement="top-start">
              <el-button type="primary" icon="el-icon-search" circle @click="seeStore(scope.$index, scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteStore(scope.$index, scope.row)"></el-button>
            </el-tooltip>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pageNumber">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :pager-count="5"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        prev-text="<"
        next-text=">"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!--查看弹框-->
    <el-dialog title="查看门店详情" :visible.sync="dialogFormVisible0">
      <el-form :model="form">
        <el-form-item label="门店名称：" :label-width="formLabelWidth">
          <el-input autocomplete="off" :placeholder="M_name"></el-input>
        </el-form-item>
        <el-form-item label="门店类型：" :label-width="formLabelWidth">
          <el-input v-model="formType" :placeholder="M_type"></el-input>
        </el-form-item>
        <el-form-item label="门店地址：" :label-width="formLabelWidth">
          <el-input v-model="formAddress" :placeholder="M_address"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" :label-width="formLabelWidth">
          <el-input v-model="formPhone" :placeholder="M_phone"></el-input>
        </el-form-item>
        <el-form-item label="所在地区：" :label-width="formLabelWidth">
          <el-input v-model="formSheng" :placeholder="M_sheng" class="el_1 el_2"></el-input>
          <el-input v-model="formShi" :placeholder="M_shi" class="el_1"></el-input>
          <el-input v-model="formQu" :placeholder="M_qu" class="el_1"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--编辑弹框-->
    <el-dialog title="编辑门店详情" :visible.sync="dialogFormVisible1">
        <el-form :model="form">
          <el-form-item label="门店名称：" :label-width="formLabelWidth">
            <el-input v-model="formName" autocomplete="off" :placeholder="M_name"></el-input>
          </el-form-item>
          <el-form-item label="门店类型：" :label-width="formLabelWidth">
            <el-select v-model="form.formType" clearable placeholder="请选择" style="width: 800px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门店地址：" :label-width="formLabelWidth">
            <el-input v-model="formAddress" :placeholder="M_address"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" :label-width="formLabelWidth">
            <el-input v-model="formPhone" :placeholder="M_phone"></el-input>
          </el-form-item>
          <el-form-item label="所在地区：" :label-width="formLabelWidth">
            <el-select v-model="form.formSheng" :placeholder="M_sheng" style="width: 265px">
              <el-option
                v-for="item in city"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="form.formShi" :placeholder="M_shi" style="width: 263px">
              <el-option
                v-for="item in city2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="form.formQu" :placeholder="M_qu" style="width: 263px">
              <el-option
                v-for="item in city3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="rowAmend">确 定</el-button>
        </div>
      </el-dialog>
    <!--新增弹框-->
    <el-dialog title="新增门店" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="门店名称：" :label-width="formLabelWidth">
          <el-input v-model="newName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="门店类型：" :label-width="formLabelWidth">
          <el-select v-model="form.newType" clearable placeholder="请选择" style="width: 800px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店地址：" :label-width="formLabelWidth">
          <el-input v-model="newAddress" placeholder="详情地址"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" :label-width="formLabelWidth">
          <el-input v-model="newPhone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="所在地区：" :label-width="formLabelWidth">
          <el-select v-model="form.newSheng" clearable placeholder="请选择" style="width: 265px">
            <el-option
              v-for="item in city"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="form.newShi" clearable placeholder="请选择" style="width: 263px">
            <el-option
              v-for="item in city2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="form.newQu" clearable placeholder="请选择" style="width: 263px">
            <el-option
              v-for="item in city3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="increaseStore">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "zwStore",
    data() {
      return {
        options: [{
          value: '常规店',
          label: '常规店'
        }, {
          value: '旗舰店',
          label: '旗舰店'
        }, {
          value: '体验店',
          label: '体验店'
        }, {
          value: '品牌店',
          label: '品牌店'
        }],
        city: [{
          value: '四川省',
          label: '四川省'
        }, {
          value: '河南省',
          label: '河南省'
        }, {
          value: '湖南省',
          label: '湖南省'
        }, {
          value: '浙江省',
          label: '浙江省'
        }],
        city2: [{
          value: '成都市',
          label: '成都市'
        }, {
          value: '杭州市',
          label: '杭州市'
        }, {
          value: '长沙市',
          label: '长沙市'
        }, {
          value: '内江市',
          label: '内江市'
        }],
        city3: [{
          value: '青羊区',
          label: '青羊区'
        }, {
          value: '金牛区',
          label: '金牛区'
        }, {
          value: '高新区',
          label: '高新区'
        }, {
          value: '天府区',
          label: '天府区'
        }],
        value4:'',
        currentPage: 1,
        pagesize: 10,
        total:0,
        tableData: [],
        seeData:[],
        multipleSelection:[],
        /*查看*/
        dialogFormVisible0:false,
        dialogFormVisible1: false,
        dialogFormVisible2:false,
        form: {
          /*编辑*/
          checked:true,
          M_id:'',
          M_name:'',
          M_type:'',
          M_address:'',
          M_phone:'',
          M_sheng:'',
          M_shi:'',
          M_qu:'',
          formName:'',
          formType:'',
          formAddress:'',
          formPhone:'',
          formSheng:'',
          formShi:'',
          formQu:'',
          newName:'',
          newType:'',
          newAddress:'',
          newPhone:'',
          newSheng:'',
          newShi:'',
          newQu:'',
        },
        formLabelWidth:'120px',

      }
    },
    methods: {
      /*删除*/
      deleteStore:function(index,row){
        this.$alert('<strong>此操作将永久删除该文件, 是否继续?</strong>', '提示', {
            dangerouslyUseHTMLString: true
       }).then(()=>{
          var that=this;
          this.$axios.get('http://localhost:8888/deleteStore.do',{params:{id:row.id}})
            .then(resp=>{
              this.$axios.get('http://localhost:8888/zwstores.do')
                .then(function (resp) {
                  that.tableData=resp.data;
                  that.total=that.tableData.length;
                })
            })
        })
      },
      /*批量删除*/
      batchDelete:function(){
        var a=new Array();
        for (var i=0;i<this.multipleSelection.length;i++){
          a[i]=this.multipleSelection[i].id
        }
        this.$alert('<strong>此操作将永久删除该文件, 是否继续?</strong>', '提示', {
          dangerouslyUseHTMLString: true
        }).then(()=>{
          var that=this;
          this.$axios.get('http://localhost:8888/batchDelete.do',{params:{a:a}})
            .then(resp=>{
              this.$axios.get('http://localhost:8888/zwstores.do')
                .then(function (resp) {
                  that.tableData=resp.data;
                  that.total=that.tableData.length;
                })
            })
        })
      },
      handleSelectionChange:function(val){
        this.multipleSelection=val;
      },
      /*编辑获取数据显示*/
      editStore:function (index,row) {
        var that=this;
        this.dialogFormVisible1=true;
        this.$axios.get('http://localhost:8888/editStore.do',{params:{id:row.id}})
          .then(function (resp) {
            that.M_id=resp.data[0].id;
            that.M_name=resp.data[0].biaoti;
            that.M_type=resp.data[0].leixing;
            that.M_address=resp.data[0].dizhi;
            that.M_phone=resp.data[0].dianhua;
            that.M_sheng=resp.data[0].sheng;
            that.M_shi=resp.data[0].shi;
            that.M_qu=resp.data[0].qu;
          })
      },
      /*修改*/
      rowAmend(){
        var that=this;
        this.dialogFormVisible1=false;
        this.$axios.get('http://localhost:8888/rowAmend.do',{params:{M_id:this.M_id,formName:this.formName,formType:this.form.formType,formAddress:this.formAddress,formPhone:this.formPhone,formSheng:this.form.formSheng,formShi:this.form.formShi,formQu:this.form.formQu}})
          .then(resp=>{
            this.$axios.get('http://localhost:8888/zwstores.do')
              .then(function (resp) {
                that.tableData=resp.data;
                that.total=that.tableData.length;
              })
          })
      },
      /*查看*/
      seeStore:function (index,row) {
        this.dialogFormVisible0=true;
        var that=this;
        this.$axios.get('http://localhost:8888/seeStore.do',{params:{id:row.id}})
          .then(resp=>{
            // that.seeData=resp.data;
            that.M_id=resp.data[0].id;
            that.M_name=resp.data[0].biaoti;
            that.M_type=resp.data[0].leixing;
            that.M_address=resp.data[0].dizhi;
            that.M_phone=resp.data[0].dianhua;
            that.M_sheng=resp.data[0].sheng;
            that.M_shi=resp.data[0].shi;
            that.M_qu=resp.data[0].qu;
          })

      },
      /*搜索*/
      searchStore:function () {
        let a=document.getElementById("searchStore").value;
        var that = this;
        this.$axios.get("http://localhost:8888/searchStore.do", {params:{a: a}})
          .then(function (resp) {
            that.tableData = resp.data;
            that.total = that.tableData.length;
          })
      },
      /*新增弹框*/
      newStore:function () {
        this.dialogFormVisible2=true;
      },
      /*新增数据*/
      increaseStore:function () {
        var that = this;
        this.dialogFormVisible2=false;
        this.$axios.get('http://localhost:8888/increaseStore.do',{params:{newName:this.newName,newType:this.form.newType,newAddress:this.newAddress,newPhone:this.newPhone,newSheng:this.form.newSheng,newShi:this.form.newShi,newQu:this.form.newQu}})
          .then(resp=>{
            this.$axios.get('http://localhost:8888/zwstores.do')
              .then(function (resp) {
                that.tableData=resp.data;
                that.total=that.tableData.length;
              })
          })
      },
    },
    created(){/*数据获取*/
      var that=this;
      this.$axios.get('/api/zwstores.do')
        .then(function (resp) {
          // console.log("请求成功之后的回调函数执行");
          // console.log(resp.data);
          that.tableData=resp.data;
          that.total=that.tableData.length;
        })
    },
  }
</script>

<style scoped>
   .pageNumber{
    width: 30%;
    position: absolute;
    top: 950px;
    left: 1300px;
  }
  .pageUpload{
    width:34%;
  }
  hr{
    opacity: 0.3;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  #searchStore{
    height: 30px;
    width: 200px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.16);
  }




</style>
