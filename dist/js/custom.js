$(function () {

  "use strict";

  // console.log('start!');

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
    // console.log('start make view html...');
    var factory = $('.factory').clone();
    var layouts = factory.children('.box');
    var result = $('<div></div>');
    layouts.each(function(index, element) {
      if ($(this).css('display') != 'none') {
        var layout = getLayoutFromBox($(this));
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
        var layout = getLayoutFromBox($(this));
        result.append(layout);
      }
    });
    $('#page-board').html(result.html());
    $('#final-page').modal('toggle');
  });


  /**
   * 从Box中获取布局
   * @param  {DOM} box
   * @return {Array}     布局清单
   */
  var getLayoutFromBox = function(box) {
    var layout = new Array();
    var rows = box.children('.box-body').children().clone();
    rows.each(function() {
      var row = $(this);
      var columns = $(this).children('div').clone();
      row.empty();
      columns.each(function() {
        // 如果是布局，则提取布局
        // 如果不是，则提取items
        var column = $(this);
        var subBoxs = $(this).children().clone();
        column.empty();
        if (subBoxs.find('.row>.connectedSortable')) {
          subBoxs.each(function() {
            var layout = getLayoutFromBox($(this));
            column.append(layout);
          });
        } else {
          subBoxs.each(function() {
            var items = getItemsFromBox($(this));
            column.append(items);
          });
        }
        row.append(column);
      });
      layout.push(row);
    });
    return layout;
  }

  /**
   * 从容器中提取items
   * @param  {Dom} box 容器
   * @return {Dom}     items
   */
  var getItemsFromBox = function(box) {
    var items = box.children('.box-body').children().clone();
    // console.log(box.children('.box-body').html());
    // console.log(items.html());
    return items;
  }
});