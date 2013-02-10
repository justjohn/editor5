var API = {};

API.load = function(key, fn, errFn) {
    $.getJSON('get.php?key='+key, function(data) {
        if (data && data.content) {
            fn(data.content);
        } else {
            errFn && errFn(data);
        }
    });
}

API.save = function(key, content, fn, errFn) {
    $.post('save.php', {content:content, key:key}, function(response) {
        if (response && response.key) {
            fn && fn(response);
        } else {
            errFn && errFn(response);
        }
    }, 'json');
}

