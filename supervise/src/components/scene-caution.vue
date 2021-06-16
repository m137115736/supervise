<template>
	<div class="sceneFirst">
		<div class="sceneFirstTable">
			<!-- <div class="sceneFirstTableBtn">
				<Button type="primary" custom-icon="iconfont icon-xinzeng" @click="sF_TableAdd">新建任务</Button>
				<Button type="primary" icon="ios-create-outline" @click="sF_TableAction('edit')">编辑</Button>
				<Button type="warning" custom-icon="iconfont icon-shanchu" @click="sF_TableAction('del')">删除</Button>
				<Button type="primary" custom-icon="iconfont icon-baogao" @click="sF_TableAction('word')">生成报告</Button>
			</div> -->
			<Table ref="sF_Table" :columns="sF_TableHeard" :data="sF_TableData" stripe>
				<template slot-scope="{ row, index }" slot="rwState">
					<span v-if="row.d10=='1'" style="color:#4b85fa">已发布</span>
					<span v-else style="color: #dbdbdb;">待发布</span>
				</template>
				<template slot-scope="{ row, index }" slot="action">
					<Button type="error" size="small">预(告)警单</Button>
				</template>
			</Table>
		</div>
		<!-- <div class="sceneFirstPage">
			<Page :total="100" show-elevator show-total />
		</div> -->
		<Modal v-model="sF_Modal">
			<p slot="header" style="color:#4b85fa;background: #f5f7fa;">
				<span>{{sF_ModalTitle}}</span>
			</p>
			<Form ref="sF_FromData" label-position="top" :model="sF_FromData" :rules="sF_FromRule">
				<FormItem label="任务名称:" prop="rwName">
					<Input v-model="sF_FromData.rwName" placeholder="请输入项目名称"></Input>
				</FormItem>
				<FormItem label="督查时间:" prop="rwDate">
					<DatePicker type="date" placeholder="请选择督查时间" style="width: 100%;" v-model="sF_FromData.rwDate">
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
					<FormItem label="运行单位:" prop="yxCompany">
						<Input v-model="sF_FromData.yxCompany" placeholder="请填写"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="建管单位:" prop="jgCompany">
						<Input v-model="sF_FromData.jgCompany" placeholder="请填写"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="设计单位:" prop="sjCompany">
						<Input v-model="sF_FromData.sjCompany" placeholder="请填写"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="施工单位:" prop="sgCompany">
						<Input v-model="sF_FromData.sgCompany" placeholder="请填写"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="管理单位:" prop="glCompany">
						<Input v-model="sF_FromData.glCompany" placeholder="请填写"></Input>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="物资供应单位:" prop="wzCompany">
						<Input v-model="sF_FromData.wzCompany" placeholder="请填写"></Input>
					</FormItem>
					</Col>
				</Row>
			</Form>
			<div slot="footer" style="text-align: center;">
				<Button type="primary" ghost custom-icon="iconfont icon-166991" @click="sF_FromSave">保存</Button>
				<Button type="primary" icon="ios-paper-plane-outline" @click="sF_FromSub('sF_FromData')">发布</Button>
				<Button custom-icon="iconfont icon-chehui">撤回</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sF_ModalTitle: '',
				sF_Modal: false,
				sF_FromData: {
					rwName: '',
					rwDate: '',
					yxCompany: '',
					jgCompany: '',
					sjCompany: '',
					sgCompany: '',
					glCompany: '',
					wzCompany: ''
				},
				sF_FromRule: {
					rwName: [{
						required: true,
						message: '请输入项目名称',
						trigger: 'blur'
					}],
					rwDate: [{
						required: true,
						type: 'date',
						message: '请选择任务督察时间',
						trigger: 'change'
					}],
					yxCompany: [{
						required: true,
						message: '请输入运行单位名称',
						trigger: 'blur'
					}],
					jgCompany: [{
						required: true,
						message: '请输入建管单位名称',
						trigger: 'blur'
					}],
					sjCompany: [{
						required: true,
						message: '请输入设计单位名称',
						trigger: 'blur'
					}],
					glCompany: [{
						required: true,
						message: '请输入管理单位名称',
						trigger: 'blur'
					}],
					sgCompany: [{
						required: true,
						message: '请输入施工单位名称',
						trigger: 'blur'
					}],
					wzCompany: [{
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
						align: 'center'
					},
					{
						title: '编号',
						key: 'd1',
						width: 180,
					},
					{
						title: '问题描述',
						key: 'd2',
						width: 300,
					},
					{
						title: '类型',
						key: 'd3'
					},
					{
						title: '要求反馈时间',
						key: 'd4',
						width: 150,
					},
					{
						title: '实际反馈时间',
						key: 'd5',
						width: 150,
					},
					{
						title: '整改时间',
						key: 'd6',
						width: 150,
					},
					{
						title: '整改记录',
						key: 'd7'
					},
					{
						title: '整改附件',
						key: 'd8',
						width: 150,
					},
					{
						title: '审核',
						key: 'd9'
					},
					{
						title: '审核意见',
						key: 'd10'
					}
				],
				sF_TableData: [{
					d1: '[预] 2021年05001 号',
					d2: '10千伏电容器端子间、端子与汇流母线间的连接均采用带绝缘护套的软铜线,但汇流母线采用铝排。',
					d3: '预警',
					d4: '2021-05-22 12:00',
					d5: '2021-05-22 12:30',
					d6: '2021-05-22 16:30',
					d7: '',
					d8: '重庆市南-新投10kV花园一回线送 出工程-震荡波试验（合格）.pdf',
					d9: '未审核',
					d10: ''
				}, {
					d1: '[预] 2021年05002 号',
					d2: '10千伏电容器端子间、端子与汇流母线间的连接均采用带绝缘护套的软铜线,但汇流母线采用铝排。',
					d3: '预警',
					d4: '2021-05-22 12:00',
					d5: '2021-05-22 12:30',
					d6: '2021-05-22 16:30',
					d7: '',
					d8: '重庆市南-新投10kV花园一回线送 出工程-震荡波试验（合格）.pdf',
					d9: '未审核',
					d10: ''
				}]
			}

		},
		methods: {
			// 新建任务
			sF_TableAdd() {
				this.sF_ModalTitle = '新建';
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
				this.$refs[fromName].validate((valid) => {
					if (valid) {
						this.successMsg('提交成功!')
						this.sF_Modal = false;
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
