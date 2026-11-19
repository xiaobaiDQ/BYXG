<template>
  <div id="center">
    <div class="up">
      <div class="bg-color-black item" v-for="item in titleItem" :key="item.title">
        <p class="ml-3 colorBlue fw-b">{{ item.title }}</p>
        <div>
          <dv-digital-flop :config="item.number" style="width:100px;height:50px;" />

        </div>
      </div>
    </div>
    <div class="down">
      <div class="ranking bg-color-black">
        <span style="color:#5cd9e8">
          <icon name="align-left"></icon>
        </span>
        <span class="fs-xl text mx-2 mb-1">草坪护理化肥消耗详情</span>
        <dv-scroll-ranking-board :config="ranking" style="height:220px" />
      </div>
      <div class="percent">
        <div class="item  bg-color-black">
          <span>转盘转速</span>
          <centerChart1 />
        </div>
        <div class="item  bg-color-black">
          <span>行进速度</span>
          <centerChart2 />
        </div>
        <div class="water">
          <dv-water-level-pond :config="water" style="height: 120px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import centerChart1 from "@/components/echart/center/centerChart1";
import centerChart2 from "@/components/echart/center/centerChart2";
import axios from 'axios';  // 导入 axios
export default {
  data() {
    return {
      titleItem: [
        {
          title: "土壤-氮(mg/kg)",
          number: {
            number: [1],
            toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "土壤-钾(mg/kg)",
          number: {
            number: [1],
            toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "土壤-磷(mg/kg)",
          number: {
            number: [1],
            toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "土壤-湿度(%)",
          number: {
            number: [1],
            toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "土壤-电导率(ms/cm)",
          number: {
            number: [1],
            toFixed: 1,
            content: "{nt}"
          }
        },
        {
          title: "土壤PH",
          number: {
            number: [1],
            toFixed: 1,
            content: "{nt}"
          }
        }
      ],
      ranking: {
        data: [
          {
            name: "速效肥",
            value: 65
          },
          {
            name: "缓释肥",
            value: 120
          },
          {
            name: "硫酸亚铁/镁",
            value: 118
          },
          {
            name: "钾肥",
            value: 126
          },
          {
            name: "磷肥",
            value: 120
          },
          {
            name: "钾肥",
            value: 120
          },
          {
            name: "合成肥",
            value: 130
          },
          {
            name: "有机肥",
            value: 80
          }
        ],
        waitTime: 4000,
        carousel: "page",
        unit: "kg"
      },
      water: {
        data: [24, 65],
        shape: 'roundRect',
        formatter: '{value}%',
        waveNum: 3
      }
    };
  },

  created() {
    this.fetchData(); // 初始加载数据
    // 设置每5秒轮询一次（可根据需求调整时间间隔）
    this.timer = setInterval(this.fetchData, 5000);
  },

  beforeDestroy() {
    // 组件销毁前清除定时器
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://47.109.191.65:8888/api/data/latest');
        const data = response.data;
        
        // 更新数据逻辑
        this.updateSoilData(data.data);
        console.log('数据更新成功');

      } catch (error) {
        console.error("请求失败：", error);
        // 可以在这里添加错误处理逻辑
      }
    },

    updateSoilData(soilData) {
      // 创建新数组来触发响应式更新
      this.titleItem = this.titleItem.map((item, index) => {
        const newValue = parseFloat(this.getSoilValueByIndex(soilData, index)) || 0;
        
        return {
          ...item,
          number: {
            ...item.number,
            number: [newValue]
          }
        };
      });

      // 如果使用需要特殊更新的组件，可以在这里添加强制更新逻辑
      this.$nextTick(() => {
        // 如果有需要，可以在这里调用图表组件的更新方法
      });
    },

    getSoilValueByIndex(data, index) {
      const values = [
        data.soilN,
        data.soilK,
        data.soilP,
        data.soilHum,
        data.soilEC,
        data.soilPH
      ];
      return values[index] || 0;
    }
  },

  components: {
    centerChart1,
    centerChart2
  }
};
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;

  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .item {
      border-radius: 5px;
      padding-top: 1rem;
      margin-top: 0.5rem;
      width: 32%;
      height: 70px;
    }
  }

  .down {
    padding: 4px;
    padding-bottom: 0px;
    width: 100%;
    display: flex;
    height: 255px;
    justify-content: space-between;

    .bg-color-black {
      border-radius: 5px;
    }

    .ranking {
      padding: 10px;
      width: 59%;
    }

    .percent {
      width: 40%;
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 50%;
        height: 120px;

        span {
          margin-top: 7px;
          display: flex;
          justify-content: center;
        }
      }

      .water {
        width: 100%;
      }
    }
  }
}
</style>