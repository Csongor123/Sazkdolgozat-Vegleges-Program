class LessonOutputRenderer {
    renderAttempts(wrapper, taskId, attemptManager) {
        if (!wrapper) {
            return;
        }

        const output = wrapper.querySelector(".output-box");
        let attemptBox = wrapper.querySelector(".attempt-box");

        if (!attemptBox) {
            attemptBox = document.createElement("div");
            attemptBox.className = "attempt-box";
            attemptBox.style.marginBottom = "8px";
            attemptBox.style.fontWeight = "600";
            wrapper.insertBefore(attemptBox, output);
        }

        if (taskId && attemptManager.isSolved(taskId)) {
            attemptBox.innerHTML = "✅ Teljesítve";
            attemptBox.style.color = "#4caf50";
            return;
        }

        const tries = taskId
            ? attemptManager.clampAttempts(attemptManager.getAttempts(taskId))
            : 0;

        attemptBox.style.color = "#fff";
        attemptBox.innerHTML = `Próbálkozások: ${tries}/3`;
    }

    pasteSolution(btn) {
        const wrapper = btn.closest(".code-runner");
        if (!wrapper) {
            return;
        }

        const textarea = wrapper.querySelector(".code-input");
        const pre = btn.parentElement.querySelector("pre");

        if (!textarea || !pre) {
            return;
        }

        textarea.value = pre.textContent.trim();
        textarea.focus();
    }

    escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
}

window.LessonOutputRenderer = LessonOutputRenderer;