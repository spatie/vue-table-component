function stripHtml(html) {
    return html.replace(/<[^>]+>/g, '');
}

export { stripHtml };