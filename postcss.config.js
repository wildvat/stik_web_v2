const purgecss = require("@fullhuman/postcss-purgecss")({
    content: ["./hugo_stats.json"],
    defaultExtractor: (content) => {
        const els = JSON.parse(content).htmlElements;
        return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
    },
    safelist: ['animation'],
});

module.exports = {
    plugins: [
        ...([purgecss]),
    ],
};
