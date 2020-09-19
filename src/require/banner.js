import $axios from '@/comm/$axios.js';
import axios from 'axios';



export async function getBanner(){//获取列表
  let res = await $axios.get("/bannerlist");
  if(res.code==200&&res.list){
    return res
  }else{
    return []
  }
}


export function addBanner(data){//添加
  return $axios.post('/banneradd',data);
}
export function editBanner(data){//修改
  return  $axios.post('/banneredit',data)
}
export function delBanner(data){//删除
  return $axios.post('/bannerdelete',{id:data})
}

