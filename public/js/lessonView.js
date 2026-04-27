let progress = {};
let codeIsValid = false;

const attemptManager = new window.LessonAttemptManager();
const outputRenderer = new window.LessonOutputRenderer();
const taskValidators = new window.LessonTaskValidators();

/*Segédfüggvények*/

function hasMissingSemicolon(code) {
    const lines = String(code).split("\n");
    let objectAssignmentOpen = false;

    for (let raw of lines) {
        const line = raw.trim();
        if (!line) continue;
        if (line.startsWith("//")) continue;

        if (/^(let|const|var)\s+[a-zA-Z_$][\w$]*\s*=\s*\{/.test(line)) {
            objectAssignmentOpen = true;
            continue;
        }

        if (line === "}" && objectAssignmentOpen) {
            return true;
        }
        if (line === "};" && objectAssignmentOpen) {
            objectAssignmentOpen = false;
            continue;
        }

        if (line.endsWith("{") || line.endsWith("}")) continue;
        if (line.endsWith(",")) continue;
        if (/^[a-zA-Z_$][\w$]*\s*:/.test(line)) continue;

        if (
            line.startsWith("if ") || line.startsWith("if(") ||
            line.startsWith("else") ||
            line.startsWith("for ") || line.startsWith("for(") ||
            line.startsWith("while ") || line.startsWith("while(") ||
            line.startsWith("switch ") || line.startsWith("switch(")
        ) {
            continue;
        }

        if (!line.endsWith(";")) {
            return true;
        }
    }
    return false;
}

/*Fő futtató*/

function runTask(button) {
    const demoButton = document.getElementById("gomb");
    if (demoButton) {
        demoButton.onclick = null;
    }

    codeIsValid = false;
    const wrapper = button.closest(".code-runner");
    const input = wrapper.querySelector(".code-input").value;
    const output = wrapper.querySelector(".output-box");

    const taskId = button.getAttribute("data-task-id") || "";

    /*próbálkozások kijelzése minden futtatáskor*/
    outputRenderer.renderAttempts(wrapper, taskId, attemptManager);

    const expected = taskId
        ? (taskValidators.getSolution(taskId) || "")
        : (button.getAttribute("data-expected") || "");

    const mode = button.getAttribute("data-mode")
        || (expected ? "strict" : "free");

    const escapeHtml = (str) => outputRenderer.escapeHtml(str);

    const lessonId = Number(
        new URLSearchParams(window.location.search).get("id")
    );

    /*1)Szintaktikai ellenőrzés - NEM számít próbálkozásnak*/
    const syntaxErrors = [];

    const pairs = [
        ["(", ")"],
        ["{", "}"],
        ["[", "]"]
    ];

    pairs.forEach(([o, c]) => {
        const open = (input.match(new RegExp(`\\${o}`, "g")) || []).length;
        const close = (input.match(new RegExp(`\\${c}`, "g")) || []).length;
        if (open !== close) {
            syntaxErrors.push(
                `Hiányzó vagy hibás <code>${o}</code> / <code>${c}</code> zárójel`
            );
        }
    });

    if ((input.match(/"/g) || []).length % 2 !== 0) {
        syntaxErrors.push('Hiányzó vagy hibás <code>"</code> idézőjel');
    }
    if ((input.match(/'/g) || []).length % 2 !== 0) {
        syntaxErrors.push("Hiányzó vagy hibás <code>'</code> idézőjel");
    }

    if (hasMissingSemicolon(input)) {
        syntaxErrors.push("Hiányzó <code>;</code> (pontosvessző)");
    }

    if (syntaxErrors.length > 0) {
        outputRenderer.renderAttempts(wrapper, taskId, attemptManager);
        output.innerHTML = `
            <div class="output-status" style="color:#ff4444;">
                ❌ Szintaktikai hiba a kódban:
                <ul>${syntaxErrors.map(e => `<li>${e}</li>`).join("")}</ul>
            </div>
        `;
        return;
    }

    /*2)Egységes tizedes + 0–99 ellenőrzés*/
    const rangeValidationResult = taskValidators.validateRangeRules(
        taskId,
        input
    );

    if (rangeValidationResult !== "ok") {
        output.innerHTML = `
            <div class="output-status" style="color:#ff4444;">
                ${rangeValidationResult}
            </div>
        `;
        return;
    }

    /*2.5) Feladatspecifikus extra tiltások*/
    const specialValidationResult = taskValidators.validateSpecialRules(
        taskId,
        input,
        lessonId
    );

    if (specialValidationResult !== "ok") {
        output.innerHTML = `
            <div class="output-status" style="color:#ff4444;">
                ${specialValidationResult}
            </div>
        `;
        return;
    }

    /*3) STRICT ellenőrzés*/
    if (mode === "strict" && expected) {
        let errors = [];

        if (taskId === "3-1") {
            const result = taskValidators.validateTask_3_1(input);

             if (result === "missingIf") {
                errors.push("A feltételben kötelező: if (kor >= 18).");
            } else if (result === "missingElse") {
                errors.push("Az if szerkezethez else ág is szükséges.");
            } else if (result === "invalidText") {
                errors.push(
                    'A console.log-ban  csak a "Nagykorú" vagy "Kiskorú" szöveg lehet.'
                );
            } else if (result === "missingLogs") {
    errors.push("A feladat nem teljesül.");    
            } else if (result !== "ok") {
                errors.push("A feladat nem teljesül.");
            }
        } else if (taskId === "3-2") {
            const result = taskValidators.validateTask_3_2(input);
             if (result !== "ok") {
                errors.push("A feladat nem teljesül.");
            }
        } else if (taskId === "2-1") {
            const ok = taskValidators.validateTask_2_1(input);
            if (!ok) {
                errors.push("A feladat nem teljesül.");
            }
        } else if (taskId === "4-1") {
            const ok = taskValidators.validateTask_4_1(input);
            if (!ok) {
                errors.push("A feladat nem teljesül.");
            }
        } else if (taskId === "4-2") {
            const ok = taskValidators.validateTask_4_2(input);
            if (!ok) {
                errors.push("A feladat nem teljesül.");
            }
        } else if (taskId === "5-1") {
    const result = taskValidators.validateTask_5_1(input);

    if (result === "arrayError") {
        errors.push(
            "A tömb csak 0 és 99 közötti egész számokat tartalmazhat, legfeljebb 100 elemmel, és az első számot valamint a hosszát kell kiírni."
        );
    } else if (
        result === "missingArrayName" ||
        result === "missingFirstElement" ||
        result === "missingLength"
    ) {
        errors.push("A feladat nem teljesül.");
    } else if (result !== "ok") {
        errors.push("A feladat nem teljesül.");
    }
} else if (taskId === "6-1") {
            const result = taskValidators.validateTask_6_1(input);
            if (result === "invalidOperation") {
                errors.push("Itt csak összeadást használhatsz: a + b vagy b + a.");
            } else if (result !== "ok") {
        errors.push("A feladat nem teljesül.");
    }
        } else if (taskId === "6-2") {
    const result = taskValidators.validateTask_6_2(input);
    if (result === "invalidOperation") {
        errors.push("Itt csak kivonást használhatsz: a - b vagy b - a.");
    } else if (result !== "ok") {
        errors.push("A feladat nem teljesül.");
    }
        } else if (taskId === "6-3") {
    const result = taskValidators.validateTask_6_3(input);
    if (result === "invalidOperation") {
        errors.push("Itt csak szorzást használhatsz: a * b vagy b * a.");
    } else if (result !== "ok") {
        errors.push("A feladat nem teljesül.");
    }
        } else if (taskId === "6-4") {
    const result = taskValidators.validateTask_6_4(input);
    if (result === "invalidOperation") {
        errors.push("Itt csak osztást használhatsz: a / b vagy b / a.");
    } else if (result !== "ok") {
        errors.push("A feladat nem teljesül.");
    }
    } else if (taskId === "7-1") {
    const ok = taskValidators.validateTask_7_1(input);
    if (!ok) {
        errors.push(
            "Írd át a cim elem szövegét innerText segítségével."
        );
    }
        } else if (taskId === "8-1") {
            const ok = taskValidators.validateTask_8_1(input);
            if (!ok) {
                errors.push(
                    "Állíts be kattintás eseménykezelőt a gombhoz és használj alert-et."
                );
            }
        } else if (taskId === "9-1") {
    const result = taskValidators.validateTask_9_1(input);
    if (result !== "ok") {
        errors.push(result);
    }
} else {
    errors = taskValidators.analyzeCode(input, expected);
}

        if (errors.length > 0) {
            let extra = "";
            let helpText = `
                <div class="output-status" style="color:#ff4444;">
                    ❌ A megoldás még nem jó. Próbáld újra!
                </div>
                
                <div style="margin-top:6px;">
                    Tipp: ellenőrizd a zárójeleket <code>()</code>, idézőjeleket <code>""</code>,
                    és a pontosvesszőt <code>;</code>. Nézd meg, hogy a feladatban kért elemeket valóban használod-e.
                </div>
            `;

            if (taskId) {
                if (attemptManager.isSolved(taskId)) {
                    outputRenderer.renderAttempts(wrapper, taskId, attemptManager);
                    output.innerHTML = `
                        <div class="output-status" style="color:#ff4444;">
                            ❌ Hibás megoldás. (A feladat már teljesítve van, ezért nem számolok új próbát.)
                        </div>
                        ${errors.map(e => `<div class="output-error">⚠ ${e}</div>`).join("")}
                        <div style="margin-top:6px;">
                            Újrakezdéshez töltsd újra az oldalt (F5). (0/3-ról indul)
                        </div>
                    `;
                    return;
                }

                let tries = attemptManager.getAttempts(taskId);
                if (tries < 3) {
                    tries = attemptManager.incAttempts(taskId);
                }

                outputRenderer.renderAttempts(wrapper, taskId, attemptManager);

                if (tries === 1) {
                    helpText += `
                        <div style="margin-top:6px;">
                            <strong>1/3 próbálkozás.</strong>
                        </div>
                    `;
                } else if (tries === 2) {
                    helpText += `
                        <div style="margin-top:6px;">
                            <strong>2/3 próbálkozás.</strong> Ha elakadtál, futtasd le még egyszer, és megmutatom a helyes megoldást.
                        </div>
                    `;
                }

                if (tries >= 3) {
                    attemptManager.markSolutionShown(taskId);
                    extra = `
                        <div style="margin-top:12px;padding:10px;border:1px solid #444;border-radius:6px;">
                            <div style="font-weight:600;margin-bottom:6px;">
                                Helyes megoldás (3 sikertelen próbálkozás után):
                            </div>
                            <pre class="code-example" style="white-space:pre-wrap;">${escapeHtml(expected)}</pre>
                            <button class="paste-btn" type="button" onclick="pasteSolution(this)">
                                Megoldás bemásolása
                            </button>
                        </div>
                    `;
                }
            }

            output.innerHTML = `
                ${helpText}
                ${extra}
            `;
            return;
        }
    }

    if (taskId === "9-1") {
        codeIsValid = true;

        if (taskId) {
            attemptManager.markSolved(taskId);
            attemptManager.resetAttempts(taskId);
            attemptManager.unlockTask(taskId);
            attemptManager.clearSolutionShown(taskId);
            outputRenderer.renderAttempts(wrapper, taskId, attemptManager);
        }

        output.innerHTML = `
            <div><strong>Program kimenete:</strong></div>
            <div class="output-log"><em>(API válasz a konzolban jelenne meg.)</em></div>
            <div class="output-status" style="margin-top:8px;color:#4caf50;">
                ✓ Kód sikeresen lefutott
            </div>
        `;
        return;
    }

    /*4) Futtatás*/
    const originalConsoleLog = console.log;
    let logs = [];

    console.log = (...args) => {
        const text = args
            .map(a => (typeof a === "object" ? JSON.stringify(a) : String(a)))
            .join(" ");
        logs.push(text);
        originalConsoleLog.apply(console, args);
    };

    try {
        eval(input);
        console.log = originalConsoleLog;

        codeIsValid = true;

        if (taskId) {
            attemptManager.markSolved(taskId);
            attemptManager.resetAttempts(taskId);
            attemptManager.unlockTask(taskId);
            attemptManager.clearSolutionShown(taskId);
            outputRenderer.renderAttempts(wrapper, taskId, attemptManager);
        }

        let logText;
        if (logs.length) {
            logText = logs.map(s => escapeHtml(s)).join("<br>");
        } else if (taskId === "7-1") {
            logText = "<em>(A változást a fenti címsorban láthatod.)</em>";
        } else if (taskId === "8-1") {
            logText = "<em>(Kattints a kék gombra a felugró ablak megjelenítéséhez.)</em>";
        } else {
            logText = "<em>(A program nem írt ki semmit.)</em>";
        }

        const statusText =
            mode === "strict"
                ? "✓ Kód sikeresen lefutott"
                : "✓ A kód lefutott hiba nélkül – nyugodtan kísérletezz!";

        output.innerHTML = `
            <div><strong>Program kimenete:</strong></div>
            <div class="output-log">${logText}</div>
            <div class="output-status" style="margin-top:8px;color:#4caf50;">
                ${statusText}
            </div>
        `;
    } catch (err) {
        console.log = originalConsoleLog;
        output.innerHTML = `
            <div class="output-status" style="margin-top:8px;color:#ff4444;">
                ❌ Hiba történt futtatás közben:<br>
                <code>${escapeHtml(err.message)}</code>
            </div>
        `;
    }
}

/*Lecke oldal betöltése*/

window.addEventListener("DOMContentLoaded", async () => {
    progress = await loadProgress();
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"), 10);
    const lesson = lessonData[id];

    const container = document.getElementById("lessonContent");

    if (!lesson) {
        container.innerHTML = `
            <div class="lesson-detail">
                <h2>Hiba</h2>
                <p>Nem található lecke ezzel az azonosítóval: <strong>${id}</strong></p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="lesson-detail">
            ${lesson.content}
            <button class="complete-btn" id="completeBtn">
                ${progress[id] ? "✓ Teljesítve" : "Lecke teljesítése"}
            </button>
        </div>
    `;

    const taskButtons = container.querySelectorAll("button[data-task-id]");
    taskButtons.forEach(btn => {
        const tId = btn.getAttribute("data-task-id");
        if (tId) {
            attemptManager.resetAttempts(tId);
            attemptManager.unlockTask(tId);
            attemptManager.clearSolutionShown(tId);
            attemptManager.clearSolved(tId);
        }
    });

    const runners = container.querySelectorAll(".code-runner");
runners.forEach(r => {
    const btn = r.querySelector("button[data-task-id]");
    if (btn) {
        outputRenderer.renderAttempts(
            r,
            btn.getAttribute("data-task-id"),
            attemptManager
        );
    }
});

    document.getElementById("completeBtn").onclick = async () => {
        const current = await loadProgress();
        current[id] = true;
        await saveProgress(current);
        location.href = "index.html";
    };

    document.addEventListener("click", function (e) {
        if (e.target && e.target.id === "gomb") {
            if (!codeIsValid) {
                alert("⚠️ Előbb futtasd le hibátlanul a kódot!");
                e.preventDefault();
                e.stopPropagation();
            }
        }
    });
});

window.pasteSolution = function (btn) {
    outputRenderer.pasteSolution(btn);
};