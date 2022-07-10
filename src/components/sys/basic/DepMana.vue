<template>
    <div style="width:500px">
        <el-input
                placeholder="请输入部门名称进行搜索..."
                prefix-icon="el-icon-search"
                v-model="filterText"
                size="small">
        </el-input>

        <el-tree
                v-loading="loading"
                element-loading-text="正在加载..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
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
                v-loading="addLoading"
                element-loading-text="正在加载..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
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
                            <el-input v-model="dep.name" placeholder="请输入部门名称..." 
                                    @keydown.enter.native="doAddDep"></el-input>
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
                addLoading:false,
                loading:false,
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
                this.addLoading = true;
                this.postRequest("/system/basic/department/", this.dep).then(resp => {
                    if (resp) {
                        this.addLoading = false;
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
            removeDepFromDeps(p,deps, id) {
                for(let i=0;i<deps.length;i++){
                    let d = deps[i];
                    if (d.id == id) {
                        deps.splice(i, 1);
                        if (deps.length == 0) {
                            p.parent = false;
                        }
                        return;
                    }else{
                        this.removeDepFromDeps(d,d.children, id);
                    }
                }
            },
            deleteDep(data){
                if (data.isparent) {
                    this.$message.error("无法删除父部门");
                    this.loading = false;
                } else {
                    this.$confirm('此操作将永久删除【' + data.name + '】部门, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                       this.loading = true;
                       this.deleteRequest("/system/basic/department/"+data.id).then(resp=>{
                            this.loading = false;
                           if (resp) {
                               this.removeDepFromDeps(null,this.deps,data.id);
                           }
                       })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            initDeps() {
                this.loading = true;
                this.getRequest("/system/basic/department/").then(resp => {
                    this.loading = false;
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