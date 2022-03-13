// ajax.tsx 文件

export const createUser =  (data: object) => {
    return new Promise((resolve, require) => {
        let result = {
            "code": 200,
            "msg": "操作成功",
            "time": "1646138954653",
            "currentPage": null,
            "pageSize": null,
            "totalPage": 0,
            "total": 0,
            "pageList": null,
            "errors": null,
            "data": {
                "children": [],
                "ids": null,
                "operateBtn": null,
                "id": "824039851459346432",
                "roleName": "匿名",
                "roleCode": "anon",
                "isDefault": 1,
                "priorityLevel": 0,
                "createTime": "2021-03-23 22:00:11",
                "updateTime": "2022-03-01 20:49:14",
                "disabled": 0,
                "root": false
            },
        }
        setTimeout(() => {
            resolve(result);
        }, 3000)
    })
}
export const updateUser=(data:object)=>{
    return new Promise((resolve, require) => {
        let result = {
            "code": 500,
            "msg": "操作失败",
            "time": "1646138954653",
            "currentPage": null,
            "pageSize": null,
            "totalPage": 0,
            "total": 0,
            "pageList": null,
            "errors": null,
            "data": {
                "children": [],
                "ids": null,
                "operateBtn": null,
                "id": "824039851459346432",
                "roleName": "匿名",
                "roleCode": "anon",
                "isDefault": 1,
                "priorityLevel": 0,
                "createTime": "2021-03-23 22:00:11",
                "updateTime": "2022-03-01 20:49:14",
                "disabled": 0,
                "root": false
            },
        }
        setTimeout(() => {
            resolve(result);
        }, 3000)
    })

}
