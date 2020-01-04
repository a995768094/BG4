<template>
  <div>
    <!-- 按钮 -->
    <el-button type="success" size="small" @click="toAddHandler">添加</el-button> 
    <el-button type="danger" size="small">批量删除</el-button>
    <!-- /按钮 -->
    <!-- 表格 -->
    <el-table :data="addresses">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="customerId" label="顾客号"></el-table-column>
      <el-table-column prop="province" label="省"></el-table-column>
      <el-table-column prop="city" label="市"></el-table-column>
      <el-table-column prop="area" label="区"></el-table-column>
      <el-table-column prop="address" label="街道"></el-table-column>
      <el-table-column prop="telephone" label="联系方式"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="slot">
          <!-- slot获取当前行 -->
          <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
          <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格结束 -->
    <!-- 分页开始 -->
    <!-- <el-pagination layout="prev, pager, next" :total="50"></el-pagination> -->
    <!-- /分页结束 -->
    <!-- 模态框 -->
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="60%">
        ---{{form}}
      <el-form :model="form" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="顾客号">
          <el-input v-model="form.customerId"></el-input>
        </el-form-item>
        <el-form-item label="省">
          <el-input v-model="form.province"></el-input>
        </el-form-item>
        <el-form-item label="市">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
        <el-form-item label="区">
          <el-input v-model="form.area"></el-input>
        </el-form-item>
        <el-form-item label="街道">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.telephone"></el-input>
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
      let url = "http://localhost:6677/address/findAll"
      request.get(url).then((response)=>{
        // 将查询结果设置到customers中，this指向外部函数的this
        this.addresses = response.data;
      })
    },
    //提交
        submitHandler(){
            let url = "http://localhost:6677/address/saveOrUpdate"
            //前端向后台发送请求，完成数据的保存操作
            request({
                url,
                method:"post",
                //告诉给后台我的请求体中的放的是查询数据
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                //将请求体中的数据，将this.form转换为查询字符串发送给后台
                data:querystring.stringify(this.form)
            }).then((response)=>{
                //模态框关闭
                this.closeModalHandler();
                //刷新
                this.loadData();
                //提示消息
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
        //调用后台接口,完成删除操作
        let url = "http://localhost:6677/address/deleteById?id="+id;
        request.get(url).then((response)=>{
          //刷新数据
          this.loadData();
          //提示结果
          this.$message({
            type: 'success',
            message: response.message
          });
        })
      }) 
    },
    toUpdateHandler(row){
      //模态框表单中显示出当前行的信息
      this.form = row;
      this.visible = true;
      this.title = "修改地址信息";
    },
    closeModalHandler(){
      this.visible = false;
    },
    toAddHandler(){
      //将from变成初始值
      this.form = {
        type:"address"
      }
      this.visible = true;
      this.title = "添加地址信息";
    }
  },
  // 用于存放要向网页中显示的数据
  data(){
    return {
      title:"录入地址信息",
      visible:false,
      addresses:[],
      form:{
        type:"address"
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