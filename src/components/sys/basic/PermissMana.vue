<template>
    <div>
        <div class="permissManaTool">
            <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input size="small" placeholder="请输入角色中文名" v-model="role.nameZh">
            </el-input>
            <el-button type="primary" size="small" icon="el-icon-plus">添加角色</el-button>
        </div>
        <div class="permissManaMain">
            <el-collapse v-model="activeName"
                         accordion>
                <el-collapse-item title="一致性" name="1">
                    <div>测试内容1</div>
                    <div>内容1</div>
                </el-collapse-item>
                <el-collapse-item title="反馈" name="2">
                    <div>测试内容2</div>
                    <div>内容2</div>
                </el-collapse-item>
                <el-collapse-item title="效率" name="3">
                    <div>测试内容3</div>
                    <div>内容3</div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PermissMana",
        data(){
            return{
                role:{
                    name:'',
                    nameZh:''
                }
            }
        }
    }
</script>

<style scoped>
    .permissManaTool{
        display: flex;
        justify-content: flex-start;
    }
    .permissManaTool .el-input{
        width: 300px;
        margin-left: 6px;
    }
    .permissManaTool .el-button{
        margin-left: 6px;
    }
    .permissManaMain {
        margin-top: 10px;
        width: 700px;
    }
</style>