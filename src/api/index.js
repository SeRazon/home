// import axios from "axios";
import fetchJsonp from "fetch-jsonp";

/**
 * 音乐播放器
 */

// 获取音乐播放列表
export const getPlayerList = async (server, type, id) => {
  const res = await fetch(
    `${import.meta.env.VITE_SONG_API}?server=${server}&type=${type}&id=${id}`,
  );
  const data = await res.json();

  if (data[0].url.startsWith("@")) {
    // eslint-disable-next-line no-unused-vars
    const [handle, jsonpCallback, jsonpCallbackFunction, url] = data[0].url.split("@").slice(1);
    const jsonpData = await fetchJsonp(url).then((res) => res.json());
    const domain = (
      jsonpData.req_0.data.sip.find((i) => !i.startsWith("http://ws")) ||
      jsonpData.req_0.data.sip[0]
    ).replace("http://", "https://");

    return data.map((v, i) => ({
      name: v.name || v.title,
      artist: v.artist || v.author,
      url: domain + jsonpData.req_0.data.midurlinfo[i].purl,
      cover: v.cover || v.pic,
      lrc: v.lrc,
    }));
  } else {
    return data.map((v) => ({
      name: v.name || v.title,
      artist: v.artist || v.author,
      url: v.url,
      cover: v.cover || v.pic,
      lrc: v.lrc,
    }));
  }
};

/**
 * 一言
 */

// 获取一言数据
export const getHitokoto = async () => {
  const res = await fetch("https://v1.hitokoto.cn");
  return await res.json();
};

/**
 * 天气
 */

// 获取高德地理位置信息（优先使用 serverless 代理，失败回退到直连）
export const getAdcode = async (key) => {
  try {
    const res = await fetch(`/api/weather?type=adcode`);
    if (res.ok) return await res.json();
    throw new Error("proxy failed");
  } catch (err) {
    // 回退到直接调用高德（方便本地开发或未配置 server-side key）
    const res = await fetch(`https://restapi.amap.com/v3/ip?key=${key}`);
    return await res.json();
  }
};

// 获取高德地理天气信息（优先使用 serverless 代理，失败回退到直连）
export const getWeather = async (key, city) => {
  try {
    const res = await fetch(`/api/weather?type=weather&city=${encodeURIComponent(city)}`);
    if (res.ok) return await res.json();
    throw new Error("proxy failed");
  } catch (err) {
    // 回退到直接调用高德（方便本地开发或未配置 server-side key）
    const res = await fetch(
      `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`,
    );
    return await res.json();
  }
};

// 获取教书先生天气 API（优先使用 serverless 代理，失败回退到直连）
// https://api.oioweb.cn/doc/weather/GetWeather
export const getOtherWeather = async () => {
  try {
    const res = await fetch(`/api/weather?type=other`);
    if (res.ok) return await res.json();
    throw new Error("proxy failed");
  } catch (err) {
    const res = await fetch("https://api.oioweb.cn/api/weather/GetWeather");
    return await res.json();
  }
};

// 逆地理编码（传入经度,纬度，返回 regeo 结果）
export const getRegeo = async (key, location) => {
  try {
    const res = await fetch(`/api/weather?type=regeo&location=${encodeURIComponent(location)}`);
    if (res.ok) return await res.json();
    throw new Error("proxy failed");
  } catch (err) {
    // 回退到直接调用高德 regeo（方便本地开发或未配置 server-side key）
    const res = await fetch(
      `https://restapi.amap.com/v3/geocode/regeo?key=${key}&location=${encodeURIComponent(location)}`,
    );
    return await res.json();
  }
};
