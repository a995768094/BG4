<template>
  <div>
    <template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="待支付" name="first">待支付</el-tab-pane>
    <el-tab-pane label="待派单" name="second">待派单</el-tab-pane>
    <el-tab-pane label="待接单" name="third">待接单</el-tab-pane>
    <el-tab-pane label="待服务" name="fourth">待服务</el-tab-pane>
    <el-tab-pane label="待确认" name="fifth">待确认</el-tab-pane>
    <el-tab-pane label="已完成" name="sixth">已完成</el-tab-pane>
  </el-tabs>
</template>
    <!-- 按钮 -->
    <el-button type="success" size="small" @click="toAddHandler">添加</el-button> 
    <el-button type="danger" size="small">批量删除</el-button>
    <!-- /按钮 -->
    <!-- 表格 -->
    <el-table :data="orders.list">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column width="200" prop="orderTime" label="下单时间"></el-table-column>
      <el-table-column prop="total" label="总价"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="customerId" label="顾客ID"></el-table-column>
      <el-table-column prop="waiterId" label="员工ID"></el-table-column>
      <el-table-column prop="addressId" label="地址ID"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template v-slot="slot">
          <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
          <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格结束 -->
    <!-- 分页开始 -->
    <el-pagination 
        layout="prev, pager, next" 
        :total="orders.total" 
        @current-change="pageChageHandler">
        </el-pagination>
    <!-- /分页结束 -->
    <!-- 模态框 -->
    <el-dialog
      :title = "title"
      :visible.sync="visible"
      width="60%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="下单时间">
          <el-input v-model="form.orderTime"></el-input>
        </el-form-item>
        <el-form-item label="总价">
          <el-input v-model="form.total"></el-input>
        </el-form-item>
          <el-form-item label="顾客id">
          <el-input v-model="form.customerId"></el-input>
        </el-form-item>
          <el-form-item label="员工id">
          <el-input v-model="form.waiterId"></el-input>
        </el-form-item>
          <el-form-item label="地址id">
            <el-select v-model="form.addressId">
                <!-- item是元素 -->
                <el-option 
                    v-for="item in options"  
                    :key="item.id"
                    :label="item.address_id"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModalHandler">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </span>
    </el-dialog>
    <!-- /模态框 -->

  </div>
</template>

<script>
import request from '@/utils/request'
import querystring from 'querystring'
export default {
  // 用于存放网页中需要调用的方法
  methods:{
       handleClick(tab, event) {
        console.log(tab, event);
      },
    // 当分页中当前页改变的时候执行
    pageChageHandler(page){
        // 将params中当前页改为插件中的当前页
        this.params.page = page-1;
        // 加载
        this.loadData();
    },
    loadData(){
      let url = "http://localhost:6677/order/queryPage"
      request({
          url,
          method:"post",
          headers:{
              "Content-Type":"application/x-www-form-urlencoded"
          },
          data:querystring.stringify(this.params)
      }).then((response)=>{
          // orders为一个对象，其中包含了分页信息，以及列表信息
          this.orders = response.data;
      })
    },
    submitHandler(){
      //this.form 对象 ---字符串--> 后台 {type:'order',age:12}
      // json字符串 '{"type":"order","age":12}'
      // request.post(url,this.form)
      // 查询字符串 type=order&age=12
      // 通过request与后台进行交互，并且要携带参数
      let url = "http://localhost:6677/order/saveOrUpdate";
      request({
        url,
        method:"POST",
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
        data:querystring.stringify(this.form)
      }).then((response)=>{
        // 模态框关闭
        this.closeModalHandler();
        // 刷新
        this.loadData();
        // 提示消息
        this.$message({
          type:"success",
          message:response.message
        })
      })
    },
    toDeleteHandler(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用后台接口，完成删除操作
        let url = "http://localhost:6677/order/deleteById?id="+id;
        request.get(url).then((response)=>{
          //1. 刷新数据
          this.loadData();
        
          //2. 提示结果
          this.$message({
            type: 'success',
            message: response.message
          });
        })
        
        
      })
      
    },
    toUpdateHandler(row){
      // 模态框表单中显示出当前行的信息
      this.form = row;
      this.visible = true;
    },
    closeModalHandler(){
      this.visible = false;
    },
    toAddHandler(){
      // 将form变为初始值
      this.form = {
        type:"order"
      }
      this.visible = true;
    }
  },
  // 用于存放要向网页中显示的数据
  data(){
    return {
      activeName: 'first',
      options:[],
      visible:false,
      orders:{},
      form:{},
      params:{
          page:0,
          pageSize:10
      }
    }
  },
  created(){
    // this为当前vue实例对象
    // vue实例创建完毕 
    this.loadData();
  }
}
</script>

<style scoped>
 
</style>