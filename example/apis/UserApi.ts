// ajax.tsx 文件
import axios from 'axios'

export const createUser = async (data: object) => {
  return   new Promise((resolve, require) => {
         axios.get("https://getman.cn/mock/createUser", data).then(resp => {
            resolve(resp.data);
        }).catch((msg) => {
            require(msg);
        })

    })
}
