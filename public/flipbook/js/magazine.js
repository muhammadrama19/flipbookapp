/*
 * Magazine sample
*/


pages =[
	'../../public/flipbook/pages/1-large.jpg',
	'../../public/flipbook/pages/2-large.jpg',
	'../../public/flipbook/pages/3-large.jpg',
	'../../public/flipbook/pages/4-large.jpg',
	'../../public/flipbook/pages/5-large.jpg',
	'../../public/flipbook/pages/6-large.jpg',
	''
]

//check index of pages if null add blank page

for (var i = 0; i < pages.length; i++) {
	if (pages[i] == null) {
		pages[i] = '../../public/flipbook/pages/blank.png';
	}
}

defaultCustomScript = `
<script>
function createBubbles() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.style.left = Math.random() * window.innerWidth + "px";
  bubble.style.bottom = 0;
  document.body.appendChild(bubble);
  setTimeout(() => {
    bubble.remove();
  }, 5000);
}

setInterval(createBubbles, 200);
<\/script>

<style>
  .bubble {
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: rgba(0, 162, 232, 0.7);
    border-radius: 50%;
    animation: floating 5s linear infinite;
  }

  @keyframes floating {
    0% {
      transform: translateY(0);
      opacity: 1;
    }

    50% {
      opacity: 0.5;
    }

    100% {
      transform: translateY(-100vh);
      opacity: 0;
    }
  }
</style>
`;

customScript = [
	`<script>
	function createSnowflakes() {
	  const snowflake = document.createElement("div");
	  snowflake.classList.add("snowflake");
	  snowflake.style.left = Math.random() * window.innerWidth + "px";
	  snowflake.style.top = -Math.random() * window.innerHeight + "px";
	  document.body.appendChild(snowflake);
	  setTimeout(() => {
		snowflake.remove();
	  }, 5000);
	}
	
	setInterval(createSnowflakes, 100);
	<\/script>
	
	<style>
	  .snowflake {
		position: absolute;
		width: 5px;
		height: 5px;
		background-color: #fff;
		border-radius: 50%;
		animation: falling 5s linear infinite;
	  }
	
	  @keyframes falling {
		0% {
		  transform: translateY(0);
		}
	
		100% {
		  transform: translateY(100vh);
		}
	  }
	</style>`,
	`<script>
	function createLeaves() {
	  const leaf = document.createElement("div");
	  leaf.classList.add("leaf");
	  leaf.style.left = Math.random() * window.innerWidth + "px";
	  leaf.style.top = -Math.random() * window.innerHeight + "px";
	  document.body.appendChild(leaf);
	  setTimeout(() => {
		leaf.remove();
	  }, 10000);
	}
	
	setInterval(createLeaves, 200);
	</script>
	
	<style>
	  .leaf {
		position: absolute;
		width: 20px;
		height: 20px;
		background-color: #a52a2a;
		border-radius: 50%;
		opacity: 0.8;
		animation: fallingLeaf 10s linear infinite;
	  }
	
	  @keyframes fallingLeaf {
		0% {
		  transform: translateY(0) rotate(0deg);
		}
	
		50% {
		  transform: translateY(50vh) rotate(180deg);
		}
	
		100% {
		  transform: translateY(100vh) rotate(360deg);
		}
	  }
	</style>`
  ];

  
var countPages = pages.length;

// script.js
$(document).ready(function(){
    // Open sidebar
    $(".open-sidebar").click(function(){
      $(".sidebar").css("left", "0");
	  $("#control").removeClass("d-none");

    });
  
    // Close sidebar
    $(".close-btn").click(function(){
      $(".sidebar").css("left", "-300px");
	  $("#control").addClass("d-none");
    });
  });

// script.js

function next(){
	$(".magazine").turn("next");
}

function previous(){
	$(".magazine").turn("previous");
}

function start(){
	$(".magazine").turn("page", 1);
}

function end(){
	$(".magazine").turn("page", $(".magazine").turn("pages"));

}


function displayCurrentPage() {
    var currentPage = $(".magazine").turn("page");
    var totalPages = $(".magazine").turn("pages");

    if (currentPage === 1) {
        // Cover page
        $("#page-info").text("");
    } else if (currentPage === totalPages) {
        // Last page (back cover)
        $("#page-info").text("Current Page: " + (totalPages-1) );
    } else {
        var adjustedPage = currentPage - 1;
        var adjustedTotalPages = totalPages - 1;

        if (adjustedPage === 1) {
            // If on the first content page
            $("#page-info").text("Current Page: 1 and 2 of " + adjustedTotalPages);
        } else {
            var displayedPage = adjustedPage;
            var nextDisplayedPage = displayedPage + 1;

            if (nextDisplayedPage > adjustedTotalPages) {
                nextDisplayedPage = "";
            }

            // Display page information
            $("#page-info").text("Current Page: " + displayedPage + (nextDisplayedPage ? " and " + nextDisplayedPage : "") + " of " + adjustedTotalPages);
        }
    }
}





$(".magazine").bind("turned", function(event, page, view) {
    displayCurrentPage();
});


