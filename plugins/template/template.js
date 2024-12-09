export const buildTemplate = (title, lead, source, faq) => {
  const body = document.createElement('body');

  if (title) {
    body.innerHTML += `<h1>${title}</h1>`;
  }

  if (lead) {
    body.innerHTML += `<p>${lead}</p>`;
  }

  body.innerHTML += source;

  if (faq) {
    body.innerHTML += `<h2>Frequently Asked Questions</h2>`;

    body.innerHTML += faq.map(({ question, answer }) => {
      return `
         <div>
            <h3>${question}</h3>
            <div>${answer}</div>
        </div>`;
    });
  }

  return body.outerHTML;
};
