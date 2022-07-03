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
        </el-tree>
    </div>
</template>

<script>
    export default {
        name: "DepMana",
        data(){
            return{
                filterText:'',
                deps:[],
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

</style>