<template>
  <div class="dashboard-container">
    <div class="dashboard-text">平台: 这是一个服务站</div><br/>
    <div>请选择你想进行的操作：</div><br/>
   <br/><br/>
    <el-button type="success"  @click.prevent="customer">顾客管理</el-button>
    <el-button type="success"  @click.prevent="employee">员工管理</el-button><br/><br/>
    <el-button type="success"  @click.prevent="other">其他管理</el-button>
    <el-button type="success"  @click.prevent="order">订单管理</el-button><br/><br/>
    <el-button type="success"  @click.prevent="comment">评论管理</el-button>
    <el-button type="success"  @click.prevent="address">地址管理</el-button><br/><br/><br/><br/>

     <div class="dashboard-text">码农便捷入口：</div>
    <br/><br/>
    <a target = "_blank" href="http://localhost:6677/swagger-ui.html">swaggerUI</a><br/><br/>
    <a target = "_blank" href="https://fanyi.baidu.com/?aldtype=16047#auto/zh">百度翻译</a><br/><br/>
    <a target = "_blank" href="https://github.com/">github</a><br/><br/>
    <a target = "_blank" href="https://element.eleme.io/#/">elementUI</a><br/><br/>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods:{
    customer(){
      window.location.href = "http://localhost:9528/#/customer/list";
    },
    employee(){
      window.location.href = "http://localhost:9528/#/employee/list";
    },
    other(){
      window.location.href = "http://localhost:9528/#/nested/category";
    },
    order(){
      window.location.href = "http://localhost:9528/#/order/list";
    },
    comment(){
      window.location.href = "http://localhost:9528/#/comment/list";
    },
    address(){
      window.location.href = "http://localhost:9528/#/address/list";
    }
  },
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
