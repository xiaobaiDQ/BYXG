<template>
  <div class="zhipu-chat">
    <!-- 输入区域 -->
    <div class="input-area">
      <input v-model="inputText" placeholder="请输入问题..." @keyup.enter="submitQuestion" class="neon-input" />
      <button @click="submitQuestion" :disabled="isLoading" class="hologram-button">
        <span v-if="!isLoading">🚀 发送</span>
        <div v-else class="loading-dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </button>
    </div>

    <!-- 固定高度的响应区域 -->
    <div class="response-container">
      <div v-if="error" class="error-message neon-glow-red">
        ⚠️ {{ error }}
      </div>
      <pre v-else-if="response" class="response-text cyber-text">
{{ response }}
      </pre>
      <div v-else class="placeholder">
        <div class="hologram-line"></div>
        <span>等待输入中...</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inputText: '',
      response: '',
      error: '',
      isLoading: false,
      API_KEY: '2d6139e7048b4118acdeed1e58ba91bb.vVSCz7CPvpLYv6E6'
    };
  },
  methods: {
    async submitQuestion() {
      if (!this.inputText.trim()) {
        this.error = '输入不能为空！';
        return;
      }

      this.isLoading = true;
      this.error = '';
      this.response = '';

      try {
        const response = await axios.post(
          'https://open.bigmodel.cn/api/paas/v4/chat/completions',
          {
            model: 'glm-4',
            messages: [
              { role: 'user', content: this.inputText }
            ],
            temperature: 0.7
          },
          {
            headers: {
              'Authorization': `Bearer ${this.API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );

        this.response = response.data.choices[0].message.content;
      } catch (err) {
        const errorMessage = err.response?.data?.error?.message || err.message;
        this.error = `请求失败: ${errorMessage}`;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
/* 科技主题色 */
:root {
  --neon-blue: #00f3ff;
  --neon-purple: #bc13fe;
  --cyber-gradient: linear-gradient(45deg, #0a0a2e, #1a1a4f);
  --scrollbar-width: 8px;
}

.zhipu-chat {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--cyber-gradient);
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0, 243, 255, 0.2);
  position: relative;
  overflow: hidden;
}

/* 全息边框动画 */
.zhipu-chat::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 200%;
  background: linear-gradient(90deg,
      transparent,
      var(--neon-blue),
      var(--neon-purple),
      transparent);
  animation: hologram-flow 4s linear infinite;
  opacity: 0.6;
}

@keyframes hologram-flow {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

.input-area {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.neon-input {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid var(--neon-blue);
  border-radius: 20px;
  background: rgba(10, 10, 46, 0.8);
  color: var(--neon-blue);
  font-family: 'Courier New', monospace;
  font-size: 16px;
  transition: all 0.3s;
}

.neon-input:focus {
  outline: none;
  box-shadow: 0 0 15px var(--neon-blue);
  border-color: var(--neon-purple);
}

.hologram-button {
  padding: 12px 25px;
  background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s;
}

.hologram-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 0 20px var(--neon-blue);
}

.hologram-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 固定高度响应容器 */
.response-container {
  height: 300px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  border: 1px solid var(--neon-blue);
  overflow-y: auto;
  position: relative;
}

/* 自定义滚动条 */
.response-container::-webkit-scrollbar {
  width: var(--scrollbar-width);
}

.response-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.response-container::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));
  border-radius: 4px;
  border: 1px solid rgba(0, 243, 255, 0.2);
}

.cyber-text {
  color: var(--neon-blue);
  font-family: 'Orbitron', sans-serif;
  line-height: 1.6;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  padding-right: calc(var(--scrollbar-width) + 5px);
}

.error-message {
  color: #ff3366;
  padding: 15px;
  border: 2px solid #ff3366;
  border-radius: 8px;
  background: rgba(255, 51, 102, 0.1);
}

.neon-glow-red {
  animation: red-glow 1.5s infinite alternate;
}

@keyframes red-glow {
  from {
    box-shadow: 0 0 5px #ff3366;
  }

  to {
    box-shadow: 0 0 20px #ff3366;
  }
}

.placeholder {
  color: #666;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hologram-line {
  width: 80%;
  height: 2px;
  background: linear-gradient(90deg,
      transparent,
      rgba(0, 243, 255, 0.6),
      rgba(188, 19, 254, 0.6),
      transparent);
  margin: 20px auto;
  animation: hologram-line 2.5s infinite linear;
}

@keyframes hologram-line {
  0% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.8;
  }

  100% {
    opacity: 0.2;
  }
}

.loading-dots {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.dot {
  width: 8px;
  height: 8px;
  background: var(--neon-blue);
  border-radius: 50%;
  animation: dot-pulse 1.4s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dot-pulse {

  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}
</style>