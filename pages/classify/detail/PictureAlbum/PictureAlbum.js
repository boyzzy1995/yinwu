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
    size: ['大度64开（140*105）a6', '大度32开（210*140）a5', '大度16开(210*285)a4(横版)', '大度16开（285*210）a4', '大度12开（280*280）', '大度8开（420*285）a3', '正度64开（125*90）', '正度32开（185*125）', '正度16开（260*185）', '正度12开（250*250）', '正度8开（380*260）','自定义'],
    sizeIndex: 0,
    color: ['单色', '双色', '彩色', '彩色＋1专', '彩色＋2专', '单专色', '双专色'],
    colorIndex: 0,
    MaterialIndex: 0,
    dsm: ['单面', '双面'],
    dsmIndex: 0,
    multiArray: [
      ['双铜纸', '哑粉纸', '双胶纸', '特种纸', '珠光纸'],
      ['80', '105', '120', '128', '140', '150', '157', '200', '230', '250', '300', '350', '400']
    ],
    objectMultiArray: [
      [{
        id: 0,
        name: '双铜纸'
      },
      {
        id: 1,
        name: '哑粉纸'
      },
      {
        id: 2,
        name: '双胶纸'
      },
      {
        id: 3,
        name: '特种纸'
      },
      {
        id: 4,
        name: '珠光纸'
      }],
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
      }]
    ],
    multiIndex: [0, 0],
    items: [{
      name: '封面封底加勒口',
      value: '封面封底加勒口'
    },
    {
      name: '封面封底加折兜',
      value: '封面封底加折兜'
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
      name: '封面封底覆亮膜',
      value: '封面封底覆亮膜'
    },
    {
      name: '封面封底覆哑膜',
      value: '封面封底覆哑膜'
    },
    {
      name: '模切',
      value: '模切'
    },
    {
      name: '击凸',
      value: '击凸'
    },
    {
      name: '全书过油',
      value: '全书过油'
    },
    {
      name: '内页拉p',
      value: '内页拉p'
    },
    {
      name: '局部uv',
      value: '局部uv'
    },
    {
      name: '压纹',
      value: '压纹'
    }],
    SecondItems: [{
      name: '骑马钉',
      value: '骑马钉'
    },
    {
      name: '无线胶装',
      value: '无线胶装'
    },
    {
      name: '锁线胶装',
      value: '锁线胶装'
    },
    {
      name: '硬壳精装',
      value: '硬壳精装'
    },
    {
      name: 'yo圈装',
      value: 'yo圈装'
    }],
    checkBoxValue: '',
    secondCheckBoxValue:'',
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
        data.multiArray[1] = ['80', '105', '120', '128', '140', '150', '157', '200', '230', '250', '300', '350', '400'];
        break;
      case 1:
        data.multiArray[1] = ['105', '128', '157', '200', '230', '250', '300', '350', '400'];
        break;
      case 2:
        data.multiArray[1] = ['55', '60', '70', '80', '100', '120', '140', '160', '200', '250'];
        break;
      case 3:
        data.multiArray[1] = ['80', '100', '120', '135', '140', '160', '180', '200'];
        break;
      case 4:
        data.multiArray[1] = ['120', '140', '160', '180', '200', '250', '300', '350', '400'];
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
  //第二个复选框改变事件
  sencondcheckboxChange:function(e){
    let me = this;
    me.setData({
      secondBoxValueBox: e.detail.value
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
      remark, arry, size, checkBoxValue,secondCheckBoxValue,t = true;
    if (!app.checkLogin()) {
      wx.showToast({
        title: '请先登入',
        icon: 'none'
      })
      return;
    }
    if(me.data.checkBoxValue!=''){
      checkBoxValue = "#封面封底后道工序:" + me.data.checkBoxValue.join("#");
    }
    if (me.data.secondBoxValueBox != ''){
      secondCheckBoxValue = "#装订方式:" + me.data.secondBoxValueBox.join("#");
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
    arry = [
      "成品尺寸:" + size,
      "封面封底:4p",
      "单双面:" + me.data.dsm[me.data.dsmIndex],
      "印刷颜色:" + me.data.color[me.data.colorIndex],
      "材料:" + me.data.multiArray[0][me.data.multiIndex[0]] + "," + me.data.multiArray[1][me.data.multiIndex[1]],
    ];
    remark = arry.join("#");
    submitData = {
      product: me.data.productList.name,
      amount: me.data.submitData.amount,
      remark: remark + checkBoxValue + secondCheckBoxValue,
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