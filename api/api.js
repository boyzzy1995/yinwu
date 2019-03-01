import {
  host
} from './config.js';
import $http from './http.js'

//测试接口
export const checkApi = () => $http.get(`${host}/api/ping`);
//登陆
export const login = (id) => $http.post(`${host}/api/users/login`, {
  code: id
});
//发送formId
export const template = (id, formid) => $http.post(`${host}/api/users/template`, {
  code: id,
  formId: formid
});
export const updateUser = (data) => $http.put(`${host}/api/users`, data);
//新增地址
export const addAddress = (data) => $http.post(`${host}/api/address`, data);
//获得默认收货地址
export const getDefaultAddress = () => $http.get(`${host}/api/address/default`);
//获得所有地址
export const getAllAddress = () => $http.get(`${host}/api/address`);
//根据id获取收货地址
export const getAddressById = (id) => $http.get(`${host}/api/address/${id}`);
//更新地址
export const updateAddress = (data) => $http.put(`${host}/api/address`, data);
//根据id删除地址
export const deleteAddressById = (id) => $http.delete(`${host}/api/address/${id}`);
//设置为默认地址
export const selectAddressAsDefault = (id) => $http.put(`${host}/api/address/default/${id}`);
//查询所有订单
export const getAllOrder = () => $http.get(`${host}/api/order`);
//新增订单
export const addOrder = (data) => $http.post(`${host}/api/order`, data);
//确认下单
export const payOrder = (id) => $http.get(`${host}/api/order/pay/${id}`);
//确认收货
export const comfirmReceive = (id) => $http.get(`${host}/api/order/receive/${id}`);
//取消下单
export const cancelOrder = (id) => $http.delete(`${host}/api/order/cancel/${id}`);
//查询所有产品信息
export const getAllProduct = () => $http.get(`${host}/api/product`);
//根据id查询产品信息
export const getProductById = (id) => $http.get(`${host}/api/product/${id}`);