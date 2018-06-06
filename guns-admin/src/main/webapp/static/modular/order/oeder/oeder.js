/**
 * 订单管理管理初始化
 */
var Oeder = {
    id: "OederTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Oeder.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '主键ID', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '用户', field: 'user', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'createtime', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Oeder.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Oeder.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加订单管理
 */
Oeder.openAddOeder = function () {
    var index = layer.open({
        type: 2,
        title: '添加订单管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/oeder/oeder_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看订单管理详情
 */
Oeder.openOederDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '订单管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/oeder/oeder_update/' + Oeder.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除订单管理
 */
Oeder.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/oeder/delete", function (data) {
            Feng.success("删除成功!");
            Oeder.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("oederId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询订单管理列表
 */
Oeder.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Oeder.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Oeder.initColumn();
    var table = new BSTable(Oeder.id, "/oeder/list", defaultColunms);
    table.setPaginationType("client");
    Oeder.table = table.init();
});
