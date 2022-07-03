<template>
    <div style="width:500px">
        <el-input
                placeholder="请输入部门名称进行搜索..."
                prefix-icon="el-icon-search"
                v-model="filterText"
                size="small">
        </el-input>

        <el-tree
                :data="deps"
                :props="defaultProps"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                ref="tree">
            <span class="custom-tree-node" style="display: flex;justify-content: space-between;width: 100%;"
                  slot-scope="{ node, data }">
                <span>{{data.name}}</span>
                <span>
                    <el-button
                            type="primary"
                            size="mini"
                            class="depBtn"
                            @click="() => showAddDepView(data)">
                        添加部门
                    </el-button>
                    <el-button
                            type="danger"
                            size="mini"
                            class="depBtn"
                            @click="() => deleteDep(data)">
                        删除部门
                    </el-button>
                </span>
             </span>
        </el-tree>
        <el-dialog
                title="添加部门"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <table>
                    <tr>
                        <td>
                            <el-tag>上级部门</el-tag>
                        </td>
                        <td>{{pname}}</td>
                    </tr>
                    <tr>
                        <td>
                            <el-tag>部门名称</el-tag>
                        </td>
                        <td>
                            <el-input v-model="dep.name" placeholder="请输入部门名称..."></el-input>
                        </td>
                    </tr>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doAddDep">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DepMana",
        data(){
            return{
                dialogVisible: false,
                filterText:'',
                deps:[],
                dep:{
                    name:'',
                    parentid: -1
                },
                pname:'',
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        watch: {
            //监控filterText里面的内容，有内容时触发方法
            filterText(val) {
                //执行el-tree里面的filter方法filterNode，传val值
                this.$refs.tree.filter(val);
            }
        },
        mounted(){
            this.initDeps();
        },
        methods:{
            initDep() {
                this.dep = {
                    name: '',
                    parentid: -1
                }
                this.pname = '';
            },
            addDep2Deps(deps,dep){
                for(let i=0; i<deps.length ; i++){
                    let d = deps[i];
                    if(d.id == dep.parentid){
                        d.children = d.children.concat(dep);
                        return;
                    }else{
                        this.addDep2Deps(d.children,dep);
                    }
                }
            },
            doAddDep(){
                this.postRequest("/system/basic/department/", this.dep).then(resp => {
                    if (resp) {
                        console.log(resp.obj);
                        //把添加的部门结果放进deps里
                        this.addDep2Deps(this.deps, resp.object);
                        this.dialogVisible = false;
                        //初始化变量
                        this.initDep();
                    }
                })
            },
            showAddDepView(data){
                this.pname = data.name;
                this.dep.parentid = data.id;
                this.dialogVisible = true;
            },
            deleteDep(data){
                console.log(data);
            },
            initDeps() {
                this.getRequest("/system/basic/department/").then(resp => {
                    if (resp) {
                        this.deps = resp;
                    }
                })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            }
        }
    }
</script>

<style scoped>
    .depBtn{
        padding: 2px;
    }
</style>