const TEXT_STYLES_MAPPER = {
  fontSize: (value) => `font-size: ${value}px;`,
  fontWeight: (value) => `font-weight: ${value};`,
  fontFamily: (value) => `font-family: '${value}';`,
  lineHeightPx: (value) => `line-height: ${value}px;`,
  textAlignHorizontal: (value) => `text-align: ${value.toLowerCase()};`,
  textAlignVertical: (value) => `vertical-align: ${value.toLowerCase()};`,
};

const buildBlock = ({ type, content, className, style }) => {
  return `<${type} class="${className}" style="${style}">${content}</${type}>`;
};

const getTextStyles = (node) => {
  const styleArr = [];
  if (node.style) {
    for (let [key, value] of Object.entries(node.style)) {
      if (TEXT_STYLES_MAPPER[key]) {
        styleArr.push(TEXT_STYLES_MAPPER[key](value));
      }
    }
  }
  if (node.absoluteBoundingBox) {
    styleArr.push(`height: ${node.absoluteBoundingBox.height}px;`);
    styleArr.push(`width: ${node.absoluteBoundingBox.width}px;`);
  }
  if (node.backgroundColor) {
    let object = node.backgroundColor;
    styleArr.push(
      `background: rgba(${Math.round(object.r * 255)}, ${Math.round(
        object.g * 255
      )}, ${Math.round(object.b * 255)}, ${object.a});`
    );
  }
  if (node.layoutAlign) {
    styleArr.push(
      `display: ${node.layoutAlign === "INHERIT" ? "inherit" : "flex"};`
    );
  }
  if (node.paddingLeft) styleArr.push(`padding-left: ${node.paddingLeft}px;`);
  if (node.paddingRight)
    styleArr.push(`padding-right: ${node.paddingRight}px;`);
  if (node.paddingTop) styleArr.push(`padding-top: ${node.paddingTop}px;`);
  if (node.paddingBottom)
    styleArr.push(`padding-left: ${node.paddingBottom}px;`);

  if (node.fills && node.fills[0]) {
    let object = node.fills[0].color;
    styleArr.push(
      `color: rgba(${Math.round(object.r * 255)}, ${Math.round(
        object.g * 255
      )}, ${Math.round(object.b * 255)}, ${object.a});`
    );
  }
  return styleArr.join(" ");
};

const PRIMITIVES = {
  TEXT: (node) => {
    return buildBlock({
      type: "span",
      content: node.characters,
      className: node.type,
      style: getTextStyles(node),
    });
  },
  FRAME: (node) => {
    return buildBlock({
      type: "div",
      content: traverse(node),
      className: node.type,
      style: getTextStyles(node),
    });
  },
  INSTANCE: (node) => {
    return buildBlock({
      type: node.name === "Button" ? "button" : "div",
      content: traverse(node),
      className: node.type,
      style: getTextStyles(node),
    });
  },
  RECTANGLE: (node) => {
    return buildBlock({
      type: "div",
      content: "",
      className: node.type,
      style: getTextStyles(node),
    });
  },
};

const parse = (entry) => {
  return traverse(entry.children[0]);
};

function traverse(node) {
  // тут надо придумать, как обходить дерево:)
  // ладно :))))))

  if (node.children === undefined) return PRIMITIVES[node.type](node);
  let result = "";
  for (let i = 0; i < node.children.length; i++) {
    result += PRIMITIVES[node.children[i].type](node.children[i]);
  }
  return result;
}

module.exports = function (json) {
  const entry = json.document.children[0];
  return parse(entry);
};
