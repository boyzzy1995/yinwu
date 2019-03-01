//index.js
//获取应用实例
import {
  getAllAddress,
  selectAddressAsDefault,
  getDefaultAddress
} from "../../api/api"
var app = getApp()
Page({
  data: {
    addressList: [],
    defaultId: ''
  },
  onLoad: function() {

  },
  onShow: function() {
    this.initShippingAddress();
    this.getDefaultAddress();
  },
  
  selectTap: function(e) {
    let me = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否设置为默认地址',
      success: (resp) => {
        if (resp.confirm) {
          wx.showLoading({
            title: '加载中...',
          });
          selectAddressAsDefault(id).then((resp) => {
            wx.hideLoading();
            wx.showToast({
              title: '设置成功',
              duration: 2000
            })
            setTimeout(() => {
              me.onShow();
            }, 2000)
          })
        } else {

        }
      }
    })

  },

  addAddess: function() {
    wx.navigateTo({
      url: "/pages/address-add/index"
    })
  },

  editAddess: function(e) {
    wx.navigateTo({
      url: "/pages/address-add/index?id=" + e.currentTarget.dataset.id
    })
  },
  getDefaultAddress: function() {
    let me = this;
    getDefaultAddress().then((resp) => {
      if (resp.data.data == null) {
        if (me.data.addressList.length != 0) {
          for (let v in me.data.addressList) {
            me.setData({
              defaultId: me.data.addressList[0].id
            })
          }
          selectAddressAsDefault(me.data.defaultId).then((resp) => {})
        }
      } else {
        me.setData({
          defaultId: resp.data.data.id
        })
      }
    })
  },
  initShippingAddress: function() {
    var that = this;
    getAllAddress().then((resp) => {
      that.setData({
        addressList: resp.data.data
      });
    })
  },
  onShareAppMessage: function() {
    return {
      title: '专注印务服务新生态',
      path: '/pages/index/index'
    }
  }
})