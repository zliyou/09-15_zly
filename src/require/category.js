import $axios from '@/comm/$axios.js';
import axios from 'axios';



export async function getCate(){//获取列表
  let res = await $axios.get("/catelist?istree=1");
  if(res.code==200&&res.list){
    return res
  }else{
    return []
  }
}


export function addCate(data){//添加
  return $axios.post('/cateadd',data);
}
export function editCate(data){//修改
  return  $axios.post('/cateedit',data)
}
export function delCate(data){//删除
  return $axios.post('/catedelete',{id:data})
}

export  function GetLogin(data){//获取列表
  // console.log(data);
  return $axios.post('/catelogin',data);
  
}
