<template>
  <div class="ye">
    <chakan1 :chakan1="cha1" :data="chaData" ref="chakan2"></chakan1>
    <div class="pageText">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <hr>
    <div class="pageUpload">
      <!--<input id="shu"/>-->
      <el-col><el-input  class="shu" placeholder="请输入搜索内容" v-model="aa"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="sou1">搜索</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="pishan">批量删除</el-button>
      </el-col>
    </div>




    <el-table :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" ></el-table-column>
      <el-table-column type="index" label="#" ></el-table-column>
      <el-table-column prop="din" label="订单号" width="150" ></el-table-column>
      <el-table-column prop="user_name" label="购买用户名" width="130"></el-table-column>
      <el-table-column prop="address" label="收货地址"></el-table-column>
      <el-table-column prop="add_phone" label="收货电话" width="150"></el-table-column>
      <el-table-column prop="xia" label="下单日期"></el-table-column>
      <el-table-column prop="fa" label="发货日期"></el-table-column>
      <el-table-column prop="zhuangtai" label="状态" width="120"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow(scope.$index, scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="查看" placement="top-start"  >
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
        layout=" prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import chakan1 from './chakan1'
  export default {
    inject:["reload"],
    name: "order",
    components:{
      chakan1:chakan1,
    },
    data() {
      return {
        // scope:scope,
        cha1:false,
        bian1:false,
        chaData:"",
        aa:'',

        search:'',
        currentPage: 1,
        pagesize: 3,
        total:0,
        tableData: [],

        multipleSelection: []

      };
    },
    created(){
      var that=this;    //显示
      this.$axios.get("/api/xianshi1.do")
        .then(function (resp) {
          that.tableData=resp.data;
          console.log(that.tableData)
          that.total=that.tableData.length;
        })
    },
    computed: {
      // 模糊搜索
      tables () {
        const search = this.search;
        if (search) {
          console.log(search);
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.tableData.filter(data => {
            // some() 方法用于检测数组中的元素是否满足指定条件;
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // 注意： some() 不会改变原始数组。
            return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(data[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.tableData
      }
    },

    methods: {
      deleteRow: function (index, row) {   //删除
        this.$alert('<strong>此操作将永久删除该文件, 是否继续?</strong>', '提示', {
          dangerouslyUseHTMLString: true
        }).then(() => {
          var that = this;
          let a = row.din;
          console.log(a)
          this.$axios.get("/api/shanchu1.do", {params: {a: a}})
            .then(resp => {
              this.$axios.get("/api/xianshi1.do")
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
        console.log(this.multipleSelection)
        for (var i=0;i<this.multipleSelection.length;i++){
          a[i]=this.multipleSelection[i].din
        }
        console.log(a)

        this.$alert('<strong>此操作将永久删除该文件, 是否继续?</strong>', '提示', {
          dangerouslyUseHTMLString: true
        }).then(() => {
            var that = this;
            console.log(a)
            this.$axios.get("/api/pishan1.do", {params: {a: a}}
            )
              .then(resp => {
                this.$axios.get("/api/xianshi1.do")
                  .then(function (resp) {
                    that.tableData = resp.data;
                    that.total = that.tableData.length;
                  })
              })
          }
        )
      },
      sou1(){
        this.search=this.aa
        this.total=this.tables.length
        // let a=document.getElementById("shu").value;
        // var that = this;
        // console.log(a)
        // // let a = row.user_id;
        // this.$axios.post("/api/sou1.do", {a: a})
        //   .then(function (resp) {
        //     that.tableData = resp.data;
        //     that.total = that.tableData.length;
        //   })
      },
      cha(index, row) {
        this.$refs.chakan2.jianche(this.tableData)
        this.cha1 = true
        var that = this;
        let a = row.din;
        // console.log(a)
        this.$axios.post("/api/chakan1.do", {a: a})
          .then(function (resp) {
            console.log(resp)
            that.chaData = resp.data
          })
      },
      // chakan2(obj){
      //
      // }
    }
  };
</script>

<style scoped>
  .shu{
    width: 300px;
  }
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
    border: 2px solid rgba(0, 0, 0, 0.36);
  }
  hr{
    opacity: 0.3;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .pageUpload{
    width:34%;
  }

</style>
