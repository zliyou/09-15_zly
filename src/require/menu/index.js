import $axios from '@/comm/$axios.js';
import axios from 'axios';



export async function getList(){//获取列表
  let res = await $axios.get('/menulist?istree=1');
  if(res.code==200&&res.list){
    return res
  }else{
    return []
  }
}
export function addMenu(data){//添加
  return $axios.post('/menuadd',data);
}
export function editMenu(data){//修改
  return  $axios.post('/menuedit',data)
}
export function delMenu(data){//删除
  return $axios.post('/menudelete',{id:data})
}
