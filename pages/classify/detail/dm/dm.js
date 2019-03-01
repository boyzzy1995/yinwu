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
    size: ['32开（210*140）a5', '16开（210*285）a4', '8开（420*285）a3', '4开（420*580）a2', '2开（860*580）a1', '正度32开（185*125）', '正度16开（260*185）', '正度8开（260*380）', '正度4开（530*380）', '正度2开（530*760）', '自定义'],
    sizeIndex: 0,
    color: ['1色', '2色', '3色', '4色', '渐变印刷', '彩色+1专', '彩色+2专', '单专色', '双专色'],
    colorIndex: 0,
    dsm: ['单面', '双面'],
    dsmIndex: 0,
    multiArray: [
      ['双铜纸', '单铜纸（白卡）', '哑粉纸', '双胶纸', '灰底白（白板）', '白底白（双白）', '黄牛皮', '特种纸', '金卡纸', '银卡纸', '珠光纸'],
      ['80', '105', '120', '128', '140', '150', '157', '200', '230', '250', '300', '350', '400']
    ],
    objectMultiArray: [
      [{
          id: 0,
          name: '双铜纸'
        },
        {
          id: 1,
          name: '单铜纸（白卡）'
        },
        {
          id: 2,
          name: '哑粉纸'
        },
        {
          id: 3,
          name: '双胶纸'
        },
        {
          id: 4,
          name: '灰底白（白板）'
        },
        {
          id: 5,
          name: '白底白（双白）'
        },
        {
          id: 6,
          name: '黄牛皮'
        },
        {
          id: 7,
          name: '特种纸'
        },
        {
          id: 8,
          name: '金卡纸'
        },
        {
          id: 9,
          name: '银卡纸'
        },
        {
          id: 10,
          name: '珠光纸'
        }
      ],
      [{
          id: 0,
          name: '80'
        },
        {
          id: 1,
          name: '105'
        }, {
          id: 2,
          name: '120'
        }, {
          id: 3,
          name: '128'
        }, {
          id: 4,
          name: '140'
        }, {
          id: 5,
          name: '150'
        }, {
          id: 6,
          name: '157'
        }, {
          id: 7,
          name: '200'
        }, {
          id: 8,
          name: '230'
        }, {
          id: 9,
          name: '250'
        }, {
          id: 10,
          name: '300'
        }, {
          id: 11,
          name: '350'
        }, {
          id: 12,
          name: '400'
        },
      ]
    ],
    multiIndex: [0, 0],
    items: [{
        name: '模切',
        value: '模切'
      },
      {
        name: '烫金',
        value: '烫金'
      },
      {
        name: '单面过光油',
        value: '单面过光油'
      },
      {
        name: '单面覆亮膜',
        value: '单面覆亮膜'
      },
      {
        name: '压纹',
        value: '压纹'
      },
      {
        name: '单面覆哑膜',
        value: '单面覆哑膜'
      },
      {
        name: '双面过光油',
        value: '双面过光油'
      },
      {
        name: '双面覆亮膜',
        value: '双面覆亮膜'
      },
      {
        name: '折页',
        value: '折页'
      },
      {
        name: '压痕压点线',
        value: '压痕压点线'
      },
      {
        name: '单面覆哑膜',
        value: '单面覆哑膜'
      },
      {
        name: '打号码',
        value: '打号码'
      }, {
        name: '局部uv',
        value: '局部uv'
      }, {
        name: '击凸',
        value: '击凸'
      }, {
        name: '双面覆哑膜',
        value: '双面覆哑膜'
      }, {
        name: '胶装',
        value: '胶装'
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
  bindColorChange(e) {
    let me = this;
    me.setData({
      colorIndex: e.detail.value
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
  bindMultiPickerChange: function(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function(e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (data.multiIndex[0]) {
      case 0:
        data.multiArray[1] = ['80', '105', '120', '128', '140', '150', '157', '200', '230', '250', '300', '350', '400'];
        break;
      case 1:
        data.multiArray[1] = ['190', '200', '210', '230', '250', '300', '350', '400'];
        break;
      case 2:
        data.multiArray[1] = ['105', '128', '157', '200', '230', '250', '300', '350', '400'];
        break;
      case 3:
        data.multiArray[1] = ['55', '60', '70', '80', '100', '120', '140', '160', '200', '250'];
        break;
      case 4:
        data.multiArray[1] = ['250', '300', '350', '400', '450'];
        break;
      case 5:
        data.multiArray[1] = ['210', '230', '250', '300', '350', '400', '450'];
        break;
      case 6:
        data.multiArray[1] = ['60', '70', '80', '100', '120', '130', '140', '150', '160', '180', '200', '230', '250', '260', '300', '310', '350', '360', '400', '410', '450'];
        break;
      case 7:
        data.multiArray[1] = ['80', '100', '120', '135', '140', '160', '180', '200'];
        break;
      case 8:
        data.multiArray[1] = ['153', '182', '225', '255', '275', '325', '375', '425'];
        break;
      case 9:
        data.multiArray[1] = ['153', '182', '225', '255', '275', '325', '375', '425'];
        break;
      case 10:
        data.multiArray[1] = ['120', '140', '160', '180', '200', '250', '300', '350', '400'];
        break;
    }
    this.setData(data);
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
      remark, arry, size,checkValue, t = true;
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
    if(me.data.checkBoxValue!=''){
      checkValue = "#后道工序:" + me.data.checkBoxValue.join('#');
    }
    arry = [
      "成品尺寸:" + size,
      "单双面:" + me.data.dsm[me.data.dsmIndex],
      "印刷颜色:" + me.data.color[me.data.colorIndex],
      "材料:" + me.data.multiArray[0][me.data.multiIndex[0]] + "," + me.data.multiArray[1][me.data.multiIndex[1]],
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