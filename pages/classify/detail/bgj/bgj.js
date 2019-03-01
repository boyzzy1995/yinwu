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
    color: ['1色', '2色', '3色', '4色', '渐变印刷', '彩色+1专', '彩色+2专', '单专色', '双专色'],
    colorIndex: 0,
    espicalColor: ['1专', '2专', '3专', '4专'],
    espicalColorIndex: 0,
    DW: ['无', '白墨'],
    DWIndex: 0,
    Striping: ['片装', '卷装'],
    StripingIndex: 0,
    Material: ['特光（铜板）不干胶（水胶)', '特光（铜板）不干胶（热熔胶）', '特光（铜板）不干胶（格拉辛底）', '特光（铜板）不干胶（可移、白底）', '书写不干胶（黄底、水胶）', '书写不干胶（黄底、热熔胶）', '透明不干胶', '合成纸不干胶', '哑银不干胶', '光银不干胶', '镭射不干胶'],
    MaterialIndex: 0,
    items: [{
        name: '(直角)切成品',
        value: '(直角)切成品'
      },
      {
        name: '(圆角)模切',
        value: '(圆角)模切'
      },
      {
        name: '单面覆滴胶',
        value: '单面覆滴胶'
      },
      {
        name: '刮刮银',
        value: '刮刮银'
      },
      {
        name: '单面覆亮膜',
        value: '单面覆亮膜'
      },
      {
        name: '单面覆哑膜',
        value: '单面覆哑膜'
      },
      {
        name: '单面过光油',
        value: '单面过光油'
      },
      {
        name: '彩色二维码',
        value: '彩色二维码'
      },
      {
        name: '烫金',
        value: '烫金'
      },
      {
        name: '局部uv',
        value: '局部uv'
      },
      {
        name: '烫银',
        value: '烫银'
      },
      {
        name: '烫镭射防伪',
        value: '烫镭射防伪'
      },
    ],
    checkBoxValue: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let me = this;
    me.initProductList(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
      sizeIndex: e.detail.value
    })
  },
  //长宽的选择
  bindColorChange(e) {
    let me = this;
    me.setData({
      colorIndex: e.detail.value
    })
  },
  //专色选择
  bindespicalColorChange(e) {
    let me = this;
    me.setData({
      espicalColorIndex: e.detail.value
    })
  },
  //拖白的选择
  bindDWChange(e) {
    let me = this;
    me.setData({
      DWIndex: e.detail.value
    })
  },
  //分条的选择
  bindStripingChange(e) {
    let me = this;
    me.setData({
      StripingIndex: e.detail.value
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
  /**
   * 点击我要打印按钮
   */
  gotoPrint: function(e) {
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
    if (me.data.submitData.length == null || me.data.submitData.amount == null) {
      t = false;
    }
    if (me.data.checkBoxValue!=''){
      checkValue = "#后道工序:" + me.data.checkBoxValue.join('#');
    }
    arry = [
      "成品尺寸:" + me.data.submitData.length,
      "印刷颜色:" + me.data.color[me.data.colorIndex],
      "专色:" + me.data.espicalColor[me.data.espicalColorIndex],
      "拖白:" + me.data.DW[me.data.DWIndex],
      "分条:" + me.data.Striping[me.data.StripingIndex],
      "材料:" + me.data.Material[me.data.MaterialIndex]
    ];
    remark = arry.join("#");
    submitData = {
      product: me.data.productList.name,
      amount: me.data.submitData.amount,
      remark: remark+checkValue,
      addressId: addressId,
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