import {
  login,
  template,
  updateUser,
  getAllOrder,
  payOrder,
  comfirmReceive,
  cancelOrder
} from "../../api/api.js"

const app = getApp()

Page({
  data: {
    userInfo: {
      avatarUrl: "",
      nickName: "",
    },
    btnReceiveDisplay: "none", //收货按钮
    btnOkDisplay: "none", //确认订单按钮
    btnCancelDisplay: "block", //取消订单按钮
    WatingPayiconsClass: "iconsChecked",
    hadSureMoneyClass: "icons",
    WatingSendiconsClass: "icons",
    WatingReceiveiconsClass: "icons",
    CompleteiconsClass: "icons",
    userToken: '',
    userId: '',
    orderList: '',
    orderStatus: 0,
    tip: 'none',
    EmptyTip: 'none',
    index: 1 //用于判断当前点击的是哪一个图标
  },
  onLoad() {

  },
  onShow() {
    let me = this;
    me.checkSignIn();
    me.getAllOrder();
  },
  /**
   * 判断有没有登入
   */
  checkSignIn: function() {
    let me = this;
    if (app.checkLogin()) {
      wx.getStorage({
        key: 'userInfo',
        success: function(res) {
          me.setData({
            userInfo: res.data
          })
        },
      })
    } else {
      me.setData({
        userInfo: ''
      })
    }
  },
  /**
   * 获得所有订单信息
   */
  getAllOrder: function() {
    let me = this,
      i = 0,
      flag1 = false,
      flag2 = false,
      flag3 = false,
      flag4 = false,
      flag5 = false;
    wx.showLoading({
      title: '正在加载...',
    })
    getAllOrder().then((resp) => {
      wx.hideLoading();
      if (resp.data.code == 402) {
        me.setData({
          userInfo: '',
          EmptyTip: 'none',
          orderList: ''
        })
        wx.showToast({
          title: '登入已过期,请重新登入',
          icon: 'none'
        })
        return;
      }
      if (resp.data.code == 200 && resp.data.data != null) { //判断是否有记录
        let data = resp.data.data;
        me.setData({
          orderList: data
        })
        //判断是否有待定价的记录
        for (i = 0; i < data.length; i++) {
          if (data[i].status == 0) {
            flag1 = true;
          }
          if (data[i].status == 10) {
            flag2 = true;
          }
          if (data[i].status == 11) {
            flag3 = true;
          }
          if (data[i].status == 100) {
            flag4 = true;
          }
          if (data[i].status == 1000) {
            flag5 = true;
          }
        }
        if (me.data.index == 1) {
          if (flag1 == true) {
            me.setData({
              tip: 'block',
              EmptyTip: 'none'
            })
          } else {
            me.setData({
              tip: 'none',
              EmptyTip: 'block'
            })
          }
        }
        if (me.data.index == 2) {
          if (flag2 == true) {
            me.setData({
              EmptyTip: 'none'
            })
          } else {
            me.setData({
              EmptyTip: 'block'
            })
          }
        }
        if (me.data.index == 3) {
          if (flag3 == true) {
            me.setData({
              EmptyTip: 'none'
            })
          } else {
            me.setData({
              EmptyTip: 'block'
            })
          }
        }
        if (me.data.index == 4) {
          if (flag4 == true) {
            me.setData({
              EmptyTip: 'none'
            })
          } else {
            me.setData({
              EmptyTip: 'block'
            })
          }
        }
        if (me.data.index == 5) {
          if (flag5 == true) {
            me.setData({
              EmptyTip: 'none'
            })
          } else {
            me.setData({
              EmptyTip: 'block'
            })
          }
        }
      } else {
        me.setData({
          tip: 'none',
          EmptyTip: 'block'
        })
      }
    })
  },
  /**
   * 存储FormId至data
   */
  formSubmit: function(e) {
    let formId = e.detail.formId;
    this.setData({
      formId
    })
  },
  /**
   * 用户登入
   */
  getUserInfo: function(e) {
    let me = this;
    wx.showLoading({
      title: '正在加载...'
    })
    wx.login({
      success: function(resp) {
        if (resp.code) {
          login(resp.code).then((resp) => {
            wx.setStorage({
              key: "userToken",
              data: resp.data.data.userToken,
              success: (resp) => {
                me.onGotUserInfo(e);
               /**
                * 发送FormId至后台
                */
                // wx.login({
                //   success: function(resp) {
                //     template(resp.code, me.data.formId).then((resp) => {
                      
                //     })
                //   }
                // })
              }
            });
            wx.setStorage({
              key: "id",
              data: resp.data.data.id
            })
          })
        }
      }
    })
  },
  /**
   * 更新用户信息
   */
  onGotUserInfo: function(e) {
    let me = this;
    updateUser(e.detail.userInfo).then((resp) => {
      wx.hideLoading();
      me.setData({
        userInfo: e.detail.userInfo
      })
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo
      })
      if (resp.data.code == 200) {
        wx.showToast({
          title: '登陆成功',
          icon: 'success',
          duration: 1500,
        })
        setTimeout(() => {
          me.getAllOrder();
        }, 1500)
      }
    })
  },
  /**
   * 待定价
   */
  handlerWatingPayMoney: function() {
    this.setData({
      btnReceiveDisplay: "none", //确认收货按钮
      btnOkDisplay: "none", //确认订单按钮
      btnCancelDisplay: "block", //取消订单按钮
      WatingPayiconsClass: "iconsChecked",
      hadSureMoneyClass: "icons",
      WatingSendiconsClass: "icons",
      WatingReceiveiconsClass: "icons",
      CompleteiconsClass: "icons",
      orderStatus: 0,
      index: '1'
    })
    this.getAllOrder();
  },
  /**
   * 已定价
   */
  handlerhadSureMoney: function() {
    this.setData({
      btnReceiveDisplay: "none", //确认收货按钮
      btnOkDisplay: "block", //确认订单按钮
      btnCancelDisplay: "block", //取消订单按钮
      WatingPayiconsClass: "icons",
      hadSureMoneyClass: "iconsChecked",
      WatingSendiconsClass: "icons",
      WatingReceiveiconsClass: "icons",
      CompleteiconsClass: "icons",
      orderStatus: 10,
      index: 2,
      tip: 'none'
    })
    this.getAllOrder();
  },
  /**
   * 待发货
   */
  handlerWatingSend: function() {
    this.setData({
      btnReceiveDisplay: "none", //确认收货按钮
      btnOkDisplay: "none", //确认订单按钮
      btnCancelDisplay: "none", //取消订单按钮
      WatingPayiconsClass: "icons",
      hadSureMoneyClass: "icons",
      WatingSendiconsClass: "iconsChecked",
      WatingReceiveiconsClass: "icons",
      CompleteiconsClass: "icons",
      orderStatus: 11,
      index: 3,
      tip: 'none'
    })
    this.getAllOrder();
  },
  /**
   * 待收货
   */
  handlerWatingReceiveGoods: function() {
    this.setData({
      btnReceiveDisplay: "block", //确认收货按钮
      btnOkDisplay: "none", //确认订单按钮
      btnCancelDisplay: "none", //取消订单按钮
      WatingPayiconsClass: "icons",
      hadSureMoneyClass: "icons",
      WatingSendiconsClass: "icons",
      WatingReceiveiconsClass: "iconsChecked",
      CompleteiconsClass: "icons",
      orderStatus: 100,
      index: 4,
      tip: 'none'
    })
    this.getAllOrder();
  },
  /**
   * 已完成
   */
  handlerComplete: function() {
    this.setData({
      btnReceiveDisplay: "none", //确认收货按钮
      btnOkDisplay: "none", //确认订单按钮
      btnCancelDisplay: "none", //取消订单按钮
      WatingPayiconsClass: "icons",
      hadSureMoneyClass: "icons",
      WatingSendiconsClass: "icons",
      WatingReceiveiconsClass: "icons",
      CompleteiconsClass: "iconsChecked",
      orderStatus: 1000,
      index: 5,
      tip: 'none'
    })
    this.getAllOrder();
  },
  onShareAppMessage: function() {
    return {
      title: '专注印务服务新生态',
      path: '/pages/index/index'
    }
  },
  /**
   * 支付订单
   */
  payOrder: function(e) {
    let id = e.currentTarget.dataset.id,
      me = this;
    wx.showModal({
      title: '提示',
      content: '确认下单吗?',
      success: resp => {
        if (resp.confirm) {
          wx.showLoading({
            title: '加载中...',
          })
          payOrder(id).then((resp) => {
            wx.hideLoading();
            wx.showToast({
              title: '下单成功',
              duration: 2000
            })
            setTimeout(() => {
              me.getAllOrder();
            }, 2000)
          })
        }
      }
    })
  },
  /**
   * 确认收货
   */
  comfirmReceive: function(e) {
    let id = e.currentTarget.dataset.id,
      me = this;
    wx.showModal({
      title: '提示',
      content: '确认收货吗?',
      success: resp => {
        if (resp.confirm) {
          wx.showLoading({
            title: '加载中...',
          })
          comfirmReceive(id).then((resp) => {
            wx.hideLoading();
            wx.showToast({
              title: '确认收货成功',
              duration: 2000
            })
            setTimeout(() => {
              me.getAllOrder();
            }, 2000)
          })
        }
      }
    })
  },
  /**
   * 取消订单
   */
  cancelOrder: function(e) {
    let id = e.currentTarget.dataset.id,
      me = this;
    wx.showModal({
      title: '提示',
      content: '确认取消订单吗？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中...',
          })
          cancelOrder(id).then((resp) => {
            wx.hideLoading();
            wx.showToast({
              title: '取消订单成功',
              duration: 2000
            })
            setTimeout(() => {
              me.getAllOrder();
            }, 2000);
          })
        } else if (res.cancel) {

        }
      }
    })
  },
})