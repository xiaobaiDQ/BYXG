import axios from 'axios';

const request = {
  post(url, data, config) {
    return axios.post(url, data, config).then(response => {
      console.log('Sending POST request to:', url);
      console.log('Request data:', data);
      return response.data; // 返回后端响应的数据
      
    });
  },
  // 可以添加其他请求方法
  get(url, config) {
    return axios.get(url, config).then(response => {
      return response.data; // 返回后端响应的数据
    });
  }
};

export default request;
