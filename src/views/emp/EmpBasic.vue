<template>
    <div>
        <div style="display: flex;justify-content: space-between">
            <div>
                <el-input placeholder="请输入员工名进行搜索，可以直接回车搜索..." prefix-icon="el-icon-search"
                          size="small"
                          style="width: 350px;margin-right: 10px"
                          clearable>
                </el-input>
                <el-button icon="el-icon-search" type="primary" size="small">
                    搜索
                </el-button>
                <el-button type="primary" size="small">
                    <i :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
                           aria-hidden="true"></i>
                    高级搜索
                </el-button>
            </div>
            <div>
                <el-button size="small" type="success" @click="exportData" icon="el-icon-upload">
                    导入数据
                </el-button>
                <el-button size="small" type="success" @click="exportData" icon="el-icon-download">
                    导出数据
                </el-button>
                <el-button size="small" type="primary" icon="el-icon-plus" @click="showAddEmpView">
                    添加用户
                </el-button>
            </div>
        </div>
        <div></div>
    </div>
</template>

<script>
    export default {
        name: "EmpBasic"
    }
</script>

<style scoped>

</style>