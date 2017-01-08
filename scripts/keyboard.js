// 彩蛋
function jumpToEggKikkou() {
    NotInputingThen(function() {
        window.location.hash = "#/eggs/kikkou";
    })
}

jwerty.key("g,u,i,j,i,a", jumpToEggKikkou);
jwerty.key("l,i,n,g,f,u", jumpToEggKikkou);
jwerty.key("k,i,k,k,o,u", jumpToEggKikkou);