import $axios from '@/comm/$axios.js';




export async function getSpecslist(size = 2, page = 1) {//获取列表
  let res = await $axios.get("/specslist", { params: { size, page } });
  if (res.code == 200 && res.list) {
    return res
  } else {
    return []
  }
}
export function getTotal() {
  return $axios.get('/specscount');


}

export function addSpecs(data) {//添加
  return $axios.post('/specsadd', data);
}
export function editSpecs(data) {//修改
  return $axios.post('/specsedit', data)
}
export function delSpecs(data) {//删除
  return $axios.post('/specsdelete', { id: data })
}

// export  function GetLogin(data){//获取列表
//   // console.log(data);
//   return $axios.post('/specslogin',data);

// }
