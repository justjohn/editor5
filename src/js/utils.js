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

// From: http://stackoverflow.com/a/4140071
function extractTextWithWhitespace(elems)
{
    var lineBreakNodeName = "BR"; // Use <br> as a default
    if ($.browser.webkit)
    {
        lineBreakNodeName = "DIV";
    }
    else if ($.browser.msie)
    {
        lineBreakNodeName = "P";
    }
    else if ($.browser.mozilla)
    {
        lineBreakNodeName = "BR";
    }
    else if ($.browser.opera)
    {
        lineBreakNodeName = "P";
    }
    var extractedText = extractTextWithWhitespaceWorker(elems, lineBreakNodeName);

    return extractedText;
}

// Cribbed from jQuery 1.4.2 (getText) and modified to retain whitespace
function extractTextWithWhitespaceWorker(elems, lineBreakNodeName)
{
    var ret = "";
    var elem;

    for (var i = 0; elems[i]; i++)
    {
        elem = elems[i];

        if (elem.nodeType === 3     // text node
            || elem.nodeType === 4) // CDATA node
        {
            ret += elem.nodeValue;
        }

        if (elem.nodeName === lineBreakNodeName)
        {
            ret += "\n";
        }

        if (elem.nodeType !== 8) // comment node
        {
            ret += extractTextWithWhitespace(elem.childNodes, lineBreakNodeName);
        }
    }

    return ret;
}


