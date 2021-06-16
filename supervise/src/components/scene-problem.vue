<template>
	<div class="sceneProblem">
		<div class="sceneProblemTable">
			<div class="sceneProblemTableBtn">
				<!-- <Button type="primary" custom-icon="iconfont icon-xinzeng" @click="sP_TableAdd">新建</Button>
				<Button type="primary" icon="ios-create-outline" @click="sP_TableAction('edit')">编辑</Button>
				<Button type="warning" custom-icon="iconfont icon-shanchu" @click="sP_TableAction('del')">删除</Button>
				<Button type="primary" custom-icon="iconfont icon-tijiao" ghost
					@click="sP_TableAction('sub')">提交</Button>
				<Button type="primary" custom-icon="iconfont icon-chehui" ghost
					@click="sP_TableAction('back')">撤回</Button> -->
				<Button type="primary" icon="ios-paper-plane-outline" ghost
					@click="sP_TableAction('before')">发布预警单</Button>
				<Button type="primary" icon="ios-paper-plane-outline" ghost
					@click="sP_TableAction('tell')">发布告警单</Button>
			</div>
			<Table ref="currentRowTable" :columns="sP_TableHeard" :data="sP_TableData" stripe>

			</Table>
		</div>
		<div class="sceneProblemPage">
			<Page :total="100" show-elevator show-total />
		</div>
		<Modal v-model="sP_Modal">
			<p slot="header" style="color:#4b85fa;background: #f5f7fa;">
				<span>{{sP_ModalTitle}}</span>
			</p>
			<Form ref="sP_FromData" label-position="top" :model="sP_FromData" :rules="sP_FromRule">
				<FormItem label="任务名称:" prop="rwName">
					<Input v-model="sP_FromData.rwName" placeholder="请输入项目名称"></Input>
				</FormItem>
				<Row :gutter="16">
					<Col span="12">
					<FormItem label="督查阶段:" prop="yxCompany">
						<Select v-model="sP_FromData.yxCompany" style="width:100%" placeholder="选择督查阶段">
							<Option value="1">阶段一</Option>
							<Option value="2">阶段二</Option>
							<Option value="3">阶段三</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="12">
					<FormItem label="督查专业:" prop="jgCompany">
						<Select v-model="sP_FromData.yxCompany" style="width:100%" placeholder="选择督查专业">
							<Option value="1">专业1</Option>
							<Option value="2">专业2</Option>
							<Option value="3">专业3</Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<FormItem label="问题描述:" prop="wtms">
					<Input v-model="sP_FromData.wtms" type="textarea" :autosize="{minRows: 2,maxRows: 10}"
						placeholder="请输入问题描述"></Input>
				</FormItem>
				<FormItem label="违反细则:" prop="wfxz">
					<Cascader :data="data1" v-model="sP_FromData.wfxz"></Cascader>
				</FormItem>
				<FormItem label="整改意见:" prop="zgyj">
					<Input v-model="sP_FromData.zgyj" type="textarea" :autosize="{minRows: 2,maxRows: 10}"
						placeholder="请输入整改意见"></Input>
				</FormItem>
				<FormItem label="附件:">
					<div class="demo-upload-list" v-for="item in uploadList">
						<template v-if="item.status === 'finished'">
							<img :src="item.url">
							<div class="demo-upload-list-cover">
								<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
								<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
							</div>
						</template>
						<template v-else>
							<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
						</template>
					</div>
					<Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList"
						:on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048"
						:on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize"
						:before-upload="handleBeforeUpload" multiple type="drag"
						action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;width:58px;">
						<div style="width: 58px;height:58px;line-height: 58px;">
							<Icon type="ios-camera" size="20"></Icon>
						</div>
					</Upload>
					<Modal title="附件查看" v-model="visible" :closable="false">
						<img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible"
							style="width: 100%">
					</Modal>
				</FormItem>
			</Form>
			<div slot="footer" style="text-align: center;">
				<Button type="primary" ghost icon="ios-search" @click="sP_FromSave">保存</Button>
				<Button type="primary" icon="ios-paper-plane-outline" @click="sP_FromSub('sP_FromData')">发布</Button>
			</div>
		</Modal>
		<Modal v-model="sP_AlarmModal" footer-hide>
			<p slot="header" style="color:#4b85fa;background: #f5f7fa;">
				<span>{{sP_AlarmModalTitle}}</span>
			</p>
			<Form :model="sP_AlarmData" :label-width="100">
				<FormItem label="编号:">
					<span>[预]2021年05001号</span>
				</FormItem>
				<FormItem label="问题描述:">
					 <Input v-model="sP_AlarmData.wtms" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="请输入问题描述"></Input>
				</FormItem>
				<FormItem label="附件:">
					<Button icon="md-add" type="primary" ghost>上传附件</Button>
					<Input v-model="sP_AlarmData.fj" clearable />
				</FormItem>
				<FormItem label="要求反馈时间:">
					<DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" style="width: 100%;"></DatePicker>
				</FormItem>
				<FormItem label="整改人:">
					<Input v-model="sP_AlarmData.zgr" placeholder="请填写" />
				</FormItem>
				<FormItem >
					<Button type="primary" icon="ios-paper-plane-outline">下发</Button>
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sP_AlarmModal: false,
				sP_AlarmModalTitle: '',
				sP_AlarmData: {
					bh:'',
					wtms: '10千伏电容器端子间、端子与汇流母线间的连接均采用带绝缘护套的软铜线,但汇流母线采用铝排。',
					yqfksj: '',
					zgr: '',
					fj:'技术监督工作预警单--[预]2021年05001号.docx'
				},
				defaultList: [{
						'name': 'a42bdcc1178e62b4694c830f028db5c0',
						'url': 'https://img-pre.ivsky.com/img/tupian/pre/202012/08/fengche-007.jpg'
					},
					{
						'name': 'bc7521e033abdd1e92222d733590f104',
						'url': 'https://img-pre.ivsky.com/img/tupian/pre/202012/08/fengche-007.jpg'
					}
				],
				imgName: '',
				visible: false,
				uploadList: [],
				data1: [{
					value: '01',
					label: '变压器全过程技术监督精益化管理实施细则',
					children: [{
						value: '0101',
						label: '规划可研阶段',
						children: [{
							value: '010101',
							label: '电气设备性能'
						}, {
							value: '010102',
							label: '电测'
						}]
					}, {
						value: '0102',
						label: '工程设计阶段'
					}, {
						value: '0103',
						label: '设备采购阶段'
					}]
				}, {
					value: '02',
					label: '电压互感器全过程技术监督精益化管理实施细则',

				}],
				sP_ModalTitle: '',
				expertList: [{
					label: '吴天源',
					value: '0'
				}],
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
				sP_Modal: false,
				sP_FromData: {
					rwName: '',
					rwDate: '',
					yxCompany: '',
					jgCompany: '',
					sjCompany: '',
					sgCompany: '',
					glCompany: '',
					wzCompany: '',
					wtms: '',
					wfxz: [],
					zgyj: ''
				},
				sP_FromRule: {
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
				sP_TableHeard: [{
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
											_this.sP_TableData.forEach((items) => {
												_this.$set(items, 'checkBox', false)
											});
											_this.sP_TableData[params.index].checkBox = e;
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
						title: '任务名称',
						key: 'd1',
						width: 220,
					}, {
						title: '督查阶段',
						key: 'd2'
					}, {
						title: '督查专业',
						key: 'd3'
					}, {
						title: '问题描述',
						key: 'd4',
						width: 300,
					}, {
						title: '违反细则',
						key: 'd5',
						width: 300,
						tooltip: true,
						tooltipTheme: 'light'
					}, {
						title: '整改意见',
						key: 'd6',
						width: 300,
					}, {
						title: '附件',
						key: 'd7'
					},

				],
				sP_TableData: [{
					d1: '重庆市南-新投10kV花园一回线送出工程-震荡波试验1',
					d2: '规划可研阶段',
					d3: '电气性能',
					d4: '10千伏电容器端子间、端子与汇流母线间的连接均采用带绝缘护套的软铜线,但汇流母线采用铝排。',
					d5: '国家电网有限公司十八项电网重大反事故措施（修订版）》（国家电网设',
					d6: '督促施工单位及供应商将110千伏电容器汇流母线更换为铜排。',
					d7: '附件1.png',
				}, {
					d1: '重庆市南-新投10kV花园一回线送出工程-震荡波试验2',
					d2: '规划可研阶段',
					d3: '电气性能',
					d4: '10千伏电容器端子间、端子与汇流母线间的连接均采用带绝缘护套的软铜线,但汇流母线采用铝排。',
					d5: '国家电网有限公司十八项电网重大反事故措施（修订版）》（国家电网设',
					d6: '督促施工单位及供应商将110千伏电容器汇流母线更换为铜排。',
					d7: '附件1.png',
				}, {
					d1: '重庆市南-新投10kV花园一回线送出工程-震荡波试验3',
					d2: '规划可研阶段',
					d3: '电气性能',
					d4: '10千伏电容器端子间、端子与汇流母线间的连接均采用带绝缘护套的软铜线,但汇流母线采用铝排。',
					d5: '国家电网有限公司十八项电网重大反事故措施（修订版）》（国家电网设',
					d6: '督促施工单位及供应商将110千伏电容器汇流母线更换为铜排。',
					d7: '附件1.png',
				}, {
					d1: '重庆市南-新投10kV花园一回线送出工程-震荡波试验4',
					d2: '规划可研阶段',
					d3: '电气性能',
					d4: '10千伏电容器端子间、端子与汇流母线间的连接均采用带绝缘护套的软铜线,但汇流母线采用铝排。',
					d5: '国家电网有限公司十八项电网重大反事故措施（修订版）》（国家电网设',
					d6: '督促施工单位及供应商将110千伏电容器汇流母线更换为铜排。',
					d7: '附件1.png',
				}, {
					d1: '重庆市南-新投10kV花园一回线送出工程-震荡波试验5',
					d2: '规划可研阶段',
					d3: '电气性能',
					d4: '10千伏电容器端子间、端子与汇流母线间的连接均采用带绝缘护套的软铜线,但汇流母线采用铝排。',
					d5: '国家电网有限公司十八项电网重大反事故措施（修订版）》（国家电网设',
					d6: '督促施工单位及供应商将110千伏电容器汇流母线更换为铜排。',
					d7: '附件1.png',
				}, {
					d1: '重庆市南-新投10kV花园一回线送出工程-震荡波试验',
					d2: '规划可研阶段',
					d3: '电气性能',
					d4: '10千伏电容器端子间、端子与汇流母线间的连接均采用带绝缘护套的软铜线,但汇流母线采用铝排。',
					d5: '国家电网有限公司十八项电网重大反事故措施（修订版）》（国家电网设',
					d6: '督促施工单位及供应商将110千伏电容器汇流母线更换为铜排。',
					d7: '附件1.png',
				}, {
					d1: '重庆市南-新投10kV花园一回线送出工程-震荡波试验',
					d2: '规划可研阶段',
					d3: '电气性能',
					d4: '10千伏电容器端子间、端子与汇流母线间的连接均采用带绝缘护套的软铜线,但汇流母线采用铝排。',
					d5: '国家电网有限公司十八项电网重大反事故措施（修订版）》（国家电网设',
					d6: '督促施工单位及供应商将110千伏电容器汇流母线更换为铜排。',
					d7: '附件1.png',
				}, {
					d1: '重庆市南-新投10kV花园一回线送出工程-震荡波试验',
					d2: '规划可研阶段',
					d3: '电气性能',
					d4: '10千伏电容器端子间、端子与汇流母线间的连接均采用带绝缘护套的软铜线,但汇流母线采用铝排。',
					d5: '国家电网有限公司十八项电网重大反事故措施（修订版）》（国家电网设',
					d6: '督促施工单位及供应商将110千伏电容器汇流母线更换为铜排。',
					d7: '附件1.png',
				}, {
					d1: '重庆市南-新投10kV花园一回线送出工程-震荡波试验',
					d2: '规划可研阶段',
					d3: '电气性能',
					d4: '10千伏电容器端子间、端子与汇流母线间的连接均采用带绝缘护套的软铜线,但汇流母线采用铝排。',
					d5: '国家电网有限公司十八项电网重大反事故措施（修订版）》（国家电网设',
					d6: '督促施工单位及供应商将110千伏电容器汇流母线更换为铜排。',
					d7: '附件1.png',
				}, {
					d1: '重庆市南-新投10kV花园一回线送出工程-震荡波试验',
					d2: '规划可研阶段',
					d3: '电气性能',
					d4: '10千伏电容器端子间、端子与汇流母线间的连接均采用带绝缘护套的软铜线,但汇流母线采用铝排。',
					d5: '国家电网有限公司十八项电网重大反事故措施（修订版）》（国家电网设',
					d6: '督促施工单位及供应商将110千伏电容器汇流母线更换为铜排。',
					d7: '附件1.png',
				}]
			}

		},
		methods: {
			// 新建任务
			sP_TableAdd() {
				this.sP_ModalTitle = '新建';
				this.sP_Modal = true;
			},
			// 编辑任务
			sP_TableAction(type) {
				let sTD = this.sP_TableData;
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
						this.sP_ModalTitle = '编辑';
						this.sP_Modal = true;
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
					} else if (type == 'before') {
						this.sP_AlarmModalTitle = '发布预警单';
						this.sP_AlarmModal = true;
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
			sP_FromSave() {
				this.successMsg('保存成功!')
				this.sP_Modal = false;
				// console.log(this.sP_FromData)
			},
			// 任务提交
			// fromName（表单ref）
			sP_FromSub(fromName) {
				this.$refs[fromName].validate((valid) => {
					if (valid) {
						this.successMsg('提交成功!')
						this.sP_Modal = false;
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
			handleView(name) {
				this.imgName = name;
				this.visible = true;
			},
			handleRemove(file) {
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
			},
			handleSuccess(res, file) {
				file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
				file.name = '7eb99afb9d5f317c912f08b5212fd69a';
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: 'The file format is incorrect',
					desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: 'Exceeding file size limit',
					desc: 'File  ' + file.name + ' is too large, no more than 2M.'
				});
			},
			handleBeforeUpload() {
				const check = this.uploadList.length < 5;
				if (!check) {
					this.$Notice.warning({
						title: 'Up to five pictures can be uploaded.'
					});
				}
				return check;
			}
		},
		mounted() {
			this.uploadList = this.$refs.upload.fileList;
		}
	}
</script>

<style>
	.demo-upload-list {
		display: inline-block;
		width: 60px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
		margin-right: 4px;
	}

	.demo-upload-list img {
		width: 100%;
		height: 100%;
	}

	.demo-upload-list-cover {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
	}

	.demo-upload-list:hover .demo-upload-list-cover {
		display: block;
	}

	.demo-upload-list-cover i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}

	.sceneProblemTable {
		margin-top: 20px;
	}

	.sceneProblemTableBtn {
		margin-bottom: 20px;
	}

	.sceneProblemTableBtn button {
		margin-right: 10px;
	}

	.sceneProblemPage {
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
