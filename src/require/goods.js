import $axios from '@/comm/$axios.js';



// 商品列表带分页
export async function getGoodslist(size = 2, page = 1) {//获取列表
  console.log("进入请求了");
  let res = await $axios.get("/goodslist", { params: { size, page } });
  console.log(res);
  if (res.code == 200 && res.list) {
    return res
  } else {
    return []
  }
}
// 商品总数
export function getTotal() {
  return $axios.get('/goodscount');


}

export function addGoods(data) {//添加
  return $axios.post('/goodsadd', data);
}
export function editGoods(data) {//修改
  return $axios.post('/goodsedit', data)
}
export function delGoods(data) {//删除
  return $axios.post('/goodsdelete', { id: data })
}

