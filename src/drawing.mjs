// drawing.js
import {writeFile} from 'fs';

class GenericElement {
   constructor(name)
   {
        this.name = name;
        this.attributes = {};
        this.children = [];
   }

   addAttr(key, value)
   {
        this.attributes[key] = value;
   }

   setAttr(name, value)
   {
        this.attributes[name] = value;
   }

   addAttrs(objs)
   {
        this.attributes = { ...this.attributes, ...objs };
   }

   removeAttrs(arr)
   {
        arr.map(attr => delete this.attributes[attr]);
   }

   addChild(child)
   {
        this.children.push(child);
   }
   toString() 
   {
        const attrs = Object.keys(this.attributes).map(key => `${key}="${this.attributes[key]}"`).join(' ');
        const children = this.children.map(child => child.toString()).join('');
        return `<${this.name} ${attrs}>${children}</${this.name}>`;
  }
  write(fileName, cb) 
  {
        writeFile(fileName, this.toString(), cb);
  }
}

class RootElement extends GenericElement
{
    constructor() 
    {
        super('svg');
        this.attributes['xmlns'] = 'http://www.w3.org/2000/svg';
    }
}

class RectangleElement extends GenericElement
{
    constructor(x, y, width, height, fill)
    {
        super('rect');
        this.attributes = 
        {
            'x': x,
            'y': y,
            'width': width,
            'height': height,
            'fill': fill
        };
    }
}

class TextElement extends GenericElement
{
    constructor(x, y, fontSize, fill, content)    
    {
        super('text');
        this.attributes = {
            'x': x,
            'y': y,
            'fontSize': fontSize,
            'fill': fill,
        };
        this.content = content;
    }
    toString() 
    {
        const attrs = Object.keys(this.attributes).map(key => `${key}="${this.attributes[key]}"`).join(' ');
        return `<${this.name} ${attrs}>${this.content}</${this.name}>`;
    }
}

// the following is used for testing
// create root element with fixed width and height
const root = new RootElement();
root.addAttrs({width: 800, height: 170, abc: 200, def: 400});
root.removeAttrs(['abc','def', 'non-existent-attribute']);

// create circle, manually adding attributes, then add to root element
const c = new GenericElement('circle');
c.addAttr('r', 75);
c.addAttr('fill', 'yellow');
c.addAttrs({'cx': 200, 'cy': 80});
root.addChild(c);

// create rectangle, add to root svg element
const r = new RectangleElement(0, 0, 200, 100, 'blue');
root.addChild(r);

// create text, add to root svg element
const t = new TextElement(50, 70, 70, 'red', 'wat is a prototype? 😬');
root.addChild(t);

// show string version, starting at root element
console.log(root.toString());

// write string version to file, starting at root element
root.write('test.svg', () => console.log('done writing!'));