//index.js
//获取应用实例
import {
  getDefaultAddress,
  addOrder,
  login
} from "../../api/api"
const app = getApp()

Page({
  data: {
    pics: [],
    submitData: {
      "product": '',
      "remark": '',
      "amount": '',
      "addressId": ''
    },
    addressId: ''
  },

  onLoad: function() {

  },
  onReady: function() {

  },
  onShow: function() {
    var that = this;
    if (!app.checkLogin()) {
      return;
    }
    that.selectComponent("#Address").initShippingAddress();
  },
  choose: function() { //这里是选取图片的方法
    var that = this,
      pics = [];
    if (!app.checkLogin()) {
      wx.showToast({
        title: '请先登入',
        icon: 'none'
      })
      return;
    }
    wx.chooseImage({
      count: 5 - pics.length, // 最多可以选择的图片张数，默认5
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.setData({
          pics: []
        });
        that.upLoadImg(pics, 0);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })

  },
  upLoadImg(pics, index) {
    let that = this
    if (index < pics.length) {
      wx.showLoading({
        title: '正在上传第' + (index + 1) + '张'
      })
      wx.uploadFile({
        url: 'https://printing.jinghangkuajing.com/api/upload',
        filePath: pics[index],
        name: 'files',
        success: function(res) {
          wx.hideLoading();
          if (JSON.parse(res.data).code == 1000) {
            let thisPics = that.data.pics;
            let picStr
            thisPics.push(JSON.parse(res.data).data[0]);
            that.setData({
              pics: thisPics
            });
            that.upLoadImg(pics, index + 1);
          }
        }
      })
    } else {

    }
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '专注印务服务新生态',
      path: '/pages/index/index'
    }
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
  input: function(e) {
    let data = this.data.submitData;
    data[e.currentTarget.id] = e.detail.value;
    this.setData({
      submitData: data
    });
  },
  submit: function() {
    let me = this,
      pics = me.data.pics,
      submitData, addressId = me.selectComponent("#Address").getAddressId(),
      str, t = true;
    if (!app.checkLogin()) {
      wx.showToast({
        title: '请先登入',
        icon: 'none'
      })
      return;
    }
    str = pics.join("#");
    submitData = { ...me.data.submitData,
      examplePic: str,
      "addressId": addressId
    }
    for (let v in submitData) {
      if (submitData[v] == '') {
        t = false;
      }
    }
    if (t) {
      addOrder(submitData).then((resp) => {
        wx.showToast({
          title: "提交成功",
          duration: 2000
        })
        setTimeout(() => {
          me.setData({
            submitData: '',
            pics: ''
          })
          wx.switchTab({
            url: '../order/order',
          })
        }, 2000);
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