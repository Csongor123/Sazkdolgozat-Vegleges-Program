class LessonAttemptManager {
    getUser() {
        return (typeof getActiveUser === "function")
            ? getActiveUser()
            : "Vendég";
    }

    getAttemptsKey(taskId) {
        return `attempts:${this.getUser()}:${taskId}`;
    }

    getAttempts(taskId) {
        return parseInt(localStorage.getItem(this.getAttemptsKey(taskId)) || "0", 10);
    }

    incAttempts(taskId) {
        const current = this.getAttempts(taskId);
        if (current >= 3) {
            localStorage.setItem(this.getAttemptsKey(taskId), "3");
            return 3;
        }
        const next = current + 1;
        localStorage.setItem(this.getAttemptsKey(taskId), String(next));
        return next;
    }

    resetAttempts(taskId) {
        localStorage.removeItem(this.getAttemptsKey(taskId));
    }

    getLockKey(taskId) {
        return `lock:${this.getUser()}:${taskId}`;
    }

    unlockTask(taskId) {
        localStorage.removeItem(this.getLockKey(taskId));
    }

    getShownKey(taskId) {
        return `shown:${this.getUser()}:${taskId}`;
    }

    markSolutionShown(taskId) {
        localStorage.setItem(this.getShownKey(taskId), "1");
    }

    clearSolutionShown(taskId) {
        localStorage.removeItem(this.getShownKey(taskId));
    }

    getSolvedKey(taskId) {
        return `solved:${this.getUser()}:${taskId}`;
    }

    isSolved(taskId) {
        return localStorage.getItem(this.getSolvedKey(taskId)) === "1";
    }

    markSolved(taskId) {
        localStorage.setItem(this.getSolvedKey(taskId), "1");
    }

    clearSolved(taskId) {
        localStorage.removeItem(this.getSolvedKey(taskId));
    }

    clampAttempts(n) {
        if (n < 0) {
            return 0;
        }
        if (n > 3) {
            return 3;
        }
        return n;
    }
}

window.LessonAttemptManager = LessonAttemptManager;