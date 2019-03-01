// pages/classify/detail/detail.js
import {
  getDefaultAddress,
  addOrder,
  login
} from "../../../../api/api"
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
    submitData: {
    },
    productList: {},
    SpecificationType: ['logo设计', '名片设计', '单页设计', '画册设计', '彩盒设计','vi设计'],
    SpecificationTypeIndex: 0,
    Amount: ['1000／款', '200／款', '300/单、500/双', '200／p', '1000/款', '30000/套（基础＋应用）'],
    AmountIndex: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let me = this;
    me.initProductList(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (!app.checkLogin()) {
      return;
    }
    that.initShippingAddress();
  },
  /**
   * 初始化列表
   */
  initProductList: function (options) {
    let me = this,
      pics = [],
      str;
    var productList = {
      name: options.name,
      describe: options.describe
    };
    me.setData({
      productList
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '专注印务服务新生态',
      path: '/pages/index/index'
    }
  },
  //规格型号的选择
  bindSpecificationTypeChange(e) {
    let me = this;
    me.setData({
      SpecificationTypeIndex: e.detail.value
    })
  },
  //印刷数量的选择
  bindAmountChange(e) {
    let me = this;
    me.setData({
      AmountIndex: e.detail.value
    })
  },
  //输入时往submitData里面添加数据
  input: function (e) {
    let data = this.data.submitData;
    data[e.currentTarget.id] = e.detail.value;
    this.setData({
      submitData: data
    });
  },
  addAddress: function () {
    let me = this;
    if (!app.checkLogin()) {
      wx.showToast({
        title: '请先登入',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: "/pages/address-add/index"
    })
  },
  selectAddress: function () {
    wx.navigateTo({
      url: "/pages/select-address/index"
    })
  },
  //初始化地址
  initShippingAddress: function () {
    var that = this;
    wx.showLoading({
      title: '正在加载...',
    })
    getDefaultAddress().then((resp) => {
      wx.hideLoading();
      if (resp.data.code == 205) {
        setTimeout(() => {
          wx.switchTab({
            url: '../../../order/order',
          })
        })
      } else if (resp.data.code == 200) {
        if (resp.data.data != null) {
          that.setData({
            curAddressData: resp.data.data,
            addressId: resp.data.data.id
          });
        } else {
          that.setData({
            curAddressData: '',
            addressId: ''
          });
        }
      }
    })
  },
  /**
   * 点击我要打印按钮
   */
  gotoPrint: function (e) {
    let me = this,
      submitData, addressId = me.data.addressId,
      remark, arry, checkValue, t = true;
    if (!app.checkLogin()) {
      wx.showToast({
        title: '请先登入',
        icon: 'none'
      })
      return;
    }
    arry = [
      "设计项目:" + me.data.SpecificationType[me.data.SpecificationTypeIndex],
      "设计费用:"+me.data.Amount[me.data.AmountIndex]
    ];
    remark = arry.join("#");
    submitData = {
      product: me.data.productList.name,
      remark: remark,
      addressId: addressId,
      amount: 0
    }
    if (t) {
      addOrder(submitData).then((resp) => {
        if (resp.data.code == '200') {
          wx.showToast({
            title: "提交成功",
            duration: 2000
          })
          setTimeout(() => {
            me.setData({
              submitData: '',
            })
            wx.switchTab({
              url: '../../../order/order',
            })
          }, 2000);
        }
      })
    } else {
      wx.showToast({
        title: '数据不完整',
        icon: 'none',
        duration: 1000
      });
    }
  },
})