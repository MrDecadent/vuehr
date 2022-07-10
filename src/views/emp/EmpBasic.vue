<template>
    <div>
        <div style="display: flex;justify-content: space-between">
            <div>
                <el-input placeholder="请输入员工名进行搜索，可以直接回车搜索..." prefix-icon="el-icon-search"
                          clearable
                          @clear="initEmps"
                          size="small"
                          style="width: 350px;margin-right: 10px"
                          v-model="keywords"
                          @keydown.enter.native="initEmps"
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
                <el-button type="success" icon="el-icon-upload">
                    导入数据
                </el-button>
                <el-button type="success" icon="el-icon-download">
                    导出数据
                </el-button>
                <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">
                    添加员工
                </el-button>
            </div>
        </div>
        <div style="margin-top: 10px">
            <el-table
                v-loading="loading"
                element-loading-text="正在加载..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="emps"
                stripe
                border
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        fixed
                        align="left"
                        label="姓名"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="workid"
                        label="工号"
                        align="left"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        align="left"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        width="95"
                        align="left"
                        label="出生日期">
                </el-table-column>
                <el-table-column
                        prop="idcard"
                        width="150"
                        align="left"
                        label="身份证号码">
                </el-table-column>
                <el-table-column
                        prop="wedlock"
                        width="70"
                        label="婚姻状况">
                </el-table-column>
                <el-table-column
                        prop="nation.name"
                        width="50"
                        label="民族">
                </el-table-column>
                <el-table-column
                        prop="nativeplace"
                        width="80"
                        label="籍贯">
                </el-table-column>
                <el-table-column
                        prop="politicsstatus.name"
                        label="政治面貌">
                </el-table-column>
                <el-table-column
                        prop="email"
                        width="180"
                        align="left"
                        label="电子邮件">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        width="100"
                        align="left"
                        label="电话号码">
                </el-table-column>
                <el-table-column
                        prop="address"
                        width="220"
                        align="left"
                        label="联系地址">
                </el-table-column>
                <el-table-column
                        prop="department.name"
                        width="100"
                        align="left"
                        label="所属部门">
                </el-table-column>
                <el-table-column
                        prop="position.name"
                        width="100"
                        label="职位">
                </el-table-column>
                <el-table-column
                        prop="jobLevel.name"
                        width="100"
                        label="职称">
                </el-table-column>
                <el-table-column
                        prop="engageform"
                        width="100"
                        align="left"
                        label="聘用形式">
                </el-table-column>
                <el-table-column
                        prop="tiptopdegree"
                        width="80"
                        align="left"
                        label="最高学历">
                </el-table-column>
                <el-table-column
                        prop="specialty"
                        width="150"
                        align="left"
                        label="专业">
                </el-table-column>
                <el-table-column
                        prop="school"
                        width="150"
                        align="left"
                        label="毕业院校">
                </el-table-column>
                <el-table-column
                        prop="begindate"
                        width="95"
                        align="left"
                        label="入职日期">
                </el-table-column>
                <el-table-column
                        prop="conversiontime"
                        width="95"
                        align="left"
                        label="转正日期">
                </el-table-column>
                <el-table-column
                        prop="begincontract"
                        width="95"
                        align="left"
                        label="合同起始日期">
                </el-table-column>
                <el-table-column
                        prop="endcontract"
                        width="95"
                        align="left"
                        label="合同截止日期">
                </el-table-column>
                <el-table-column
                        width="100"
                        align="left"
                        label="合同期限">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.contractterm}}</el-tag>年
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tiptopdegree"
                        width="100"
                        align="left"
                        label="最高学历">
                </el-table-column>
                <el-table-column 
                        label="操作"
                        fixed="right"
                        width="200">
                    <template slot-scope="scope">
                        <el-button style="padding: 3px" size="mini">编辑</el-button>
                        <el-button style="padding: 3px" size="mini" type="primary">查看高级资料</el-button>
                        <el-button @click="deleteEmp(scope.row)" style="padding: 3px" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end">
                <el-pagination
                    :page-size="10"
                    :pager-count="7"
                    @current-change="currentChange"
                    @size-change="sizeChange"
                    layout="sizes, prev, pager, next, jumper, ->, total, slot"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
            title="添加员工"
            :visible.sync="dialogVisible"
            width="80%">
            <div>
                <el-form :model="emp" :rules="rules" ref="empForm">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名:" prop="name">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="emp.name"
                                          placeholder="请输入员工姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="性别:" prop="gender">
                                <el-radio-group v-model="emp.gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="出生日期:" prop="birthday">
                                <el-date-picker
                                        v-model="emp.birthday"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 150px;"
                                        placeholder="出生日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="政治面貌:" prop="politicid">
                                <el-select v-model="emp.politicid" placeholder="政治面貌" size="mini" style="width: 200px;">
                                    <el-option
                                            v-for="item in politicsstatus"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="民族:" prop="nationid">
                                <el-select v-model="emp.nationid" placeholder="民族" size="mini" style="width: 150px;">
                                    <el-option
                                            v-for="item in nations"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="籍贯:" prop="nativeplace">
                                <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="emp.nativeplace" placeholder="请输入籍贯"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="电子邮箱:" prop="email">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-message"
                                          v-model="emp.email" placeholder="请输入电子邮箱"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="联系地址:" prop="address">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                                          v-model="emp.address" placeholder="请输入联系地址"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="职位:" prop="posid">
                                <el-select v-model="emp.posid" placeholder="职位" size="mini" style="width: 150px;">
                                    <el-option
                                            v-for="item in positions"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="职称:" prop="jobLevelid">
                                <el-select v-model="emp.joblevelid" placeholder="职称" size="mini" style="width: 150px;">
                                    <el-option
                                            v-for="item in joblevels"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="所属部门:" prop="departmentid">
                                <!-- <el-input size="mini" style="width: 150px" prefix-icon="el-icon-phone"
                                          v-model="emp.departmentid" placeholder="所属部门"></el-input> -->
                                <el-popover
                                    placement="right"
                                    title="请选择部门"
                                    width="200"
                                    trigger="manual"
                                    v-model="popVisible">
                                    <el-tree default-expand-all :data="allDeps" :props="defaultProps" :expand-on-click-node="false"
                                             @node-click="handleNodeClick"></el-tree>
                                    <div style="width: 150px;display: inline-flex;font-size: 13px;border: 1px solid #dedede;height: 26px;border-radius: 5px;cursor: pointer;align-items: center;padding-left: 8px;box-sizing: border-box"
                                        @click="showDepView"
                                        slot="reference">
                                        {{inputDepName}}
                                    </div>
                                </el-popover>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="电话号码:" prop="phone">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-phone"
                                          v-model="emp.phone" placeholder="电话号码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="工号:" prop="workid">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="emp.workid" placeholder="工号" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="学历:" prop="tiptopdegree">
                                <el-select v-model="emp.tiptopdegree" placeholder="学历" size="mini"
                                           style="width: 150px;">
                                    <el-option
                                            v-for="item in tiptopdegrees"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="毕业院校:" prop="school">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="emp.school" placeholder="毕业院校名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                           <el-form-item label="专业名称:" prop="specialty">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                                          v-model="emp.specialty" placeholder="请输入专业名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="入职日期:" prop="begindate">
                                <el-date-picker
                                        v-model="emp.begindate"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 130px;"
                                        placeholder="入职日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="转正日期:" prop="conversiontime">
                                <el-date-picker
                                        v-model="emp.conversiontime"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 130px;"
                                        placeholder="转正日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同起始日期:" prop="begincontract">
                                <el-date-picker
                                        v-model="emp.begincontract"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 130px;"
                                        placeholder="合同起始日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="合同终止日期:" prop="endcontract">
                                <el-date-picker
                                        v-model="emp.endcontract"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 150px;"
                                        placeholder="合同终止日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="身份证号码:" prop="idcard">
                                <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                                          v-model="emp.idcard" placeholder="请输入身份证号码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="聘用形式:" prop="engageform">
                                <el-radio-group v-model="emp.engageform">
                                    <el-radio label="劳动合同">劳动合同</el-radio>
                                    <el-radio label="劳务合同">劳务合同</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="婚姻状况:" prop="wedlock">
                                <el-radio-group v-model="emp.wedlock">
                                    <el-radio label="已婚">已婚</el-radio>
                                    <el-radio label="未婚">未婚</el-radio>
                                    <el-radio label="离异">离异</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doAddEmp">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        name: "EmpBasic",
        data(){
            return{
                dialogVisible: false,
                emps:[],
                loading:false,
                total:0,
                page:1,
                size:10,
                keywords:'',
                emp: {
                    name: "",
                    gender: "",
                    idcard: "",
                    birthday: "",
                    wedlock: "",
                    nationid: null,
                    nativeplace: "",
                    politicid: null,
                    email: "",
                    phone: "",
                    address: "",
                    departmentid: null,
                    joblevelid: null,
                    posid: null,
                    engageform: "",
                    tiptopdegree: "",
                    specialty: "",
                    school: "",
                    begindate: "",
                    workstate: "",
                    workid: "",
                    contractterm: null,
                    conversiontime: "",
                    notworkdate: null,
                    begincontract: "",
                    endcontract: "",
                    workage: null
                },
                politicsstatus: [],
                nations:[],
                joblevels:[],
                tiptopdegree:[],
                positions:[],
                tiptopdegrees: ['本科', '大专', '硕士', '博士', '高中', '初中', '小学', '其他'],
                popVisible:false,
                allDeps:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                inputDepName:'',
                rules:{
                    name:[{required: true,message: '请输入姓名' ,trigger: 'blur'}],
                    gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
                    birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
                    idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'}, {
                        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                        message: '身份证号码格式不正确',
                        trigger: 'blur'
                    }],
                    wedlock: [{required: true, message: '请输入婚姻状况', trigger: 'blur'}],
                    nationid: [{required: true, message: '请输入您组', trigger: 'blur'}],
                    nativeplace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
                    politicid: [{required: true, message: '请输入政治面貌', trigger: 'blur'}],
                    email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}, {
                        type: 'email',
                        message: '邮箱格式不正确',
                        trigger: 'blur'
                    }],
                    phone: [{required: true, message: '请输入电话号码', trigger: 'blur'}],
                    address: [{required: true, message: '请输入员工地址', trigger: 'blur'}],
                    departmentid: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
                    joblevelid: [{required: true, message: '请输入职称', trigger: 'blur'}],
                    posid: [{required: true, message: '请输入职位', trigger: 'blur'}],
                    engageform: [{required: true, message: '请输入聘用形式', trigger: 'blur'}],
                    tiptopdegree: [{required: true, message: '请输入学历', trigger: 'blur'}],
                    specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
                    school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
                    begindate: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
                    workState: [{required: true, message: '请输入工作状态', trigger: 'blur'}],
                    workid: [{required: true, message: '请输入工号', trigger: 'blur'}],
                    contractterm: [{required: true, message: '请输入合同期限', trigger: 'blur'}],
                    conversiontime: [{required: true, message: '请输入转正日期', trigger: 'blur'}],
                    notworkdate: [{required: true, message: '请输入离职日期', trigger: 'blur'}],
                    begincontract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
                    endcontract: [{required: true, message: '请输入合同结束日期', trigger: 'blur'}],
                    workage: [{required: true, message: '请输入工龄', trigger: 'blur'}],
                },
                showAdvanceSearchView: false,
            }
        },
        mounted(){
            this.initEmps();
            this.initData();
            this.initPositions();
        },
        methods:{
            deleteEmp(data){
                this.$confirm('此操作将永久删除【' + data.name + '】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/emp/basic/"+data.id).then(result => {
                        if(result){
                            this.initEmps();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                
            },
            doAddEmp(){
                this.$refs['empForm'].validate(valid=>{
                    if(valid){
                        this.postRequest("/emp/basic/",this.emp).then(result => {
                            console.log(this.emp);
                            if(result){
                                this.dialogVisible = false;
                                this.initEmps();
                            }
                        });
                    }
                })
            },
            handleNodeClick(data){
                this.inputDepName = data.name;
                this.emp.departmentid = data.id;
                this.popVisible = !this.popVisible;
            },
            showDepView(){
                this.popVisible = !this.popVisible;
            },
            getMaxWordID(){
                this.getRequest("/emp/basic/MaxWorkId").then(result => {
                    if(result){
                        this.emp.workid = result.object;
                    }
                });
            },
            initPositions(){
                this.getRequest("/emp/basic/positions").then(result => {
                    if(result){
                        this.positions = result;
                    }
                });
            },
            initData(){
                if (!window.sessionStorage.getItem("nations")){
                    this.getRequest("/emp/basic/nations").then(result => {
                        if(result){
                            this.nations = result;
                            window.sessionStorage.setItem("nations", JSON.stringify(result));
                        }
                    })
                }else {
                    this.nations = JSON.parse(window.sessionStorage.getItem("nations"));
                }
                if (!window.sessionStorage.getItem("politicsstatus")){
                    this.getRequest("/emp/basic/politic").then(result => {
                        if(result){
                            this.politicsstatus = result;
                            window.sessionStorage.setItem("politicsstatus", JSON.stringify(result));
                        }
                    })
                }else {
                    this.politicsstatus = JSON.parse(window.sessionStorage.getItem("politicsstatus"));
                }
                if (!window.sessionStorage.getItem("joblevels")){
                    this.getRequest("/emp/basic/jobLevels").then(result => {
                        if(result){
                            this.joblevels = result;
                            window.sessionStorage.setItem("joblevels", JSON.stringify(result));
                        }
                    })
                }else {
                    this.joblevels = JSON.parse(window.sessionStorage.getItem("joblevels"));
                }
                if (!window.sessionStorage.getItem("deps")) {
                    this.getRequest('/emp/basic/department').then(resp => {
                        if (resp) {
                            this.allDeps = resp;
                            window.sessionStorage.setItem("deps", JSON.stringify(resp));
                        }
                    })
                } else {
                    this.allDeps = JSON.parse(window.sessionStorage.getItem("deps"));
                }
            },
            showAddEmpView(){
                this.dialogVisible = true;
                this.getMaxWordID();
            },
            currentChange(currentPage){
                this.page = currentPage;
                this.initEmps();
            },
            sizeChange(currentSize){
                this.size = currentSize;
                this.initEmps();
            },
            initEmps(){
                this.loading = true;
                this.getRequest("/emp/basic/?page="+this.page+"&size="+this.size+"&keywords="+this.keywords)
                    .then(result => {
                    if(result){
                        this.loading = false;
                        //result里面是封装了data和total的，所以不能直接=result
                        this.emps = result.data;
                        this.total = result.total;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>