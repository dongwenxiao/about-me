var DEBUG = 1;
var ROW_TAP_TIME = 1;
var SPACE_COUNT = 2;
var WAIT_TIME = 2;
var WELCOME_MOVE_UP = 1;

var $RESUME_PANEL = $(".resume-panel");
var $CSS_PANEL = $(".css-code-panel");
var timeline = new TimelineLite();


if (DEBUG) {
    ROW_TAP_TIME = 0;
    WAIT_TIME = 0;
    WELCOME_MOVE_UP = 0;
}

$(function() {

    init();
    timeline.pause();
    timeline.play();

})

////////////////////////////////////////////////////////////////////////

$CSS_PANEL.showPanel = function() {
    $CSS_PANEL.fadeIn();
}
$CSS_PANEL.hidePanel = function() {
    $CSS_PANEL.fadeOut();
}


////////////////////////////////////////////////////////////////////////

function init() {
    // 开场 - 欢迎语
    writeWelcome();
    wait(WAIT_TIME)

    // 准备开始 - 欢迎语归顶，弹出css面板
    changeLayoutReadyToStart();

    // 写css - 基础，背景，颜色，字号
    writeCommentBlock(['白色有点刺眼，先减低一个色调，', '背景和文字看起来舒服些！']);
    writeClassBlock('html', { background: '#eee', color: '#333' });
    timeline.call(function() { writeStyle('html{background: #eee; color: #333}') });

    // 写css - css面板

    // 写css - 欢迎语

    // 写简历
    writeResume();

    // 写css - 简历

    // 隐藏css面板

}

////////////////////////////////////////////////////////////////////////

function row() {
    return $('<div>').addClass('row');
}

function comment() {
    return $('<span>').addClass('comment');
}

function selector() {
    return $('<span>').addClass('selector');
}

function prop() {
    return $('<span>').addClass('prop');
}

function val() {
    return $('<span>').addClass('val');
}

function other() {
    return $('<span>').addClass('other');
}


function writeComment(text, tl) {
    if (!tl) tl = timeline;
    var $comment = comment();
    var $row = row();
    tl.call(function() {
        $row.append($comment);
        $CSS_PANEL.append($row);
    });
    tl.to($comment, ROW_TAP_TIME, { text: text })
}

function writeSelector(_selector, tl) {
    if (!tl) tl = timeline;
    var $selector = selector();
    var $row = row();
    var $other = $('<span>').addClass('other');
    tl.call(function() {
        $row.append($selector);
        $row.append($other)
        $CSS_PANEL.append($row)
    });
    tl.to($selector, ROW_TAP_TIME / 2, { text: _selector });
    tl.to($other, ROW_TAP_TIME / 2, { text: ' {' })
}

function writePropVal(space, _prop, _val, tl) {
    if (!space) space = 0;
    if (!tl) tl = timeline;
    var $row = row();
    var $prop = prop();
    var $val = val();
    var $other1 = other();
    var $other2 = other();

    tl.call(function() {
        for (var i = 0; i < space; i++) {
            $row.append('&nbsp;')
        }
        $row.append($prop);
        $row.append($other1)
        $row.append($val);
        $row.append($other2);
        $CSS_PANEL.append($row)
    });
    tl.to($prop, ROW_TAP_TIME / 4, { text: _prop });
    tl.to($other1, ROW_TAP_TIME / 4, { text: ': ' });
    tl.to($val, ROW_TAP_TIME / 4, { text: _val });
    tl.to($other2, ROW_TAP_TIME / 4, { text: ';' });
}

function writeEnd(tl) {
    if (!tl) tl = timeline;
    var $row = row();
    var $other = other();

    tl.call(function() {
        $row.append($other);
        $CSS_PANEL.append($row)
    });

    tl.to($other, ROW_TAP_TIME, { text: '}' });

}

