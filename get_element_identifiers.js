javascript:
  var all = document.getElementsByTagName("*"); 
  for (var i=0, max=all.length; i < max; i++) { 
    var nodeName = all[i].nodeName.toLowerCase();
    if (all[i].hasChildNodes() && nodeName != "a") { continue; }
    if (nodeName == "div" || nodeName == "html" || nodeName == "body") { continue; }
 	  var o_m_over = all[i].getAttribute('onmouseover'); 
 	  if (o_m_over != null) { 
   		if (o_m_over.indexOf("map(this)") == -1) {
	 		  var o = o_m_over.concat('; map(this);'); 
	 		  all[i].setAttribute('onmouseover', o); 
	 	 }
 	  } else { 
   		all[i].setAttribute('onmouseover', 'map(this);');
   	} 
  }

var script = document.evaluate('//script[@id="map"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
if (script == null) {
	var s = document.createElement( 'script' );
	s.setAttribute('id', 'map');
  	s.innerText = "
    function map(element) { 
      var identifiers = [];
  		for (var i = 0; i < element.attributes.length; i++) {
        var attrib = element.attributes[i];
        var name = attrib.name;
        var value = attrib.value;
        if (name == 'class' || 
            name == 'src' || 
            name == 'onmouseover' || 
            name == 'href' || 
            name == 'width' || 
            name == 'height' ||
            name == 'style' ||
            name == 'onload') { continue; }
        var matches = document.evaluate( 'count(//*[@*=\"' + value + '\"])', document, null, XPathResult.ANY_TYPE, null );
        var matchCount = matches.numberValue;
        if (matchCount == 1) {
          identifiers.push(value);
        }
      }
      var text = element.innerText || element.textContent;
      var matches = document.evaluate( 'count(//*[text()=\"' + text + '\"])', document, null, XPathResult.ANY_TYPE, null );
      var matchCount = matches.numberValue;
      if (matchCount == 1) {
        identifiers.push(text);
      }

      if (identifiers.length == 0) {
        alert('No unique identifiers found, sorry! Need to use a page object for this element.')
      } else {
        var style = element.getAttribute('style');
        if (style != null) {
          var newstyle = style.concat('; border:2px dashed #00ff00;');
          element.setAttribute('style', newstyle);
        } else {
          element.setAttribute('style', 'border:2px dashed #00ff00;');
        }
      }

      alert('Possible identifiers: ' + identifiers.join(',  '));
      /* return true; */
  	}";
  	document.body.appendChild( s );	
}