import $axios from '@/comm/$axios.js';



export async function getMember(){//获取列表
  let res = await $axios.get("/memberlist");
  if(res.code==200&&res.list){
    return res.list
  }else{
    return []
  }
}

export function editMember(data){//修改
  return  $axios.post('/memberedit',data)
}

