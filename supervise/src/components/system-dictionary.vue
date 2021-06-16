<template>
	<div class="systemDictionary">
		<Breadcrumb>
			<BreadcrumbItem>系统设置</BreadcrumbItem>
			<BreadcrumbItem>数据字典</BreadcrumbItem>
		</Breadcrumb>
		<div class="systemDictionaryTable">
			<div class="systemDictionaryTableBtn">
				<Button type="primary" custom-icon="iconfont icon-xinzeng" @click="sD_TableAdd">新建字段</Button>
				<Button type="primary" icon="ios-create-outline" @click="sD_TableAction('edit')">编辑</Button>
				<Button type="warning" custom-icon="iconfont icon-shanchu" @click="sD_TableAction('del')">删除</Button>
			</div>
			<Table ref="sD_Table" :columns="sD_TableHeard" :data="sD_TableData" stripe :loading="tableLoadding">
				<template slot-scope="{ row, index }" slot="type">
					<span v-if="row.dt==0">字符</span>
					<span v-else-if="row.dt==1">整数</span>
					<span v-else-if="row.dt==2">小数</span>
					<span v-else-if="row.dt==3">时间</span>
				</template>
				<template slot-scope="{ row, index }" slot="isNull">
					<span v-if="row.attrNullval==0">是</span>
					<span v-else-if="row.attrNullval==1">否</span>
				</template>
				<template slot-scope="{ row, index }" slot="state">
					<span v-if="row.attrStatus==0">可编辑</span>
					<span v-else-if="row.attrStatus==1">不可编辑</span>
				</template>
			</Table>
		</div>
		<div class="sceneFirstPage">
			<Page :total="sD_PageData.totalNum" :page-size="10" show-elevator show-total @on-change="tablePageChange"/>
		</div>
		<Modal v-model="sD_Modal">
			<p slot="header" style="color:#4b85fa;background: #f5f7fa;">
				<span>{{sD_ModalTitle}}</span>
			</p>
			<Form ref="sD_FromData" :model="sD_FromData" :rules="sD_FromRule" :label-width="80">
				<FormItem label="中文名称" prop="attrName">
					<Input v-model="sD_FromData.attrName" placeholder="输入字段中文名"></Input>
				</FormItem>
				<FormItem label="英文名称" prop="attrColname">
					<Input v-model="sD_FromData.attrColname" placeholder="输入字段英文名"></Input>
				</FormItem>
				<FormItem label="字段类型" prop="dt">
					<Select v-model="sD_FromData.dt" placeholder="选择字段类型">
						<Option value="1">字符</Option>
						<Option value="2">整数</Option>
						<Option value="3">小数</Option>
						<Option value="3">时间</Option>
					</Select>
				</FormItem>
				<FormItem label="数据长度" prop="attrSize">
					<Input v-model="sD_FromData.attrSize" placeholder="输入数据长度"></Input>
				</FormItem>
				<FormItem label="是否为空" prop="attrNullval">
					<Select v-model="sD_FromData.attrNullval" placeholder="是否为空">
						<Option value="1">是</Option>
						<Option value="2">否</Option>
					</Select>
				</FormItem>
				<FormItem label="默认值" prop="attrInitval">
					<Input v-model="sD_FromData.attrInitval" placeholder="输入数据长度"></Input>
				</FormItem>
				<FormItem label="字段状态" prop="attrStatus">
					<Select v-model="sD_FromData.attrStatus" placeholder="选择字段状态">
						<Option value="1">可编辑</Option>
						<Option value="2">不可编辑</Option>
					</Select>
				</FormItem>
			</Form>
			<div slot="footer" style="text-align: center;">
				<Button type="primary" ghost custom-icon="iconfont icon-166991"
					@click="sD_FromSub('sD_FromData')">保存</Button>
				<Button @click="sD_Modal=false" icon="md-close">取消</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableLoadding: false,
				sD_ModalTitle: '',
				sD_Modal: false,
				sD_FromData: {
					attrName: '',
					attrColname: '',
					dt: '',
					attrSize: '',
					attrNullval: '',
					attrInitval: '',
					attrStatus: '',
				},
				sD_PageData: {
					pageNow: '',
					pageSize: 10,
					totalNum: 100
				},
				sD_FromRule: {
					attrName: [{
						required: true,
						message: '请输入字段中文名称',
						trigger: 'blur'
					}],
					attrColname: [{
						required: true,
						message: '请输入字段英文名称',
						trigger: 'blur'
					}],
					dt: [{
						required: true,
						message: '请选择字段类型',
						trigger: 'change'
					}],
					attrSize: [{
						required: true,
						message: '请输入数据长度',
						trigger: 'blur'
					}],
					attrNullval: [{
						required: true,
						message: '请选择是否可为空',
						trigger: 'change'
					}],
					attrInitval: [{
						required: true,
						message: '请输入默认值',
						trigger: 'blur'
					}],
					attrStatus: [{
						required: true,
						message: '请选择字段状态',
						trigger: 'change'
					}],
				},
				sD_TableHeard: [{
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
										_this.sD_TableData.forEach((items) => {
											_this.$set(items, 'checkBox', false)
										});
										_this.sD_TableData[params.index].checkBox = e;
									}
								}
							})
						])
					}
				}, {
					type: 'index',
					width: 60,
					align: 'center'
				}, {
					title: 'Id',
					key: 'id',
				}, {
					title: '中文名称',
					key: 'attrName'
				}, {
					title: '英文名称',
					key: 'attrColname'
				}, {
					title: '类型',
					slot: 'type',
				}, {
					title: '长度',
					key: 'd5'
				}, {
					title: '是否为空',
					slot: 'isNull',
				}, {
					title: '默认值',
					key: 'd7'
				}, {
					title: '状态',
					slot: 'state'
				}, {
					title: '创建时间',
					key: 'd9'
				}],
				sD_TableData: []
			}

		},
		methods: {
			tablePageChange(e){
				this.sD_PageData.pageNow = e;
				this.sD_getTableData();
			},
			// 查询字典Table
			sD_getTableData() {
				this.tableLoadding = true;
				let getParam = {
					page: this.sD_PageData.pageNow,
					rows: 10,
				};
				this.$get('getAttrs', getParam)
					.then((res) => {
						if (res.code != '200') {
							this.tableLoadding = false;
							this.errMsg(res.message);
						} else {
							this.sD_TableData = res.data.rows;
							this.sD_PageData.totalNum = res.data.total;
							setTimeout(() => {
								this.tableLoadding = false;
							}, 2000);
						}
					})
			},
			// 新建任务
			sD_TableAdd() {
				this.sD_ModalTitle = '新建';
				this.sD_Modal = true;
			},
			// 编辑任务
			sD_TableAction(type) {
				let sTD = this.sD_TableData;
				var c;
				for (var i = 0; i < sTD.length; i++) {
					if (sTD[i].checkBox) {
						c = sTD[i]
					}
				}
				if (c == undefined) {
					this.errMsg('请先选择字段')
				} else {
					if (type == 'edit') {
						this.sD_ModalTitle = '编辑';
						this.sD_Modal = true;
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

			// 任务保存
			sD_FromSave() {
				this.successMsg('保存成功!')
				this.sD_Modal = false;
			},
			// 任务提交
			// fromName（表单ref）
			sD_FromSub(fromName) {
				var _this = this;
				this.$refs[fromName].validate((valid) => {
					if (valid) {
						_this.$post('addAttr', _this.sD_FromData)
							.then((res) => {
								if (res.code != 200) {
									_this.$Message.error(res.message);
								} else {
									_this.successMsg('保存成功!');
									_this.sF_Modal = false;
								}
							})
						this.successMsg('提交成功!')
						this.sD_Modal = false;
					} else {
						this.errMsg('必填项不可为空!')
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
			this.sD_getTableData()
		}
	}
</script>

<style>
	.screenLine {
		margin-left: 10px;
		margin-right: 10px;
	}

	.systemDictionaryScreenInner {
		background-color: #fafafa;
		border: 1px solid #dce0e6;
	}

	.systemDictionaryScreenInner .ivu-form-item {
		margin-top: 15px;
		margin-bottom: 15px;
	}

	.systemDictionaryTable {
		margin-top: 20px;
	}

	.systemDictionaryTableBtn {
		margin-bottom: 20px;
	}

	.systemDictionaryTableBtn button {
		margin-right: 10px;
	}

	.systemDictionaryPage {
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
