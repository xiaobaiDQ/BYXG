<template>
  <div id="centreRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-line"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">设备控制台</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <table class="custom-table">
          <thead>
            <tr>
              <th v-for="header in config.header" :key="header">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <!-- 移除未使用的index变量 -->
            <template v-for="group in processedData">
              <tr v-for="(row, rowIndex) in group.rows" :key="`${group.id}-${rowIndex}`">
                <td v-if="rowIndex === 0" :rowspan="group.rows.length">
                  {{ group.module }}
                </td>
                <td>
                  <button class="status-button" @click="handleClick(row[0])">{{ row[0] }}</button>
                </td>
                <td>
                  <button class="status-button" @click="handleClick(stripHtml(row[1]))" v-html="row[1]"></button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        header: ["模块", "状态1", "状态2"],
        data: [
          ["除草机", "C高", " <span class='colorWhite'>C中</span>"],
          ["除草机", "C低", "<span class='colorRed'>C关闭</span>"],
          ["喷药机", "P高", "<span class='colorWhite'>P中</span>"],
          ["喷药机", "P低", "<span class='colorRed'>P关闭</span>"],
          ["传感器", "S开启", "<span class='colorRed'>S关闭</span>"],
           ["推杆", "展开", "<span class='colorWhite'>收回</span>"],
          // ["推杆", "F低", "<span class='colorRed'>P关闭</span>"]
        ]
      },
      statusMap: {
        "C高": { CC: 3 },
        "C低": { CC: 1 },
        "C中": { CC: 2 },
        "C关闭": { CC: 0 },
        "P高": { PY: 3 },
        "P低": { PY: 1 },
        "P中": { PY: 2 },
        "P关闭": { PY: 0 },
        "S开启": { G: 1 },
        "S关闭": { G: 0 },
        "展开": { XJ: 3 },
        "收回": { XJ: 1 },
        "F中": { XJ: 2 },
        "F关闭": { XJ: 0 }
      }
    };
  },
  computed: {
    processedData() {
      let groupId = 0;
      return Object.values(
        this.config.data.reduce((acc, cur) => {
          const key = cur[0];
          if (!acc[key]) {
            acc[key] = {
              id: groupId++,
              module: key,
              rows: []
            };
          }
          acc[key].rows.push(cur.slice(1));
          return acc;
        }, {})
      );
    }
  },
  methods: {
    handleClick(commandKey) {
      const commandObject = this.statusMap[commandKey];
      if (!commandObject) {
        console.warn(`未知命令键: ${commandKey}`);
        return;
      }

      // 转换为纯对象避免 Vue 响应式污染
      const plainData = JSON.parse(JSON.stringify(commandObject));
      console.debug('发送的数据:', plainData);

      this.$axios.post('/api/control', plainData)
        .then(response => {
          console.log('指令发送成功:', response.data);
        })
        .catch(error => {
          console.error('指令发送失败:', error);
          console.error('发送的数据:', plainData);
        });
    },
    stripHtml(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    }
  }
};
</script>

<style lang="scss">
/* 保持原有样式 */
#centreRight1 {
  padding: 1rem;
  height: 410px;
  min-width: 300px;
  border-radius: 5px;

  .bg-color-black {
    height: 385px;
    border-radius: 10px;
  }

  .text {
    color: #c3cbde;
  }

  .body-box {
    border-radius: 10px;
    overflow: hidden;
  }

  .custom-table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 10px;
    height: 25px;
    text-align: center;
    border: 1px solid #171c33;
  }

  .status-button {
    background-color: transparent;
    color: inherit;
    border: none;
    height: 31px;
    cursor: pointer;
    font-size: inherit;
  }
}
</style>