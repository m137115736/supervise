<template>
	<div class="sceneFirst">
		<div class="sceneFirstScreen">
			<div>条件筛选:</div>
			<div class="sceneFirstScreenInner">
				<Form :model="sF_ScreenData" label-position="right" :label-width="100" inline ref="sF_ScreenData">
					<FormItem label="起止时间:">
						<DatePicker type="date" placeholder="起始时间" v-model="sF_ScreenData.startDate" format="yyyy-MM-dd"
							@on-change="sF_ScreenData.startDate=$event" />
						<span class="screenLine">-</span>
						<DatePicker type="date" placeholder="结束时间" v-model="sF_ScreenData.overDate" format="yyyy-MM-dd"
							@on-change="sF_ScreenData.overDate=$event" />
					</FormItem>
					<FormItem label="电压等级:">
						<Select v-model="sF_ScreenData.kv" placeholder="选择电压等级" style="width: 200px;">
							<Option value="500kV">500kV</Option>
							<Option value="880kV">880kV</Option>
							<Option value="1000kV">1000kV</Option>
						</Select>
					</FormItem>
					<FormItem label="关键词:">
						<Input v-model="sF_ScreenData.keyWord" placeholder="搜索关键字"></Input>
					</FormItem>
					<FormItem :label-width="0">
						<Button type="primary" icon="ios-search" @click="sF_FindTable">查询</Button>
					</FormItem>
					<FormItem :label-width="0">
						<Button type="primary" icon="ios-sync" ghost @click="sF_ScreenReset('sF_ScreenData')">重置</Button>
					</FormItem>
				</Form>
			</div>
		</div>
		<div class="sceneFirstTable">
			<div class="sceneFirstTableBtn">
				<Button type="primary" custom-icon="iconfont icon-xinzeng" @click="sF_TableAdd">新建任务</Button>
				<Button type="primary" icon="ios-create-outline" @click="sF_TableAction('edit')">编辑</Button>
				<Button type="warning" custom-icon="iconfont icon-shanchu" @click="sF_TableAction('del')">删除</Button>
				<Button type="primary" custom-icon="iconfont icon-baogao" @click="sF_TableAction('word')">生成报告</Button>
			</div>
			<Table ref="sF_Table" :columns="sF_TableHeard" :data="sF_TableData" stripe :loading="tableLoadding">
				<template slot-scope="{ row, index }" slot="rwState">
					<span v-if="row.d10=='1'" style="color:#4b85fa">已发布</span>
					<span v-else style="color: #dbdbdb;">待发布</span>
				</template>
				<template slot-scope="{ row, index }" slot="action">
					<Button type="error" size="small">预(告)警单</Button>
				</template>
			</Table>
		</div>
		<div class="sceneFirstPage">
			<Page :total="pageData.totalNum" :page-size="10" show-elevator show-total @on-change="tablePageChange"/>
		</div>
		<Modal v-model="sF_Modal">
			<p slot="header" style="color:#4b85fa;background: #f5f7fa;">
				<span>{{sF_ModalTitle}}</span>
			</p>
			<Form ref="sF_FromData" label-position="top" :model="sF_FromData" :rules="sF_FromRule">
				<FormItem label="任务名称:" prop="gcmc">
					<Input v-model="sF_FromData.gcmc" placeholder="请输入项目名称"></Input>
				</FormItem>
				<FormItem label="督查时间:" prop="updateTime">
					<DatePicker type="date" placeholder="请选择督查时间" style="width: 100%;" v-model="sF_FromData.updateTime" format="yyyy-MM-dd"
							@on-change="sF_FromData.updateTime=$event">
					</DatePicker>
				</FormItem>
				<FormItem label="专家名单:">
					<Select placeholder="请选择督查专家" @on-change="changeExpert" label-in-value>
						<Option v-for="item in expert" :value="item.id" :label="item.name" :key="item.id">
							<span>{{item.name}}</span>
							<span style="float:right;color:#ccc">{{item.major}}</span>
						</Option>
					</Select>
				</FormItem>
				<div class="addFromExpert">
					<Tag v-for="i in expertList" :key="i.value" :name="i.label" closable @on-close="tagClose">
						{{ i.label }}
					</Tag>
				</div>
				<Row :gutter="16">
					<Col span="12">
					<FormItem label="运行单位:" prop="yxdw">
						<Input v-model="sF_FromData.yxdw" placeholder="请填写"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="建管单位:" prop="jgdw">
						<Input v-model="sF_FromData.jgdw" placeholder="请填写"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="设计单位:" prop="sjdw">
						<Input v-model="sF_FromData.sjdw" placeholder="请填写"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="施工单位:" prop="sgdw">
						<Input v-model="sF_FromData.sgdw" placeholder="请填写"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="管理单位:" prop="gldw">
						<Input v-model="sF_FromData.gldw" placeholder="请填写"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="物资供应单位:" prop="wzgydw">
						<Input v-model="sF_FromData.wzgydw" placeholder="请填写"></Input>
					</FormItem>
					</Col>
				</Row>
			</Form>
			<div slot="footer" style="text-align: center;">
				<Button type="primary" ghost custom-icon="iconfont icon-166991" @click="sF_FromSave">保存</Button>
				<Button type="primary" icon="ios-paper-plane-outline" @click="sF_FromSub('sF_FromData')">发布</Button>
				<Button custom-icon="iconfont icon-chehui" v-if="chBtn">撤回</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				chBtn: false,
				sF_ModalTitle: '',
				expertList: [{
					label: '吴天源',
					value: '0'
				}],
				tableLoadding: false,
				pageData: {
					pageNow: 1,
					pageSize: 10,
					totalNum: 100
				},
				expert: [{
					name: '张三',
					major: 'XXXX专业',
					id: '1'
				}, {
					name: '李四',
					major: 'XXXX专业',
					id: '2'
				}, {
					name: '王五',
					major: 'XXXX专业',
					id: '3'
				}],
				sF_Modal: false,
				sF_ScreenData: {
					kv: '',
					keyWord: '',
					startDate: '',
					overDate: ''
				},
				sF_FromData: {
					gcmc: '',
					updateTime: '',
					yxdw: '',
					jgdw: '',
					sjdw: '',
					sgdw: '',
					gldw: '',
					wzgydw: ''
				},
				sF_FromRule: {
					gcmc: [{
						required: true,
						message: '请输入项目名称',
						trigger: 'blur'
					}],
					updateTime: [{
						required: true,
						type: 'date',
						message: '请选择任务督察时间',
						trigger: 'change'
					}],
					yxdw: [{
						required: true,
						message: '请输入运行单位名称',
						trigger: 'blur'
					}],
					jgdw: [{
						required: true,
						message: '请输入建管单位名称',
						trigger: 'blur'
					}],
					sjdw: [{
						required: true,
						message: '请输入设计单位名称',
						trigger: 'blur'
					}],
					gldw: [{
						required: true,
						message: '请输入管理单位名称',
						trigger: 'blur'
					}],
					sgdw: [{
						required: true,
						message: '请输入施工单位名称',
						trigger: 'blur'
					}],
					wzgydw: [{
						required: true,
						message: '请输入物资供应单位名称',
						trigger: 'blur'
					}],
				},
				sF_TableHeard: [{
						title: '请选择',
						align: 'center',
						key: 'checkBox',
						width: 80,
						render: (h, params) => {
							var _this = this;
							return h('div', [
								h('Checkbox', {
									props: {
										value: params.row.checkBox
									},
									on: {
										'on-change': (e) => {
											if (e == false) {
												_this.disabled = true
											}
											_this.sF_TableData.forEach((items) => {
												_this.$set(items, 'checkBox', false)
											});
											_this.sF_TableData[params.index].checkBox = e;
										}
									}
								})
							])
						}
					}, {
						type: 'index',
						width: 60,
						align: 'center'
					},
					{
						title: '任务名称',
						key: 'gcmc',
						width: 200,
					},
					{
						title: '督查时间',
						key: 'updateTime'
					},
					{
						title: '任务状态',
						slot: 'rwState',
					},
					{
						title: '专家名单',
						key: 'userName'
					},
					{
						title: '运行单位',
						key: 'yxdw'
					},
					{
						title: '建管单位',
						key: 'jgdw'
					},
					{
						title: '设计单位',
						key: 'sjdw'
					},
					{
						title: '施工单位',
						key: 'sgdw'
					},
					{
						title: '管理单位',
						key: 'gldw'
					},
					{
						title: '物资供应单位',
						key: 'wzgydw'
					}
				],
				sF_TableData: []
			}

		},
		methods: {
			tablePageChange(e){
				this.pageData.pageNow = e;
				this.sD_getTableData();
			},
			// 查询督查table
			sF_FindTable() {
				this.pageData.pageNow = 1;
				this.sF_getTableData();
			},
			// 筛选清空
			sF_ScreenReset(name){
				this.$refs[name].resetFields();
			},
			sF_getTableData() {
				this.tableLoadding = true;
				let getParam = {
					startTime: this.sF_ScreenData.startDate,
					endTime: this.sF_ScreenData.overDate,
					dydj: this.sF_ScreenData.kv,
					name: this.sF_ScreenData.keyWord,
					page: this.pageData.pageNow,
					rows: 10,
				};
				this.$get('getGcRws', getParam)
					.then((res) => {
						if (res.code != '200') {
							this.tableLoadding = false;
							this.errMsg(res.message);
						} else {
							this.sF_TableData = res.data.rows;
							this.pageData.totalNum = res.data.total;
							setTimeout(() => {
								this.tableLoadding = false;
							}, 2000);
						}
					})
			},
			
			// 新建任务
			sF_TableAdd() {
				this.sF_ModalTitle = '新建';
				this.sF_FromData = {
					gcmc: '',
					updateTime: '',
					yxdw: '',
					jgdw: '',
					sjdw: '',
					sgdw: '',
					gldw: '',
					wzgydw: ''
				};
				this.expertList = [];
				this.sF_Modal = true;
			},
			// 编辑任务
			sF_TableAction(type) {
				let sTD = this.sF_TableData;
				var c;
				for (var i = 0; i < sTD.length; i++) {
					if (sTD[i].checkBox) {
						c = sTD[i]
					}
				}
				if (c == undefined) {
					this.errMsg('请先选择项目')
				} else {
					if (type == 'edit') {
						this.sF_FromData = c;
						if (c.rwState == 1) {
							this.chBtn = true;
						}
						var stringResult = c.userName.split('、');
						let f = []
						for (var i = 0; i < stringResult.length; i++) {
							let n = {
								label: stringResult[i],
								value: i
							}
							f.push(n)
						}
						this.expertList = f;
						this.sF_ModalTitle = '编辑';
						this.sF_Modal = true;
					} else if (type == 'del') {
						this.$Modal.confirm({
							title: '删除',
							content: '删除后不可恢复，是否确定删除？',
							onOk: () => {
								this.$Message.info('删除成功');
							},
							onCancel: () => {
								this.$Message.info('取消删除');
							}
						});
					} else if (type == 'word') {
						const msg = this.$Message.loading({
							content: '报告生成中...',
							duration: 0
						});
						setTimeout(msg, 3000);
					}

				}

			},
			// 选择专家
			// value(专家item)
			changeExpert(value) {
				this.expertList.push(value)
			},
			// 标签删除
			// name（标签名称）
			tagClose(event, name) {
				const index = this.expertList.indexOf(name);
				this.expertList.splice(index, 1);
			},
			// 任务保存
			sF_FromSave() {
				this.successMsg('保存成功!')
				this.sF_Modal = false;
				// console.log(this.sF_FromData)
			},
			// 任务提交
			// fromName（表单ref）
			sF_FromSub(fromName) {
				var _this = this;
				_this.$refs[fromName].validate((valid) => {
					if (valid) {
						var addData = _this.sF_FromData;
						_this.$post('addGcRw', addData)
							.then((res) => {
								if (res.code != 200) {
									_this.$Message.error(res.message);
								} else {
									_this.successMsg('保存成功!');
									_this.sF_Modal = false;
								}
							})
						
					} else {
						_this.errMsg('必填项不可为空!')
					}
				})
			},
			// 成功消息提示
			// title（提示文字）
			successMsg(title) {
				this.$Message.success(title)
			},
			// 失败消息提示
			// err（提示文字）
			errMsg(err) {
				this.$Message.error(err)
			},
		},
		mounted() {
			this.sF_getTableData()
		}
	}
</script>

<style>
	.screenLine {
		margin-left: 10px;
		margin-right: 10px;
	}

	.sceneFirstScreenInner {
		background-color: #fafafa;
		border: 1px solid #dce0e6;
	}

	.sceneFirstScreenInner .ivu-form-item {
		margin-top: 15px;
		margin-bottom: 15px;
	}

	.sceneFirstTable {
		margin-top: 20px;
	}

	.sceneFirstTableBtn {
		margin-bottom: 20px;
	}

	.sceneFirstTableBtn button {
		margin-right: 10px;
	}

	.sceneFirstPage {
		margin-top: 50px;
		text-align: center;
	}

	.addFromExpert {
		width: 100%;
		min-height: 60px;
		border: 1px solid #dbdbdb;
		padding: 5px;
		margin-bottom: 16px;
	}
</style>
