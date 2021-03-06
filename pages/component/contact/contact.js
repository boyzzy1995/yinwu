// pages/component/contact/contact.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    //modal的高度
    height: {
      type: String,
      value: '80%'
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
    HandlerTapImage: function() {
      let me = this;
      this.setData({
        show:true
      })
    },
    makePhoneCall: function() {
      wx.makePhoneCall({
        phoneNumber: '15958003004',
      })
    },
    cancel() {
      this.setData({
        show: false
      })
      this.triggerEvent('cancel')
    },
    confirm() {
      this.setData({
        show: false
      })
      this.triggerEvent('confirm')
    }
  }
})