$(function () {

  "use strict";

  // 可拖动
  $(".ui-draggable").draggable({
    handle: ".ui-draggable-handler",
    connectToSortable: ".connectedSortable",
    helper: function(event) {
      // 克隆出item
      var item = $(this).children('.hide').clone();
      item.removeClass('hide');
      return item;
    },
    zIndex: 999999,
    stop: function(t, e) {
      e.helper.removeAttr("style");
      initConnectedSortable();
    },
  });

  // 初始化排序功能
  var initConnectedSortable = function() {
    $(".connectedSortable").sortable({
        placeholder: "sort-highlight",
        connectWith: ".connectedSortable",
        handle: ".box-header, .nav-tabs",
        forcePlaceholderSize: true,
        zIndex: 999999
      });
    $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");
  }

  // 输出HTML页
  $('#view-html').click(function() {
    var factory = $('.factory').clone();
    var layouts = factory.children('.box');
    var result = $('<div></div>');
    layouts.each(function(index, element) {
      if ($(this).css('display') != 'none') {
        // var layout = getLayoutFromBox($(this));
        var layout = get_item($(this));
        result.append(layout);
      }
    });
    // 初始化剪贴板功能插件，在复制生成的源码里使用
    new Clipboard('.btn');
    $('#code-board').text(result.html());
    $('#final-html').modal('toggle');
  });

  // 显示预览
  $('#view-page').click(function() {
    var factory = $('.factory').clone();
    var layouts = factory.children('.box');
    var result = $('<div></div>');
    layouts.each(function(index, element) {
      if ($(this).css('display') != 'none') {
        var layout = get_item($(this));
        result.append(layout);
      }
    });
    $('#page-board').html(result.html());
    $('#final-page').modal('toggle');
  });

  /**
   * 打包子节点
   * 一个root_node只会有一个item
   *
   * @param  {Array} root
   * @return {Array}
   */
  var get_item = function(root_node) {
    var item = root_node.clone();

    if (is_item(root_node)) {
      item = root_node.children('.box-body').first().children().first().clone();
    } else {
      return item;
    }

    if (is_layout(item)) {
      // 如果是Row，一列一行地拼接控件
      item = get_layout(item);
    }

    return item;
  }

  /**
   * 判断指定item是否为item
   * @param  {Array}  item
   * @return {Boolean}
   */
  var is_item = function(item) {
    if (item.children('.ui-sortable-handle')) {
      return true;
    }
    return false;
  }

  /**
   * 判断指定item是否为layout
   * @param  {Array}  item
   * @return {Boolean}
   */
  var is_layout = function(item) {
    if (item.hasClass('row')) {
      return true;
    }
    return false;
  }

  /**
   * 打包layout
   * @param  {Array} layout
   * @return {Array}
   */
  var get_layout = function(layout) {
    if (!is_layout(layout)) {
      return layout;
    }

    var row = layout.clone();
    var columns = row.children().clone();
    row.empty();

    $.each(columns, function(column_index, value) {
      var column = $(this);
      column.addClass($(value).attr('class'));
      var children = $(value).children();
      column.empty();
      $.each(children, function(index, element) {
        var node = $(element).clone();
        var item = get_item(node);
        column.append(item);
      });
      row.append(column);
    });

    return row;
  }

});