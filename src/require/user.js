import $axios from '@/comm/$axios.js';
import axios from 'axios';



export async function getUser(size=2,page=1){//获取列表
  let res = await $axios.get("/userlist",{params:{size,page}});
  if(res.code==200&&res.list){
    return res
  }else{
    return []
  }
}
export  function getTotal(){
  return  $axios.get('/usercount');


}

export function addUser(data){//添加
  return $axios.post('/useradd',data);
}
export function editUser(data){//修改
  return  $axios.post('/useredit',data)
}
export function delUser(data){//删除
  return $axios.post('/userdelete',{uid:data})
}

export  function GetLogin(data){//获取列表
  // console.log(data);
  return $axios.post('/userlogin',data);
  
}
