import $axios from '@/comm/$axios.js';
import axios from 'axios';



export async function getRole(){//获取列表
  let res = await $axios.get('/rolelist');
  if(res.code==200&&res.list){
    return res
  }else{
    return []
  }
}
export function addRole(data){//添加
  return $axios.post('/roleadd',data);
}
export function editRole(data){//修改
  return  $axios.post('/roleedit',data)
}
export function delRole(data){//删除
  return $axios.post('/roledelete',{id:data})
}
