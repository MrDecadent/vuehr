import router from "@/router";
import { Array } from "core-js";
import { getRequest } from "./api";

export const initMenu = (router,store)=>{
    if(store.state.router.length > 0){
        return;
    }
    getRequest("/system/config/menu").then(data=>{
        if(data){
            let fmtRoutes = formatRoutes(data);
            router.addRoutes(fmtRoutes);
            store.commit(initRoutes,fmtRoutes);
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
                require(['../views/'+component+'.vue'],resolve);
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}