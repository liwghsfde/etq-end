<template>
  <div class="hello">
    <div class="gezi" >
      <!--商品详情-->
      <luoSee  :seetext=see1 :data="tableData" :xiabiao="index" :imgColor="imgColor" :chiMa="chiMa"></luoSee>
      <!--添加商品-->
      <luoAdd   :seetext=see2></luoAdd>
      <!--修改商品-->
      <luoChange   :seetext="see3"  :xiabiao="index" ref="xiugai"></luoChange>
      <div class="pageText">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>门店管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <hr>
      <div class="pageUpload">
        <el-col :span="9"><el-input  placeholder="请输入搜索内容" v-model="aa"></el-input></el-col>
        <el-button  type="primary" icon="el-icon-upload" @click="chaxun" class="aa">搜索</el-button>
        <el-button  type="primary" icon="el-icon-upload" @click="see2=true" >添加</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="pishan">批量删除</el-button>
      </div>
      <hr>
      <el-table :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                 :style="tableRow"
                 stripe
                 border
                 ref="dormitoryTable"
                 style="width: 100%"
                 @selection-change="handleSelectionChange"
      >
        <!---->
        <!--下面是内容-->
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="ID"
          width="50">
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="seriesName"
          label="商品系列"
          width="100">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="100">
        </el-table-column>
        <el-table-column
          prop="textureName"
          label="材质"
          width="100">
        </el-table-column>
        <el-table-column
          prop="data"
          label="日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="sectionName"
          label="商品分类"
          width="90"
          align="center"
          :filters="sexshaixuan"
          :filter-method="filterTag"
          filter-placement="bottom-end"
         >
          <el-table-column
            prop="discribe"
            label="描述"
            width="700">
          </el-table-column>
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.sectionName === '男鞋' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.sectionName}}</el-tag>
          </template>
        </el-table-column>
          <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
              <el-button size="mini" icon="el-icon-edit" circle  @click=butchange(scope.$index)></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看" placement="top-start">
              <el-button size="mini" type="primary" icon="el-icon-search" circle @click=butsee(scope.$index)></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="deleteRow(scope.$index,scope.row)"></el-button>
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
  </div>
</template>

<script>
  import luoSee from './luosee/luosee'
  import luoAdd from './luoadd/luoadd'
  import luoChange from './luochange/luochange'
export default {
  inject:["reload"],
  name: 'luoindex',
  data () {
    return {
      index:'',
      aa:'',
      otableData:'',
      currentPage: 1,
      pagesize:5,
      total:0,
      chiMa:[],
      imgColor:[],
      see1:false,
      see2:false,
      see3:false,
      value6: '',
      value7: '',
      sexshaixuan:[{ text: '男鞋', value: '男鞋' }, { text: '女鞋', value: '女鞋' }],
      msg:'Hello World!',
      tableData: [],
      input:'',
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
      formLabelWidth: '30%',
      search:"",
      multipleSelection:[],
    }
  },
  created(){
    this.getdata();
  },
  computed: {
    // 模糊搜索
    tables () {
      const search = this.search;
      if (search) {
        console.log(search);
        return this.tableData.filter(data => {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return Object.keys(data).some(key => {
            // some() 方法用于检测数组中的元素是否满足指定条件;
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // 注意： some() 不会改变原始数组。
            return String(data[key]).toLowerCase().indexOf(search) > -1
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
          })
        })
      }
      return this.tableData
    }
  },
  methods: {
    chaxun(){
      this.search=this.aa;
      this.total=this.tables.length;
    },
    pishan(){
      var a=new Array()
      for (var i=0;i<this.multipleSelection.length;i++){
        a[i]=this.multipleSelection[i].a
      }
      this.$alert('<strong>此操作将永久删除该文件, 是否继续?</strong>>', '提示', {
        dangerouslyUseHTMLString: true
      }).then(() => {
          var that = this;
             this.$axios.get("/api/deletes.do", {params: {c: a}})
               .then(
                 this.reload()
               )
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getdata(){
      var that=this;
      this.$axios.get("/api/product.do")
        .then(resp=>{
          that.puanduan=true;
          that.tableData=resp.data;
          that.total=that.tableData.length;
        });
    },
    deleteRow(index,row){//删除数据
      this.$alert('<strong>此操作将永久删除该数据, 是否继续?</strong>', '提示', {
        dangerouslyUseHTMLString: true
      })
        .then(()=>{
          var that=this;
          let name=row.goodsName;
          this.$axios({
            method:'post',
            url:'api/delete.do',
            data:{'name':name}
          }).then((resp)=>{
            console.log(resp);
            this.reload();
            })
        })

    },
    butchange(obj){
      this.see3=true;
      var xiabiao=(obj+(this.currentPage-1)*this.pagesize);//获取准确的下标
      this.$refs.xiugai.jiancha(xiabiao,this.tableData)
    },
    butsee(a){
      var xiabiao=(a+(this.currentPage-1)*this.pagesize);//获取准确的下标
      var that=this;
      this.see1=true;
      this.index=xiabiao;
      let goodsName=this.tableData[this.index].goodsName;
      let data={'goodsName':goodsName};
      this.$axios({
       method:'post',
       url:'/api/img.do',
      data:data
     }).then(resp=>{
         that.imgColor=resp.data;
       });
      this.$axios({
        method:'post',
        url:'/api/chima.do',
        data:{'name':goodsName}
      }).then(resp=>{
          that.chiMa=resp.data;
        });
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    tableRow({ row, rowIndex }) {
      return 'background-color: #000000'
    },
    // 修改table header的
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },

    filterTag(value, row) {//
      return row.sectionName === value;
    },
  },
  components:{
    luoSee:luoSee,
    luoAdd:luoAdd,
    luoChange:luoChange,
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .aa{
   margin-left: 20px;
 }

  .gezi{
    width: 100%;
    height: 500px;
    /*outline: 1px solid black;*/
  }
  .block{
    margin-left: 72%;
  }
  .pageNumber{
    margin-left: 75%;
  }
 .pageUpload{
   width:35%;
 }
 hr{
   opacity: 0.3;
   margin-top: 15px;
   margin-bottom: 15px;
 }

</style>