function writeClassBlock(name, kvs /*, callback*/ ) {
    writeSelector(name)
    for (var key in kvs) {
        writePropVal(SPACE_COUNT, key, kvs[key])
    }
    writeEnd()
        // timeline.call(function() {
        //     callback && callback();
        // })
}

function writeCommentBlock(comments) {
    writeComment('/**')
    comments.forEach(function(comment) {
        writeComment('* ' + comment)
    })
    writeComment('*/')
}

function writeWelcome() {
    var words = [
        'Thank you for your coming!',
        '感谢公司和看到页面的你，让我能有机会参与到这次首席门徒的竞选。',
        '此时我的心情有点High~只能用代码表达一下。'
    ];

    words.forEach(function(word) {
        writeP(word, '.welcome');
    });

    timeline.call(function() {
        if(!DEBUG) $RESUME_PANEL.addClass('high-up')
    });
}


function writeResume() {

    var p, h, panel = '.resume';

    h = '我';
    p = '董文枭，英文名叫victor，是一名codemonkey。' +
        '近一年多以来在用户体验部做WEB前端工作，专门给各个产品线卖手腕子，' +
        '如：导航系列的金山毒霸、金山影视、金山购物等；' +
        '数据类的Libra、智库官网；各种内嵌H5、活动H5...' +
        '近期有在支持PhotoGrid、Launcher的网页项目。';
    writeH(h, panel);
    writeP(p, panel);

    h = '技术贡献';
    p = '半年前发现我们的技术架构有些落后，我，决定做一次改变。' +
        '让网页能做到：SEO、SPA、按需加载、ES7、实时打包、多语言、React、PWA、CDN 等等，' +
        '这些技术点都能同时实现，并且前端可以做到iOS、Android、H5使用同一套代码逻辑，一键跨平台发布，' +
        '达到全球领先的WEB前端水平。' +
        '国内还没有发现（SEO、SPA、按需加载）同时实现的项目，PhotoGrid网页版可以！';
    writeH(h, panel);
    writeP(p, panel);

    h = '猎豹活动';
    p = '2015年5月加入猎豹，参加新员工培训，带队“六月豹”获得团队第一。<br>' +
        '2015年11月报名傅盛战队，海选通过（内部透露6500项目，200强）。<br>' +
        '2016年1月参加豹厂“豹动”活动，5人5项挑战连胜，与团队获得最佳豹动奖。';
    writeH(h, panel);
    writeP(p, panel);

    h = '结语';
    p = '本次介绍程序，策划-开发-上线用了2天时间。' +
        '感谢胡欣的特效、xx的设计。' +
        '这就是我 - 有想法、会技术、擅协作。';
    writeH(h, panel);
    writeP(p, panel);

}

function writeP(text, panelClass) {
    var tl = timeline;

    var $row = row();
    var $p = $('<p>');
    $row.append($p);

    tl.call(function() {
        $RESUME_PANEL.find(panelClass).append($row);
    });

    tl.to($p, ROW_TAP_TIME, { text: text });
}

function writeH(title, panelClass) {
    var tl = timeline;

    var $row = row();
    var $h = $('<h1>');
    $row.append($h);

    tl.call(function() {
        $RESUME_PANEL.find(panelClass).append($row);
    });

    tl.to($h, ROW_TAP_TIME, { text: title });
}

function changeLayoutReadyToStart() {
    // timeline.call(function() {
    //     $RESUME_PANEL.removeClass('before-start');
    // }, null, null, '+=1')
    timeline.to($RESUME_PANEL, WELCOME_MOVE_UP, { padding: '0 10' });

    timeline.call(function() {
        $CSS_PANEL.showPanel();
    }, null, null, '+=' + WELCOME_MOVE_UP)

}

function writeStyle(css) {
    var tag = $('<style>').html(css)
    $('head').append(tag)
}

function wait(time) {
    // timeline.duration(time);
    timeline.to($CSS_PANEL, time, { opacity: 1 })
}