<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg">
          <div class="user-info">
            <p class="name">CRY</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2019-12-08</span></p>
          <p>上次登录地点：<span>南京</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height:522px;margin-top:20px;">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column show-overflow-tooltip :prop="key" :label="value" v-for="(value,key,index) in tableLabel"
            :key="'tableLabel'+index">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="count">
        <el-card shadow="hover" v-for="(item,index) in countData" :key="'count'+index">
          <i class="el-icon-success" v-if="item.type===1" style="background-color: #2ec7c9;"></i>
          <i class="el-icon-star-on" v-if="item.type===2" style="background-color: #ffb980;"></i>
          <i class="el-icon-s-goods" v-if="item.type===3" style="background-color: #5ab1ef;"></i>
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <echart :chartData="echartData.order" style="height: 280px"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <echart :chartData="echartData.user" style="height: 260px"></echart>
        </el-card>
        <el-card shadow="hover">
          <echart :chartData="echartData.video" :isAxisChart="false" style="height: 260px"></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import Echart from '@/components/EChart'
  export default {
    components: {
      Echart
    },
    data() {
      return {
        userImg: require('../../assets/images/user.png'),
        countData: [{
            name: '今日支付订单',
            value: 1234,
            type: 1
          },
          {
            name: '今日收藏订单',
            value: 210,
            type: 2
          },
          {
            name: '今日未支付订单',
            value: 1234,
            type: 3
          },
          {
            name: '本月支付订单',
            value: 1234,
            type: 1
          },
          {
            name: '本月收藏订单',
            value: 210,
            type: 2
          },
          {
            name: '本月未支付订单',
            value: 1234,
            type: 3
          }
        ],
        tableData: [],
        tableLabel: {
          name: '课程',
          todayBuy: '今日购买',
          monthBuy: '本月购买',
          totalBuy: '总购买'
        },
        echartData: {
          order: {
            xData: [],
            series: []
          },
          user: {
            xData: [],
            series: []
          },
          video: {
            series: []
          }
        }
      }
    },
    methods: {
      getTableData() {
        this.$http.get("/home/getData").then(resp => {
          const res = resp.data
          console.log(res.data);
          this.tableData = res.data.tableData;
          // 订单折线图
          const order = res.data.orderData
          this.echartData.order.xData = order.date
          // 第一步取出series中的name部分——键名
          let keyArray = Object.keys(order.data[0])
          // 第二步，循环添加数据
          keyArray.forEach(key => {
            this.echartData.order.series.push({
              name: key,
              type: 'line',
              data: order.data.map(item => item[key])
            })
          });

          // 用户信息柱状图
          const user = res.data.userData;
          this.echartData.user.xData = user.map(item => item.date);
          this.echartData.user.series.push({
            name: '新增用户',
            data: res.data.userData.map(item => item.new),
            type: 'bar'
          });
          this.echartData.user.series.push({
            name: '活跃用户',
            data: res.data.userData.map(item => item.active),
            type: 'bar',
            barGap :0
          });

          // 视频饼图
          this.echartData.video.series.push({
            data: res.data.videoData,
            type: 'pie'
          })
        });
      }
    },
    mounted() {

    },
    created() {
      this.getTableData();
    }
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/home";
</style>