"use strict";

/*!
 * shurikenJS
 * Released under the MIT license.
 * MIT License - You are free to use this commercial projects as long as the copyright header is left intact.
 * @author        Stephan Fischer
 * @copyright     (c) 2012 - 2013 Stephan Fischer (www.shurikenjs.com)
 * @version 1.0.2
 * http://shurikenjs.com/license
 */

if (!Function.prototype.bind)
{
  Function.prototype.bind = function (oThis) 
  {
    if (typeof this !== "function") 
    {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
    fToBind = this, 
    fNOP = function () {},
    fBound = function () {
      return fToBind.apply(this instanceof fNOP ? this: oThis || window,aArgs.concat(Array.prototype.slice.call(arguments)));
    };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

Node.prototype.hasClass = function(cls)
{
    return this.classList.contains(cls);
};

Node.prototype.addClass = function(classes) 
{
    var  token    = String.fromCharCode(32);
    var  clsList  = classes.split(token);
    
    clsList.forEach(function(el)
    {         
        this.classList.add(el);
    }.bind(this));
};

Node.prototype.removeClass = function(classes) 
{
    var  token    = String.fromCharCode(32);
    var  clsList  = classes.split(token);
    
    clsList.forEach(function(el)
    {     
        this.classList.remove(el);
    }.bind(this));

};

Node.prototype.toggleClass = function(classes) 
{
    var  token    = String.fromCharCode(32);
    var  clsList  = classes.split(token);
    
    clsList.forEach(function(el)
    {     
        this.classList.toggle(el);
    }.bind(this));

};

Node.prototype.remove = function()
{
    if   (!this.parentNode)  return; 
    return this.parentNode.removeChild(this);    
};

Node.prototype.empty = function()
{
    this.innerHTML = '';   
};

Node.prototype.html = function(html)
{
    if (!html) 
        return this.innerHTML
    else       this.innerHTML = html;  
};

Node.prototype.text = function(text)
{
    if (!text) 
        return (this.textContent || this.innerText);
    else {
        if ( this.textContent) 
             this.textContent = text;
        else this.innerText   = text;
    }
};

Node.prototype.hide = function()
{
    this.style.display = 'none';
};

Node.prototype.show = function(type)
{
    this.style.display = (type || 'block');
};

Node.prototype.toggle = function(type)
{
    if (  this.css('display') == 'none')
          this.show(type);
    else  this.hide();
};

Object.defineProperty(Object.prototype, 'on',
{
    writable  : true,
    enumerable: false,
    value: function(methods, callback)
    { 
        
        var  token       = String.fromCharCode(32);       
        var  methodList  = methods.split(token);

        methodList.forEach(function(el)
        {     
            this.addEventListener(el, callback, false);
        }.bind(this));

     }
});

Object.defineProperty(Object.prototype, 'off',
{
    writable  : true,
    enumerable: false,
    value: function(methods, callback)
    { 
        var  token       = String.fromCharCode(32);
        var  methodList  = methods.split(token);
        
        methodList.forEach(function(el)
        {     
            this.removeEventListener(el, callback, false);
        }.bind(this)); 
        
     }
});

Object.defineProperty(Object.prototype, 'trigger',
{
    writable  : true,
    enumerable: false,
    value: function(name)
    { 
        var evt = document.createEvent("Events"); 
        evt.initEvent(name, true, true); 
        this.dispatchEvent(evt);
    }
});

Node.prototype.replace = function(obj)
{
    this.parentNode.replaceChild(obj, this);
};

Node.prototype.after = function(src)
{
    if (typeof (src) === 'object')
         this.parentNode.insertBefore(src, this.nextSibling);
    else this.insertAdjacentHTML('afterend', src);
};

Node.prototype.before = function(src)
{ 
    if (typeof (src) === 'object')
         this.parentNode.insertBefore(src, this);
    else this.insertAdjacentHTML('beforebegin', src);
};

Node.prototype.append = function(src)
{
    if (typeof (src) === 'object')
          this.appendChild(src);
    else  this.insertAdjacentHTML('beforeend', src);
};

Node.prototype.appendTo = function(obj)
{   
    if (typeof (obj) === 'object') {
        obj.appendChild(this);
    }
};

Node.prototype.prepend = function(src)
{        
    if (typeof (src) === 'object')
         this.insertBefore(src, this.firstChild);
    else this.insertAdjacentHTML('afterbegin', src);
};

Node.prototype.prependTo = function(obj)
{   
    if (typeof (obj) === 'object') {
        obj.insertBefore(this, obj.firstChild);
    }
};

NodeList.prototype.forEach = function(callback)
{
    [].forEach.call(this,callback);
};

HTMLCollection.prototype.forEach = function(callback)
{
    [].forEach.call(this,callback);
};

Node.prototype.query = function(sel)
{
    return this.querySelector(sel);
};

Node.prototype.queryAll = function(sel)
{
    return this.querySelectorAll(sel);
};

Node.prototype.data = function (name, value)
{
    if (typeof name == 'object') {
        
        Object.keys(name).forEach(function(key) {
            this.setAttribute('data-' + key , name[key]);
        }.bind(this));

        return false;
        
    } else if (typeof value == 'string') {
        this.setAttribute('data-' + name, value); 
    } else {
       return this.getAttribute('data-' + name);
    }
};

Node.prototype.hasData = function (name)
{
    return this.getAttributeNode('data-' + name);  
};

Node.prototype.removeData = function (name) 
{
    this.removeAttribute('data-' + name);
};

Node.prototype.attr = function (name, value) 
{
    if (typeof name == 'object') {
        
        Object.keys(name).forEach(function(key) {
            var attr       = document.createAttribute(key);
            attr.nodeValue = name[key];
            this.setAttributeNode(attr);

        }.bind(this));

        return false;
        
    } else if (typeof value == 'string') {
        
        var attr       = document.createAttribute(name);
        attr.nodeValue = value;
        this.setAttributeNode(attr);
        
    } else {
        return this.getAttribute(name);
    }

};

Node.prototype.removeAttr = function (name) 
{
    var node = this.getAttributeNode(name);
    this.removeAttributeNode(node);
};

Node.prototype.clone = function()
{ 
    return this.cloneNode(true);
};

Object.defineProperty(Object.prototype, 'extend',{
    writable  : true,
    enumerable: false,
    value: function(dest)
    { 
        for (var property in this) {
            if (this.hasOwnProperty(property)) {
                dest[property] = this[property];
            }
        }
            
        return dest;
     }
});

Node.prototype.css = function (name, value)
{
    if (typeof name == 'object') {
        
        Object.keys(name).forEach(function(key) {
            this.style[key] = name[key];
        }.bind(this));
        
    }   else if (typeof value == 'string') {
        this.style[name] = value; 
        
    } else {

        // J/S Pro Techniques p136
        if (this.style[name]) {
            
            return this.style[name];
        } else if (this.currentStyle) {
            
            return this.currentStyle[name];
        } else if (document.defaultView && document.defaultView.getComputedStyle) {
            
            name = name.replace(/([A-Z])/g, "-$1");
            name = name.toLowerCase();
            
            var s = document.defaultView.getComputedStyle(this, "");
            return s && s.getPropertyValue(name);
            
        } else {
            return null;
        }
    
    }
};

Node.prototype.next = function()
{
    return this.nextElementSibling;
};

Node.prototype.prev = function()
{
    return this.previousElementSibling;
};

Node.prototype.parent = function()
{
    return this.parentNode;
};

Node.prototype.scrollTo = function(direction)
{
    this.scrollIntoView(direction);
};

Document.prototype.ready = function(callback) 
{
    document.addEventListener('DOMContentLoaded', callback, false);
};

Document.prototype.create = function(html) 
{
    var obj       = document.createElement('div');
    obj.innerHTML = html;
    
    if (obj.hasChildNodes()) {
        if (obj.childNodes.length == 1)
             return obj.childNodes[0];
        else return obj.childNodes;
    }
};

Function.prototype.chain = function() 
{
    var that = this;
    return function() 
    {
        var retVal = that.apply(this, arguments);
        return  (typeof retVal == "undefined") ? this : retVal;
    }
};

var shuriken = {
    enableChaining : function()
    {   
        this.chain      (Node.prototype);
        this.objectChain(Object.prototype);
    },
    objectChain : function(obj) 
    {
        var names = Object.getOwnPropertyNames(obj);
                
        for (var i = 0; i < names.length; i++) {
            var prop = names[i];
           
           if (typeof obj[prop] == "function") {
                obj[prop]= obj[prop].chain();
            }
            
        }
        
        return obj;
    },
    chain : function(obj) 
    {
        for (var fn in obj) {
          
            if (typeof obj[fn] == "function") {
                 obj[fn] = obj[fn].chain();
            }
        }
        
        return obj;
    }
};
