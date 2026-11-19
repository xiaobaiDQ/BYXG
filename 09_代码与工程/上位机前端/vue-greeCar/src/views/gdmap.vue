<template>
  <div id="mapContainer" ></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 定义地图和 PathSimplifier 实例
const map = ref(null);
const pathSimplifierIns = ref(null);

// 示例数据源（轨迹数据数组）
const data = [
  {
    name: '轨迹1',
    path: [
      [81.307152,40.54323],
      [81.309322,40.543106],
      [81.31192,40.542927],
      [81.312333,40.545843],
      [81.307122,40.546158],
      [81.306871,40.54461],
      [81.306724,40.543297],
      
    ],
  },
 
];

// 动态加载高德地图 SDK 和 AMapUI
const loadMapAndUI = (callback) => {
  const loadScript = (src, onload) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = onload;
    document.head.appendChild(script);
  };

  loadScript('https://webapi.amap.com/maps?v=2.0&key=afe4f7e96102acd1cf7d9431b498c05c', () => {
    loadScript('https://webapi.amap.com/ui/1.1/main.js?v=1.1.1', () => {
      callback();
    });
  });
};

// 初始化地图和 PathSimplifier
onMounted(() => {
  loadMapAndUI(() => {
    if (window.AMap && window.AMapUI) {
      // 创建地图实例
      map.value = new window.AMap.Map('mapContainer', {
        zoom: 16,
        center: [87.6168, 43.8256],   
      });

      // 加载 AMapUI 并初始化 PathSimplifier
      window.AMapUI.load(['ui/misc/PathSimplifier'], (PathSimplifier) => {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
        }

        // 创建 PathSimplifier 实例
        pathSimplifierIns.value = new PathSimplifier({
          zIndex: 100,
          map: map.value, // 地图实例
          getPath: (pathData) => pathData.path,
          renderOptions: {
            pathLineStyle: {
              strokeStyle: 'blue',
              lineWidth: 4,
              dirArrowStyle: true,
            },
            pathLineSelectedStyle: {
              strokeStyle: 'red',
              lineWidth: 6,
            },
            getPathStyle: () => ({
              pathLineStyle: {
                strokeStyle: 'green',
                lineWidth: 4,
              },
              pathLineSelectedStyle: {
                lineWidth: 6,
                strokeStyle: 'orange',
              },
            }),
          },
        });

        // 设置轨迹数据
        pathSimplifierIns.value.setData(data);

        // 创建并启动巡航器（可选）
        const navigator = pathSimplifierIns.value.createPathNavigator(0, {
          loop: true,
          speed: 1000000,
          pathNavigatorStyle: {
            width: 24,
            height: 24,
            autoRotate: true,
            fillStyle: 'blue',
          },
        });
        navigator.start();
      });
    } else {
      console.error('高德地图或 AMapUI 加载失败');
    }
  });
});
</script>

<style scoped>
#mapContainer {
  padding: 1rem 1rem 0rem;
  height: 480px;
  min-width: 300px;
  border-radius: 5px;
  padding-bottom: 0;
}
p {
  color: #c3cbde;
}
</style>