$(document).ready(function() {
    displayCurrentPage();
});

function loadImagesToSidebar() {
	const sidebarContent = document.getElementById('sidebar-content');
	const imageNames = pages;

  
	imageNames.forEach((imageName, index) => {
	//check imageName is null or not
	if (imageName == '') {
		imageName = '../../public/flipbook/pages/blank.png';
	}

	  const imgContainer = document.createElement('div');
	  imgContainer.className = 'image-container';
  
	  const img = document.createElement('img');
		  
	  img.src = `${imageName}`; // Path to the image
  
	  const link = document.createElement('a');
	  link.onclick = function() {
		$('.magazine').turn('page', index + 1);
	  }
	  link.appendChild(img);
  

	  imgContainer.appendChild(link);
  
	  if (index !== 0) {
		const number = document.createElement('span');
		number.textContent = index; 
		imgContainer.appendChild(number);
	  }

	  sidebarContent.appendChild(imgContainer);
	});
  }
  

loadImagesToSidebar();


const audioFiles =
[
	'../../public/flipbook/audio/testsound.mp3',
	'../../public/flipbook/audio/test1.mp3',
	'../../public/flipbook/audio/testsound.mp3'
]

function playBackgroundSound(index = 0) {
	var audio = document.getElementById('background-sound');

	if (index >= audioFiles.length) {
	  console.error("Invalid audio file index");
	  return;
	}
  

	audio.src = audioFiles[index];
  

	var playPromise = audio.play();
  
	if (playPromise !== undefined) {
	  playPromise.then(() => {

		console.log("Background sound is playing.");
	  }).catch((error) => {

		console.log("Autoplay prevented, retrying...");
		setTimeout(() => playBackgroundSound(index), 1000);
	  });
	}
  }

  $(document).ready(function() {
	playBackgroundSound();
  });
  
  function addPage(page, book) {
	var id, pages = book.turn('pages');
  
	var element = $('<div />', {});
	if (book.turn('addPage', element, page)) {
  
	  const script = customScript[page - 1] || defaultCustomScript;
	  
	  element.html(`
		<iframe scrolling="no" class="gradient border-0" srcdoc='${script}'></iframe>
	  `);
  
	  // Load the page
	  loadPage(page, element);
	}
  }
 

  
function loadPage(page, pageElement) {

	// Create an image element

	var img = $('<img />');

	img.mousedown(function(e) {
		e.preventDefault();
	});

	img.load(function() {
		
		// Set the size
		$(this).css({width: '100%', height: '100%'});

		// Add the image to the page after loaded

		$(this).appendTo(pageElement);

		// Remove the loader indicator
		
		pageElement.find('.loader').remove();
	});

	// Load the page


	img.attr('src', pages[page-1]);


	loadRegions(page, pageElement);

}

// Zoom in / Zoom out

function zoomTo(event) {

		setTimeout(function() {
			if ($('.magazine-viewport').data().regionClicked) {
				$('.magazine-viewport').data().regionClicked = false;
			} else {
				if ($('.magazine-viewport').zoom('value')==1) {
					$('.magazine-viewport').zoom('zoomIn', event);
				} else {
					$('.magazine-viewport').zoom('zoomOut');
				}
			}
		}, 1);

}



// Load regions

function loadRegions(page, element) {

	$.getJSON('pages/'+page+'-regions.json').
		done(function(data) {

			$.each(data, function(key, region) {
				addRegion(region, element);
			});
		});
}

// Add region

function addRegion(region, pageElement) {
	
	var reg = $('<div />', {'class': 'region  ' + region['class']}),
		options = $('.magazine').turn('options'),
		pageWidth = options.width/2,
		pageHeight = options.height;

	reg.css({
		top: Math.round(region.y/pageHeight*100)+'%',
		left: Math.round(region.x/pageWidth*100)+'%',
		width: Math.round(region.width/pageWidth*100)+'%',
		height: Math.round(region.height/pageHeight*100)+'%'
	}).attr('region-data', $.param(region.data||''));


	reg.appendTo(pageElement);
}

// Process click on a region

function regionClick(event) {

	var region = $(event.target);

	if (region.hasClass('region')) {

		$('.magazine-viewport').data().regionClicked = true;
		
		setTimeout(function() {
			$('.magazine-viewport').data().regionClicked = false;
		}, 100);
		
		var regionType = $.trim(region.attr('class').replace('region', ''));

		return processRegion(region, regionType);

	}

}

// Process the data of every region

function processRegion(region, regionType) {

	data = decodeParams(region.attr('region-data'));

	switch (regionType) {
		case 'link' :

			window.open(data.url);

		break;
		case 'zoom' :

			var regionOffset = region.offset(),
				viewportOffset = $('.magazine-viewport').offset(),
				pos = {
					x: regionOffset.left-viewportOffset.left,
					y: regionOffset.top-viewportOffset.top
				};

			$('.magazine-viewport').zoom('zoomIn', pos);

		break;
		case 'to-page' :

			$('.magazine').turn('page', data.page);

		break;
	}

}

