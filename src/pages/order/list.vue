<template>
  <div>
    <!-- 按钮 -->
    <el-button type="success" size="small" @click="toAddHandler">添加</el-button> 
    <el-button type="danger" size="small">批量删除</el-button>
    <!-- /按钮 -->
    <!-- 表格 -->
    <el-table :data="orders">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="order_time" label="下单时间"></el-table-column>
      <el-table-column prop="price" label="总价"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="customer_id" label="顾客id"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="slot">
          <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
          <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
          <a href="" @click.prevent="toUpdateHandler(slot.row)">详情</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格结束 -->
    <!-- 分页开始 -->
    <el-pagination layout="prev, pager, next" :total="50"></el-pagination> 
    <!-- 模态框 -->
    <el-dialog
      :title = "title"
      :visible.sync="visible"
      width="60%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-input v-model="form.order_time"></el-input>
        </el-form-item>
        <el-form-item label="总价">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
          <el-form-item label="顾客id">
          <el-input v-model="form.customer_id"></el-input>
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
    loadData(){
      let url = "http://localhost:6677//order/findAll "
      request.get(url).then((response)=>{
        
        this.orders = response.data;
      })
    },
    submitHandler(){
      let url = "http://localhost:6677/order/save";
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
        //调用后台接口完成删除操作
        let url = "http://localhost:6677/order/deleteById?id="+id;
        request.get(url).then((response)=>{
          //1.刷新数据
          this.loadData();
         //2.提示结果
        this.$message({
          type: 'success',
          message: response.message
        });

        })
         
      })
      
    },
    toUpdateHandler(row){
      this.form = row;
      this.visible = true; 
    },
    closeModalHandler(){
      this.visible = false;
    },
    toAddHandler(){
      this.form = {
        type:"order"
      }
      this.visible = true;
      this.title="添加订单信息"
    }
  },
  // 用于存放要向网页中显示的数据
  data(){
    return {
      visible:false,
      orders:[],
      form:{
        type:"order"
      }
    }
  },
  created(){
    // this为当前vue实例对象
    // vue实例创建完毕 
    this.loadData()

  }
}
</script>

<style scoped>
 
</style>