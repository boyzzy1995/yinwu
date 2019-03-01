// pages/classify/classify.js
import {
  getAllProduct
} from "../../api/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    VariousList: [{
        name: "不干胶",
        describe: "自动贴标、彩色贴纸、产品标签、商标、条码贴纸、特殊不干胶、防伪标签",
        picUrl: "https://img.jinghangkuajing.com/printing/resources/2.png",
        url: 'bgj/bgj'

      },
      {
        name: "DM",
        describe: "宣传单、折页、海报、门票、优惠券、餐台纸",
        picUrl: "https://img.jinghangkuajing.com/printing/resources/13.png",
        url: 'dm/dm'
      },
      {
        name: "画册",
        describe: "企业产品画册、宣传画册、说明书、书籍、书刊",
        picUrl: "https://img.jinghangkuajing.com/printing/resources/6.png",
        url: 'PictureAlbum/PictureAlbum'
      },
      {
        name: "彩盒",
        describe: "大包装箱、坑箱、彩箱、淘宝箱（平口箱盒、扣底盒、自动扣底盒、收缩盒、双插带挂钩盒、双插带安全扣盒、双插盒、提手盒、扣底带挂钩盒）",
        picUrl: "https://img.jinghangkuajing.com/printing/resources/3.png",
        url: 'ColorBox/ColorBox'
      },
      {
        name: "封套",
        describe: "画册夹页封套",
        picUrl: "https://img.jinghangkuajing.com/printing/resources/4.png",
        url: 'Envelope/Envelope'
      },
      {
        name: "手提袋",
        describe: "广告宣传纸袋、礼品纸袋、服装纸袋、文件袋、牛皮袋",
        picUrl: "https://img.jinghangkuajing.com/printing/resources/9.png",
        url: 'Reticule/Reticule'
      },
      {
        name: "便签表单",
        describe: "各类便签、门票、优惠券、信纸、表格、笔记本",
        picUrl: "https://img.jinghangkuajing.com/printing/resources/1.png",
        url: 'NoteForm/NoteForm'
      },
      {
        name: "吊牌",
        describe: "服装吊牌、商业吊牌、彩卡、纸卡",
        picUrl: "https://img.jinghangkuajing.com/printing/resources/5.png",
        url: 'HagTag/HagTag'
      },
      {
        name: "无纺布袋",
        describe: "无纺布手提袋（手提式有侧立体袋、打孔式平口袋、一次成型立体袋、束口式、手提式立体折迭袋）",
        picUrl: "https://img.jinghangkuajing.com/printing/resources/11.png",
        url: 'NonWovenBag/NonWovenBag'
      },
      {
        name: "塑料袋",
        describe: "背心袋、烫低袋、平口袋（穿孔袋）、手柄烫底袋、手柄袋（手挽袋、信封袋、背心袋、手提袋、密封度）",
        picUrl: "https://img.jinghangkuajing.com/printing/resources/10.png",
        url: 'PlasticBag/PlasticBag'
      },
      {
        name: "名片",
        describe: "彩色名片、折卡名片、荷包像、工牌",
        picUrl: "https://img.jinghangkuajing.com/printing/resources/7.png",
        url: 'Card/Card'
      },
      {
        name: "纸杯",
        describe: "一次性纸杯",
        picUrl: "https://img.jinghangkuajing.com/printing/resources/12.png",
        url: 'PaperCup/PaperCup'
      },
      {
        name: "设计服务",
        describe: "logo设计、vi设计、单页设计、画册设计、彩盒设计等各种印刷品图文设计",
        picUrl: "https://img.jinghangkuajing.com/printing/resources/8.png",
        url: 'Desgin/Desgin'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    let me = this;
    // me.initProductList();
  },
  initProductList: function() {
    let me = this;
    getAllProduct().then((resp) => {
      me.setData({
        printingList: resp.data.data
      })
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
  toDetail: function(e) {
    wx.navigateTo({
      url: 'detail/' + e.currentTarget.dataset.url + '?name=' + e.currentTarget.dataset.name + "&describe=" + e.currentTarget.dataset.describe
    })
  }
})