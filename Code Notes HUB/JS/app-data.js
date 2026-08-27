/* ==========================================================
   CodeNotes Hub - Shared App Data & Helpers
   Topic index (search + progress), quiz bank, user helpers.
   Include this on every page that needs progress, search,
   or the quiz/profile system.
========================================================== */

const CNH = {

    technologies: {

        html: {
            name: "HTML",
            icon: "fa-brands fa-html5",
            color: "#E44D26",
            page: "html-notes.html",
            desc: "Learn the fundamentals of web page structure and semantic HTML.",
            topics: [
                { id: "intro", title: "Introduction to HTML" },
                { id: "structure", title: "HTML Document Structure" },
                { id: "heading", title: "Headings" },
                { id: "paragraph", title: "Paragraphs" },
                { id: "lists", title: "Lists" },
                { id: "links", title: "Links" },
                { id: "images", title: "Images" },
                { id: "tables", title: "Tables" },
                { id: "forms", title: "Forms" },
                { id: "semantic", title: "Semantic HTML" }
            ]
        },

        css: {
            name: "CSS",
            icon: "fa-brands fa-css3-alt",
            color: "#264DE4",
            page: "css-notes.html",
            desc: "Complete CSS notes with examples, from selectors to Grid.",
            topics: [
                { id: "intro", title: "Introduction to CSS" },
                { id: "selectors", title: "Selectors" },
                { id: "colors", title: "Colors" },
                { id: "fonts", title: "Fonts" },
                { id: "boxmodel", title: "Box Model" },
                { id: "flexbox", title: "Flexbox" },
                { id: "grid", title: "CSS Grid" },
                { id: "positioning", title: "Positioning" },
                { id: "responsive", title: "Responsive Design" },
                { id: "media", title: "Media Queries" }
            ]
        },

        js: {
            name: "JavaScript",
            icon: "fa-brands fa-js",
            color: "#F0DB4F",
            page: "js-notes.html",
            desc: "Learn JavaScript step by step, from variables to async/await.",
            topics: [
                { id: "intro", title: "Introduction" },
                { id: "variables", title: "Variables" },
                { id: "datatypes", title: "Data Types" },
                { id: "operators", title: "Operators" },
                { id: "conditions", title: "Conditions" },
                { id: "loops", title: "Loops" },
                { id: "functions", title: "Functions" },
                { id: "arrays", title: "Arrays" },
                { id: "objects", title: "Objects" },
                { id: "dom", title: "DOM" },
                { id: "events", title: "Events" },
                { id: "es6", title: "ES6" },
                { id: "async", title: "Async / Await" }
            ]
        },

        react: {
            name: "React",
            icon: "fa-brands fa-react",
            color: "#61DBFB",
            page: "react-notes.html",
            desc: "Modern React notes covering hooks, props, state and more.",
            topics: [
                { id: "intro", title: "Introduction" },
                { id: "components", title: "Components" },
                { id: "jsx", title: "JSX" },
                { id: "props", title: "Props" },
                { id: "state", title: "State" },
                { id: "events", title: "Events" },
                { id: "hooks", title: "Hooks" },
                { id: "usestate", title: "useState" },
                { id: "useeffect", title: "useEffect" },
                { id: "forms", title: "Forms" },
                { id: "conditional", title: "Conditional Rendering" },
                { id: "api", title: "API Integration" }
            ]
        },

        tailwind: {
            name: "Tailwind CSS",
            icon: "fa-solid fa-wind",
            color: "#38BDF8",
            page: "tailwind-notes.html",
            desc: "Build modern UIs fast with utility-first Tailwind CSS.",
            topics: [
                { id: "intro", title: "Introduction" },
                { id: "setup", title: "Installation / Setup" },
                { id: "utility", title: "Utility Classes" },
                { id: "colors", title: "Colors" },
                { id: "typography", title: "Typography" },
                { id: "spacing", title: "Spacing" },
                { id: "flexbox", title: "Flexbox" },
                { id: "grid", title: "Grid" },
                { id: "responsive", title: "Responsive Design" },
                { id: "hoverfocus", title: "Hover / Focus States" },
                { id: "components", title: "Components" }
            ]
        }
    },

    quizzes: {

        html: [
            { q: "Which tag is used to create a hyperlink?", options: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;nav&gt;"], correct: 1 },
            { q: "Which tag defines the largest heading?", options: ["&lt;h6&gt;", "&lt;heading&gt;", "&lt;h1&gt;", "&lt;head&gt;"], correct: 2 },
            { q: "Which attribute provides alternate text for an image?", options: ["title", "alt", "src", "text"], correct: 1 },
            { q: "Which tag is used to create an unordered list?", options: ["&lt;ol&gt;", "&lt;list&gt;", "&lt;ul&gt;", "&lt;li&gt;"], correct: 2 },
            { q: "Which element is used for the most important, semantic page content?", options: ["&lt;div&gt;", "&lg;main&gt;", "&lg;span&gt;", "&lt;layout&gt;"], correct: 1 }
        ],

        css: [
            { q: "Which property changes text color?", options: ["font-color", "text-color", "color", "background"], correct: 2 },
            { q: "Which CSS layout model arranges items in a single row or column?", options: ["Grid", "Flexbox", "Float", "Table"], correct: 1 },
            { q: "Which symbol is used for a class selector?", options: ["#", ".", "*", "&"], correct: 1 },
            { q: "Which property controls spacing outside an element's border?", options: ["padding", "margin", "spacing", "gap"], correct: 1 },
            { q: "Which rule lets you apply styles based on screen size?", options: ["@font-face", "@keyframes", "@media", "@import"], correct: 2 }
        ],

        js: [
            { q: "Which keyword is used to declare a constant in JavaScript?", options: ["var", "let", "const", "static"], correct: 2 },
            { q: "Which operator checks both value and type equality?", options: ["==", "=", "===", "!="], correct: 2 },
            { q: "Which method adds an item to the end of an array?", options: ["push()", "pop()", "shift()", "add()"], correct: 0 },
            { q: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Document Order Map", "Display Object Model"], correct: 0 },
            { q: "Which keyword pauses an async function until a Promise settles?", options: ["wait", "pause", "await", "defer"], correct: 2 }
        ],

        react: [
            { q: "What does JSX let you write inside JavaScript?", options: ["CSS", "HTML-like syntax", "SQL", "YAML"], correct: 1 },
            { q: "Which hook adds state to a function component?", options: ["useEffect", "useState", "useRef", "useMemo"], correct: 1 },
            { q: "How is data passed from a parent to a child component?", options: ["State", "Props", "Context only", "Refs"], correct: 1 },
            { q: "Which hook runs side effects after render?", options: ["useEffect", "useState", "useReducer", "useCallback"], correct: 0 },
            { q: "What must a component return?", options: ["A string only", "A single root element (or fragment)", "Nothing", "A promise"], correct: 1 }
        ],

        tailwind: [
            { q: "Tailwind is best described as a...", options: ["Component library", "Utility-first CSS framework", "JavaScript framework", "Design tool"], correct: 1 },
            { q: "Which class sets an element's text color to blue-500?", options: ["color-blue-500", "text-blue-500", "bg-blue-500", "font-blue-500"], correct: 1 },
            { q: "Which prefix applies a style only on medium screens and up?", options: ["sm:", "md:", "lg-only:", "screen-md:"], correct: 1 },
            { q: "Which class applies flexbox to a container?", options: ["flex", "flex-box", "display-flex", "row"], correct: 0 },
            { q: "Which prefix targets an element's hover state?", options: ["on-hover:", "hover:", ":hover", "h-hover:"], correct: 1 }
        ]
    },

    /* ---------------- USER HELPERS ---------------- */

    getUsers() {
        return JSON.parse(localStorage.getItem("users")) || [];
    },

    saveUsers(users) {
        localStorage.setItem("users", JSON.stringify(users));
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("currentUser"));
    },

    // Persist a change to both currentUser AND the matching entry in users[]
    updateCurrentUser(changes) {

        const current = CNH.getCurrentUser();

        if (!current) return null;

        const updated = { ...current, ...changes };

        localStorage.setItem("currentUser", JSON.stringify(updated));

        const users = CNH.getUsers();

        const idx = users.findIndex(u => u.email === current.email);

        if (idx !== -1) {

            users[idx] = { ...users[idx], ...changes };

            CNH.saveUsers(users);
        }

        return updated;
    },

    /* ---------------- PROGRESS HELPERS ---------------- */

    getCompletedTopics(tech) {
        return JSON.parse(localStorage.getItem("progress_" + tech)) || [];
    },

    isTopicComplete(tech, topicId) {
        return CNH.getCompletedTopics(tech).includes(topicId);
    },

    toggleTopicComplete(tech, topicId) {

        let completed = CNH.getCompletedTopics(tech);

        if (completed.includes(topicId)) {

            completed = completed.filter(id => id !== topicId);

        } else {

            completed.push(topicId);
        }

        localStorage.setItem("progress_" + tech, JSON.stringify(completed));

        CNH.syncOverallProgress();

        return completed.includes(topicId);
    },

    getProgressPercent(tech) {

        const total = CNH.technologies[tech].topics.length;

        const done = CNH.getCompletedTopics(tech).length;

        if (total === 0) return 0;

        return Math.round((done / total) * 100);
    },

    getOverallProgress() {

        const keys = Object.keys(CNH.technologies);

        const total = keys.reduce((sum, key) => sum + CNH.getProgressPercent(key), 0);

        return Math.round(total / keys.length);
    },

    // Keep users[].progress / currentUser.progress in sync with real topic progress
    syncOverallProgress() {

        CNH.updateCurrentUser({ progress: CNH.getOverallProgress() });
    },

    /* ---------------- BOOKMARK / NOTE / QUIZ HELPERS ---------------- */

    getBookmarks() {
        return JSON.parse(localStorage.getItem("bookmarks")) || [];
    },

    getPersonalNotes() {
        return JSON.parse(localStorage.getItem("myNotes")) || [];
    },

    getQuizScores() {
        return JSON.parse(localStorage.getItem("quizScores")) || [];
    },

    saveQuizScore(tech, score, total) {

        const scores = CNH.getQuizScores();

        scores.push({
            tech,
            score,
            total,
            date: new Date().toLocaleDateString()
        });

        localStorage.setItem("quizScores", JSON.stringify(scores));
    },

    /* ---------------- SEARCH INDEX ---------------- */

    // Flat list of every topic across every technology, for global search
    buildSearchIndex() {

        const index = [];

        Object.keys(CNH.technologies).forEach(key => {

            const tech = CNH.technologies[key];

            tech.topics.forEach(topic => {

                index.push({
                    tech: key,
                    techName: tech.name,
                    page: tech.page,
                    topicId: topic.id,
                    title: topic.title
                });
            });
        });

        return index;
    }
};
