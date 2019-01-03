<template>
    <div id="app">
      <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-upload">新增</el-button>

      <el-dialog title="增加消息通知" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="input1" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="input2">
            </el-input>
          </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>

    export default {
      inject:["reload"],
        name: "add",
      components:{
      },
      data() {
        return {
          input1:'',
          input2:'',

          dialogTableVisible: false,
          dialogFormVisible: false,
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          formLabelWidth: '120px'
        };
      },
      methods:{
          add(){
            let myDate = new Date();
            //获取当前年
            let year=myDate.getFullYear();
            //获取当前月
            let month=myDate.getMonth()+1;
            //获取当前日
            let date=myDate.getDate();
            let now=year+'-'+month+"-"+date;

            var  that=this;
            that.dialogFormVisible = false;
            this.$axios.post('/api/reg.do',{title:that.input1,content:that.input2,message_date:now});

            this.$axios.get('/api/sql.do')
              .then(function (resp) {
                that.tableData=resp.data;
                that.reload();
              });
          }

      }
    }
</script>

<style scoped>

</style>
