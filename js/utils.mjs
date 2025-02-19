export function convertToText(response) {
  return response.text();
}

export function renderWithTemplate(template, parent, data, callback) {
  parent.appendChild(template);
  // If a callback and data are provided, execute the callback with the data
  if (callback && data) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter() {
  try {
    // Load the header and footer templates
    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");

    // Get the header and footer elements from the DOM
    const headerElement = document.getElementById("main-header");
    const footerElement = document.getElementById("main-footer");

    // Insert the actual content of the templates into the DOM
    renderWithTemplate(headerTemplate.content, headerElement);
    renderWithTemplate(footerTemplate.content, footerElement);
  } catch (error) {
    console.error("Error loading header and footer:", error);
  }
}
