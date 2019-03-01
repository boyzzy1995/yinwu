var commonCityData = require('../../utils/city.js')
import {
  getDefaultAddress,
  addOrder
} from "../../api/api"
//获取应用实例
var app = getApp()
Page({
  data: {
    inputFoucs: false,
    inputSignal: 0,
    inputDsiabled: true,
    items: [{
        name: '淘宝',
        value: '淘宝'
      },
      {
        name: '周边印刷店',
        value: '周边印刷店'
      },
      {
        name: '合作工厂',
        value: '合作工厂'
      },
      {
        name: '其他',
        value: '其他'
      }
    ],
    SecondItems: [{
        name: '设计服务',
        value: '设计服务'
      },
      {
        name: 'DM单页',
        value: 'DM单页'
      },
      {
        name: '名片',
        value: '名片'
      },
      {
        name: '画册',
        value: '画册'
      },
      {
        name: '不干胶',
        value: '不干胶'
      },
      {
        name: '手提袋',
        value: '手提袋'
      },
      {
        name: '彩盒',
        value: '彩盒'
      },
      {
        name: '吊牌',
        value: '吊牌'
      },
      {
        name: '无纺布袋',
        value: '无纺布袋'
      },
      {
        name: '塑料背心袋',
        value: '塑料背心袋'
      },
      {
        name: '纸杯',
        value: '纸杯'
      },
      {
        name: '封套',
        value: '封套'
      },
      {
        name: '便签表单',
        value: '便签表单'
      }
    ],
    checkBoxValue: '',
    SecondCheckBoxValue: ''
  },

  onLoad: function(e) {

  },

  onShow: function() {
    var that = this;
    if (!app.checkLogin()) {
      return;
    }
    that.selectComponent("#Address").initShippingAddress();
  },
  bindCancel: function() {
    wx.navigateBack({})
  },

  onShareAppMessage: function() {
    return {
      title: '专注印务服务新生态',
      path: '/pages/index/index'
    }
  },

  checkboxChange: function(e) {
    let me = this;
    let inputSignal = me.data.inputSignal;
    let isExist = false;
    for (let v in e.detail.value) {
      if (e.detail.value[v] == '其他') {
        isExist = true;
      }
    }
    if (isExist && inputSignal == 0) {
      me.setData({
        inputFoucs: true,
        inputSignal: 1,
        inputDsiabled: false,
        checkBoxValue: e.detail.value
      })
    } else if (!isExist) {
      me.setData({
        inputFoucs: false,
        inputSignal: 0,
        inputDsiabled: true,
        checkBoxValue: e.detail.value
      })
    }
  },

  SecondCheckboxChange: function(e) {
    this.setData({
      SecondCheckBoxValue: e.detail.value
    })
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
        wx.switchTab({
          url: '/pages/order/order',
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
      } else {
        that.setData({
          curAddressData: '',
          addressId: ''
        });
      }
    })
  },
  bindSave: function(e) {
    let me = this,
      submitData,
      addressId = me.selectComponent("#Address").getAddressId(),
      remark,
      netConnect = e.detail.value.netConnect,
      number = e.detail.value.number,
      checkValue,
      SecondCheckBoxValue,
      t = true;
    console.log(addressId);
    if (!app.checkLogin()) {
      wx.showToast({
        title: '请先登入',
        icon: 'none'
      })
      return;
    }
    if (me.data.inputSignal == 1 && me.data.checkBoxValue !== '') {
      checkValue = "#主要渠道:" + me.data.checkBoxValue.join('#') + "-" + e.detail.value.channel;
    } else if (me.data.checkBoxValue !== '' && me.data.inputSignal == 0) {
      checkValue = "#主要渠道:" + me.data.checkBoxValue.join('#');
    }

    if (me.data.SecondCheckBoxValue != '')
      SecondCheckBoxValue = "#常用印刷服务:" + me.data.SecondCheckBoxValue.join('#');
    else
      t = false;
    if (number == '' || netConnect == '') {
      t = false;
    }
    if (t == false) {
      wx.showToast({
        title: '您的信息还没有填完整哦',
        icon: 'none',
        image: '',
        duration: 2000,
      })
    } else {
      submitData = {
        remark: checkValue + SecondCheckBoxValue + "#QQ/微信:" + netConnect,
        product: "免费名片",
        amount: number,
        addressId
      }
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
              url: '/pages/order/order',
            })
          }, 2000);
        }
      })
    }
  }
})