import $axios from '@/comm/$axios.js';




export async function getSecklist() {//获取列表
  let res = await $axios.get("/secklist");
  if (res.code == 200 && res.list) {
    return res
  } else {
    return []
  }
}

export function getCateGoods(data){
  // getcategoods
  // data格式：{fid:一级分类,sid:二级分类id}
  return $axios.get(`/getcategoods?sid=${data.sid}`);
}

export function addSeck(data) {//添加
  // console.log()
  return $axios.post('/seckadd', data);
}
export function editSeck(data) {//修改
  return $axios.post('/seckedit', data)
}
export function delSeck(data) {//删除
  return $axios.post('/seckdelete', { id: data })
}

