var draft_key = "draft",
    key = window.location.pathname.substr(1) || draft_key,
    $body = $("body"),
    editorEl = document.getElementById('edit'),
    content = localStorage[key] || "",
    changed = true;

editorEl.innerHTML = content;
placeCaretAtEnd(editorEl);

$(".changed button").click(function() {
    var content = localStorage[key+":remote"];

    localStorage[key] = content;
    localStorage[key+":saved"] = content;
    editorEl.innerHTML = content;

    delete localStorage[key+":remote"];

    $body.removeClass("changed-remote");
});

if (key !== draft_key) {
    API.load(key, function(remote) {
        var current = localStorage[key+":saved"],
            draft = localStorage[key];

        if (current != remote && content) {
            if (current == draft) {
                content = "";
            } else {
                $body.addClass("changed-remote");
                localStorage[key+":remote"] = remote;
            }
        }

        if (!content) {
            localStorage[key+":saved"] = remote;
            localStorage[key] = remote;
            editorEl.innerHTML = remote;
            content = remote;
        }
    });
}

editorEl.onkeyup = function() {
    localStorage[key] = this.innerHTML;
    changed = localStorage[key] != localStorage[key+":saved"];

    if (changed) {
        $body.addClass("draft");
    } else {
        $body.removeClass("draft");
    }
};

function stopDefaultKey(e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        // internet explorer
        e.returnValue = false;
    }
}

Mousetrap.bindGlobal(['meta+s', 'ctrl+s'], function(e) {
    stopDefaultKey(e);

    var pkey = key == draft_key?"":key,
        local = localStorage[key];

    API.save(pkey, local, function(response) {
        localStorage[key+":saved"] = local;

        // if no key was provided, we saved a draft from '/'
        // so we redirect to a random key.
        if (response.key != key)
            window.location="/"+response.key;
    });
});

Mousetrap.bindGlobal(["meta+m", "ctrl+m"], function(e) {
    stopDefaultKey(e);

    // preview as markdown
    var content = getContentEditableText(editorEl);
    console.log(content);
});

Mousetrap.bindGlobal(["meta+h", "ctrl+h"], function(e) {
    stopDefaultKey(e);

    var input = prompt("Enter HTML to inject");
    pasteHtmlAtCaret(input);
});


