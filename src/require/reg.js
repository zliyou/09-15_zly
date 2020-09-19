import $axios from '@/comm/$axios.js';
import { Message } from 'element-ui';


export async function reg(data){//添加会员
  let users = await $axios.post('/register',data);
  if (users.code == 200) {
    Message.success(users.msg);
    
  }
   else {
    Message.error(users.msg);
  }
}