<template>
    <div id="app">
      <el-row>
        <el-col :span="4" ><el-input v-model="search1" placeholder="请输入搜索内容"></el-input></el-col>
        <el-col :span="1" ><el-button type="primary" icon="el-icon-search" @click="search"></el-button></el-col>
        <el-col :span="1" ><add></add></el-col>
        <el-col :span="1" style="margin-left: 25px"> <el-button type="primary" icon="el-icon-delete" @click="pishan">批量删除</el-button></el-col>
      </el-row>
      <hr>
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe style="width: 100%" @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          type="index"
          label="#"
          width="50">
        </el-table-column>
        <el-table-column
          prop="message_date"
          label="发送时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="message_id"
          label="咨询id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="咨询标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="content"
          label="咨询内容"
          width="580">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <el-button type="primary" icon="el-icon-edit" circle @click=" rowEdit(scope.$index, scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button type="danger" icon="el-icon-delete" circle @click="rowDelete(scope.$index, scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="input1" autocomplete="off" :placeholder="title"></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="3"
              v-model="input2"
              :placeholder="content">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="rowAmend">确 定</el-button>
        </div>
      </el-dialog>
      <el-row>
        <el-col :offset="8" :span="4">
          <div class="pageNumber">
            <el-pagination
              background
              :pager-count="5"
              :current-page.sync="currentPage"
              :page-size="pagesize"
              prev-text="<"
              next-text=">"
              layout="total, prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import delect from './delect'
  import edit from './edit'
  import add from './add'
    export default {
        name: "Itable",
      components:{
        delect:delect,
        edit:edit,
        add:add,
      },
      data() {
        return {
          checked: true,
          i:'',
          title:'',
          content:'',
          tableData:[],
          input1: '',
          input2:'',
          search1:'',
          dialogTableVisible: false,
          dialogFormVisible: false,
          currentPage: 1,
          pagesize: 5,
          total:0,
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
            multipleSelection:[],
          },
          formLabelWidth: '120px'
        };
      },
      created(){
        var that=this;
        this.$axios.get("/api/sql.do")
          .then(function (resp) {
            that.tableData=resp.data;
            that.total=that.tableData.length;

          })
      },
      methods:{
        rowDelete(index,row){
          var that=this;
          var i=row.message_id;
          this.$axios.post('/api/delect.do',{i:i});
          this.$axios.get('/api/sql.do')
            .then(function (resp) {
              that.tableData=resp.data;
            })
        },
        rowEdit(index,row){
          var that=this;
          that.dialogFormVisible=true;
          that.i=row.message_id;
          this.$axios.post('/api/compile.do',{i:that.i})
            .then(function (resp) {
              that.title=resp.data[0].title;
              that.content=resp.data[0].content;


            })
        },
        rowAmend(){
          var that=this;
          that.dialogFormVisible=false;
          this.$axios.post('/api/amend.do',{title:that.input1,content:that.input2,message_id:that.i});
          this.$axios.get('/api/sql.do')
            .then(function (resp) {
              that.tableData=resp.data;
            })
        },
        search(){
          var that=this;
          if (that.search1!==""){
            this.$axios.post('/api/search.do',{search:that.search1})
              .then(function (resp) {
                that.tableData=resp.data;
                that.total = that.tableData.length;

              })
          }
          else if (that.search1=="") {
            this.$axios.get('/api/sql.do')
              .then(function (resp) {
                that.tableData=resp.data;
                that.total = that.tableData.length;
              })
          }
        },
        handleSelectionChange(val) {
          console.log(val);
          this.multipleSelection = val;
        }, handleSelectionChange(val) {
          console.log(val);
          this.multipleSelection = val;
        },

        pishan(){
          var that=this;
          var a=new Array()
          for (var i=0;i<that.multipleSelection.length;i++){
            a[i]=that.multipleSelection[i].message_id
          }
          this.$alert('<strong>此操作将永久删除该文件, 是否继续?<>', '提示', {
            dangerouslyUseHTMLString: true
          }).then(() => {
              var that = this;
              console.log(a);
              this.$axios.get("/api/pishan.do", {params: {a: a}}
              )
                .then(resp => {
                  this.$axios.get("/apinshi.do")
                    .then(function (resp) {
                      that.tableData = resp.data;
                      that.total = that.tableData.length;
                    })
                })
            }
          )
        },

      }
    }
</script>

<style scoped>
  hr{
    opacity: 0.3;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .pageNumber{
    width: 30%;
    position: absolute;
    top: 300px;
    left: 1100px;
  }
</style>
