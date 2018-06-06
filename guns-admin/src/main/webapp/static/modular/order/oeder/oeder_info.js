/**
 * 初始化订单管理详情对话框
 */
var OederInfoDlg = {
    oederInfoData : {}
};

/**
 * 清除数据
 */
OederInfoDlg.clearData = function() {
    this.oederInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
OederInfoDlg.set = function(key, val) {
    this.oederInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
OederInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
OederInfoDlg.close = function() {
    parent.layer.close(window.parent.Oeder.layerIndex);
}

/**
 * 收集数据
 */
OederInfoDlg.collectData = function() {
    this
    .set('id')
    .set('user')
    .set('createtime');
}

/**
 * 提交添加
 */
OederInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/oeder/add", function(data){
        Feng.success("添加成功!");
        window.parent.Oeder.table.refresh();
        OederInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.oederInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
OederInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/oeder/update", function(data){
        Feng.success("修改成功!");
        window.parent.Oeder.table.refresh();
        OederInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.oederInfoData);
    ajax.start();
}

$(function() {

});