// Load large page

function loadLargePage(page, pageElement) {
	
	var img = $('<img />');

	img.load(function() {

		var prevImg = pageElement.find('img');
		$(this).css({width: '100%', height: '100%'});
		$(this).appendTo(pageElement);
		prevImg.remove();
		
	});

	// Loadnew page
	
	img.attr('src',  page);
}

// Load small page

function loadSmallPage(page, pageElement) {
	
	var img = pageElement.find('img');

	img.css({width: '100%', height: '100%'});

	img.unbind('load');
	// Loadnew page

	img.attr('src',  page);
}

// http://code.google.com/p/chromium/issues/detail?id=128488

function isChrome() {

	return navigator.userAgent.indexOf('Chrome')!=-1;

}

function disableControls(page) {
		if (page==1)
			$('.previous-button').hide();
		else
			$('.previous-button').show();
					
		if (page==$('.magazine').turn('pages'))
			$('.next-button').hide();
		else
			$('.next-button').show();
}

// Set the width and height for the viewport

function resizeViewport() {

	var width = $(window).width(),
		height = $(window).height(),
		options = $('.magazine').turn('options');

	$('.magazine').removeClass('animated');

	$('.magazine-viewport').css({
		width: width,
		height: height
	}).
	zoom('resize');


	if ($('.magazine').turn('zoom')==1) {
		var bound = calculateBound({
			width: options.width,
			height: options.height,
			boundWidth: Math.min(options.width, width),
			boundHeight: Math.min(options.height, height)
		});

		if (bound.width%2!==0)
			bound.width-=1;

			
		if (bound.width!=$('.magazine').width() || bound.height!=$('.magazine').height()) {

			$('.magazine').turn('size', bound.width, bound.height);

			if ($('.magazine').turn('page')==1)
				$('.magazine').turn('peel', 'br');

			$('.next-button').css({height: bound.height, backgroundPosition: '-38px '+(bound.height/2-32/2)+'px'});
			$('.previous-button').css({height: bound.height, backgroundPosition: '-4px '+(bound.height/2-32/2)+'px'});
		}

		$('.magazine').css({top: -bound.height/2, left: -bound.width/2});
	}

	var magazineOffset = $('.magazine').offset(),
		boundH = height - magazineOffset.top - $('.magazine').height(),
		marginTop = (boundH - $('.thumbnails > div').height()) / 2;

	if (marginTop<0) {
		$('.thumbnails').css({height:1});
	} else {
		$('.thumbnails').css({height: boundH});
		$('.thumbnails > div').css({marginTop: marginTop});
	}

	if (magazineOffset.top<$('.made').height())
		$('.made').hide();
	else
		$('.made').show();

	$('.magazine').addClass('animated');
	
}


function moveBar(yes) {
	if (Modernizr && Modernizr.csstransforms) {
		$('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000});
	}
}

function setPreview(view) {

	var previewWidth = 112,
		previewHeight = 73,
		previewSrc = 'pages/preview.jpg',
		preview = $(_thumbPreview.children(':first')),
		numPages = (view==1 || view==$('#slider').slider('option', 'max')) ? 1 : 2,
		width = (numPages==1) ? previewWidth/2 : previewWidth;

	_thumbPreview.
		addClass('no-transition').
		css({width: width + 15,
			height: previewHeight + 15,
			top: -previewHeight - 30,
			left: ($($('#slider').children(':first')).width() - width - 15)/2
		});

	preview.css({
		width: width,
		height: previewHeight
	});

	if (preview.css('background-image')==='' ||
		preview.css('background-image')=='none') {

		preview.css({backgroundImage: 'url(' + previewSrc + ')'});

		setTimeout(function(){
			_thumbPreview.removeClass('no-transition');
		}, 0);

	}

	preview.css({backgroundPosition:
		'0px -'+((view-1)*previewHeight)+'px'
	});
}

// Width of the flipbook when zoomed in

function largeMagazineWidth() {
	
	return 2214;

}

// decode URL Parameters

function decodeParams(data) {

	var parts = data.split('&'), d, obj = {};

	for (var i =0; i<parts.length; i++) {
		d = parts[i].split('=');
		obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
	}

	return obj;
}

// Calculate the width and height of a square within another square

function calculateBound(d) {
	
	var bound = {width: d.width, height: d.height};

	if (bound.width>d.boundWidth || bound.height>d.boundHeight) {
		
		var rel = bound.width/bound.height;

		if (d.boundWidth/rel>d.boundHeight && d.boundHeight*rel<=d.boundWidth) {
			
			bound.width = Math.round(d.boundHeight*rel);
			bound.height = d.boundHeight;

		} else {
			
			bound.width = d.boundWidth;
			bound.height = Math.round(d.boundWidth/rel);
		
		}
	}
		
	return bound;
}
function showPagePosition(book) {
	var currentPage = book.turn('page');
	var totalPages = book.turn('pages');
	$('#currentPageInfo').text('Page ' + currentPage + ' of ' + totalPages);
  }
  