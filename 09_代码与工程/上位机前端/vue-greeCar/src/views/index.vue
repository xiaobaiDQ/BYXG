<template>
  <div id="index">
    <dv-full-screen-container class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 style="width:33.3%;height:5px;" />
          <div class="d-flex jc-center">
            <dv-decoration-8 :color="['#568aea', '#000000']" style="width:200px;height:50px;" />
            <div class="title">
              <span class="title-text">草坪修剪护理机器人</span>
              <dv-decoration-6 class="title-bototm" :reverse="true" :color="['#50e3c2', '#67a1e5']"
                style="width:250px;height:8px;" />
            </div>
            <dv-decoration-8 :reverse="true" :color="['#568aea', '#000000']" style="width:200px;height:50px;" />
          </div>
          <dv-decoration-10 style="width:33.3%;height:5px;" />
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex" style="width: 40%">
            <div class="react-right ml-4" style="width: 500px; text-align: left;background-color: #0f1325;">
              <span class="react-before"></span>
              <span class="text fw-b">数据分析</span>
            </div>
            <div class="react-right ml-3" style="background-color: #0f1325;">
              <span class="text colorBlue fw-b">数据监测</span>
            </div>
          </div>
          <div style="width: 40%" class="d-flex">
            <div class="react-left bg-color-blue mr-3">
              <span class="text fw-b">数据总览</span>
            </div>
            <div class="react-left mr-4" style="width: 500px; background-color: #0f1325; text-align: right;">
              <span class="react-after"></span>
              <!-- <span class="text">2020年03月16日 周一 12:00</span> -->
              <span class="text">{{ currentTime }}</span>
            </div>
          </div>
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <dv-border-box-12>
                <centreLeft1 />
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12>
                <centreLeft2 />
              </dv-border-box-12>
            </div>
            <!-- 中间 -->
            <div>
              <center />
            </div>
            <!-- 中间 -->
            <div>
              <centreRight2 />
            </div>
            <div>
              <dv-border-box-13>
                <centreRight1 />
              </dv-border-box-13>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bototm-box">
            <dv-border-box-13>
              <div class="mapbox">
                <p>地图总览</p>
                <gdmap />
              </div>

            </dv-border-box-13>
            <dv-border-box-12>
              <div class="mapbox">
                <h2>科大讯飞农业AI大模型</h2>
                <ai />
              </div>

            </dv-border-box-12>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import centreLeft1 from "./centreLeft1";
import centreLeft2 from "./centreLeft2";
import centreRight1 from "./centreRight1";
import centreRight2 from "./centreRight2";
import center from "./center";
// import bottomLeft from "./bottomLeft";
// import bottomRight from "./bottomRight";
import gdmap from "./gdmap";
import ai from "./ai";
export default {
  data() {
    return {
      loading: true,
      currentTime: ' ', // 新增当前时间数据项
      timer: null      // 新增定时器引用
    };
  },
  components: {
    centreLeft1,
    centreLeft2,
    centreRight1,
    centreRight2,
    center,
    // bottomLeft,
    // bottomRight,
    gdmap,
    ai
  },
  mounted() {
    this.cancelLoading();
    this.updateTime(); // 初始化时间
    // 开启定时器每秒更新时间
    this.timer = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    updateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const date = now.getDate().toString().padStart(2, '0');
      
      // 星期映射（注意JS中周日是0）
      const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      const day = weekDays[now.getDay()];
      
      // 格式化时间 HH:mm
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');

      this.currentTime = `${year} 年 ${month} 月 ${date} 日 ${day}  ${hours}:${minutes}`;
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";

</style>