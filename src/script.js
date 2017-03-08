var ROW_TAP_TIME = 1
var SPACE_COUNT = 2
var $RESUME_PANEL = $(".resume-panel");
var $CSS_PANEL = $(".css-code-panel");
var timeline = new TimelineLite();

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
    writeWelcome();
    changeLayoutReadyToStart();


    writeCommentBlock(['加一个背景', '测试一下']);
    writeClassBlock('html', { background: '#FA0033' });
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

function writeClassBlock(name, kvs) {
    writeSelector(name)
    for (var key in kvs) {
        writePropVal(SPACE_COUNT, key, kvs[key])
    }
    writeEnd()
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

    words.forEach(function(word){
        writeWords(word);
    });

    timeline.call(function(){
        $RESUME_PANEL.addClass('high-up')
    })
}

function writeWords(words, tl) {
    if (!tl) tl = timeline;

    var $row = row();

    tl.call(function() {
        $RESUME_PANEL.append($row);
    });

    tl.to($row, ROW_TAP_TIME, { text: words });
}

function changeLayoutReadyToStart(){
    timeline.call(function(){
        $RESUME_PANEL.removeClass('before-start');
    }, null, null, '+=1')

    timeline.call(function(){
        $CSS_PANEL.showPanel();
    }, null, null, '+=1')
    
}