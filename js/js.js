var codeblocks = document.querySelectorAll('pre.md-fences.md-end-block.md-fences-with-lineno.ty-contain-cm.modeLoaded.md-focus');


// 循环每个pre代码块，并添加 复制代码
for (var i = 0; i < codeblocks.length; i++) {
    (function (i) {
        var currentCode = codeblocks[i];
        currentCode.style.position = "relative";

        // 检查是否已有复制按钮，避免重复添加
        if (currentCode.querySelector(".copy-button")) return;

        var copy = document.createElement("div");
        copy.className = "copy-button";  // 给按钮添加类名，方便查找和样式
        copy.style = `
            position: absolute;
            right: 4px;
            top: 4px;
            background-color: white;
            padding: 2px 8px;
            margin: 8px;
            border-radius: 4px;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05);
        `;
        copy.innerHTML = "Copy";

        currentCode.appendChild(copy);

        // 执行 复制代码 功能
        copy.addEventListener('click', function (event) {
            const range = document.createRange();
            range.selectNode(currentCode.childNodes[0]);

            const selection = window.getSelection();
            if (selection.rangeCount > 0) selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');

            copy.innerHTML = "Copied";
            setTimeout(function () {
                copy.innerHTML = "Copy";
            }, 1000);

            // 清除选择区
            if (selection.rangeCount > 0) selection.removeAllRanges();
        }, false);

        // 鼠标移到代码块，显示按钮
        currentCode.onmouseover = function () {
            copy.style.visibility = "visible";
        };

        // 鼠标移出代码块，隐藏按钮
        currentCode.onmouseout = function () {
            copy.style.visibility = "hidden";
        };
    })(i);
}
