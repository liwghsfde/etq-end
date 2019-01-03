<template>
  <div>
    <div class="pageText">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
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
        prop="e_name"
        label="员工姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="e_sex"
        label="员工性别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="e_phone"
        label="联系方式"
        width="150">
      </el-table-column>
      <el-table-column
        prop="e_address"
        label="联系地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="e_position"
        label="员工职位"
        width="150">
      </el-table-column>
      <el-table-column
        prop="e_department"
        label="所属部门"
        width="150">
      </el-table-column>
      <el-table-column
        prop="e_state"
        label="在职状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="e_time"
        label="入职任期"
        width="150">
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
    <el-dialog title="查看员工详情" :visible.sync="dialogFormVisible0">
      <el-form :model="form">
        <el-form-item label="员工名称：" :label-width="formLabelWidth">
          <el-input autocomplete="off" :placeholder="M_name"></el-input>
        </el-form-item>
        <el-form-item label="员工性别：" :label-width="formLabelWidth">
          <el-input v-model="formType" :placeholder="M_type"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" :label-width="formLabelWidth">
          <el-input v-model="formAddress" :placeholder="M_address"></el-input>
        </el-form-item>
        <el-form-item label="联系地址：" :label-width="formLabelWidth">
          <el-input v-model="formPhone" :placeholder="M_phone"></el-input>
        </el-form-item>
        <el-form-item label="工作信息：" :label-width="formLabelWidth">
          <el-input v-model="formSheng" :placeholder="M_sheng" class="el_1 el_2"></el-input>
          <el-input v-model="formShi" :placeholder="M_shi" class="el_1"></el-input>
          <el-input v-model="formQu" :placeholder="M_qu" class="el_1"></el-input>
        </el-form-item>
        <el-form-item label="入职日期：" :label-width="formLabelWidth">
          <el-input v-model="formTime" :placeholder="M_Time"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--编辑弹框-->
    <el-dialog title="编辑员工详情" :visible.sync="dialogFormVisible1">
      <el-form :model="form">
        <el-form-item label="员工名称：" :label-width="formLabelWidth">
          <el-input v-model="formName" :placeholder="M_name"></el-input>
        </el-form-item>
        <el-form-item label="员工性别：" :label-width="formLabelWidth">
          <el-input v-model="formType" :placeholder="M_type"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" :label-width="formLabelWidth">
          <el-input v-model="formAddress" :placeholder="M_address"></el-input>
        </el-form-item>
        <el-form-item label="联系地址：" :label-width="formLabelWidth">
          <el-input v-model="formPhone" :placeholder="M_phone"></el-input>
        </el-form-item>
        <el-form-item label="工作信息：" :label-width="formLabelWidth">
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
        <el-form-item label="入职日期：" :label-width="formLabelWidth">
          <el-date-picker
          v-model="form.formTime"
          type="date"
          value-format="yyyy-MM-dd"
          :placeholder="M_Time"
          style="width: 800px">
        </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="rowAmend">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增弹框-->
    <el-dialog title="新增员工" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="员工名称：" :label-width="formLabelWidth">
          <el-input v-model="newName" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="员工性别："  :label-width="formLabelWidth">
          <el-select v-model="form.newType" clearable placeholder="请选择" style="width: 800px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式：" :label-width="formLabelWidth">
          <el-input v-model="newAddress" placeholder="请输入员工联系方式"></el-input>
        </el-form-item>
        <el-form-item label="联系地址：" :label-width="formLabelWidth">
          <el-input v-model="newPhone" placeholder="请输入员工的联系地址"></el-input>
        </el-form-item>
        <el-form-item label="工作信息：" :label-width="formLabelWidth">
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
        <el-form-item label="入职日期：" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.newTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            style="width: 800px">
          </el-date-picker>
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
    name: "zwEmployees",
    data() {
      return {
        options: [{
          value: '男性',
          label: '男性'
        }, {
          value: '女性',
          label: '女性'
        }],
        city: [{
          value: '宣传人员',
          label: '宣传人员'
        }, {
          value: '宣传经理',
          label: '宣传经理'
        }, {
          value: '客服人员',
          label: '客服人员'
        }, {
          value: '客服经理',
          label: '客服经理'
        },{
          value: '设计师',
          label: '设计师'
        },{
          value: '设计经理',
          label: '设计经理'
        },{
          value: '程序员',
          label: '程序员'
        },{
          value: '程序经理',
          label: '程序经理'
        },{
          value: '人事经理',
          label: '人事经理'
        },{
          value: '总务经理',
          label: '总务经理'
        }],
        city2: [{
          value: '宣传部门',
          label: '宣传部门'
        }, {
          value: '客服部门',
          label: '客服部门'
        }, {
          value: '设计部门',
          label: '设计部门'
        }, {
          value: '程序部门',
          label: '程序部门'
        }, {
          value: '人事部门',
          label: '人事部门'
        }, {
          value: '总务部门',
          label: '总务部门'
        }],
        city3: [{
          value: '工作',
          label: '工作'
        }, {
          value: '休假',
          label: '休假'
        }, {
          value: '事假',
          label: '事假'
        }, {
          value: '实习',
          label: '实习'
        }],
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
          M_Time:'',
          formName:'',
          formType:'',
          formAddress:'',
          formPhone:'',
          formSheng:'',
          formShi:'',
          formQu:'',
          formTime:'',
          newName:'',
          newType:'',
          newAddress:'',
          newPhone:'',
          newSheng:'',
          newShi:'',
          newQu:'',
          newTime:'',
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
          this.$axios.get('http://localhost:8888/deleteEmployees.do',{params:{id:row.id}})
            .then(resp=>{
              this.$axios.get('http://localhost:8888/zwEmployees.do')
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
          this.$axios.get('http://localhost:8888/batchDeleteEmployees.do',{params:{a:a}})
            .then(resp=>{
              this.$axios.get('http://localhost:8888/zwEmployees.do')
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
        this.$axios.get('http://localhost:8888/editEmployees.do',{params:{id:row.id}})
          .then(function (resp) {
            that.M_id=resp.data[0].id;
            that.M_name=resp.data[0].e_name;
            that.M_type=resp.data[0].e_sex;
            that.M_address=resp.data[0].e_phone;
            that.M_phone=resp.data[0].e_address;
            that.M_sheng=resp.data[0].e_position;
            that.M_shi=resp.data[0].e_department;
            that.M_qu=resp.data[0].e_state;
            that.M_Time=resp.data[0].e_time;
          })
      },
      /*修改*/
      rowAmend(){
        var that=this;
        this.dialogFormVisible1=false;
        this.$axios.get('http://localhost:8888/rowEmployees.do',{params:{M_id:this.M_id,formName:this.formName,formType:this.formType,formAddress:this.formAddress,formPhone:this.formPhone,formSheng:this.form.formSheng,formShi:this.form.formShi,formQu:this.form.formQu,formTime:this.form.formTime}})
          .then(resp=>{
            this.$axios.get('http://localhost:8888/zwEmployees.do')
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
        this.$axios.get('http://localhost:8888/editEmployees.do',{params:{id:row.id}})
          .then(function (resp) {
            that.M_id=resp.data[0].id;
            that.M_name=resp.data[0].e_name;
            that.M_type=resp.data[0].e_sex;
            that.M_address=resp.data[0].e_phone;
            that.M_phone=resp.data[0].e_address;
            that.M_sheng=resp.data[0].e_position;
            that.M_shi=resp.data[0].e_department;
            that.M_qu=resp.data[0].e_state;
            that.M_Time=resp.data[0].e_time;
          })

      },
      /*搜索*/
      searchStore:function () {
        let a=document.getElementById("searchStore").value;
        var that = this;
        this.$axios.get("http://localhost:8888/searchEmployees.do", {params:{a: a}})
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
        this.$axios.get('http://localhost:8888/increaseEmployees.do',{params:{newName:this.newName,newType:this.form.newType,newAddress:this.newAddress,newPhone:this.newPhone,newSheng:this.form.newSheng,newShi:this.form.newShi,newQu:this.form.newQu,newTime:this.form.newTime}})
          .then(resp=>{
            this.$axios.get('/api/zwEmployees.do')
              .then(function (resp) {
                that.tableData=resp.data;
                that.total=that.tableData.length;
              })
          })
      },

    },
    created(){/*数据获取*/
      var that=this;
      this.$axios.get('/api/zwEmployees.do')
        .then(function (resp) {
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
