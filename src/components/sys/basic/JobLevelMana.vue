<template>
    <div>
        <div>
            <el-input size="small" v-model="jl.name" style="width: 300px;" prefix-icon="el-icon-plus"
                      placeholder="添加职称..."></el-input>
            <el-select v-model="jl.titleLevel" placeholder="职称等级" size="small"
                       style="margin-left: 5px;margin-right: 5px">
                <el-option
                        v-for="item in titleLevels"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
            <el-button icon="el-icon-plus" type="primary" size="small" @click="addJoblevel">添加</el-button>
        </div>
        <div>
            <el-table
                    :data="jls"
                    border
                    v-loading="loading"
                    element-loading-text="正在加载..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    size="small"
                    @selection-change="handleSelectionChange"
                    style="width: 80%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职称名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="titlelevel"
                        label="职称级别">
                </el-table-column>
                <el-table-column
                        prop="createdate"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        label="是否启用">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag type="danger" v-else>未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showEditView(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="deleteHandler(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
                    
    </div>
</template>

<script>
    export default {
        name: "JobLevelMana",
        data(){
            return{
                jl: {
                    name: '',
                    titleLevel: ''
                },
                jls:[],
                titleLevels: [
                    '正高级',
                    '副高级',
                    '中级',
                    '初级',
                    '员级',
                ]
            }
        },
        mounted(){
            this.initJls();
        },
        methods:{
            addJoblevel(){
                this.postRequest("/system/basic/job/",this.jl).then((resp)=>{
                    if(resp){
                        this.initJls();
                    }
                })
            },
            initJls(){
                this.getRequest("/system/basic/job/").then((resp) => {
                    if(resp){
                        this.jls = resp;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>