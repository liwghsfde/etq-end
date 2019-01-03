<template>
  <div class="ye">
    <chakan :chakan="cha1" :data="chaData"></chakan>

    <div class="pageText">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
    <hr>
    <div class="pageUpload">
    <input id="shu" placeholder="请输入关键字"/>
    <el-button type="primary" icon="el-icon-search" @click="sou">搜索</el-button>
    <el-button type="primary" icon="el-icon-delete" @click="pishan">批量删除</el-button>
    </div>
    <hr>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe style="width: 100%" @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="55"></el-table-column>
      <el-table-column prop="user_name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="user_pw" label="密码" width="180"></el-table-column>
      <el-table-column prop="user_sex" label="性别" width="180"></el-table-column>
      <el-table-column prop="user_mail" label="邮箱"></el-table-column>
      <el-table-column prop="user_phone" label="电话"></el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow(scope.$index, scope.row)"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="查看" placement="top-start">
          <el-button type="primary" icon="el-icon-search" circle @click="cha(scope.$index, scope.row)"></el-button>
        </el-tooltip>
      </template>
      </el-table-column>
    </el-table>

    <div class="pageNumber">
      <el-pagination
        background
        :pager-count="5"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        prev-text="<"
        next-text=">"
        layout=" total,prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

    <!--<page class="yema"></page>-->

  </div>
</template>

<script>
  import chakan from './chakan'
  export default {
    inject:["reload"],
      name: "Member",
      components:{
        chakan:chakan,
      },
      data() {
        return {
          // scope:scope,
          cha1:false,
          bian1:false,
          chaData:"",

          currentPage: 1,
          pagesize: 10,
          total:0,
          tableData: [],

          multipleSelection: []

        };
      },


      created(){
          var that=this;    //显示
          this.$axios.get("/api/xianshi.do")
            .then(function (resp) {
              // console.log(resp)
              that.tableData=resp.data
              that.total=that.tableData.length;
            })
      },

      methods: {
        deleteRow: function (index, row) {   //删除
          this.$alert('<strong>此操作将永久删除该文件, 是否继续?</strong>', '提示', {
            dangerouslyUseHTMLString: true
          }).then(() => {
            var that = this;
            let a = row.user_id;
            console.log(a)
            this.$axios.get("/api/shanchu.do", {params: {a: a}})
              .then(resp => {
                this.$axios.get("/api/xianshi.do")
                  .then(function (resp) {
                    that.tableData = resp.data;
                    that.total = that.tableData.length;
                  })
              })
          })
        },
        handleSelectionChange(val) {
          console.log(val);
          this.multipleSelection = val;
        },
        pishan(){
          var a=new Array()
          for (var i=0;i<this.multipleSelection.length;i++){
            a[i]=this.multipleSelection[i].user_id
          }
          console.log(a)

            this.$alert('<strong>此操作将永久删除该文件, 是否继续?</strong>', '提示', {
              dangerouslyUseHTMLString: true
            }).then(() => {
              var that = this;
              console.log(a)
              this.$axios.get("/api/pishan.do", {params: {a: a}}
              )
                .then(resp => {
                  this.$axios.get("/api/xianshi.do")
                    .then(function (resp) {
                      that.tableData = resp.data;
                      that.total = that.tableData.length;
                    })
                })
            }
            )
        },
        sou(){
          let a=document.getElementById("shu").value;
          var that = this;
          // let a = row.user_id;
          this.$axios.post("/api/sou.do", {a: a})
            .then(function (resp) {
              that.tableData = resp.data;
              that.total = that.tableData.length;
            })
        },
        cha(index, row) {
          this.cha1 = true
          var that = this;
          let a = row.user_id;
          this.$axios.post("/api/chakan.do", {a: a})
            .then(function (resp) {
              // console.log(resp)
              that.chaData = resp.data
            })
        },
      }
    };
</script>

<style scoped>
.hui{
  margin-left: 5px;
}
  .ye>.you{
    margin-left: 85%;
  }
  .pageNumber{
    /*margin-left: 75%;*/
    width: 30%;
    position: absolute;
    top: 950px;
    left: 1300px;

  }
  #shu{
    height: 30px;
    width: 200px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.16);
  }
  hr{
    opacity: 0.3;
    margin-top: 15px;
    margin-bottom: 15px;
  }
.pageUpload{
  width:27%;
  /*margin-left: -500px;*/
}

</style>
