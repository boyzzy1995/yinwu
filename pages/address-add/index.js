var commonCityData = require('../../utils/city.js')
import {
  addAddress,
  getAddressById,
  updateAddress,
  deleteAddressById
} from "../../api/api"
//获取应用实例
var app = getApp()
Page({
  data: {
    provinces: [],
    citys: [],
    districts: [],
    selProvince: '请选择',
    selCity: '请选择',
    selDistrict: '请选择',
    selProvinceIndex: 0,
    selCityIndex: 0,
    selDistrictIndex: 0
  },
  bindCancel: function() {
    wx.navigateBack({})
  },
  bindSave: function(e) {
    var that = this;
    var linkMan = e.detail.value.linkMan;
    var address = e.detail.value.address;
    var mobile = e.detail.value.mobile;
    var code = e.detail.value.code;
    var company = e.detail.value.company,
      name = e.detail.value.name,
      telephone = e.detail.value.telephone;
    if (this.data.selProvince == "请选择") {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return
    }
    if (this.data.selCity == "请选择") {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return
    }
    var cityId = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].id;
    var districtId;
    if (this.data.selDistrict == "请选择" || !this.data.selDistrict) {
      districtId = '';
    } else {
      districtId = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[this.data.selDistrictIndex].id;
    }
    if (address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    }
    var _data = {
      company: company,
      name: name,
      telephone: telephone,
      provinceId: commonCityData.cityData[this.data.selProvinceIndex].id,
      cityId: cityId,
      areaId: districtId,
      province: this.data.selProvince,
      city: this.data.selCity,
      area: this.data.selDistrict,
      detail: address,
    }
    var apiAddoRuPDATE = "addAddress";
    var apiAddid = that.data.id;
    if (apiAddid) { //判断是更新
      apiAddoRuPDATE = "upAddress";
      _data = { ..._data,
        id: that.data.id
      }
      wx.showLoading({
        title: '加载中...',
      })
      updateAddress(_data).then((resp) => {
        wx.hideLoading();
        wx.showToast({
          title: '更新成功',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateBack({})
        }, 1000)
      })
    } else { //判断是新增
      apiAddid = 0;
      addAddress(_data).then((resp) => {
        wx.hideLoading();
        wx.showToast({
          title: '新增成功',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateBack({
            
          })
        }, 1000)
      })
    }
  },
  initCityData: function(level, obj) {
    if (level == 1) {
      var pinkArray = [];
      for (var i = 0; i < commonCityData.cityData.length; i++) {
        pinkArray.push(commonCityData.cityData[i].name);
      }
      this.setData({
        provinces: pinkArray
      });
    } else if (level == 2) {
      var pinkArray = [];
      var dataArray = obj.cityList
      for (var i = 0; i < dataArray.length; i++) {
        pinkArray.push(dataArray[i].name);
      }
      this.setData({
        citys: pinkArray
      });
    } else if (level == 3) {
      var pinkArray = [];
      var dataArray = obj.districtList
      for (var i = 0; i < dataArray.length; i++) {
        pinkArray.push(dataArray[i].name);
      }
      this.setData({
        districts: pinkArray
      });
    }

  },
  bindPickerProvinceChange: function(event) {
    var selIterm = commonCityData.cityData[event.detail.value];
    this.setData({
      selProvince: selIterm.name,
      selProvinceIndex: event.detail.value,
      selCity: '请选择',
      selCityIndex: 0,
      selDistrict: '请选择',
      selDistrictIndex: 0
    })
    this.initCityData(2, selIterm)
  },
  bindPickerCityChange: function(event) {
    var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[event.detail.value];
    this.setData({
      selCity: selIterm.name,
      selCityIndex: event.detail.value,
      selDistrict: '请选择',
      selDistrictIndex: 0
    })
    this.initCityData(3, selIterm)
  },
  bindPickerChange: function(event) {
    var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[event.detail.value];
    if (selIterm && selIterm.name && event.detail.value) {
      this.setData({
        selDistrict: selIterm.name,
        selDistrictIndex: event.detail.value
      })
    }
  },
  onLoad: function(e) {
    var that = this;
    this.initCityData(1);
    var id = e.id;
    if (id) {
      // 初始化原数据
      wx.showLoading();
      getAddressById(id).then((resp) => {
        that.setData({
          id: id,
          addressData: resp.data.data,
          selProvince: resp.data.data.province,
          selCity: resp.data.data.city,
          selDistrict: resp.data.data.area
        });
        that.setDBSaveAddressId(resp.data.data);
        wx.hideLoading();
      })
    }
  },
  setDBSaveAddressId: function(data) {
    var retSelIdx = 0;
    for (var i = 0; i < commonCityData.cityData.length; i++) {
      if (data.provinceId == commonCityData.cityData[i].id) {
        this.data.selProvinceIndex = i;
        for (var j = 0; j < commonCityData.cityData[i].cityList.length; j++) {
          if (data.cityId == commonCityData.cityData[i].cityList[j].id) {
            this.data.selCityIndex = j;
            for (var k = 0; k < commonCityData.cityData[i].cityList[j].districtList.length; k++) {
              if (data.districtId == commonCityData.cityData[i].cityList[j].districtList[k].id) {
                this.data.selDistrictIndex = k;
              }
            }
          }
        }
      }
    }
  },
  selectCity: function() {

  },
  deleteAddress: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该收货地址吗？',
      success: function(res) {
        if (res.confirm) {
          deleteAddressById(id).then((resp) => {
            wx.showToast({
              title: '删除成功',
            })
            wx.navigateBack({})
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onShareAppMessage: function() {
    return {
      title: '专注印务服务新生态',
      path: '/pages/index/index'
    }
  }
})