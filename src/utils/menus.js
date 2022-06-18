import router from "@/router";
import { getRequest } from "./api";

export const initMenu = (router,store)=>{
    if(store.state.router.length > 0){
        return;
    }
    getRequest("/system/config/menu").then(data=>{
        if(data){
            let fmtRoutes = formatRoutes(data);
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes',fmtRoutes);
        }
    })
}

export const formatRoutes=(routes)=>{
    let fmRoutes = [];
    routes.foreach(router=>{
        let{
            path,
            component,
            name,
            meta,
            iconCls,
            children
        }=router;
        if(children && children instanceof Array){//拥有子菜单，调用递归
            children=formatRoutes(children);
        }
        let fmRouter = {
            path:path,
            name:name,
            iconCls:iconCls,
            meta:meta,
            children:children,
            component(resolve){
                // 根据要去的菜单的组件名字前缀判断去哪个文件夹下的vue界面
                if(component.startWith("Emp")){
                    require(['../views/emp/'+component+'.vue'],resolve);
                }else if(component.startWith("Per")){
                    require(['../views/per/'+component+'.vue'],resolve);
                }else if(component.startWith("Sal")){
                    require(['../views/sal/'+component+'.vue'],resolve);
                }else if(component.startWith("Sta")){
                    require(['../views/sta/'+component+'.vue'],resolve);
                }else if(component.startWith("Sys")){
                    require(['../views/sys/'+component+'.vue'],resolve);
                }
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}