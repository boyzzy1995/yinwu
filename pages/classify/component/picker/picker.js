// pages/classify/component/picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    swiper: {
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      topImgs: [{
        url: "../../../../images/add-image/banner1.png"
      },
      {
        url: "../../../../images/add-image/banner2.jpg"
      }
      ],
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toOuter:function(e){
      if(e.currentTarget.dataset.index==1){
        wx.navigateTo({
          url: '../../../../FreeCard/FreeCard',
        })
      }
    }
  }
})
