/* ==========================================================
   CodeNotes Hub - Shared Theme (Dark / Light Mode)
   Include this on every page BEFORE closing </body>.
   Works with any button that has id="darkMode" (emoji swap)
   or any element with [data-theme-toggle].
========================================================== */

(function () {

    function applySavedTheme() {

        const saved = localStorage.getItem("theme");

        // Default is dark mode, so only add the class when "light" is saved
        if (saved === "light") {

            document.body.classList.add("light-mode");

        } else {

            document.body.classList.remove("light-mode");

        }
    }

    // Apply immediately so there is no flash of the wrong theme
    applySavedTheme();

    function syncToggleIcon(btn) {

        if (!btn) return;

        if (document.body.classList.contains("light-mode")) {

            btn.innerHTML = "☀️";

        } else {

            btn.innerHTML = "🌙";

        }
    }

    function toggleTheme(btn) {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {

            localStorage.setItem("theme", "light");

        } else {

            localStorage.setItem("theme", "dark");

        }

        syncToggleIcon(btn);
    }

    document.addEventListener("DOMContentLoaded", () => {

        applySavedTheme();

        const toggles = document.querySelectorAll(
            "#darkMode, [data-theme-toggle]"
        );

        toggles.forEach((btn) => {

            syncToggleIcon(btn);

            btn.addEventListener("click", () => toggleTheme(btn));

        });

    });

    // Expose in case a page wants to trigger it manually
    window.CNH_toggleTheme = toggleTheme;

})();
