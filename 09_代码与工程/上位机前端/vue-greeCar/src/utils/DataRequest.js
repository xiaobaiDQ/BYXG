import axios from 'axios';

export default {
  data() {
    return {
      rawData: {},  // 用来保存原始数据
      statementData: {},  // 用来保存解析后的statement数据
      soilData: {}  // 用来保存解析后的soil数据
    };
  },
  created() {
    axios.get('http://47.109.191.65:8888/api/data/latest')
      .then(response => {
        this.rawData = response.data;

        // 解析并封装数据
        this.statementData = {
          trim: this.rawData.statement.Trim,
          spray: this.rawData.statement.Spray,
          tof: this.rawData.statement.TOF,
          realTV: this.rawData.statement.RealTV,
          soil: this.rawData.statement.Soil,
        };

        this.soilData = {
          soilPH: this.rawData.data.soilPH,
          soilEC: this.rawData.data.soilEC,
          soilTem: this.rawData.data.soilTem,
          soilHum: this.rawData.data.soilHum,
          soilN: this.rawData.data.soilN,
          soilP: this.rawData.data.soilP,
          soilK: this.rawData.data.soilK,
        };
        console.log(this.statementData);
      })
      .catch(error => {
        console.error("请求失败：", error);
      });
  }
};