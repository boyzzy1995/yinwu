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
    size: ['大400*400*100', '中400*300*100', '小350*280*80', '自定义'],
    sizeIndex: 0,
    MaterialColor: ['黑色', '白色', '其他'],
    MaterialColorIndex: 0,
    MaterialWeight: ['30', '40', '50', '60', '70', '75', '80', '90', '100'],
    MaterialWeightIndex: 0,
    dsm: ['单面', '双面', '四面'],
    dsmIndex: 0,
    items: [{
        name: '打包(编织袋／纸箱)',
        value: '打包(编织袋／纸箱)'
      },
      {
        name: '单束口绳子',
        value: '单束口绳子'
      },
      {
        name: '双束口绳子',
        value: '双束口绳子'
      },
      {
        name: '拉链',
        value: '拉链'
      },
      {
        name: '魔术贴',
        value: '魔术贴'
      },
      {
        name: '金银色',
        value: '金银色'
      },
      {
        name: '打x线',
        value: '打x线'
      },
      {
        name: '纽扣／带子',
        value: '纽扣／带子'
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

  //长宽的选择
  bindSizeChange(e) {
    let me = this;
    me.setData({
      sizeIndex: e.detail.value,
    })
    if (me.data.size[e.detail.value] == '自定义') {
      me.setData({
        isHidden: false
      })
    } else {
      me.setData({
        isHidden: true
      })
    }
  },
  //颜色的选择
  bindMaterialColorChange(e) {
    let me = this;
    me.setData({
      MaterialColorIndex: e.detail.value
    })
  },
  //克重的选择
  bindMaterialWeightChange(e) {
    let me = this;
    me.setData({
      MaterialWeightIndex: e.detail.value
    })
  },
  //专色选择
  binddsmChange(e) {
    let me = this;
    me.setData({
      dsmIndex: e.detail.value
    })
  },
  //材料的选择
  bindMaterialChange(e) {
    let me = this;
    me.setData({
      MaterialIndex: e.detail.value
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
    //判断是输入框还是选择
    if (me.data.isHidden == true) {
      size = me.data.size[me.data.sizeIndex]
    } else {
      size = me.data.submitData.length
      if (size == null)
        t = false;
    }
    if (me.data.checkBoxValue != '') {
      checkValue = "#后道工序:" + me.data.checkBoxValue.join('#');
    }
    arry = [
      "成品尺寸:" + size,
      "包边工序:缝纫缝制",
      "单双面:" + me.data.dsm[me.data.dsmIndex],
      "材料颜色:" + me.data.MaterialColor[me.data.MaterialColorIndex],
      "材料克重:" + me.data.MaterialWeight[me.data.MaterialWeightIndex],
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