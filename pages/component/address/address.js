// pages/component/address/address.js
import {
  getDefaultAddress,
}
from "../../../api/api"
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curAddressData:{
      type: Object,
      value: {}
    },
    addressId: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getAddressId:function(){//外部获取addresId
      return this.data.addressId;
    },
    addAddress: function () {//添加地址
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
    selectAddress: function () {//选择地址
      wx.navigateTo({
        url: "/pages/select-address/index"
      })
    },
    initShippingAddress: function () { //初始化地址
      var that = this;
      wx.showLoading({
        title: '正在加载...',
      })
      getDefaultAddress().then((resp) => {
        wx.hideLoading();
        if (resp.data.code == 205) {
          setTimeout(() => {
            wx.switchTab({
              url: '../order/order',
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
        } else {
          that.setData({
            curAddressData: '',
            addressId: ''
          });
        }
      })
    },
  }
})