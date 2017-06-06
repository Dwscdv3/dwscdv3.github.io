jwerty.key("h", function() {
    NotInputingThen(function() {
        window.location.hash = "#";
    })
});
jwerty.key("i", function() {
    NotInputingThen(function() {
        window.location.hash = "#/index";
    })
});
jwerty.key("slash/shift+slash", function() {
    NotInputingThen(function() {
        window.location.hash = "#/shortcuts";
    });
});

jwerty.key("ctrl+b", function() {
    toggleBlur();
    var setting_Blur = $("#setting_Blur");
    setting_Blur.checked = !setting_Blur.checked;
});
jwerty.key("alt+b", function() {
    toggleHighContrast();
    var setting_HighContrast = $("#setting_HighContrast");
    setting_HighContrast.checked = !setting_HighContrast.checked;
});

// 彩蛋
function jumpToEggKikkou() {
    NotInputingThen(function() {
        window.location.hash = "#/eggs/kikkou";
    });
}

jwerty.key("g,u,i,j,i,a", jumpToEggKikkou);
jwerty.key("l,i,n,g,f,u", jumpToEggKikkou);
jwerty.key("k,i,k,k,o,u", jumpToEggKikkou);