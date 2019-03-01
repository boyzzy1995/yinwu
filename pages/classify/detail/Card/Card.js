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
    dsm: ['单面', '双面'],
    dsmIndex: 0,
    Amount: ['1', '2','3','4','5','6','7','8'],
    AmountIndex: 0,
    EachAmount: ['1盒', '2盒', '3盒', '4盒', '5盒', '6盒', '7盒', '8盒'],
    EachAmountIndex: 0,
    multiArray: [
      ['彩印名片（90*54）', '彩印折卡（90*95）', '彩印折卡（90*108）', 'pvc名片（85.5*54）', 'pvc名片（85.5*45）'],
      ['300克铜版纸过哑胶','300克铜版纸不覆膜','300克铜版纸过光胶','冰白纸','荷兰白','安格纸','布纹纸','刚古纸','蛋壳纸']
    ],
    objectMultiArray: [
      [{
        id: 0,
        name: '彩印名片（90*54）'
      },
      {
        id: 1,
        name: '彩印折卡（90*95）'
      },
      {
        id: 2,
        name: '彩印折卡（90*108）'
      },
      {
        id: 3,
        name: 'pvc名片（85.5*54）'
      },
      {
        id: 4,
        name: 'pvc名片（85.5*45）'
      }
      ],
      [{
        id: 0,
        name: '300克铜版纸过哑胶'
      },
      {
        id: 1,
        name: '300克铜版纸不覆膜'
      }, {
        id: 2,
        name: '300克铜版纸过光胶'
      }, {
        id: 3,
        name: '冰白纸'
      }, {
        id: 4,
        name: '荷兰白'
      }, {
        id: 5,
        name: '安格纸'
      }, {
        id: 6,
        name: '布纹纸'
      }, {
        id: 7,
        name: '刚古纸'
      }, {
        id: 8,
        name: '蛋壳纸'
      }
      ]
    ],
    multiIndex: [0, 0],
    items: [{
      name: '打孔',
      value: '打孔'
    },
    {
      name: '模切',
      value: '模切'
    },
    {
      name: '打号码',
      value: '打号码'
    },
    {
      name: '烫金',
      value: '烫金'
    },
    {
      name: '烫银',
      value: '烫银'
    },
    {
      name: '击凸',
      value: '击凸'
    },
    {
      name: '丝印（uv）',
      value: '丝印（uv）'
    },
    {
      name: '切圆角',
      value: '切圆角'
    },
    {
      name: '折页',
      value: '折页'
    },
    {
      name: '压线',
      value: '压线'
    }
    ],
    checkBoxValue: '',
    isHidden: true
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let me = this;
    me.initProductList(options);
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  //款数的选择
  bindAmountChange(e) {
    let me = this;
    me.setData({
      AmountIndex: e.detail.value
    })
  },
  //单双面的选择
  binddsmChange(e) {
    let me = this;
    me.setData({
      dsmIndex: e.detail.value
    })
  },
  //每盒款数的选择
  bindEachAmountChange(e) {
    let me = this;
    me.setData({
      EachAmountIndex: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (data.multiIndex[0]) {
      case 0:
        data.multiArray[1] = ['300克铜版纸过哑胶', '300克铜版纸不覆膜', '300克铜版纸过光胶', '冰白纸', '荷兰白', '安格纸', '布纹纸', '刚古纸', '蛋壳纸'];
        break;
      case 1:
        data.multiArray[1] = ['300克铜版纸过哑胶', '300克铜版纸不覆膜', '300克铜版纸过光胶', '冰白纸', '荷兰白', '安格纸', '布纹纸', '刚古纸', '蛋壳纸'];
        break;
      case 2:
        data.multiArray[1] = ['300克铜版纸过哑胶', '300克铜版纸不覆膜', '300克铜版纸过光胶', '冰白纸', '荷兰白', '安格纸', '布纹纸', '刚古纸', '蛋壳纸'];
        break;
      case 3:
        data.multiArray[1] = ['0.3mm透明pvc名片', '0.3mm不透明pvc名片'];
        break;
      case 4:
        data.multiArray[1] = ['0.3mm透明pvc名片','0.3mm不透明pvc名片'];
        break;
    }
    this.setData(data);
  },
  //复选框改变事件
  checkboxChange: function (e) {
    let me = this;
    me.setData({
      checkBoxValue: e.detail.value
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
  gotoPrint: function (e) {
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
    if (me.data.checkBoxValue != '') {
      checkValue = "#后道工序:" + me.data.checkBoxValue.join('#');
    }
    arry = [
      "成品尺寸、材料名称:" + me.data.multiArray[0][me.data.multiIndex[0]] + "," + me.data.multiArray[1][me.data.multiIndex[1]],
      "款数:" + me.data.Amount[me.data.AmountIndex],
      "每款款盒数:" + me.data.EachAmount[me.data.EachAmountIndex],
      "单双面:" + me.data.dsm[me.data.dsmIndex]
    ];
    remark = arry.join("#");
    submitData = {
      product: me.data.productList.name,
      amount: 0,
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