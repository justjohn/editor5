// From: http://bonsaiden.github.com/JavaScript-Garden/#types
function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}


// From: http://stackoverflow.com/a/4238971
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

// From: http://stackoverflow.com/a/4163827
function getContentEditableText(el) {
    var ce = $("<pre />").html(is("String", el)?el:el.innerHTML);

    if ($.browser.webkit) {
      ce.find("div").each(function() { 
          $(this).replaceWith("\n" + getContentEditableText(this.innerHTML)); 
      });
      ce.find("br").replaceWith("");
    }

    if ($.browser.msie)
      ce.find("p").each(function() {
          $(this).replaceWith(getContentEditableText(this.innerHTML) + "<br>"); 
      });
    if ($.browser.mozilla || $.browser.opera || $.browser.msie)
      ce.find("br").replaceWith("\n");

    return ce.html();
}

