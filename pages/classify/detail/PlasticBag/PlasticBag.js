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
    submitData: {},
    productList: {},
    MaterialThickness: ['2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
    MaterialThicknessIndex: 0,
    MaterialColor: ['单面单色', '单面双色', '单面三色', '单面四色', '双面单色', '双面双色', '双面三色', '双面四色', '彩色＋1专', '彩色＋2专', '单专色', '双专色', '无印刷色'],
    MaterialColorIndex: 0,
    MaterialName: ['低压膜（po）', '高压膜（po）', '低压膜（po）有色', '高压膜（po）有色', '丙膜（pp）', '光膜（opp）', '紫／桃红／金／银色'],
    MaterialNameIndex: 0,
    Breadth: ['标志文字印刷', '色块大幅面印刷'],
    BreadthIndex: 0,
    items: [{
        name: '粘提手',
        value: '粘提手'
      },
      {
        name: '自粘带',
        value: '自粘带'
      },
      {
        name: '含印金／印银',
        value: '含印金／印银'
      },
      {
        name: '插底',
        value: '插底'
      }
    ],
    checkBoxValue: '',
    isHidden: true
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let me = this;
    me.initProductList(options);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    if (!app.checkLogin()) {
      return;
    }
    that.initShippingAddress();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 初始化列表
   */
  initProductList: function(options) {
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
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '专注印务服务新生态',
      path: '/pages/index/index'
    }
  },

  //颜色的选择
  bindMaterialColorChange(e) {
    let me = this;
    me.setData({
      MaterialColorIndex: e.detail.value
    })
  },
  //材料名称的选择
  bindMaterialNameChange(e) {
    let me = this;
    me.setData({
      MaterialNameIndex: e.detail.value
    })
  },
  //印刷幅面称的选择
  bindBreadthChange(e) {
    let me = this;
    me.setData({
      BreadthIndex: e.detail.value
    })
  },
  //材料厚度的选择
  bindMaterialThicknessChange(e) {
    let me = this;
    me.setData({
      MaterialThicknessIndex: e.detail.value
    })
  },
  //复选框改变事件
  checkboxChange: function(e) {
    let me = this;
    me.setData({
      checkBoxValue: e.detail.value
    })
  },
  //输入时往submitData里面添加数据
  input: function(e) {
    let data = this.data.submitData;
    data[e.currentTarget.id] = e.detail.value;
    this.setData({
      submitData: data
    });
  },
  addAddress: function() {
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
  selectAddress: function() {
    wx.navigateTo({
      url: "/pages/select-address/index"
    })
  },
  //初始化地址
  initShippingAddress: function() {
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
  gotoPrint: function(e) {
    let me = this,
      submitData, addressId = me.data.addressId,
      remark, arry, size, checkValue, t = true;
    if (!app.checkLogin()) {
      wx.showToast({
        title: '请先登入',
        icon: 'none'
      })
      return;
    }
    if (me.data.submitData.amount == null) {
      t = false;
    }
    if (me.data.checkBoxValue != '') {
      checkValue = "#后道工序:" + me.data.checkBoxValue.join('#');
    }
    arry = [
      "成品尺寸:" + me.data.submitData.length,
      "材料名称:" + me.data.MaterialName[me.data.MaterialNameIndex],
      "材料厚度:" + me.data.MaterialThickness[me.data.MaterialThicknessIndex],
      "印刷颜色:" + me.data.MaterialColor[me.data.MaterialColorIndex],
      "印刷幅面:" + me.data.Breadth[me.data.BreadthIndex],
    ];
    remark = arry.join("#");
    submitData = {
      product: me.data.productList.name,
      amount: me.data.submitData.amount,
      remark: remark + checkValue,
      addressId: addressId,
    }
    if (t) {
      addOrder(submitData).then((resp) => {
        if (resp.data.code == 200) {
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