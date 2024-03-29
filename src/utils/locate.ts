/**
 * 判断当前设备的IP地址
 * @param callback
 */
export const getIPs = (callback) => {
  var ip_dups = {};

  //compatibility for firefox and chrome
  var RTCPeerConnection =
    window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  var useWebKit = !!window.webkitRTCPeerConnection;

  //bypass naive webrtc blocking using an iframe
  if (!RTCPeerConnection) {
    var win = iframe.contentWindow;
    RTCPeerConnection =
      win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
    useWebKit = !!win.webkitRTCPeerConnection;
  }

  //minimal requirements for data connection
  var mediaConstraints = {
    optional: [{ RtpDataChannels: true }],
  };

  var servers = { iceServers: [{ urls: 'stun:stun.services.mozilla.com' }] };

  //construct a new RTCPeerConnection
  var pc = new RTCPeerConnection(servers, mediaConstraints);

  function handleCandidate(candidate) {
    //match just the IP address
    var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
    var ip_addr = ip_regex.exec(candidate)[1];

    //remove duplicates
    if (ip_dups[ip_addr] === undefined) callback(ip_addr);

    ip_dups[ip_addr] = true;
  }

  //listen for candidate events
  pc.onicecandidate = function (ice) {
    //skip non-candidate events
    if (ice.candidate) handleCandidate(ice.candidate.candidate);
  };

  //create a bogus data channel
  pc.createDataChannel('');

  //create an offer sdp
  pc.createOffer(
    function (result) {
      //trigger the stun server request
      pc.setLocalDescription(
        result,
        function () {},
        function () {},
      );
    },
    function () {},
  );

  //wait for a while to let everything done
  setTimeout(function () {
    //read candidate info from local description
    var lines = pc.localDescription.sdp.split('\n');

    lines.forEach(function (line) {
      if (line.indexOf('a=candidate:') === 0) handleCandidate(line);
    });
  }, 1000);
};

/**
 * 计算2个坐标之间的距离
 * @param lat1
 * @param lng1
 * @param lat2
 * @param lng2
 * @returns
 */
export const getDistance = function (lat1, lng1, lat2, lng2) {
  var radLat1 = (lat1 * Math.PI) / 180.0;
  var radLat2 = (lat2 * Math.PI) / 180.0;
  var a = radLat1 - radLat2;
  var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2),
      ),
    );
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  return s;
};

/**
 * 导出GPS的工具函数
 */
export const GPSTools = {
  delta: function (lat, lon) {
    var a = 6378245.0;
    var ee = 0.00669342162296594323;
    var dLat = this.transformLat(lon - 105.0, lat - 35.0);
    var dLon = this.transformLon(lon - 105.0, lat - 35.0);
    var radLat = (lat / 180.0) * Math.PI;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * Math.PI);
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * Math.PI);
    return { lat: dLat, lon: dLon };
  },
  gcj_encrypt: function (wgsLat, wgsLon) {
    if (this.outOfChina(wgsLat, wgsLon)) {
      return { lat: wgsLat, lng: wgsLon };
    }
    var d = this.delta(wgsLat, wgsLon);
    return { lat: wgsLat + d.lat, lng: wgsLon + d.lon };
  },
  outOfChina: function (lat, lon) {
    if (lon < 72.004 || lon > 137.8347) {
      return true;
    }
    if (lat < 0.8293 || lat > 55.8271) {
      return true;
    }
    return false;
  },
  transformLat: function (x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += ((20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0) / 3.0;
    ret += ((20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin((y / 3.0) * Math.PI)) * 2.0) / 3.0;
    ret +=
      ((160.0 * Math.sin((y / 12.0) * Math.PI) + 320 * Math.sin((y * Math.PI) / 30.0)) * 2.0) / 3.0;
    return ret;
  },
  transformLon: function (x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += ((20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0) / 3.0;
    ret += ((20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin((x / 3.0) * Math.PI)) * 2.0) / 3.0;
    ret +=
      ((150.0 * Math.sin((x / 12.0) * Math.PI) + 300.0 * Math.sin((x / 30.0) * Math.PI)) * 2.0) /
      3.0;
    return ret;
  },
};

/**
 * 高德转百度坐标系
 * @param lng
 * @param lat
 * @returns
 */
export const aMapToBMap = function (lng, lat) {
  var x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  var x = lng,
    y = lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  return {
    lng: z * Math.cos(theta) + 0.0065,
    lat: z * Math.sin(theta) + 0.006,
  };
};

/**
 * 百度坐标系转高德坐标系
 * @param lng
 * @param lat
 * @returns
 */
export const bMapToAMap = function (lng, lat) {
  var x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  var x = lng - 0.0065,
    y = lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  return {
    lng: z * Math.cos(theta),
    lat: z * Math.sin(theta),
    isBMap: false,
  };
};

/**
 * 高德坐标系转谷歌坐标系
 * @param lon
 * @param lat
 * @returns
 */
export const aMapToGMap = function (lon, lat) {
  var a = 6378245.0;
  var ee = 0.00669342162296594323;
  var x = lon - 105.0;
  var y = lat - 35.0;
  var dLon = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  dLon += ((20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0) / 3.0;
  dLon += ((20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin((x / 3.0) * Math.PI)) * 2.0) / 3.0;
  dLon +=
    ((150.0 * Math.sin((x / 12.0) * Math.PI) + 300.0 * Math.sin((x / 30.0) * Math.PI)) * 2.0) / 3.0;
  var dLat = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  dLat += ((20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0) / 3.0;
  dLat += ((20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin((y / 3.0) * Math.PI)) * 2.0) / 3.0;
  dLat +=
    ((160.0 * Math.sin((y / 12.0) * Math.PI) + 320 * Math.sin((y * Math.PI) / 30.0)) * 2.0) / 3.0;
  var radLat = (lat / 180.0) * Math.PI;
  var magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  var sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * Math.PI);
  dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * Math.PI);
  var wgsLon = lon - dLon;
  var wgsLat = lat - dLat;
  return {
    lat: wgsLat,
    lng: wgsLon,
  };
};

/**
 * 谷歌坐标系转高德坐标系
 * @param lng
 * @param lat
 * @returns
 */
export const gMapToAMap = function (lng, lat) {
  return GPS.gcj_encrypt(lat, lng);
};

/**
 * 谷歌坐标系转百度坐标系
 * @param lng
 * @param lat
 * @returns
 */
export const gMapToBMap = function (lng, lat) {
  var aPoint = gMapToAMap(lng, lat);
  return aMapToBMap(aPoint.lng, aPoint.lat);
};

/**
 * 百度坐标转化为腾讯坐标
 * @param lng
 * @param lat
 * @returns
 */
export const qqMapToBMap = (lng, lat) => {
  if (lng == null || lng == '' || lat == null || lat == '') return [lng, lat];
  var x_pi = 3.14159265358979324;
  var x = parseFloat(lng);
  var y = parseFloat(lat);
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  lng = (z * Math.cos(theta) + 0.0065).toFixed(5);
  lat = (z * Math.sin(theta) + 0.006).toFixed(5);
  return lat + ',' + lng;
};

/**
 * 火星坐标（gcj02）转化为百度坐标
 * @param mars_point
 * @returns
 */
export const transformGCtoBMap = (mars_point) => {
  const x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  var baidu_point = { lon: 0, lat: 0 };
  var x = mars_point.lon;
  var y = mars_point.lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  baidu_point.lon = z * Math.cos(theta) + 0.0065;
  baidu_point.lat = z * Math.sin(theta) + 0.006;
  return baidu_point;
};
