// - This class will create HTML elements and return them, we can reuse them everywhere
export class DOM {
  public div(className: string | '') {
    const div = document.createElement('div');
    div.className = className;
    return div;
  }

  public a(href: string, className: string | '', content: string | '') {
    const a = document.createElement('a');
    a.className = className;
    a.href = href;
    a.textContent = content;
    return a;
  }

  public p(content: string) {
    const p = document.createElement('p');
    p.textContent = content;
    return p;
  }

  public tr(className: string | '') {
    const tr = document.createElement('tr');
    tr.className = className;
    return tr;
  }

  public td(className: string | '') {
    const td = document.createElement('td');
    td.className = className;
    return td;
  }

  public button(className: string = '', content: string) {
    const button = document.createElement('button');
    button.textContent = content;
    button.className = className;
    return button;
  }

  public img(className: string | '', src: string) {
    const img = document.createElement('img');
    img.src = src;
    img.className = className;
    return img;
  }

  public th(content: HTMLElement) {
    const th = document.createElement('th');
    th.appendChild(content);

    return th;
  }

  public className(element: HTMLElement, className: string) {
    element.className = className;
  }
}
