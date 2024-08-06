import axios from "axios";
import router from '@/router';
import { Notification, MessageBox, Message } from 'element-ui'
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
export let isRelogin = { show: false };
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: process.env.VUE_APP_BASE_API,
    // 超时
    timeout: 10000,
});
service.interceptors.response.use((res) => {
    const code = res.data.code || 200;
    const msg = res.data.msg;
    if (
        res.request.responseType === "blob" ||
        res.request.responseType === "arraybuffer"
    ) {
        return res.data;
    }
    if (code === 401) {
        if (!isRelogin.show) {
            isRelogin.show = true;
            MessageBox.confirm(
                "登录状态已过期，您可以继续留在该页面，或者重新登录",
                "系统提示",
                {
                    confirmButtonText: "重新登录",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            )
                .then(() => {
                    isRelogin.show = false;
                    router.push({ name: 'Login' });
                })
                .catch(() => {
                    isRelogin.show = false;
                });
        }
        return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (code === 500) {
        Message({ message: msg, type: "error" });
        router.push({ name: 'Login' });
        return Promise.reject(new Error(msg));
    } else if (code === 601) {
        Message({ message: msg, type: "warning" });
        return Promise.reject("error");
    } else if (code !== 200) {
        Notification.error({ title: msg });
        return Promise.reject("error");
    } else {
        return res;
    }
});

export default service;
