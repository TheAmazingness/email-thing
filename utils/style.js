import json from './style.json';

let style = '';

for (const element in json) {
  if (json.hasOwnProperty(element)) {
    style += `${ element } {`;
    for (const property in json[element]) {
      if (json[element].hasOwnProperty(property)) {
        style += `\n\t${ property }: ${ json[element][property] };`;
      }
    }
    style += '\n}\n';
  }
}

export default style;